import { animateSlow, animateFast } from "./animations";
import { getCellsInOrder } from "../../Algorithms/methods";
import { clearVisitedCells } from "../../Algorithms/cleaning";

export function idastar(grid, startCell, endCell, isDiagonalOn, speed) {
  findNeighbors(grid, isDiagonalOn);
  var threshold = heuristic(startCell);
  var test = 0;
  var visitedCells = [];

  while (test < 10) {
    console.log("while");
    var temp = Search(startCell, 0, threshold, endCell, visitedCells);
    if (temp === "FOUND") {
      //Solution found
      return;
    }
    if (temp === Infinity) {
      return;
    }
    threshold = temp;
    test++;
  }
  console.log("DONE");

  DoAnimation(visitedCells, endCell, speed);
}

function Search(cell, g, threshold, endCell, visitedCells) {
  console.log("search");
  console.log(cell);
  var f = g + heuristic(cell);
  if (f > threshold) return f;
  if (cell === endCell) return "FOUND";
  var min = Number.MAX_SAFE_INTEGER;
  for (const neighbor of cell.neighbors) {
    var temp = Search(neighbor, g + cost(cell, neighbor), threshold, endCell);
    if (temp === "FOUND") return "FOUND";
    if (temp !== "FOUND") {
      if (temp < min) min = temp;
    }
  }
  return min;
}

function heuristic(cell) {
  return Math.sqrt(cell.row * cell.row + cell.col * cell.col);
  // return cell.row + cell.col;
}

function cost(cell1, cell2) {
  return Math.sqrt(
    (cell1.row - cell2.row) * (cell1.row - cell2.row) +
      (cell1.col - cell2.col) * (cell1.col - cell2.col)
  );
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

function DoAnimation(visitedCells, endCell, speed) {
  const cellsInOrder = getCellsInOrder(endCell);
  if (speed === "slow") {
    if (window.gridComponent.state.status === "finished") {
      clearVisitedCells();
    }
    window.gridComponent.setState({ status: "running" });

    animateSlow(visitedCells, cellsInOrder);
  } else if (speed === "fast") {
    animateFast(visitedCells, cellsInOrder);
  }
}
