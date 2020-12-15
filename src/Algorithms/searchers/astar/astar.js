import {
  DoAnimation,
  findNeighbors,
  heuristic,
  eliminateFromSet,
  dScore,
} from "./astarMethods";
export function astar(
  grid,
  startCell,
  endCell,
  isDiagonalOn,
  optimized,
  speed
) {
  findNeighbors(grid, isDiagonalOn);
  const openSet = [];
  const cameFrom = [];
  var allSet = [];
  openSet.push(startCell);
  startCell.g = 0;
  startCell.f = heuristic(startCell, endCell, isDiagonalOn, optimized);

  while (!!openSet.length) {
    var current = 0;
    for (let j = 0; j < openSet.length; j++) {
      if (openSet[j].f < openSet[current].f) {
        current = j;
      }
    }
    var currentCell = openSet[current];
    if (currentCell === endCell) {
      DoAnimation(allSet, openSet, endCell, speed);
      return;
    }
    eliminateFromSet(openSet, currentCell);
    var neighbors = currentCell.neighbors;
    for (let k = 0; k < neighbors.length; k++) {
      var neighbor = neighbors[k];
      if (neighbor.isWall && !neighbor.start && !neighbor.end) {
        continue;
      }
      var tentative_gScore =
        currentCell.g + dScore(neighbor, currentCell, optimized);
      if (tentative_gScore < neighbor.g) {
        cameFrom.push(neighbor);
        neighbor.g = tentative_gScore;
        neighbor.h = heuristic(neighbor, endCell, isDiagonalOn, optimized);
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.previous = currentCell;
        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
          if (speed === "slow") {
            allSet.push([openSet.slice(0), cameFrom.slice(0)]);
          } else if (speed === "fast") {
            allSet.push(neighbor);
          }
        }
      }
    }
  }
  DoAnimation(allSet, openSet, endCell, speed);
}
