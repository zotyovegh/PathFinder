import { clearWithStatus, clearInfinityVariables } from "../cleaning";
import { visualizeOnWalledGrid } from "./animations";
export function ellerMaze(originalGrid) {
  clearWithStatus("path");
  var path = [];
  var grid = JSON.parse(JSON.stringify(originalGrid));
  for (const row of grid) {
    for (const cell of row) {
      cell.isWall = true;
    }
  }
  var idCounter = 1;
  for (let i = 1; i < 2; i += 2) {
    var map = new Map();
    for (let j = 1; j < grid[0].length; j += 2) {
      if (grid[i][j].id === 0) {
        grid[i][j].id = idCounter;
        map.set(grid[i][j], idCounter++);
      }
    }

    for (let j = 1; j < grid[0].length; j += 2) {
      var currentCell = grid[i][j];
      getNeighboringCells(currentCell, grid);
      path.push(currentCell);
      if (Math.random() < 0.5 && currentCell.neighbors[0] !== null) {
        console.log(currentCell.neighbors);
        path.push(currentCell.neighbors[0][0]);
      }
    }
  }

  clearInfinityVariables(grid);
  window.gridComponent.setState({ grid: grid });
  visualizeOnWalledGrid(grid, path);
}

function getNeighboringCells(cell, grid) {
  //pair[neighboringWall, neighbor]
  var { col, row } = cell;
  /*if (row > 1) {
    //UP
    var neighbor = grid[row - 1][col];
    cell.neighbors.push([neighbor, grid[row - 2][col]]);
  }*/
  if (col < grid[0].length - 2) {
    //Right
    let neighbor = grid[row][col + 1];
    cell.neighbors.push([neighbor, grid[row][col + 2]]);
  } else {
    cell.neighbors.push(null);
  }
  if (row < grid.length - 2) {
    //Down
    let neighbor = grid[row + 1][col];
    cell.neighbors.push([neighbor, grid[row + 2][col]]);
  } else {
    cell.neighbors.push(null);
  }
  /* if (col > 1) {
    //Left
    let neighbor = grid[row][col - 1];
    cell.neighbors.push([neighbor, grid[row][col - 2]]);
  }*/
}
