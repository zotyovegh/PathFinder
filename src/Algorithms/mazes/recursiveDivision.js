import { clearWithStatus, clearInfinityVariables } from "../cleaning";
import { visualizeRD } from "./animations";
export function recursiveDivision(originalGrid) {
  clearWithStatus("path");
  var path = [];
  var grid = JSON.parse(JSON.stringify(originalGrid));
  for (const row of grid) {
    for (const cell of row) {
      cell.isWall = true;
    }
  }
  recursion(
    grid[1][1],
    grid[1][grid[1].length - 2],
    grid[grid.length - 2][1],
    grid[grid.length - 2][grid[1].length - 2],
    grid,
    path
  );

  /* clearInfinityVariables(grid);
  window.gridComponent.setState({ grid: grid });*/
  visualizeRD(grid, path);
}

function recursion(topLeft, topRight, bottomLeft, bottomRight, grid, path) {
  var orientation = "asd";
  var width = topRight.col - topLeft.col + 1;
  var height = bottomLeft.row - topLeft.row + 1;
  if (width < 5 || height < 5) return;
  if (width >= height) {
    orientation = "vertical";
    var middle = getMiddleLine(width);
    var randomPosition = getRandomPosition(height);
    for (let i = topLeft.row; i < topLeft.row + height; i++) {
      if (i === topLeft.row + randomPosition - 1) continue;
      path.push(grid[i][middle]);
    }


  /*  recursion(
      topLeft,
      grid[topLeft.row][middle - 1],
      bottomLeft,
      grid[bottomLeft.row][middle - 1],
      grid,
      path
    );
    recursion(
      grid[topLeft.row][middle + 1],
      topRight,
      grid[bottomLeft.row][middle + 1],
      bottomRight,
      grid,
      path
    );*/
  } else {
    orientation = "horizontal";
    var middle = getMiddleLine(height);
    var randomPosition = getRandomPosition(width);

    for (let i = topLeft.col; i < topLeft.col + width; i++) {
      if (i === topLeft.col + randomPosition - 1) continue;
      path.push(grid[middle][i]);
    }

    /* path.push(topLeft);
    path.push(topRight);
    path.push(grid[middle - 1][bottomLeft.col]);
    path.push(grid[middle - 1][bottomRight.col]);

    path.push(grid[middle + 1][bottomLeft.col]);
    path.push(grid[middle + 1][bottomRight.col]);
    path.push(bottomLeft);
    path.push(bottomRight);*/

    recursion(
      topLeft,
      topRight,
      grid[middle - 1][bottomLeft.col],
      grid[middle - 1][bottomRight.col],
      grid,
      path
    );
    recursion(
      grid[middle + 1][bottomLeft.col],
      grid[middle + 1][bottomRight.col],
      bottomLeft,
      bottomRight,
      grid,
      path
    );
  }
}

function getMiddleLine(position) {
  var half = Math.ceil(position / 2);
  return half % 2 === 0 ? half : half + (Math.random() < 0.5 ? -1 : 1);
}

function getRandomPosition(size) {
  var num = Math.floor(Math.random() * (size - 1 + 1)) + 1;
  return num % 2 === 1 ? num : num + (Math.random() < 0.5 ? -1 : 1);
}
