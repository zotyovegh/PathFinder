import {
  clearWithStatus,
  clearInfinityVariables,
} from "../../Algorithms/cleaning";
import { visualizeOnWalledGrid } from "../mazes/animations";
export function primMaze(originalGrid) {
  clearWithStatus("path");
  var grid = JSON.parse(JSON.stringify(originalGrid));
  var path = [];
  const wallPairs = [];
  for (const row of grid) {
    for (const cell of row) {
      cell.isWall = true;
    }
  }
  getNeighboringWalls(grid[1][1], grid, wallPairs);
  while (!!wallPairs.length) {
    var currentPair = takeRandomPair(wallPairs);
    if (!currentPair[1].isWall) {
      continue;
    }
    currentPair[0].isWall = false;
    currentPair[1].isWall = false;
    path.push(currentPair[0]);
    path.push(currentPair[1]);
    getNeighboringWalls(currentPair[1], grid, wallPairs);
  }
  clearInfinityVariables(grid);
  visualizeOnWalledGrid(grid, path);
}

function getNeighboringWalls(cell, grid, wallPairs) {
  var { col, row } = cell;
  if (row > 1) {
    //UP
    var neighbor = grid[row - 1][col];
    wallPairs.push([neighbor, grid[row - 2][col]]);
  }
  if (col < grid[0].length - 2) {
    //Right
    let neighbor = grid[row][col + 1];
    wallPairs.push([neighbor, grid[row][col + 2]]);
  }
  if (row < grid.length - 2) {
    //Down
    let neighbor = grid[row + 1][col];
    wallPairs.push([neighbor, grid[row + 2][col]]);
  }
  if (col > 1) {
    //Left
    let neighbor = grid[row][col - 1];
    wallPairs.push([neighbor, grid[row][col - 2]]);
  }
}

function takeRandomPair(wallPairs) {
  var position = Math.floor(Math.random() * wallPairs.length);
  var pair = wallPairs[position];
  wallPairs.splice(position, 1);
  return pair;
}
