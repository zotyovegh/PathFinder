import {
  bidirectionalSlow,
  bidirectionalFast,
} from "../animations/bidirectionalAnim";
export function getMainUnvisitedNeighbors(
  cell,
  grid,
  direction,
  isDiagonalOn,
  category,
  id
) {
  const neighbors = [];
  var { col, row } = cell;
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

  for (const neighbor of neighbors) {
    neighbor.distance = cell.distance + 1;
    neighbor.previous = cell;
    neighbor.id = id;
    id++;
  }
  return id;
}

export function getSecUnvisitedNeighbors(
  cell,
  grid,
  direction,
  isDiagonalOn,
  category,
  id
) {
  const neighbors = [];
  var { col, row } = cell;

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

  for (const neighbor of neighbors) {
    neighbor.distanceSec = cell.distanceSec + 1;
    neighbor.previousSec = cell;
    neighbor.idSec = id;
    id++;
  }
  return id;
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

export function DoBidirectionalAnimation(
  mainCells,
  secondaryCells,
  speed,
  meetingCell
) {
  reformatId(secondaryCells, meetingCell);
  var cellsInOrder = getCellsInOrderBidirectional(meetingCell);
  if (speed === "slow") {
    window.gridComponent.setState({ status: "running" });
    bidirectionalSlow(mainCells, secondaryCells, cellsInOrder);
  } else if (speed === "fast") {
    bidirectionalFast(mainCells, secondaryCells, cellsInOrder);
  }
}

function reformatId(secondaryCells, meetingCell) {
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

function getCellsInOrderBidirectional(meetingCell) {
  var cells = [];
  if (meetingCell !== null) {
    if (
      meetingCell.distance !== Infinity &&
      meetingCell.distanceSec !== Infinity
    ) {
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
    }
  }
  return cells;
}
