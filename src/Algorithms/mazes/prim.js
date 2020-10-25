export function primMaze(grid) {
  //var grid = JSON.parse(JSON.stringify(originalGrid));
  const validWalls = [];

  for (const row of grid) {
    for (const cell of row) {
      cell.isWall = true;
    }
  }
  const mazeCells = [];
  grid[0][0].isWall = false;
  mazeCells.push(grid[0][0]);
  getNeighboringWalls(grid[0][0], grid, validWalls);
  console.log(validWalls);
}

function getNeighboringWalls(cell, grid, validWalls) {
  var { col, row } = cell;
  if (row > 0) {
    //UP
    var cell = grid[row - 1][col];
    validWalls.push(cell);
  }
  if (col < grid[0].length - 1) {
    //Right
    let cell = grid[row][col + 1];
    validWalls.push(cell);
  }
  if (row < grid.length - 1) {
    //Down
    let cell = grid[row + 1][col];
    validWalls.push(cell);
  }
  if (col > 0) {
    //Left
    let cell = grid[row][col - 1];
    validWalls.push(cell);
  }
}
