import { DoAnimation, getUnvisitedNeighbors } from "./dijkstraStandMethods";

export function dijkstraStandard(
  grid,
  startCell,
  endCell,
  isDiagonalOn,
  speed
) {
  var id = 0;
  const unvisitedCells = [];
  const visitedCells = [];
  var direction = "START";
  var previousRow = startCell.row;
  startCell.distance = 0;

  for (const row of grid) {
    for (const cell of row) {
      unvisitedCells.push(cell);
    }
  }

  while (!!unvisitedCells.length) {
    unvisitedCells.sort((cell1, cell2) => cell1.id - cell2.id);
    unvisitedCells.sort((cell1, cell2) => cell1.distance - cell2.distance);

    const nextCell = unvisitedCells.shift();
    if (direction !== "START") {
      if (nextCell.row < previousRow) {
        direction = "UP";
      } else {
        direction = "DOWN";
      }
    }

    if (nextCell.isWall && !nextCell.start && !nextCell.end) continue;

    if (nextCell.distance === Infinity) {
      DoAnimation(visitedCells, endCell, speed);
      return;
    }
    nextCell.visited = true;
    visitedCells.push(nextCell);
    if (nextCell === endCell) {
      unvisitedCells.sort((cell1, cell2) => cell1.id - cell2.id);
      DoAnimation(visitedCells, endCell, speed);
      return;
    }

    id = getUnvisitedNeighbors(nextCell, grid, direction, isDiagonalOn, id);

    if (direction !== "START") {
      previousRow = nextCell.row;
    }
    direction = "CHANGED";
  }
}
