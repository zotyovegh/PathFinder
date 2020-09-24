export function dijkstra(grid, startCell, endCell) {
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
    getUnvisitedNeighbors(nextCell, grid);
  }
}

function getUnvisitedNeighbors(cell, grid) {
  const neighbors = [];
  const { col, row } = cell;

  if (row > 0) {
    neighbors.push(grid[row - 1][col]);
  }
  if (row < grid.length - 1) {
    neighbors.push(grid[row + 1][col]);
  }
  if (col > 0) {
    neighbors.push(grid[row][col - 1]);
  }
  if (col < grid[0].length - 1) {
    neighbors.push(grid[row][col + 1]);
  }

  const unvisitedNeighbors = neighbors.filter((neighbor) => !neighbor.visited);

  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = cell.distance + 1;
  }
}
