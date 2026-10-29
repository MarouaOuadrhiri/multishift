import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";
import { FURNITURE_PIECES } from "../src/data/furniturePieces.js";

test("all 13 calibrated furniture assets exist on disk in webp and png format", () => {
  assert.equal(FURNITURE_PIECES.length, 13);

  assert.ok(
    existsSync("public/hero/hero-empty.webp"),
    "hero-empty.webp missing",
  );
  assert.ok(existsSync("public/hero/hero-empty.png"), "hero-empty.png missing");
  assert.ok(
    existsSync("public/hero/hero-furnished.webp"),
    "hero-furnished.webp missing",
  );
  assert.ok(
    existsSync("public/hero/hero-furnished.png"),
    "hero-furnished.png missing",
  );

  FURNITURE_PIECES.forEach((piece, index) => {
    assert.equal(
      piece.order,
      index + 1,
      `Piece ${piece.id} has wrong order index`,
    );
    assert.ok(piece.label.length > 0, `Piece ${piece.id} missing label`);
    assert.ok(
      existsSync("public" + piece.srcWebp),
      `Missing webp for ${piece.id}`,
    );
    assert.ok(
      existsSync("public" + piece.srcPng),
      `Missing png for ${piece.id}`,
    );

    // Validate style coordinates are valid percentages
    const leftNum = parseFloat(piece.style.left);
    const topNum = parseFloat(piece.style.top);
    const widthNum = parseFloat(piece.style.width);
    const heightNum = parseFloat(piece.style.height);

    assert.ok(
      leftNum >= 0 && leftNum <= 100,
      `Left ${leftNum} out of bounds for ${piece.id}`,
    );
    assert.ok(
      topNum >= 0 && topNum <= 100,
      `Top ${topNum} out of bounds for ${piece.id}`,
    );
    assert.ok(
      widthNum > 0 && widthNum <= 100,
      `Width ${widthNum} invalid for ${piece.id}`,
    );
    assert.ok(
      heightNum > 0 && heightNum <= 100,
      `Height ${heightNum} invalid for ${piece.id}`,
    );
  });
});

test("InteractiveHero renders complete accessible markup with 13 layers and interaction controls", async () => {
  const vite = await createServer({
    server: { middlewareMode: true, watch: null, hmr: false },
    appType: "custom",
  });

  try {
    const { default: InteractiveHero } = await vite.ssrLoadModule(
      "/src/components/InteractiveHero.jsx",
    );
    const html = renderToStaticMarkup(createElement(InteractiveHero));

    // Must render the 13 furniture layers
    for (const piece of FURNITURE_PIECES) {
      assert.ok(
        html.includes(`piece-${piece.id}`),
        `HTML missing piece-${piece.id} element`,
      );
    }

    // Must render empty and furnished scenes
    assert.match(html, /hero-empty\.webp/);
    assert.match(html, /hero-furnished\.webp/);

    // Initial state interaction prompt
    assert.match(html, /class="assembly-start" disabled/);
    assert.match(html, /Transformation du salon/);

    // Single H1 in the hero
    assert.equal((html.match(/<h1>/g) || []).length, 1);
  } finally {
    await vite.close();
  }
});
