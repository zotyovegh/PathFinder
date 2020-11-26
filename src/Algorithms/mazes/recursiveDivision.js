import { clearWithStatus, clearInfinityVariables } from "../cleaning";
import { visualizeRD } from "./animations";
export function recursiveDivision(originalGrid) {
  clearWithStatus("path");
  var path = [];
  var pathTest = [];
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
    path,
    pathTest
  );

  /* clearInfinityVariables(grid);
  window.gridComponent.setState({ grid: grid });*/
  visualizeRD(grid, path, pathTest);
}

function recursion(
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  grid,
  path,
  pathTest
) {
  //console.log(topLeft.row + " " + bottomLeft.row);
  /* if (topLeft.col > topRight.col || topLeft.row > bottomLeft.row) return;*/

  var orientation = "";
  var width = topRight.col - topLeft.col + 1;
  var height = bottomLeft.row - topLeft.row + 1;
  if (height < 3 || width < 3) return;

  if (width >= height) {
    orientation = "vertical";
    var middle = getMiddleLine(width);
    var randomPosition = getRandomPosition(height);

    for (let i = topLeft.row; i < topLeft.row + height; i++) {
      if (i !== topLeft.row + randomPosition - 1) {
        path.push(grid[i][middle]);
      }
    }

    if (
      grid[topLeft.row][middle - 1].col - topLeft.col > 0 &&
      bottomLeft.row - topLeft.row > 0
    ) {
      recursion(
        topLeft,
        grid[topLeft.row][middle - 1],
        bottomLeft,
        grid[bottomLeft.row][middle - 1],
        grid,
        path,
        pathTest
      );
    }

    /*  if (
      topRight.col - grid[topLeft.row][middle + 1].col < 1 ||
      grid[bottomLeft.row][middle + 1].row - grid[topLeft.row][middle + 1].row <
        1
    )
      return;

    recursion(
      grid[topLeft.row][middle + 1],
      topRight,
      grid[bottomLeft.row][middle + 1],
      bottomRight,
      grid,
      path,
      pathTest
    );*/

    return;
  } else {
    orientation = "horizontal";
    var middle = getMiddleLine(height);
    var randomPosition = getRandomPosition(width);

    for (let i = topLeft.col; i < topLeft.col + width; i++) {
      if (i !== topLeft.col + randomPosition - 1) {
        path.push(grid[middle][i]);
      }
    }

    if (
      topRight.col - topLeft.col > 0 &&
      grid[middle - 1][bottomLeft.col].row - topLeft.row > 0
    ) {
      recursion(
        topLeft,
        topRight,
        grid[middle - 1][bottomLeft.col],
        grid[middle - 1][bottomRight.col],
        grid,
        path,
        pathTest
      );
    }

    if (
      grid[middle + 1][bottomRight.col].col -
        grid[middle + 1][bottomLeft.col].col <
        1 ||
      bottomLeft.row - grid[middle + 1][bottomLeft.col].row < 1
    )
      return;

    /* recursion(
      grid[middle + 1][bottomLeft.col],
      grid[middle + 1][bottomRight.col],
      bottomLeft,
      bottomRight,
      grid,
      path, pathTest
    );
    pathTest.push(grid[middle + 1][bottomLeft.col]);
    pathTest.push(grid[middle + 1][bottomRight.col]);
    pathTest.push(bottomLeft);
    pathTest.push(bottomRight);*/

    return;
  }
  return;
}

function getMiddleLine(position) {
  var half = Math.ceil(position / 2);
  return half % 2 === 0 ? half : half + (Math.random() < 0.5 ? -1 : 1);
}

function getRandomPosition(size) {
  var num = Math.floor(Math.random() * (size - 1 + 1)) + 1;

  num = num % 2 === 1 ? num : num + (Math.random() < 0.5 ? -1 : 1);
  //console.log("Size " + size + " result: " + num);
  return num;
}
