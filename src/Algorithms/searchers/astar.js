export function astar(grid, startCell, endCell, isDiagonalOn) {
  const openSet = [];
  const closedSet = [];
  openSet.push(startCell);

  for (const row of grid) {
    for (const cell of row) {
      closedSet.push(cell);
    }
  }

  while (!!closedSet.length) {}
}
