import { clear } from "../../Algorithms/methods";
export function primMaze(originalGrid) {
  var grid = JSON.parse(JSON.stringify(originalGrid));
  const wallPairs = [];

  for (const row of grid) {
    for (const cell of row) {
      cell.isWall = true;
    }
  }
  const mazeCells = [];
  grid[1][1].isWall = false;
  mazeCells.push(grid[1][1]);
  getNeighboringWalls(grid[1][1], grid, wallPairs);
  while (!!wallPairs.length) {
    var currentPair = takeRandomPair(wallPairs);
    if (!currentPair[1].isWall) {
      continue;
    }
    currentPair[0].isWall = false;
    currentPair[1].isWall = false;
    getNeighboringWalls(currentPair[1], grid, wallPairs);
  }
  editGrid(grid);
}

function editGrid(grid) {
  for (const row of grid) {
    for (const cell of row) {
      cell.distance = Infinity;
      cell.f = Infinity;
      cell.g = Infinity;
      cell.h = Infinity;
    }
  }
  window.gridComponent.setState({ grid: grid });
}

function getNeighboringWalls(cell, grid, wallPairs) {
  var { col, row } = cell;
  if (row > 1) {
    //UP
    if (grid[row - 2][col].isWall) {
      var cell = grid[row - 1][col];
      wallPairs.push([cell, grid[row - 2][col]]);
    }
  }
  if (col < grid[0].length - 2) {
    //Right
    if (grid[row][col + 2].isWall) {
      let cell = grid[row][col + 1];
      wallPairs.push([cell, grid[row][col + 2]]);
    }
  }
  if (row < grid.length - 2) {
    //Down
    if (grid[row + 2][col]) {
      let cell = grid[row + 1][col];
      wallPairs.push([cell, grid[row + 2][col]]);
    }
  }
  if (col > 1) {
    //Left
    if (grid[row][col - 2]) {
      let cell = grid[row][col - 1];
      wallPairs.push([cell, grid[row][col - 2]]);
    }
  }
}

function takeRandomPair(wallPairs) {
  var position = Math.floor(Math.random() * wallPairs.length);
  var pair = wallPairs[position];
  wallPairs.splice(position, 1);
  return pair;
}
