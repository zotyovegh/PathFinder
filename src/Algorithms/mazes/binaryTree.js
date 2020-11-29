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
  console.log("binaryTree");

  clearInfinityVariables(grid);
  window.gridComponent.setState({ grid: grid });
  visualizeOnWalledGrid(grid, path);
}
