import { clearWithStatus, clearInfinityVariables } from "../cleaning";
import { visualizeOnWalledGrid } from "./animations";
export function ellerMaze(originalGrid) {
  clearWithStatus("path");
  var path = [];
  var used = [];
  var grid = JSON.parse(JSON.stringify(originalGrid));
  for (const row of grid) {
    for (const cell of row) {
      cell.isWall = true;
    }
  }
  var idCounter = 1;
  for (let i = 1; i < 4; i += 2) {
    var map = new Map();
    for (let j = 1; j < grid[0].length; j += 2) {
      if (grid[i][j].id === 0) {
        grid[i][j].id = idCounter;
        idCounter++;
      }
    }
    for (let j = 1; j < grid[0].length; j += 2) {
      var currentCell = grid[i][j];
      map.set(currentCell, currentCell.id);
    }

    for (let j = 1; j < grid[0].length; j += 2) {
      var currentCell = grid[i][j];
      getNeighboringCells(currentCell, grid);
      path.push(currentCell);
      currentCell.isWall = false;

      if (
        Math.random() < 0.5 &&
        currentCell.neighbors[0] !== null &&
        currentCell.neighbors[0][1].id !== currentCell.id
      ) {
        /*if(!used.includes(currentCell.neighbors[0][1].id)){} */
        path.push(currentCell.neighbors[0][0]);
        currentCell.neighbors[0][0].isWall = false;
        const aim = currentCell.neighbors[0][1].id;
        map.forEach((value, key) => {
          if (value === aim) {
            map.set(key, currentCell.id);
            console.log(value + " " + map.get(key));
            grid[key.row][key.col].id = currentCell.id;
          }
        });

        currentCell.neighbors[0][1].id = currentCell.id;
      }
    }
    console.log("*******");
    //DOWN
    for (let j = 1; j < grid[0].length; j += 2) {
      var currentCell = grid[i][j];
      var counter = 0;
      map.forEach((value, key) => {
        if (value === currentCell.id) {
          counter++;
        }
      });
      if (counter === 1) {
        path.push(currentCell.neighbors[1][0]);
        currentCell.neighbors[1][0].isWall = false;
        currentCell.neighbors[1][1].id = currentCell.id;
      } else if (counter > 1) {
        if (Math.random() > 0.5) {
          path.push(currentCell.neighbors[1][0]);
          currentCell.neighbors[1][0].isWall = false;
          currentCell.neighbors[1][1].id = currentCell.id;
        }
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
}
