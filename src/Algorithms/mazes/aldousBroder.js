export function aldousBroderMaze(originalGrid) {
  var grid = JSON.parse(JSON.stringify(originalGrid));

  for (const row of grid) {
    for (const cell of row) {
      cell.isWall = true;
    }
  }
  console.log(grid);
}

function getNeighboringCells(cell, grid) {
  var neighboringUnvisitedPairs = []; //pair[neighboringWall, neighbor]
  var { col, row } = cell;
  if (row > 1) {
    //UP

    if (grid[row - 2][col].isWall) {
      var neighbor = grid[row - 1][col];
      if (grid[row - 2][col].visited === false) {
        neighboringUnvisitedPairs.push([neighbor, grid[row - 2][col]]);
      }
    }
  }
  if (col < grid[0].length - 2) {
    //Right
    if (grid[row][col + 2].isWall) {
      let neighbor = grid[row][col + 1];
      if (grid[row][col + 2].visited === false) {
        neighboringUnvisitedPairs.push([neighbor, grid[row][col + 2]]);
      }
    }
  }
  if (row < grid.length - 2) {
    //Down
    if (grid[row + 2][col]) {
      let neighbor = grid[row + 1][col];
      if (grid[row + 2][col].visited === false) {
        neighboringUnvisitedPairs.push([neighbor, grid[row + 2][col]]);
      }
    }
  }
  if (col > 1) {
    //Left
    if (grid[row][col - 2]) {
      let neighbor = grid[row][col - 1];
      if (grid[row][col - 2].visited === false) {
        neighboringUnvisitedPairs.push([neighbor, grid[row][col - 2]]);
      }
    }
  }
  return neighboringUnvisitedPairs;
}
