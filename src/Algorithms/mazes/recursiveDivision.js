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
  drawEdges(grid, path);
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

function drawEdges(grid, path) {
  var middle = Math.floor(grid[0].length / 2);
  var leftIndex = middle - 1;
  var rightIndex = middle + 1;
  path.push(grid[0][middle]);
  while (leftIndex >= 0) {
    path.push(grid[0][leftIndex]);
    path.push(grid[0][rightIndex]);
    leftIndex--;
    rightIndex++;
  }
  for (let i = 1; i < grid.length - 1; i++) {
    path.push(grid[i][0]);
    path.push(grid[i][grid[0].length - 1]);
  }
  leftIndex = 0;
  rightIndex = grid[0].length - 1;

  while (leftIndex !== middle) {
    path.push(grid[grid.length - 1][leftIndex]);
    path.push(grid[grid.length - 1][rightIndex]);

    leftIndex++;
    rightIndex--;
  }
  path.push(grid[grid.length - 1][middle]);
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
  var width = topRight.col - topLeft.col + 1;
  var height = bottomLeft.row - topLeft.row + 1;
  if (height < 3 || width < 3) return;
  var middle = null;
  var randomPosition = null;

  if (width >= height) {
    //Vertical
    middle = getMiddleLine(width, topLeft.col);
    randomPosition = getRandomPosition(height);

    for (let i = topLeft.row; i < topLeft.row + height; i++) {
      if (i !== topLeft.row + randomPosition - 1) {
        path.push(grid[i][middle]);
      }
    }
    if (height < 4 && width < 4) {
      return;
    }
    (function () {
      verticalLeft(grid, topLeft, bottomLeft, middle, path, pathTest);
    })(
      verticalRight(
        grid,
        topLeft,
        topRight,
        bottomLeft,
        bottomRight,
        middle,
        path,
        pathTest
      )
    );

    return;
  } else {
    //Horizontal
    middle = getMiddleLine(height, topLeft.row);
    randomPosition = getRandomPosition(width);
    for (let i = topLeft.col; i < topLeft.col + width; i++) {
      if (i !== topLeft.col + randomPosition - 1) {
        path.push(grid[middle][i]);
      }
    }
    if (height < 4 && width < 4) {
      return;
    }
    (function () {
      horizontalTop(
        grid,
        topLeft,
        topRight,
        bottomLeft,
        bottomRight,
        middle,
        path,
        pathTest
      );
    })(horizontalBottom(grid, bottomLeft, bottomRight, middle, path, pathTest));

    return;
  }
}

function verticalLeft(grid, topLeft, bottomLeft, middle, path, pathTest) {
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
  return;
}

function verticalRight(
  grid,
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  middle,
  path,
  pathTest
) {
  if (
    topRight.col - grid[topLeft.row][middle + 1].col > 0 &&
    grid[bottomLeft.row][middle + 1].row - grid[topLeft.row][middle + 1].row > 0
  ) {
    recursion(
      grid[topLeft.row][middle + 1],
      topRight,
      grid[bottomLeft.row][middle + 1],
      bottomRight,
      grid,
      path,
      pathTest
    );
  }
  return;
}

function horizontalTop(
  grid,
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  middle,
  path,
  pathTest
) {
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
  return;
}

function horizontalBottom(
  grid,
  bottomLeft,
  bottomRight,
  middle,
  path,
  pathTest
) {
  if (
    grid[middle + 1][bottomRight.col].col -
      grid[middle + 1][bottomLeft.col].col >
      0 &&
    bottomLeft.row - grid[middle + 1][bottomLeft.col].row > 0
  ) {
    recursion(
      grid[middle + 1][bottomLeft.col],
      grid[middle + 1][bottomRight.col],
      bottomLeft,
      bottomRight,
      grid,
      path,
      pathTest
    );
    /* pathTest.push(grid[middle + 1][bottomLeft.col]);
    pathTest.push(grid[middle + 1][bottomRight.col]);
    pathTest.push(bottomLeft);
    pathTest.push(bottomRight);*/
  }
  return;
}

function getMiddleLine(position, reference) {
  var half = Math.ceil(position / 2);
  half = half % 2 === 0 ? half : half + (Math.random() < 0.5 ? -1 : 1);
  return half + reference - 1;
}

function getRandomPosition(size) {
  var num = Math.floor(Math.random() * (size - 1 + 1)) + 1;
  return num % 2 === 1 ? num : num + (Math.random() < 0.5 ? -1 : 1);
}
