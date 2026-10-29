export function coverScene(width, height, ratio = 1672 / 941) {
  const w = Math.max(width, height * ratio);
  const h = w / ratio;
  return {
    width: w,
    height: h,
    left: (width - w) / 2,
    top: (height - h) * 0.55,
  };
}
export function assemblySchedule(pieces) {
  let cursor = 0;
  return pieces.map((piece, index) => {
    const duration =
      piece.id === "rug"
        ? 0.6
        : ["Objet", "Détail"].includes(piece.category)
          ? 0.46
          : 0.62;
    const start = cursor;
    cursor += duration + 0.13;
    return { id: piece.id, index, start, end: start + duration, duration };
  });
}
