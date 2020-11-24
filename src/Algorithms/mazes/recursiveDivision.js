import { clearWithStatus, clearInfinityVariables } from "../cleaning";
import { visualizeOnWalledGrid } from "./animations";
export function recursiveDivision(originalGrid) {
  clearWithStatus("path");
  var path = [];
  var grid = JSON.parse(JSON.stringify(originalGrid));
  for (const row of grid) {
    for (const cell of row) {
      cell.isWall = true;
    }
  }
  /*var currentCell = grid[1][1];
  recursion(grid, currentCell);
  clearInfinityVariables(grid);
  window.gridComponent.setState({ grid: grid }); 
  visualizeOnWalledGrid(grid, path);*/
}

function recursion(grid, currentCell) {}
