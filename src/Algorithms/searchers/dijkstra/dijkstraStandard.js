import { animateFast, animateSlow } from "../animations/standardAnimations";
import { getCellsInOrder } from "../../methods";
var id = 0;
export function dijkstraStandard(grid, startCell, endCell, isDiagonalOn, speed) {
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

    getUnvisitedNeighbors(nextCell, grid, direction, isDiagonalOn);
    if (direction !== "START") {
      previousRow = nextCell.row;
    }
    direction = "CHANGED";
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
    window.gridComponent.setState({ status: "running" });

    animateSlow(visitedCells, cellsInOrder);
  } else if (speed === "fast") {
    animateFast(visitedCells, cellsInOrder);
  }
}