import {
  animateAstarSlow,
  animateAstarFast,
} from "../../Algorithms/animations";
import { getCellsInOrder, clearVisitedCells } from "../../Algorithms/methods";

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
      console.log(endCell.end);
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
function dScore(cell1, cell2, optimized) {
  if (optimized) {
    return cell1.row - cell2.row === 0 || cell1.col - cell2.col === 0
      ? 1
      : Math.SQRT2;
  } else {
    return 1;
  }
}

function heuristic(cell1, cell2, isDiagonalOn, optimized) {
  if (isDiagonalOn || !optimized) {
    return Math.abs(cell1.row - cell2.row) + Math.abs(cell1.col - cell2.col);
  } else {
    if (optimized) {
      return Math.sqrt(
        (cell1.row - cell2.row) * (cell1.row - cell2.row) +
          (cell1.col - cell2.col) * (cell1.col - cell2.col)
      );
    }
  }
}

function findNeighbors(grid, isDiagonalOn) {
  for (const row of grid) {
    for (const cell of row) {
      cell.neighbors = [];
      if (cell.row > 0) {
        //UP
        cell.neighbors.push(grid[cell.row - 1][cell.col]);
      }
      if (cell.col < grid[0].length - 1) {
        //RIGHT
        cell.neighbors.push(grid[cell.row][cell.col + 1]);
      }

      if (cell.row < grid.length - 1) {
        //DOWN
        cell.neighbors.push(grid[cell.row + 1][cell.col]);
      }

      if (cell.col > 0) {
        //LEFT
        cell.neighbors.push(grid[cell.row][cell.col - 1]);
      }
      if (isDiagonalOn) {
        if (cell.row > 0 && cell.col < grid[0].length - 1) {
          //UPRIGHT
          if (
            !grid[cell.row - 1][cell.col].isWall ||
            !grid[cell.row][cell.col + 1].isWall
          ) {
            cell.neighbors.push(grid[cell.row - 1][cell.col + 1]);
          }
        }
        if (cell.col < grid[0].length - 1 && cell.row < grid.length - 1) {
          //RIGHTDOWN
          if (
            !grid[cell.row + 1][cell.col].isWall ||
            !grid[cell.row][cell.col + 1].isWall
          ) {
            cell.neighbors.push(grid[cell.row + 1][cell.col + 1]);
          }
        }
        if (cell.row < grid.length - 1 && cell.col > 0) {
          //DOWNLEFT
          if (
            !grid[cell.row + 1][cell.col].isWall ||
            !grid[cell.row][cell.col - 1].isWall
          ) {
            cell.neighbors.push(grid[cell.row + 1][cell.col - 1]);
          }
        }
        if (cell.col > 0 && cell.row > 0) {
          //LEFTUP
          if (
            !grid[cell.row][cell.col - 1].isWall ||
            !grid[cell.row - 1][cell.col].isWall
          ) {
            cell.neighbors.push(grid[cell.row - 1][cell.col - 1]);
          }
        }
      }
    }
  }
}

function eliminateFromSet(set, cell) {
  for (let i = set.length - 1; i >= 0; i--) {
    if (set[i] === cell) {
      set.splice(i, 1);
    }
  }
}

function DoAnimation(allSet, openSet, endCell, speed) {
  const cellsInOrder = getCellsInOrder(endCell);
  if (speed === "slow") {
    if (window.gridComponent.state.status === "finished") {
      clearVisitedCells();
    }
    window.gridComponent.setState({ status: "running" });

    animateAstarSlow(allSet, cellsInOrder);
  } else if (speed === "fast") {
    animateAstarFast(allSet, openSet, cellsInOrder);
  }
}
