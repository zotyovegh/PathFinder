var id = 0;
export function dijkstra(grid, startCell, endCell, isDiagonalOn) {
  console.log(isDiagonalOn);
  const visitedCells = [];
  startCell.distance = 0;
  var direction = "START";
  var previousRow = startCell.row;
  const unvisitedCells = [];
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

    if (nextCell.distance === Infinity) return visitedCells;
    nextCell.visited = true;
    visitedCells.push(nextCell);
    if (nextCell === endCell) {
      unvisitedCells.sort((cell1, cell2) => cell1.id - cell2.id);
      return visitedCells;
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
    (function () {
      neighbor.id = id;
    })(id++);
  }
}

function Up(row, col, grid, neighbors) {
  if (row > 0) {
    if (!grid[row - 1][col].visited && grid[row - 1][col].previous === null) {
      neighbors.push(grid[row - 1][col]);
    }
  }
}
function UpRight(row, col, grid, neighbors) {
  if (row > 0 && col < grid[0].length - 1) {
    if (
      !grid[row - 1][col + 1].visited &&
      grid[row - 1][col + 1].previous === null
    ) {
      neighbors.push(grid[row - 1][col + 1]);
    }
  }
}
function Right(row, col, grid, neighbors) {
  if (col < grid[0].length - 1) {
    if (!grid[row][col + 1].visited && grid[row][col + 1].previous === null) {
      neighbors.push(grid[row][col + 1]);
    }
  }
}
function RightDown(row, col, grid, neighbors) {
  if (col < grid[0].length - 1 && row < grid.length - 1) {
    if (
      !grid[row + 1][col + 1].visited &&
      grid[row + 1][col + 1].previous === null
    ) {
      neighbors.push(grid[row + 1][col + 1]);
    }
  }
}
function Down(row, col, grid, neighbors) {
  if (row < grid.length - 1) {
    if (!grid[row + 1][col].visited && grid[row + 1][col].previous === null) {
      neighbors.push(grid[row + 1][col]);
    }
  }
}
function DownLeft(row, col, grid, neighbors) {
  if (row < grid.length - 1 && col > 0) {
    if (
      !grid[row + 1][col - 1].visited &&
      grid[row + 1][col - 1].previous === null
    ) {
      neighbors.push(grid[row + 1][col - 1]);
    }
  }
}
function Left(row, col, grid, neighbors) {
  if (col > 0) {
    if (!grid[row][col - 1].visited && grid[row][col - 1].previous === null) {
      neighbors.push(grid[row][col - 1]);
    }
  }
}
function LeftUp(row, col, grid, neighbors) {
  if (col > 0 && row > 0) {
    if (
      !grid[row - 1][col - 1].visited &&
      grid[row - 1][col - 1].previous === null
    ) {
      neighbors.push(grid[row - 1][col - 1]);
    }
  }
}

/*
 if (direction === "DOWN" || direction === "START") {
    Up(row, col, grid, neighbors);
    Right(row, col, grid, neighbors);
    Down(row, col, grid, neighbors);
    Left(row, col, grid, neighbors);
    UpRight(row, col, grid, neighbors);
    RightDown(row, col, grid, neighbors);
    DownLeft(row, col, grid, neighbors);
    LeftUp(row, col, grid, neighbors);
  } else if (direction === "UP") {
    Down(row, col, grid, neighbors);
    Left(row, col, grid, neighbors);
    Up(row, col, grid, neighbors);
    Right(row, col, grid, neighbors);
    DownLeft(row, col, grid, neighbors);
    LeftUp(row, col, grid, neighbors);
    UpRight(row, col, grid, neighbors);
    RightDown(row, col, grid, neighbors);
  }
*/
