import {
  clearWithStatus,
  clearInfinityVariables,
} from "../../Algorithms/cleaning";
import { visualizeIterative } from "../mazes/animations";
export function iterativeMaze(originalGrid) {
  clearWithStatus("path");
  var grid = JSON.parse(JSON.stringify(originalGrid));
  for (const row of grid) {
    for (const cell of row) {
      cell.isWall = true;
    }
  }






  
  // clearInfinityVariables(grid);
  window.gridComponent.setState({ grid: grid });
  visualizeIterative(grid);
}
