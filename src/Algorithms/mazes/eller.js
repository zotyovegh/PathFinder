import { clearWithStatus, clearInfinityVariables } from "../cleaning";
import { visualizeOnWalledGrid } from "./animations";
export function ellerMaze(originalGrid) {
  clearWithStatus("path");
  var path = [];
  var list = [];
  var visited = [];
  var grid = JSON.parse(JSON.stringify(originalGrid));
  for (const row of grid) {
    for (const cell of row) {
      cell.isWall = true;
    }
  }

  var idCounter = 1;
  for (let i = 1; i < grid.length; i += 2) {
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

    //SIDE
    for (let j = 1; j < grid[0].length; j += 2) {
      var currentCell = grid[i][j];
      getNeighboringCells(currentCell, grid);
      path.push(currentCell);
      currentCell.isWall = false;

      if (
        Math.random() < 0.5 &&
        currentCell.neighbors[0] !== null &&
        currentCell.neighbors[0][1].id !== currentCell.id &&
        grid.length - 2 !== i
      ) {
        path.push(currentCell.neighbors[0][0]);
        currentCell.neighbors[0][0].isWall = false;
        const aim = currentCell.neighbors[0][1].id;
        map.forEach((value, key) => {
          if (value === aim) {
            map.set(key, currentCell.id);
            grid[key.row][key.col].id = currentCell.id;
          }
        });

        currentCell.neighbors[0][1].id = currentCell.id;
      } else if (
        currentCell.neighbors[0] !== null &&
        currentCell.neighbors[0][1].id !== currentCell.id &&
        grid.length - 2 === i
      ) {
        path.push(currentCell.neighbors[0][0]);
        currentCell.neighbors[0][0].isWall = false;
        const aim = currentCell.neighbors[0][1].id;
        map.forEach((value, key) => {
          if (value === aim) {
            map.set(key, currentCell.id);
            grid[key.row][key.col].id = currentCell.id;
          }
        });

        currentCell.neighbors[0][1].id = currentCell.id;
      }
    }
    if (grid.length - 2 !== i) {
      //DOWN
      list = [];
      visited = [];

      map.forEach((value, key) => {
        list.push(value);
      });

      for (let j = 1; j < grid[0].length; j += 2) {
        var currentCell = grid[i][j];
        var counter = list.filter((x) => x === currentCell.id).length;
        if (counter === 1 && !visited.includes(currentCell.id)) {
          path.push(currentCell.neighbors[1][0]);
          currentCell.neighbors[1][0].isWall = false;
          currentCell.neighbors[1][1].id = currentCell.id;
        } else if (counter > 1) {
          if (Math.random() > 0.5) {
            path.push(currentCell.neighbors[1][0]);
            currentCell.neighbors[1][0].isWall = false;
            currentCell.neighbors[1][1].id = currentCell.id;
            remove(list, visited, currentCell.id, true);
          }
          remove(list, visited, currentCell.id, false);
        }
      }
    }
  }

  clearInfinityVariables(grid);
  window.gridComponent.setState({ grid: grid });
  visualizeOnWalledGrid(grid, path);
}

function remove(array, visited, item, isVisited) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === item) {
      if (isVisited) {
        visited.push(item);
      }

      array.splice(i, 1);
    }
  }
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
