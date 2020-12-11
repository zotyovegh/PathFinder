import { animateFast, animateSlow } from "./animations";
import { getCellsInOrder } from "../../Algorithms/methods";
import { clearVisitedCells } from "../../Algorithms/cleaning";
var id = 0;
export function dijkstra(
  grid,
  startCell,
  endCell,
  isDiagonalOn,
  bidirectionalOn,
  speed
) {
  const unvisitedCellsMain = [];
  const visitedCells = [];
  var directionMain = "START";
  var previousRowMain = startCell.row;
  startCell.distance = 0;

  for (const row of grid) {
    for (const cell of row) {
      unvisitedCellsMain.push(cell);
    }
  }

  while (!!unvisitedCellsMain.length) {
    unvisitedCellsMain.sort((cell1, cell2) => cell1.id - cell2.id);
    unvisitedCellsMain.sort((cell1, cell2) => cell1.distance - cell2.distance);

    const nextMainCell = unvisitedCellsMain.shift();
    if (directionMain !== "START") {
      if (nextMainCell.row < previousRowMain) {
        directionMain = "UP";
      } else {
        directionMain = "DOWN";
      }
    }

    if (nextMainCell.isWall && !nextMainCell.start && !nextMainCell.end) continue;

    if (nextMainCell.distance === Infinity) {
      DoAnimation(visitedCells, endCell, speed);
      return;
    }
    nextMainCell.visited = true;
    visitedCells.push(nextMainCell);
    if (nextMainCell === endCell) {
      unvisitedCellsMain.sort((cell1, cell2) => cell1.id - cell2.id);
      DoAnimation(visitedCells, endCell, speed);
      return;
    }

    getUnvisitedNeighbors(nextMainCell, grid, directionMain, isDiagonalOn);
    if (directionMain !== "START") {
      previousRowMain = nextMainCell.row;
    }
    directionMain = "CHANGED";

    //*****************
    //*****************
    //*****************
    //*****************
    //*****************
  }
}

function getUnvisitedNeighbors(cell, grid, direction, isDiagonalOn) {
  const neighbors = [];
  var { col, row } = cell;

  if (direction === "DOWN" || direction === "START") {
    Up(row, col, grid, neighbors);
    Right(row, col, grid, neighbors);
    Down(row, col, grid, neighbors);
    Left(row, col, grid, neighbors);
    if (isDiagonalOn) {
      UpRight(row, col, grid, neighbors);
      RightDown(row, col, grid, neighbors);
      DownLeft(row, col, grid, neighbors);
      LeftUp(row, col, grid, neighbors);
    }
  } else if (direction === "UP") {
    Down(row, col, grid, neighbors);
    Left(row, col, grid, neighbors);
    Up(row, col, grid, neighbors);
    Right(row, col, grid, neighbors);
    if (isDiagonalOn) {
      DownLeft(row, col, grid, neighbors);
      LeftUp(row, col, grid, neighbors);
      UpRight(row, col, grid, neighbors);
      RightDown(row, col, grid, neighbors);
    }
  }

  for (const neighbor of neighbors) {
    neighbor.distance = cell.distance + 1;
    neighbor.previous = cell;
    neighbor.id = id;
    id++;
  }
}

function Up(row, col, grid, neighbors) {
  if (row > 0) {
    var cell = grid[row - 1][col];
    if (!cell.visited && cell.previous === null) {
      neighbors.push(cell);
    }
  }
}

function Right(row, col, grid, neighbors) {
  if (col < grid[0].length - 1) {
    let cell = grid[row][col + 1];
    if (!cell.visited && cell.previous === null) {
      neighbors.push(cell);
    }
  }
}

function Down(row, col, grid, neighbors) {
  if (row < grid.length - 1) {
    let cell = grid[row + 1][col];
    if (!cell.visited && cell.previous === null) {
      neighbors.push(cell);
    }
  }
}

function Left(row, col, grid, neighbors) {
  if (col > 0) {
    let cell = grid[row][col - 1];
    if (!cell.visited && cell.previous === null) {
      neighbors.push(cell);
    }
  }
}

function UpRight(row, col, grid, neighbors) {
  if (row > 0 && col < grid[0].length - 1) {
    let cell = grid[row - 1][col + 1];
    if (grid[row - 1][col].isWall && grid[row][col + 1].isWall) {
      return;
    }
    if (!cell.visited && cell.previous === null) {
      neighbors.push(cell);
    }
  }
}

function RightDown(row, col, grid, neighbors) {
  if (col < grid[0].length - 1 && row < grid.length - 1) {
    let cell = grid[row + 1][col + 1];
    if (grid[row + 1][col].isWall && grid[row][col + 1].isWall) {
      return;
    }
    if (!cell.visited && cell.previous === null) {
      neighbors.push(cell);
    }
  }
}

function DownLeft(row, col, grid, neighbors) {
  if (row < grid.length - 1 && col > 0) {
    let cell = grid[row + 1][col - 1];
    if (grid[row + 1][col].isWall && grid[row][col - 1].isWall) {
      return;
    }
    if (!cell.visited && cell.previous === null) {
      neighbors.push(cell);
    }
  }
}

function LeftUp(row, col, grid, neighbors) {
  if (col > 0 && row > 0) {
    let cell = grid[row - 1][col - 1];
    if (grid[row][col - 1].isWall && grid[row - 1][col].isWall) {
      return;
    }
    if (!cell.visited && cell.previous === null) {
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
