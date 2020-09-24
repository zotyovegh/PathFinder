export function dijsktra(grid, startCell, endCell) {
  const visitedCells = [];
  startCell.distance = 0;
  const unvisitedCells = [];
  for (const row of grid) {
    for (const cell of row) {
      unvisitedCells.push(cell);
    }
  }

  while (!!unvisitedCells.length) {
    unvisitedCells.sort((cell1, cell2) => cell1.distance - cell2.distance);

    const nextCell = unvisitedCells.shift();

    if (nextCell.isWall) continue;

    if (nextCell.distance === Infinity) return visitedCells;
    nextCell.isVisited = true;
    visitedCells.push(nextCell);
    if (nextCell === endCell) {
      return visitedCells;
    }

    //get unvisited cells somehow
  }
}
