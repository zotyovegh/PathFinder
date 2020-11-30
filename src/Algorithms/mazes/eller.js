import { clearWithStatus, clearInfinityVariables } from "../cleaning";
import { visualizeOnWalledGrid } from "./animations";
export function ellerMaze(originalGrid) {
  clearWithStatus("path"); 
  var path = [];
  var grid = JSON.parse(JSON.stringify(originalGrid));
  for (const row of grid) {
    for (const cell of row) {
      cell.isWall = true;
    }
  }
  for (let i = 1; i < grid.length; i += 2) {
    for (let j = 1; j < grid[0].length; j += 2) {
      path.push(grid[i][j])
    }
  }


  clearInfinityVariables(grid);
  window.gridComponent.setState({ grid: grid });
  visualizeOnWalledGrid(grid, path);
}

function getNeighboringCells(cell, grid) {
  //pair[neighboringWall, neighbor]
  var { col, row } = cell;
  /*if (row > 1) {
    //UP
    var neighbor = grid[row - 1][col];
    cell.neighbors.push([neighbor, grid[row - 2][col]]);
  }*/
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
 /* if (col > 1) {
    //Left
    let neighbor = grid[row][col - 1];
    cell.neighbors.push([neighbor, grid[row][col - 2]]);
  }*/
}
