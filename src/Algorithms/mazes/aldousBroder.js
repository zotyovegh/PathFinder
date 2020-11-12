import { visualize } from "../mazes/animations"; //Temporary, for testing

export function aldousBroderMaze(originalGrid) {
  var grid = JSON.parse(JSON.stringify(originalGrid));
  var unvisitedCells = [];
  for (const row of grid) {
    for (const cell of row) {
      cell.isWall = true;
      if (cell.row % 2 === 1 && cell.col % 2 === 1) {
        cell.id = unvisitedCells.length;
        unvisitedCells.push(cell);

        getNeighboringCells(cell, grid);
      }
    }
  }

  var current = takeRandomCell(unvisitedCells);
  current.visited = true;

   while (!!unvisitedCells.length) {
    var neighbor =
      current.neighbors[Math.floor(Math.random() * current.neighbors.length)];
    if (!neighbor[1].visited) {
      console.log(unvisitedCells.length);
      neighbor[0].isWall = false;
      neighbor[1].isWall = false;     
      unvisitedCells = unvisitedCells.filter(
        (item) => (item.id != neighbor[1].id)
      );
      neighbor[1].visited = true;
    }
    current = neighbor[1];
  }
  visualize(grid);
}

function takeRandomCell(unvisitedCells) {
  var position = Math.floor(Math.random() * unvisitedCells.length);
  var cell = unvisitedCells[position];
  unvisitedCells.splice(position, 1);
  return cell;
}

function getNeighboringCells(cell, grid) {
  //pair[neighboringWall, neighbor]
  var { col, row } = cell;
  if (row > 1) {
    //UP
    var neighbor = grid[row - 1][col];
    cell.neighbors.push([neighbor, grid[row - 2][col]]);
  }
  if (col < grid[0].length - 2) {
    //Right
    let neighbor = grid[row][col + 1];
    cell.neighbors.push([neighbor, grid[row][col + 2]]);
  }
  if (row < grid.length - 2) {
    //Down
    let neighbor = grid[row + 1][col];
    cell.neighbors.push([neighbor, grid[row + 2][col]]);
  }
  if (col > 1) {
    //Left
    let neighbor = grid[row][col - 1];
    cell.neighbors.push([neighbor, grid[row][col - 2]]);
  }
}
