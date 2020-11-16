import {
  clearWithStatus,
  clearInfinityVariables,
} from "../../Algorithms/cleaning";
import { visualizeOnWalledGrid } from "../mazes/animations";
export function wilsonMaze(originalGrid) {
  clearWithStatus("path");
  var path = [];
  var grid = JSON.parse(JSON.stringify(originalGrid));
  for (const row of grid) {
    for (const cell of row) {
      cell.isWall = true;
    }
  }




  

  clearInfinityVariables(grid);
  // visualizeOnWalledGrid(grid, path);
}
