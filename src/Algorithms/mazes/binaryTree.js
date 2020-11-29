import { clearWithStatus, clearInfinityVariables } from "../cleaning";
import { visualizeOnWalledGrid } from "./animations";
export function binaryTreeAlg(originalGrid) {
  clearWithStatus("path");
  var path = [];
  var grid = JSON.parse(JSON.stringify(originalGrid));
  for (const row of grid) {
    for (const cell of row) {
      cell.isWall = true;
    }
  }

  //all the cells to check
  for (let i = 1; i < grid.length; i += 2) {
    for (let j = 1; j < grid[0].length; j += 2) {
      path.push(grid[i][j]);
    }
  }
  /* path.push(grid[3][3]);
  getNeighboringCells(grid[3][3], grid, path, "South", "East");*/

  clearInfinityVariables(grid);
  window.gridComponent.setState({ grid: grid });
  visualizeOnWalledGrid(grid, path);
}

function getNeighboringCells(cell, grid, path, param1, param2) {
  //pair[neighboringWall, neighbor]
  var { col, row } = cell;
  if (row > 1 && (param1 === "North" || param2 === "North")) {
    //UP
    var neighbor = grid[row - 1][col];
    cell.neighbors.push([neighbor, grid[row - 2][col]]);
    path.push(neighbor);
    path.push(grid[row - 2][col]);
  }
  if (col < grid[0].length - 2 && (param1 === "East" || param2 === "East")) {
    //Right
    let neighbor = grid[row][col + 1];
    cell.neighbors.push([neighbor, grid[row][col + 2]]);
    path.push(neighbor);
    path.push(grid[row][col + 2]);
  }
  if (row < grid.length - 2 && (param1 === "South" || param2 === "South")) {
    //Down
    let neighbor = grid[row + 1][col];
    cell.neighbors.push([neighbor, grid[row + 2][col]]);
    path.push(neighbor);
    path.push(grid[row + 2][col]);
  }
  if (col > 1 && (param1 === "West" || param2 === "West")) {
    //Left
    let neighbor = grid[row][col - 1];
    cell.neighbors.push([neighbor, grid[row][col - 2]]);
    path.push(neighbor);
    path.push(grid[row][col - 2]);
  }
}
