import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";
import {
  comparisonProjects,
  projectFilters,
  filterProjects,
} from "../src/data/comparisonProjects.js";

test("comparison selection contains exactly five existing projects and two valid assets each", () => {
  assert.equal(comparisonProjects.length, 5);
  assert.equal(new Set(comparisonProjects.map((p) => p.id)).size, 5);
  for (const project of comparisonProjects) {
    assert.ok(existsSync("public" + project.render));
    assert.ok(existsSync("public" + project.reality));
    assert.notEqual(project.render, project.reality);
  }
});
test("category filters preserve the five-card limit and public selection is honestly empty", () => {
  assert.equal(filterProjects("Tous").length, 5);
  assert.equal(filterProjects("Résidentiel").length, 2);
  assert.equal(filterProjects("Commercial").length, 3);
  assert.equal(filterProjects("Public").length, 0);
  for (const category of projectFilters)
    assert.ok(filterProjects(category).length <= 5);
});
test("React Bits stack renders five comparisons, accessible controls and the live portfolio link", async () => {
  const vite = await createServer({
    server: { middlewareMode: true, watch: null, hmr: false },
    appType: "custom",
  });
  try {
    const { default: ProjectComparisons } = await vite.ssrLoadModule(
      "/src/components/ProjectComparisons.jsx",
    );
    const html = renderToStaticMarkup(createElement(ProjectComparisons));
    assert.equal((html.match(/data-stack-slot=""/g) || []).length, 5);
    assert.equal((html.match(/class="comparison-card /g) || []).length, 5);
    assert.match(html, /3D <span>vs<\/span> Réalité/);
    assert.match(html, /aria-label="Filtrer les projets"/);
    assert.match(html, /aria-pressed="true"/);
    for (const project of comparisonProjects) {
      assert.ok(html.includes(project.title.replaceAll("&", "&amp;")));
      assert.ok(html.includes(project.render));
      assert.ok(html.includes(project.reality));
    }
    assert.match(html, /Voir tous les projets/);
    assert.match(html, /href="https:\/\/multishift.ma\/portfolio"/);
    assert.match(html, /Afficher la réalité de Villa Horizon/);
    assert.doesNotMatch(html, /Card 1|This is the first card/);
  } finally {
    await vite.close();
  }
});
