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
    var neighboringUnvisitedPairs = getNeighboringCells(currentCell, grid);
    if (neighboringUnvisitedPairs.length > 0) {
      cellsWithUnvisitedNeighbors.push(currentCell);
      var randomPair =
        neighboringUnvisitedPairs[
          Math.floor(Math.random() * neighboringUnvisitedPairs.length)
        ];
    }
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

function getNeighboringCells(cell, grid) {
  var neighboringUnvisitedPairs = []; //pair[neighboringWall, neighbor]
  var { col, row } = cell;
  if (row > 1) {
    //UP
    if (grid[row - 2][col].isWall) {
      var neighbor = grid[row - 1][col];
      if (grid[row - 2][col].visited === false) {
        neighboringUnvisitedPairs.push([neighbor, grid[row - 2][col]]);
      }
    }
  }
  if (col < grid[0].length - 2) {
    //Right
    if (grid[row][col + 2].isWall) {
      let neighbor = grid[row][col + 1];
      if (grid[row][col + 2].visited === false) {
        neighboringUnvisitedPairs.push([neighbor, grid[row][col + 2]]);
      }
    }
  }
  if (row < grid.length - 2) {
    //Down
    if (grid[row + 2][col]) {
      let neighbor = grid[row + 1][col];
      if (grid[row + 2][col].visited === false) {
        neighboringUnvisitedPairs.push([neighbor, grid[row + 2][col]]);
      }
    }
  }
  if (col > 1) {
    //Left
    if (grid[row][col - 2]) {
      let neighbor = grid[row][col - 1];
      if (grid[row][col - 2].visited === false) {
        neighboringUnvisitedPairs.push([neighbor, grid[row][col - 2]]);
      }
    }
  }
  return neighboringUnvisitedPairs;
}
