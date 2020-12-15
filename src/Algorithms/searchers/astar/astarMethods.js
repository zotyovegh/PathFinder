import { animateAstarSlow, animateAstarFast } from "../animations/astarAnim";
import { getCellsInOrder } from "../../methods";
import { clearVisitedCells } from "../../cleaning";

export function dScore(cell1, cell2, optimized) {
  if (optimized) {
    return cell1.row - cell2.row === 0 || cell1.col - cell2.col === 0
      ? 1
      : Math.SQRT2;
  } else {
    return 1;
  }
}

export function heuristic(cell1, cell2, isDiagonalOn, optimized) {
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

export function findNeighbors(grid, isDiagonalOn) {
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

export function eliminateFromSet(set, cell) {
  for (let i = set.length - 1; i >= 0; i--) {
    if (set[i] === cell) {
      set.splice(i, 1);
    }
  }
}

export function DoAnimation(allSet, openSet, endCell, speed) {
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
