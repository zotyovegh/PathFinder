import {
  animateFast,
  animateSlow,
  animateAstarSlow,
  animateAstarFast,
} from "../../Algorithms/animations";
import { getCellsInOrder, clearVisitedCells } from "../../Algorithms/methods";

//https://en.wikipedia.org/wiki/A*_search_algorithm
export function astar(grid, startCell, endCell, isDiagonalOn, speed) {
  findNeighbors(grid, isDiagonalOn);
  const openSet = [];
  const closedSet = [];
  var allSet = [];
  openSet.push(startCell);
  while (!!openSet.length) {
    var lastCell = 0;
    for (let j = 0; j < openSet.length; j++) {
      if (openSet[j].f < openSet[lastCell].f) {
        lastCell = j;
      }
    }

    var nextCell = openSet[lastCell];
    if (nextCell === endCell) {
      DoAnimation(allSet, endCell, speed);

      return;
    }

    eliminateFromSet(openSet, nextCell);
    closedSet.push(nextCell);
    var neighbors = nextCell.neighbors;

    for (let k = 0; k < neighbors.length; k++) {
      var neighbor = neighbors[k];
      if (!closedSet.includes(neighbor) && !neighbor.isWall) {
        var betterPath = false;
        var g = nextCell.g + 1;

        if (openSet.includes(neighbor)) {
          if (g < neighbor.g) {
            neighbor.g = g;
            
            betterPath = true;
          }
        } else {
          neighbor.g = g;
          neighbor.previous = nextCell;
          openSet.push(neighbor);

          allSet.push([openSet.slice(0), closedSet.slice(0)]);

          betterPath = true;
        }
        if (betterPath) {
          neighbor.h =
            Math.abs(neighbor.row - endCell.row) +
            Math.abs(neighbor.col - endCell.col);
          neighbor.f = neighbor.g + neighbor.h; //score
          neighbor.previous = nextCell;
        }
      }
    }
  }

  // DoAnimation(allSet, endCell, speed);
  return;
}

function findNeighbors(grid, isDiagonalOn) {
  //DIAGONALS NOT COUNTED
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
      set.splice(i, 1); //Removes cell by index from the array
    }
  }
}

function DoAnimation(allSet, finishCell, speed) {
  const cellsInOrder = getCellsInOrder(finishCell);
  if (speed === "slow") {
    if (window.gridComponent.state.status === "finished") {
      clearVisitedCells();
    }
    window.gridComponent.setState({ status: "running" });

    animateAstarSlow(allSet);
  } else if (speed === "fast") {
    // animateAstarFast(triedPaths, cellsInOrder);
  }
}
