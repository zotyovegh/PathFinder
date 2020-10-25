export function primMaze(grid) {
  //var grid = JSON.parse(JSON.stringify(originalGrid));
  const wallPairs = [];

  for (const row of grid) {
    for (const cell of row) {
      cell.isWall = true;
    }
  }
  const mazeCells = [];
  grid[0][0].isWall = false;
  mazeCells.push(grid[0][0]);
  getNeighboringWalls(grid[0][0], grid, wallPairs);
 
}

function getNeighboringWalls(cell, grid, wallPairs) {
  var { col, row } = cell;
  if (row > 0) {
    //UP
    if (grid[row - 2][col].isWall) {
      var cell = grid[row - 1][col];
      wallPairs.push([
        Object.assign({}, cell),
        Object.assign({}, grid[row - 2][col]),
      ]);
    }
  }
  if (col < grid[0].length - 1) {
    //Right
    if (grid[row][col + 2].isWall) {
      let cell = grid[row][col + 1];
      wallPairs.push([
        Object.assign({}, cell),
        Object.assign({}, grid[row][col + 2]),
      ]);
    }
  }
  if (row < grid.length - 1) {
    //Down
    if (grid[row + 2][col]) {
      let cell = grid[row + 1][col];
      wallPairs.push([
        Object.assign({}, cell),
        Object.assign({}, grid[row + 2][col]),
      ]);
    }
  }
  if (col > 0) {
    //Left
    if (grid[row][col - 2]) {
      let cell = grid[row][col - 1];
      wallPairs.push([
        Object.assign({}, cell),
        Object.assign({}, grid[row][col - 2]),
      ]);
    }
  }
}

function takeRandomPair(wallPairs) {
  var position = Math.floor(Math.random() * wallPairs.length);
  var pair = wallPairs[position];
  wallPairs.splice(position, 1);
  return pair;
}
