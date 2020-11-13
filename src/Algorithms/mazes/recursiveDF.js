import {
  clearWithStatus,
  clearInfinityVariables,
} from "../cleaning";
import { visualizeOnWalledGrid } from "./animations";
export function recursiveMaze(originalGrid) {
  clearWithStatus("path");
  var path = [];
  var grid = JSON.parse(JSON.stringify(originalGrid));
  for (const row of grid) {
    for (const cell of row) {
      cell.isWall = true;
    }
  }
  var currentCell = grid[1][1];
  recursion(grid, currentCell, path);
  clearInfinityVariables(grid);
  window.gridComponent.setState({ grid: grid });
  //visualization
  visualizeOnWalledGrid(grid, path);
}

function recursion(grid, currentCell, path) {
  currentCell.visited = true;
  currentCell.isWall = false;
  path.push(currentCell);
  currentCell.neighbors = getNeighboringCells(currentCell, grid);
  while (currentCell.neighbors.length > 0) {
    var position = Math.floor(Math.random() * currentCell.neighbors.length);
    var randomPair = currentCell.neighbors[position];
    currentCell.neighbors.splice(position, 1);
    if (!randomPair[1].visited) {
      randomPair[0].isWall = false;
      path.push(randomPair[0]);
      recursion(grid, randomPair[1], path);
    }
  }
}

function getNeighboringCells(cell, grid) {
  var neighboringUnvisitedPairs = []; //pair[neighboringWall, neighbor]
  var { col, row } = cell;
  if (row > 1) {
    //UP
    var neighbor = grid[row - 1][col];
    if (grid[row - 2][col].visited === false) {
      neighboringUnvisitedPairs.push([neighbor, grid[row - 2][col]]);
    }
  }
  if (col < grid[0].length - 2) {
    //Right
    let neighbor = grid[row][col + 1];
    if (grid[row][col + 2].visited === false) {
      neighboringUnvisitedPairs.push([neighbor, grid[row][col + 2]]);
    }
  }
  if (row < grid.length - 2) {
    //Down
    let neighbor = grid[row + 1][col];
    if (grid[row + 2][col].visited === false) {
      neighboringUnvisitedPairs.push([neighbor, grid[row + 2][col]]);
    }
  }
  if (col > 1) {
    //Left
    let neighbor = grid[row][col - 1];
    if (grid[row][col - 2].visited === false) {
      neighboringUnvisitedPairs.push([neighbor, grid[row][col - 2]]);
    }
  }

  return neighboringUnvisitedPairs;
}
