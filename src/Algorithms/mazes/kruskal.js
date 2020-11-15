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

        var values = map.get(cell);
        if (values) values.push(cell);
        else map.set(idCounter++, [cell]);
      } else if (cell.row % 2 === 1 || cell.col % 2 === 1) {
        if (
          cell.row !== 0 &&
          cell.col !== 0 &&
          cell.row !== grid.length - 1 &&
          cell.col !== grid[0].length - 1
        ) {
          //WALLS
          validWalls.push(cell);
        }
      }
    }
  }
  shuffleArray(validWalls);
  console.log(map);

  visualize(validWalls);
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
