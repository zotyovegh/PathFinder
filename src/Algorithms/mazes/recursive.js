import {
  clearWithStatus,
  clearInfinityVariables,
} from "../../Algorithms/cleaning";
import { visualizeOnWalledGrid } from "../mazes/animations";
export function recursiveMaze(originalGrid) {
  clearWithStatus("path");
  var grid = JSON.parse(JSON.stringify(originalGrid));
  for (const row of grid) {
    for (const cell of row) {
      cell.isWall = true;
    }
  }



 

  clearInfinityVariables(grid);
  window.gridComponent.setState({ grid: grid });
 //visualization
}