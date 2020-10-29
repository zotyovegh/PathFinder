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
  var currentCell = grid[(1, 1)];
  currentCell.visited = true;
  var cellsWithUnvisitedNeighbors = [];
  cellsWithUnvisitedNeighbors.push(currentCell);

  while (!!cellsWithUnvisitedNeighbors.length) {
    currentCell = takeLastCell(cellsWithUnvisitedNeighbors);
  }


  // clearInfinityVariables(grid);
  window.gridComponent.setState({ grid: grid });
  visualizeIterative(grid);
}

function takeLastCell(cellsWithUnvisitedNeighbors) {
  var position = cellsWithUnvisitedNeighbors.length - 1;
  var cell = cellsWithUnvisitedNeighbors[position];
  cellsWithUnvisitedNeighbors.splice(position, 1);
  return cell;
}

