import { animateFast, animateSlow } from "./animations";
import { getCellsInOrder } from "../../Algorithms/methods";
import { clearVisitedCells } from "../../Algorithms/cleaning";
var id = 0;
var idTemp = 0;
export function dijkstra(
  grid,
  startCell,
  endCell,
  isDiagonalOn,
  bidirectionalOn,
  speed
) {
  const unvisitedCellsStart = [];
  const visitedCells = [];
  const unvisitedCellsEnd = [];
  //const visitedCellsEnd = [];
  var directionStart = "START";
  var directionEnd = "START";
  var previousStartRow = startCell.row;
  var previousEndRow = endCell.row;
  startCell.distance = 0;
  endCell.distanceTemp = 0;

  for (const row of grid) {
    for (const cell of row) {
      unvisitedCellsStart.push(cell);
      if (bidirectionalOn) unvisitedCellsEnd.push(cell);
    }
  }

  while (!!unvisitedCellsStart.length) {
    unvisitedCellsStart.sort((cell1, cell2) => cell1.id - cell2.id);
    unvisitedCellsStart.sort((cell1, cell2) => cell1.distance - cell2.distance);
    if (bidirectionalOn) {
      unvisitedCellsEnd.sort((cell1, cell2) => cell1.idTemp - cell2.idTemp);
      unvisitedCellsEnd.sort(
        (cell1, cell2) => cell1.distanceTemp - cell2.distanceTemp
      );
    }

    const nextStartCell = unvisitedCellsStart.shift();
    const nextEndCell = unvisitedCellsEnd.shift();

    if (directionStart !== "START") {
      if (nextStartCell.row < previousStartRow) {
        directionStart = "UP";
      } else {
        directionStart = "DOWN";
      }
    }
    if (bidirectionalOn) {
      if (directionEnd !== "START") {
        if (nextEndCell.row < previousEndRow) {
          directionEnd = "UP";
        } else {
          directionEnd = "DOWN";
        }
      }
    }

    //Handle
    /*  if (nextStartCell.isWall && !nextStartCell.start && !nextStartCell.end)
      continue;*/

    if (nextStartCell.distance === Infinity) {
      DoAnimation(visitedCells, endCell, speed);
      return;
    }

    if (bidirectionalOn && nextEndCell.distanceTemp === Infinity) {
      DoAnimation(visitedCells, endCell, speed);

      return;
    }

    nextStartCell.visited = true;
    if (bidirectionalOn) nextEndCell.visited = true;
    visitedCells.push(nextStartCell);
    if (bidirectionalOn) visitedCells.push(nextEndCell);
    if (nextStartCell === endCell) {
      unvisitedCellsStart.sort((cell1, cell2) => cell1.id - cell2.id);
      DoAnimation(visitedCells, endCell, speed);

      return;
    }

    if (bidirectionalOn && nextEndCell === startCell) {
      unvisitedCellsEnd.sort((cell1, cell2) => cell1.idTemp - cell2.idTemp);
      DoAnimation(visitedCells, endCell, speed);
      return;
    }

    getUnvisitedNeighbors(
      nextStartCell,
      grid,
      directionStart,
      isDiagonalOn,
      "start"
    );
    if (bidirectionalOn)
      getUnvisitedNeighbors(
        nextEndCell,
        grid,
        directionEnd,
        isDiagonalOn,
        "end"
      );
    if (directionStart !== "START") {
      previousStartRow = nextStartCell.row;
    }
    if (bidirectionalOn && directionEnd !== "START") {
      previousEndRow = nextEndCell.row;
    }
    directionStart = "CHANGED";
    if (bidirectionalOn) directionEnd = "CHANGED";
  }
}

function getUnvisitedNeighbors(cell, grid, direction, isDiagonalOn, position) {
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
  if (position === "start") {
    for (const neighbor of neighbors) {
      neighbor.distance = cell.distance + 1;
      neighbor.previous = cell;
      neighbor.id = id;
      id++;
    }
  } else {
    for (const neighbor of neighbors) {
      neighbor.distanceTemp = cell.distanceTemp + 1;
      neighbor.previous = cell;
      neighbor.idTemp = idTemp;
      idTemp++;
    }
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
