import { clearWithStatus, clearInfinityVariables } from "../cleaning";
import { visualizeOnEmptyGrid } from "./animations";
export function basicVertical(originalGrid) {
  clearWithStatus("path");
  var path = [];
  var grid = JSON.parse(JSON.stringify(originalGrid));
  for (const row of grid) {
    for (const cell of row) {
      cell.isWall = false;
    }
  }


  clearInfinityVariables(grid);
  window.gridComponent.setState({ grid: grid });
  visualizeOnEmptyGrid(grid, path);
}