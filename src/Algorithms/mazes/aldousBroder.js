import { visualizeABMaze } from "../mazes/animations";
import {
  clearWithStatus,
  clearInfinityVariables,
} from "../../Algorithms/cleaning";

export function aldousBroderMaze(originalGrid) {
  clearWithStatus("path");
  var grid = JSON.parse(JSON.stringify(originalGrid));
  var unvisitedCells = [];
  var visualizationList = [];
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

  var current = unvisitedCells[0];
  unvisitedCells.splice(0, 1);
  current.visited = true;
  current.isWall = false;

  while (!!unvisitedCells.length) {
    var neighbor =
      current.neighbors[Math.floor(Math.random() * current.neighbors.length)];
    visualizationList.push(neighbor[0]);
    visualizationList.push(neighbor[1]);
    if (!neighbor[1].visited) {
      neighbor[0].isWall = false;
      neighbor[1].isWall = false;
      unvisitedCells = unvisitedCells.filter(
        (item) => item.id !== neighbor[1].id
      );
      neighbor[1].visited = true;
    }
    current = neighbor[1];
  }
  clearInfinityVariables(grid);
  window.gridComponent.setState({ grid: grid });
  visualizeABMaze(grid, visualizationList);
}

/*function takeRandomCell(unvisitedCells) {
  var position = Math.floor(Math.random() * unvisitedCells.length);
  var cell = unvisitedCells[0];
  unvisitedCells.splice(0, 1);
  return cell;
}*/

function getNeighboringCells(cell, grid) {
  //pair[neighboringWall, neighbor]
  var { col, row } = cell;
  if (row > 1) {
    //UP
    var neighbor = grid[row - 1][col];
    cell.neighbors.push([neighbor, grid[row - 2][col]]);
  }
  if (col < grid[0].length - 2) {
    //Right
    let neighbor = grid[row][col + 1];
    cell.neighbors.push([neighbor, grid[row][col + 2]]);
  }
  if (row < grid.length - 2) {
    //Down
    let neighbor = grid[row + 1][col];
    cell.neighbors.push([neighbor, grid[row + 2][col]]);
  }
  if (col > 1) {
    //Left
    let neighbor = grid[row][col - 1];
    cell.neighbors.push([neighbor, grid[row][col - 2]]);
  }
}
