import {
  clearWithStatus,
  clearInfinityVariables,
} from "../../Algorithms/cleaning";
import { visualizeOnWalledGrid, visualize } from "../mazes/animations";
export function kruskalMaze(originalGrid) {
  clearWithStatus("path");
  var path = [];
  var grid = JSON.parse(JSON.stringify(originalGrid));
  var idCounter = 0;
  // var potentialCells = [];
  var validWalls = [];
  var map = new Map();
  for (const row of grid) {
    for (const cell of row) {
      cell.isWall = true;
      if (cell.row % 2 === 1 && cell.col % 2 === 1) {
        //CELLS
        // potentialCells.push(cell);

        map.set(cell, idCounter++);
      } else if (cell.row % 2 === 1 || cell.col % 2 === 1) {
        if (
          cell.row !== 0 &&
          cell.col !== 0 &&
          cell.row !== grid.length - 1 &&
          cell.col !== grid[0].length - 1
        ) {
          //WALLS
          getSurroundingCells(cell, grid);
          validWalls.push(cell);
        }
      }
    }
  }

  shuffleArray(validWalls);

  for (let i = 0; i < validWalls.length - 1; i++) {
    var wall = validWalls[i];
    if (map.get(wall.neighbors[0]) !== map.get(wall.neighbors[1])) {
      map.forEach((value, key) => {
        if (value === map.get(wall.neighbors[1])) {
          map.set(key, map.get(wall.neighbors[0]));
        }
      });

      wall.isWall = false;
      wall.neighbors[0].isWall = false;
      wall.neighbors[1].isWall = false;
      console.log("does not equal");
    }
  }
  console.log(map);

  visualize(grid);
}

function getSurroundingCells(wall, grid) {
  var { col, row } = wall;
  if (wall.row % 2 === 1) {
    wall.neighbors.push(grid[row][col + 1]);
    wall.neighbors.push(grid[row][col - 1]);
  } else {
    wall.neighbors.push(grid[row - 1][col]);
    wall.neighbors.push(grid[row + 1][col]);
  }
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
