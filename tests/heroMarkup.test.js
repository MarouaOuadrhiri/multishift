import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

test("hero renders real navigation, accessible chapter controls, valid assets and retained content", async () => {
  const vite = await createServer({
    server: { middlewareMode: true, watch: null, hmr: false },
    appType: "custom",
  });
  try {
    const { default: Hero } = await vite.ssrLoadModule(
      "/src/components/Hero.jsx",
    );
    const html = renderToStaticMarkup(createElement(Hero));
    assert.match(html, /Entrez dans/);
    assert.match(html, /id="studio"/);
    assert.match(html, /aria-label="Étapes de la visite"/);
    assert.match(html, /aria-current="step"/);
    assert.match(html, /aria-expanded="false"/);
    assert.match(html, /aria-label="Recommencer la visite"/);
    assert.match(html, /href="#studio"/);
    assert.match(html, /https:\/\/multishift.ma\/contact/);
    const sources = [
      ...html.matchAll(/src="(\/(?:images|hero)\/[^" ]+)"/g),
    ].map((match) => match[1]);
    assert.ok(sources.some((src) => src.includes("hero-empty")));
    assert.ok(sources.some((src) => src.includes("hero-furnished")));
    assert.equal(
      sources.filter((src) => src.includes("expertise-custom")).length,
      3,
    );
    assert.equal(sources.filter((src) => src.includes("typology-")).length, 6);
    assert.match(html, /Pourquoi choisir/);
    assert.match(html, /Trois piliers de/);
    for (const src of new Set(sources))
      assert.ok(existsSync("public" + src), `Missing asset: ${src}`);
    assert.equal((html.match(/<h1>/g) || []).length, 1);
    assert.doesNotMatch(
      html,
      /hero-structure|building-layer|<nav[^>]+id="showroom-menu"/,
    );
  } finally {
    await vite.close();
  }
});
