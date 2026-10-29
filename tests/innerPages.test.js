import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";
import {
  portfolioItems,
  portfolioFilters,
  filterPortfolio,
  getProjectImages,
} from "../src/v2/portfolioData.js";

test("portfolio filters classify all source projects and explicitly identified concepts", () => {
  assert.equal(portfolioItems.length, 8);
  assert.equal(new Set(portfolioItems.map((item) => item.id)).size, 8);
  const counts = {
    Tous: 8,
    Résidentiel: 3,
    Commercial: 4,
    Intérieur: 2,
    "3D": 1,
  };
  for (const filter of portfolioFilters)
    assert.equal(filterPortfolio(filter).length, counts[filter], filter);
  assert.deepEqual(filterPortfolio("inconnu"), []);
  for (const item of portfolioItems) {
    assert.ok(item.title && item.description);
    for (const image of getProjectImages(item))
      assert.ok(existsSync("public" + image), image);
    assert.equal(getProjectImages(item).length, item.concept ? 1 : 2);
  }
});

test("interior redesign renders comparison control, working project controls and honest contact form", async () => {
  const vite = await createServer({
    server: { middlewareMode: true, watch: null, hmr: false },
    appType: "custom",
  });
  try {
    const { PortfolioPage, CraftPage, ContactPage } = await vite.ssrLoadModule(
      "/src/v2/OtherPages.jsx",
    );
    const portfolio = renderToStaticMarkup(createElement(PortfolioPage));
    assert.equal(
      (portfolio.match(/class="inner-project-card /g) || []).length,
      8,
    );
    assert.equal((portfolio.match(/aria-pressed="true"/g) || []).length, 2);
    assert.match(portfolio, /aria-controls="inner-project-details"/);
    assert.match(portfolio, /aria-label="Vue suivante"/);
    const craft = renderToStaticMarkup(createElement(CraftPage));
    assert.match(craft, /type="range" min="0" max="100"/);
    assert.match(craft, /Comparer les deux vues : Villa Horizon/);
    assert.match(craft, /50 % modèle, 50 % réalité/);
    const contact = renderToStaticMarkup(createElement(ContactPage));
    assert.match(
      contact,
      /<input(?=[^>]*name="email")(?=[^>]*type="email")(?=[^>]*required)[^>]*>/,
    );
    assert.match(contact, /name="service" required/);
    assert.match(contact, /minLength="15"/);
    assert.match(contact, /Aucun envoi n’est effectué avant votre validation/);
    assert.doesNotMatch(contact, /Message envoyé avec succès/);
  } finally {
    await vite.close();
  }
});
