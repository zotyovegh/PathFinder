import { animateFast, animateSlow } from "../animations/standardAnimations";
import {
  bidirectionalSlow,
  bidirectionalFast,
} from "../animations/bidirectionalAnim";
import { getCellsInOrder } from "../../methods";

var idMain;
var idSec;
var isFinished;
var meetingCell = null;
export function dijkstraBidirectional(
  grid,
  startCell,
  endCell,
  isDiagonalOn,
  speed
) {
  idMain = 0;
  idSec = 0;
  isFinished = false;
  const unvisitedCellsMain = [];
  const unvisitedCellsSec = [];
  const visitedCellsMain = [];
  const visitedCellsSec = [];
  var directionMain = "START";
  var directionSec = "START";
  var previousRowMain = startCell.row;
  var previousRowSec = endCell.row;
  startCell.distance = 0;
  endCell.distanceSec = 0;

  for (const row of grid) {
    for (const cell of row) {
      unvisitedCellsMain.push(cell);
      unvisitedCellsSec.push(cell);
    }
  }

  while (!!unvisitedCellsMain.length || !!unvisitedCellsSec.length) {
    if (isFinished) {
      DoBidirectionalAnimation(visitedCellsMain, visitedCellsSec, speed);
      return;
    }
    if (!!unvisitedCellsMain.length) {
      unvisitedCellsMain.sort((cell1, cell2) => cell1.id - cell2.id);
      unvisitedCellsMain.sort(
        (cell1, cell2) => cell1.distance - cell2.distance
      );

      const nextMainCell = unvisitedCellsMain.shift();
      if (nextMainCell.visitedSec) {
        isFinished = true;
        meetingCell = nextMainCell;
      }
      if (directionMain !== "START") {
        if (nextMainCell.row < previousRowMain) {
          directionMain = "UP";
        } else {
          directionMain = "DOWN";
        }
      }

      if (!(nextMainCell.isWall && !nextMainCell.start && !nextMainCell.end)) {
        if (nextMainCell.distance === Infinity) {
          DoBidirectionalAnimation(visitedCellsMain, visitedCellsSec, speed);

          return;
        }
        nextMainCell.visited = true;
        visitedCellsMain.push(nextMainCell);
        if (nextMainCell === endCell) {
          unvisitedCellsMain.sort((cell1, cell2) => cell1.id - cell2.id);

          DoBidirectionalAnimation(visitedCellsMain, visitedCellsSec, speed);

          return;
        }

        getUnvisitedNeighbors(
          nextMainCell,
          grid,
          directionMain,
          isDiagonalOn,
          "MAIN"
        );
        if (directionMain !== "START") {
          previousRowMain = nextMainCell.row;
        }
        directionMain = "CHANGED";
      }
    }

    //*****************
    if (!!unvisitedCellsSec.length) {
      unvisitedCellsSec.sort((cell1, cell2) => cell1.idSec - cell2.idSec);
      unvisitedCellsSec.sort(
        (cell1, cell2) => cell1.distanceSec - cell2.distanceSec
      );

      const nextSecCell = unvisitedCellsSec.shift();
      if (nextSecCell.visited) {
        isFinished = true;
        meetingCell = nextSecCell;
      }
      if (directionSec !== "START") {
        if (nextSecCell.row < previousRowSec) {
          directionSec = "UP";
        } else {
          directionSec = "DOWN";
        }
      }

      if (!(nextSecCell.isWall && !nextSecCell.start && !nextSecCell.end)) {
        if (nextSecCell.distanceSec === Infinity) {
          DoBidirectionalAnimation(visitedCellsMain, visitedCellsSec, speed);
          return;
        }
        nextSecCell.visitedSec = true;
        visitedCellsSec.push(nextSecCell);
        if (nextSecCell === startCell) {
          unvisitedCellsSec.sort((cell1, cell2) => cell1.idSec - cell2.idSec);
          DoBidirectionalAnimation(visitedCellsMain, visitedCellsSec, speed);
          return;
        }

        getUnvisitedNeighbors(
          nextSecCell,
          grid,
          directionSec,
          isDiagonalOn,
          "SEC"
        );
        if (directionSec !== "START") {
          previousRowSec = nextSecCell.row;
        }
        directionSec = "CHANGED";
      }
    }
  }
}

function getUnvisitedNeighbors(cell, grid, direction, isDiagonalOn, category) {
  const neighbors = [];
  var { col, row } = cell;
  if (category === "MAIN") {
    if (direction === "DOWN" || direction === "START") {
      Up(row, col, grid, neighbors, category);
      Right(row, col, grid, neighbors, category);
      Down(row, col, grid, neighbors, category);
      Left(row, col, grid, neighbors, category);
      if (isDiagonalOn) {
        UpRight(row, col, grid, neighbors, category);
        RightDown(row, col, grid, neighbors, category);
        DownLeft(row, col, grid, neighbors, category);
        LeftUp(row, col, grid, neighbors, category);
      }
    } else if (direction === "UP") {
      Down(row, col, grid, neighbors, category);
      Left(row, col, grid, neighbors, category);
      Up(row, col, grid, neighbors, category);
      Right(row, col, grid, neighbors, category);
      if (isDiagonalOn) {
        DownLeft(row, col, grid, neighbors, category);
        LeftUp(row, col, grid, neighbors, category);
        UpRight(row, col, grid, neighbors, category);
        RightDown(row, col, grid, neighbors, category);
      }
    }
  } else if ("SEC") {
    if (direction === "DOWN" || direction === "START") {
      Up(row, col, grid, neighbors, category);
      Left(row, col, grid, neighbors, category);
      Down(row, col, grid, neighbors, category);
      Right(row, col, grid, neighbors, category);
      if (isDiagonalOn) {
        UpRight(row, col, grid, neighbors, category);
        LeftUp(row, col, grid, neighbors, category);
        DownLeft(row, col, grid, neighbors, category);
        RightDown(row, col, grid, neighbors, category);
      }
    } else if (direction === "UP") {
      Down(row, col, grid, neighbors, category);
      Right(row, col, grid, neighbors, category);
      Up(row, col, grid, neighbors, category);
      Left(row, col, grid, neighbors, category);
      if (isDiagonalOn) {
        DownLeft(row, col, grid, neighbors, category);
        RightDown(row, col, grid, neighbors, category);
        UpRight(row, col, grid, neighbors, category);
        LeftUp(row, col, grid, neighbors, category);
      }
    }
  }
  if (category === "MAIN") {
    for (const neighbor of neighbors) {
      neighbor.distance = cell.distance + 1;
      neighbor.previous = cell;
      neighbor.id = idMain;
      idMain++;
    }
  } else if ("SEC") {
    for (const neighbor of neighbors) {
      neighbor.distanceSec = cell.distanceSec + 1;
      neighbor.previousSec = cell;
      neighbor.idSec = idSec;
      idSec++;
    }
  }
}

function addNeighbor(cell, neighbors, category) {
  if (category === "MAIN" && !cell.visited && cell.previous === null) {
    neighbors.push(cell);
  } else if (
    category === "SEC" &&
    !cell.visitedSec &&
    cell.previousSec === null
  ) {
    neighbors.push(cell);
  }
}

function Up(row, col, grid, neighbors, category) {
  if (row > 0) addNeighbor(grid[row - 1][col], neighbors, category);
}

function Right(row, col, grid, neighbors, category) {
  if (col < grid[0].length - 1)
    addNeighbor(grid[row][col + 1], neighbors, category);
}

function Down(row, col, grid, neighbors, category) {
  if (row < grid.length - 1)
    addNeighbor(grid[row + 1][col], neighbors, category);
}

function Left(row, col, grid, neighbors, category) {
  if (col > 0) addNeighbor(grid[row][col - 1], neighbors, category);
}

function UpRight(row, col, grid, neighbors, category) {
  if (row > 0 && col < grid[0].length - 1) {
    let cell = grid[row - 1][col + 1];
    if (grid[row - 1][col].isWall && grid[row][col + 1].isWall) {
      return;
    }
    addNeighbor(cell, neighbors, category);
  }
}

function RightDown(row, col, grid, neighbors, category) {
  if (col < grid[0].length - 1 && row < grid.length - 1) {
    let cell = grid[row + 1][col + 1];
    if (grid[row + 1][col].isWall && grid[row][col + 1].isWall) {
      return;
    }
    addNeighbor(cell, neighbors, category);
  }
}

function DownLeft(row, col, grid, neighbors, category) {
  if (row < grid.length - 1 && col > 0) {
    let cell = grid[row + 1][col - 1];
    if (grid[row + 1][col].isWall && grid[row][col - 1].isWall) {
      return;
    }
    addNeighbor(cell, neighbors, category);
  }
}

function LeftUp(row, col, grid, neighbors, category) {
  if (col > 0 && row > 0) {
    let cell = grid[row - 1][col - 1];
    if (grid[row][col - 1].isWall && grid[row - 1][col].isWall) {
      return;
    }
    addNeighbor(cell, neighbors, category);
  }
}

function DoSingleAnimation(visitedCells, endCell, speed) {
  const cellsInOrder = getCellsInOrder(endCell);
  if (speed === "slow") {
    window.gridComponent.setState({ status: "running" });
    animateSlow(visitedCells, cellsInOrder);
  } else if (speed === "fast") {
    animateFast(visitedCells, cellsInOrder);
  }
}
function DoBidirectionalAnimation(mainCells, secondaryCells, speed) {
  reformatId(secondaryCells);
  var cellsInOrder = getCellsInOrderBidirectional(mainCells, secondaryCells);
  if (speed === "slow") {
    window.gridComponent.setState({ status: "running" });
    bidirectionalSlow(mainCells, secondaryCells, cellsInOrder);
  } else if (speed === "fast") {
    bidirectionalFast(mainCells, secondaryCells, cellsInOrder);
  }
}

function reformatId(secondaryCells) {
  for (let i = 0; i < secondaryCells.length; i++) {
    if (
      !secondaryCells[i].start &&
      !secondaryCells[i].end &&
      secondaryCells[i] !== meetingCell
    ) {
      secondaryCells[i].distance = secondaryCells[i].distanceSec;
    }
  }
}

function getCellsInOrderBidirectional() {
  if (meetingCell !== null) {
    const cells = [];
    cells.push(meetingCell);
    let cellMain = meetingCell;
    let cellSec = meetingCell;
    while (cellMain !== null || cellSec !== null) {
      if (cellMain !== null) {
        if (cellMain !== meetingCell && !cellMain.start && !cellMain.end) {
          cells.push(cellMain);
        }
        cellMain = cellMain.previous;
      }
      if (cellSec !== null) {
        if (cellSec !== meetingCell && !cellSec.start && !cellSec.end) {
          cells.push(cellSec);
        }
        cellSec = cellSec.previousSec;
      }
    }
    return cells;
  }
}
