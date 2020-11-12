export function aldousBroderMaze(originalGrid) {
  var grid = JSON.parse(JSON.stringify(originalGrid));

  for (const row of grid) {
    for (const cell of row) {
      cell.isWall = true;
      getNeighboringCells(cell, grid);
    }
  }
  console.log(grid);
}

