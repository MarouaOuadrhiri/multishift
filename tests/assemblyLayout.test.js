import test from "node:test";
import assert from "node:assert/strict";
import { coverScene, assemblySchedule } from "../src/data/assemblyLayout.js";
import { FURNITURE_PIECES } from "../src/data/furniturePieces.js";
test("all viewport crops share a single registered source plane", () => {
  for (const [w, h] of [
    [1920, 1080],
    [1440, 900],
    [1024, 768],
    [768, 1024],
    [390, 844],
    [320, 568],
  ]) {
    const scene = coverScene(w, h);
    assert.ok(scene.width >= w - 0.001 && scene.height >= h - 0.001);
    assert.ok(Math.abs(scene.width / scene.height - 1672 / 941) < 0.000001);
    assert.ok(Math.abs(scene.left + scene.width / 2 - w / 2) < 0.001);
    assert.ok(Math.abs(scene.top - (h - scene.height) * 0.55) < 0.001);
  }
});
test("every furniture item lands before the next starts", () => {
  const schedule = assemblySchedule(FURNITURE_PIECES);
  assert.equal(schedule.length, 13);
  schedule.forEach((item, i) => {
    assert.ok(item.end > item.start);
    if (i) assert.ok(item.start - schedule[i - 1].end >= 0.129);
  });
});
test("furniture target rectangles stay in their source-image coordinate system", () => {
  for (const piece of FURNITURE_PIECES) {
    const s = piece.style;
    for (const name of ["left", "top", "width", "height"])
      assert.ok(s[name].endsWith("%"));
    assert.ok(parseFloat(s.left) + parseFloat(s.width) <= 100.001);
    assert.ok(parseFloat(s.top) + parseFloat(s.height) <= 100.001);
  }
});
