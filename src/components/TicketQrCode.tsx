interface TicketQrCodeProps {
  value: string;
  size?: number;
}

/** Deterministic decorative QR matrix visual for demo ticket confirmation passes */
export function TicketQrCode({ value, size = 112 }: TicketQrCodeProps) {
  const gridSize = 15;
  let seed = 0;
  for (let i = 0; i < value.length; i++) {
    seed = (seed * 37 + value.charCodeAt(i)) % 100003;
  }

  const isFinderCell = (r: number, c: number) => {
    const inTopLeft = r < 5 && c < 5;
    const inTopRight = r < 5 && c >= gridSize - 5;
    const inBottomLeft = r >= gridSize - 5 && c < 5;
    if (!inTopLeft && !inTopRight && !inBottomLeft) return null;

    const lr = r >= gridSize - 5 ? r - (gridSize - 5) : r;
    const lc = c >= gridSize - 5 ? c - (gridSize - 5) : c;
    const isBorder = lr === 0 || lr === 4 || lc === 0 || lc === 4;
    const isCenter = lr === 2 && lc === 2;
    return isBorder || isCenter;
  };

  const cells: { r: number; c: number }[] = [];
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      const finder = isFinderCell(r, c);
      if (finder !== null) {
        if (finder) cells.push({ r, c });
      } else {
        const hash = (seed + r * 31 + c * 17 + r * c * 13) % 11;
        if (hash < 5) cells.push({ r, c });
      }
    }
  }

  const cellSize = 100 / gridSize;

  return (
    <div
      className="inline-flex items-center justify-center rounded-lg bg-white p-2.5 shadow-sm"
      style={{ width: size, height: size }}
      aria-label={`Demo pass code ${value}`}
    >
      <svg viewBox="0 0 100 100" className="h-full w-full" shapeRendering="crispEdges">
        <rect width="100" height="100" fill="#FFFFFF" />
        {cells.map((cell) => (
          <rect
            key={`${cell.r}-${cell.c}`}
            x={cell.c * cellSize}
            y={cell.r * cellSize}
            width={cellSize + 0.15}
            height={cellSize + 0.15}
            fill="#09080E"
          />
        ))}
      </svg>
    </div>
  );
}
