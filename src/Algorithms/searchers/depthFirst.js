import { animateFast, animateSlow } from "./animations";
import { getCellsInOrder } from "../../Algorithms/methods";
import { clearVisitedCells } from "../../Algorithms/cleaning";
var id = 0;
export function depthFirst(grid, startCell, endCell, isDiagonalOn, speed) {
  console.log("heyy");
  var mainList = [];
  var visitedCells = [];
  startCell.visited = true;
  mainList.push(startCell);
  visitedCells.push(startCell);
  while (!!mainList.length) {
    const currentCell = mainList.pop();
    currentCell.visited = true;

    if (currentCell.end === true) {
      DoAnimation(visitedCells, endCell, speed);
      return;
    }
    visitedCells.push(currentCell);
    var neighbors = getUnvisitedNeighbors(currentCell, grid);
    for (let i = 0; i < neighbors.length; i++) {
      if (neighbors[i].isWall === false) {
        neighbors[i].previous = currentCell;
        mainList.push(neighbors[i]);
      }
    }
  }
}

function getUnvisitedNeighbors(cell, grid) {
  const neighbors = [];
  var { col, row } = cell;
  Left(row, col, grid, neighbors);

  Down(row, col, grid, neighbors);
  Right(row, col, grid, neighbors);
  Up(row, col, grid, neighbors);

  return neighbors;
}

function Up(row, col, grid, neighbors) {
  if (row > 0) {
    var cell = grid[row - 1][col];
    if (!cell.visited) {
      neighbors.push(cell);
    }
  }
}

function Right(row, col, grid, neighbors) {
  if (col < grid[0].length - 1) {
    let cell = grid[row][col + 1];
    if (!cell.visited) {
      neighbors.push(cell);
    }
  }
}

function Down(row, col, grid, neighbors) {
  if (row < grid.length - 1) {
    let cell = grid[row + 1][col];
    if (!cell.visited) {
      neighbors.push(cell);
    }
  }
}

function Left(row, col, grid, neighbors) {
  if (col > 0) {
    let cell = grid[row][col - 1];
    if (!cell.visited) {
      neighbors.push(cell);
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
