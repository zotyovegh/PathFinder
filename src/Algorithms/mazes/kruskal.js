import {
  clearWithStatus,
  clearInfinityVariables,
} from "../../Algorithms/cleaning";
import { visualizeOnWalledGrid, visualize } from "../mazes/animations";
export function kruskalMaze(originalGrid) {
  clearWithStatus("path");
  var path = [];
  var grid = JSON.parse(JSON.stringify(originalGrid));
  var idCounter = 0;
  var potentialCells = [];
  for (const row of grid) {
    for (const cell of row) {
      cell.isWall = true;
      if (cell.row % 2 === 1 && cell.col % 2 === 1) {
        cell.id = idCounter;
        idCounter++;
        potentialCells.push(cell);
      }
    }
  }

  visualize(potentialCells);
}
