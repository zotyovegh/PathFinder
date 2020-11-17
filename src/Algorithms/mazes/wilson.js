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

  console.log(unvisitedCells.length);
  for (let i = 0; i < 2; i++) {
    var start = takeRandomCell(unvisitedCells);
    var aim = takeRandomCell(unvisitedCells);
    start.isWall = false;
    aim.isWall = false;
    console.log(start);
    console.log(aim);
    var nextCell = start;
    var foundVisited = false;
    while (nextCell !== aim && !foundVisited) {
      console.log("hi");
      var newCell =
        nextCell.neighbors[
          Math.floor(Math.random() * nextCell.neighbors.length)
        ];
      nextCell.direction = newCell[2];
      nextCell = newCell[1];

      if (!nextCell.isWall && nextCell !== aim && nextCell !== start) {
        console.log(nextCell);
        foundVisited = true;
      }
    }
    removeCycle(nextCell, start, aim, currentPath, grid, unvisitedCells);
  }

  //clearInfinityVariables(grid);
  visualize(grid);
}

function clearDirections(grid) {
  for (const row of grid) {
    for (const cell of row) {
      cell.direction = "";
    }
  }
}

function takeRandomCell(unvisitedCells) {
  var position = Math.floor(Math.random() * unvisitedCells.length);
  var cell = unvisitedCells[position];
  unvisitedCells.splice(position, 1);
  return cell;
}

function removeCycle(nextCell, start, aim, currentPath, grid, unvisitedCells) {
  nextCell = start;
  while (nextCell !== aim) {
    if (nextCell !== start) {
      unvisitedCells = unvisitedCells.filter((cell) => cell.id !== nextCell.id);
    }
    var { col, row } = nextCell;
    currentPath.push(nextCell);
    if (nextCell.direction === "UP") {
      grid[row - 1][col].isWall = false;
      grid[row - 2][col].isWall = false;
      nextCell = grid[row - 2][col];
    } else if (nextCell.direction === "DOWN") {
      grid[row + 1][col].isWall = false;
      grid[row + 2][col].isWall = false;
      nextCell = grid[row + 2][col];
    } else if (nextCell.direction === "RIGHT") {
      grid[row][col + 1].isWall = false;
      grid[row][col + 2].isWall = false;
      nextCell = grid[row][col + 2];
    } else if (nextCell.direction === "LEFT") {
      grid[row][col - 1].isWall = false;
      grid[row][col - 2].isWall = false;
      nextCell = grid[row][col - 2];
    }
  }
  clearDirections(grid);
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
