import {
  clearWithStatus,
  clearInfinityVariables,
} from "../../Algorithms/cleaning";
import { visualizeMaze } from "../../Algorithms/animations";
export function primMaze(originalGrid) {
  clearWithStatus("path");
  var grid = JSON.parse(JSON.stringify(originalGrid));
  const wallPairs = [];
  for (const row of grid) {
    for (const cell of row) {
      cell.isWall = true;
    }
  }
  const mazeCells = [];
  grid[1][1].isWall = false;
  mazeCells.push(grid[1][1]);
  getNeighboringWalls(grid[1][1], grid, wallPairs);
  while (!!wallPairs.length) {
    var currentPair = takeRandomPair(wallPairs);
    if (!currentPair[1].isWall) {
      continue;
    }
    currentPair[0].isWall = false;
    currentPair[1].isWall = false;
    getNeighboringWalls(currentPair[1], grid, wallPairs);
  }
  clearInfinityVariables(grid);
  visualizeMaze(grid);
}

function getNeighboringWalls(cell, grid, wallPairs) {
  var { col, row } = cell;
  if (row > 1) {
    //UP
    if (grid[row - 2][col].isWall) {
      var neighbor = grid[row - 1][col];
      wallPairs.push([neighbor, grid[row - 2][col]]);
    }
  }
  if (col < grid[0].length - 2) {
    //Right
    if (grid[row][col + 2].isWall) {
      let neighbor = grid[row][col + 1];
      wallPairs.push([neighbor, grid[row][col + 2]]);
    }
  }
  if (row < grid.length - 2) {
    //Down
    if (grid[row + 2][col]) {
      let neighbor = grid[row + 1][col];
      wallPairs.push([neighbor, grid[row + 2][col]]);
    }
  }
  if (col > 1) {
    //Left
    if (grid[row][col - 2]) {
      let neighbor = grid[row][col - 1];
      wallPairs.push([neighbor, grid[row][col - 2]]);
    }
  }
}

function takeRandomPair(wallPairs) {
  var position = Math.floor(Math.random() * wallPairs.length);
  var pair = wallPairs[position];
  wallPairs.splice(position, 1);
  return pair;
}
