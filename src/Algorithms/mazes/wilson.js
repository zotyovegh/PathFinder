import {
  clearWithStatus,
  clearInfinityVariables,
} from "../../Algorithms/cleaning";
import { visualize } from "../mazes/animations";
export function wilsonMaze(originalGrid) {
  clearWithStatus("path");
  var path = [];
  var unvisitedCells = [];
  var grid = JSON.parse(JSON.stringify(originalGrid));
  for (const row of grid) {
    for (const cell of row) {
      cell.isWall = true;
      if (cell.row % 2 === 1 && cell.col % 2 === 1) {
        cell.id = unvisitedCells.length;
        unvisitedCells.push(cell);
        getNeighboringCells(cell, grid);
      }
    }
  }
  var currentPath = [];
  var start = takeRandomCell(unvisitedCells);
  var aim = takeRandomCell(unvisitedCells);
  var nextCell = start;
  console.log(aim);
  while (nextCell !== aim) {
    var newCell =
      nextCell.neighbors[Math.floor(Math.random() * nextCell.neighbors.length)];
    nextCell.direction = newCell[2];
    nextCell = newCell[1];
  }
  nextCell = start;
  while (nextCell !== aim) {
    var { col, row } = nextCell;
    currentPath.push(nextCell);
    if (nextCell.direction === "UP") {
      currentPath.push(grid[row - 1][col]);
      currentPath.push(grid[row - 2][col]);
      nextCell = grid[row - 2][col];
    } else if (nextCell.direction === "DOWN") {
      currentPath.push(grid[row + 1][col]);
      currentPath.push(grid[row + 2][col]);
      nextCell = grid[row + 2][col];
    } else if (nextCell.direction === "RIGHT") {
      currentPath.push(grid[row][col + 1]);
      currentPath.push(grid[row][col + 2]);
      nextCell = grid[row][col + 2];
    } else if (nextCell.direction === "LEFT") {
      currentPath.push(grid[row][col - 1]);
      currentPath.push(grid[row][col - 2]);
      nextCell = grid[row][col - 2];
    }
  }

  console.log(currentPath);
  //clearInfinityVariables(grid);
  visualize(grid, currentPath);
}

function takeRandomCell(unvisitedCells) {
  var position = Math.floor(Math.random() * unvisitedCells.length);
  var cell = unvisitedCells[position];
  unvisitedCells.splice(position, 1);
  return cell;
}

function getNeighboringCells(cell, grid) {
  //pair[neighboringWall, neighbor]
  var { col, row } = cell;
  if (row > 1) {
    //UP
    var neighbor = grid[row - 1][col];
    cell.neighbors.push([neighbor, grid[row - 2][col], "UP"]);
  }
  if (col < grid[0].length - 2) {
    //Right
    let neighbor = grid[row][col + 1];
    cell.neighbors.push([neighbor, grid[row][col + 2], "RIGHT"]);
  }
  if (row < grid.length - 2) {
    //Down
    let neighbor = grid[row + 1][col];
    cell.neighbors.push([neighbor, grid[row + 2][col], "DOWN"]);
  }
  if (col > 1) {
    //Left
    let neighbor = grid[row][col - 1];
    cell.neighbors.push([neighbor, grid[row][col - 2], "LEFT"]);
  }
}
