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
  var newPath = [];
  while (unvisitedCells.length >= 1) {
    var start = takeRandomCell(unvisitedCells);
    var aim = grid[1][1];
    newPath = [];
    var nextCell = start;
    newPath.push(nextCell);
    while (nextCell !== aim) {
      var newCell =
        nextCell.neighbors[
          Math.floor(Math.random() * nextCell.neighbors.length)
        ];

      if (nextCell.visited) {
        aim = nextCell;
      } else {
        nextCell.direction = newCell[2];
        nextCell = newCell[1];
        newPath.push(newCell[0]);
        newPath.push(newCell[1]);
      }
    }
    path.push([newPath, false]);
    removeCycle(nextCell, start, aim, grid, path);
  }

  clearInfinityVariables(grid);
  window.gridComponent.setState({ grid: grid });
  visualize(grid, path);
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

function removeCycle(nextCell, start, aim, grid, path) {
  var newPath = [];
  nextCell = start;
  nextCell.visited = true;
  nextCell.isWall = false;
  newPath.push(nextCell);

  while (nextCell !== aim) {
    var { col, row } = nextCell;
    if (nextCell.direction === "UP") {
      grid[row - 1][col].isWall = false;
      grid[row - 2][col].isWall = false;
      grid[row - 2][col].visited = true;
      nextCell = grid[row - 2][col];
      newPath.push(grid[row - 1][col]);
      newPath.push(grid[row - 2][col]);
    } else if (nextCell.direction === "DOWN") {
      grid[row + 1][col].isWall = false;
      grid[row + 2][col].isWall = false;
      grid[row + 2][col].visited = true;
      nextCell = grid[row + 2][col];
      newPath.push(grid[row + 1][col]);
      newPath.push(grid[row + 2][col]);
    } else if (nextCell.direction === "RIGHT") {
      grid[row][col + 1].isWall = false;
      grid[row][col + 2].isWall = false;
      grid[row][col + 2].visited = true;
      nextCell = grid[row][col + 2];
      newPath.push(grid[row][col + 1]);
      newPath.push(grid[row][col + 2]);
    } else if (nextCell.direction === "LEFT") {
      grid[row][col - 1].isWall = false;
      grid[row][col - 2].isWall = false;
      grid[row][col - 2].visited = true;
      nextCell = grid[row][col - 2];
      newPath.push(grid[row][col - 1]);
      newPath.push(grid[row][col - 2]);
    }
  }
  path.push([newPath, true]);
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
