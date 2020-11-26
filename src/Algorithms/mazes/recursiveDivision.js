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
  // console.log("heyy");
  console.log(topLeft.row + " " + topLeft.col);
  console.log(topRight.row + " " + topRight.col);
  console.log(bottomLeft.row + " " + bottomLeft.col);
  console.log(bottomRight.row + " " + bottomRight.col);
  console.log("------------");
  /* if (topLeft.col > topRight.col || topLeft.row > bottomLeft.row) return;*/

  var orientation = "";
  var width = topRight.col - topLeft.col + 1;
  var height = bottomLeft.row - topLeft.row + 1;
  if (height < 3 || width < 3) return;
  var middle = null;
  var randomPosition = null;

  if (width > height) orientation = "vertical";
  else if (height > width) orientation = "horizontal";
  else orientation = "vertical";
  console.log("w: " + width + "h: " + height + orientation);
  if (orientation === "vertical") {
    console.log("hi");
    orientation = "vertical";
    middle = getMiddleLine(width);
    randomPosition = getRandomPosition(height);

    for (let i = topLeft.row; i < topLeft.row + height; i++) {
      console.log(grid[i][middle]);
      if (i !== topLeft.row + randomPosition - 1) {
        path.push(grid[i][middle]);
      }
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
  } else if (orientation === "horizontal") {
    console.log("heyy");
    orientation = "horizontal";
    middle = getMiddleLine(height);
    randomPosition = getRandomPosition(width);

    for (let i = topLeft.col; i < topLeft.col + width; i++) {
      if (i !== topLeft.col + randomPosition - 1) {
        path.push(grid[middle][i]);
      }
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
    pathTest.push(grid[topLeft.row][middle + 1]);
    pathTest.push(topRight);
    pathTest.push(grid[bottomLeft.row][middle + 1]);
    pathTest.push(bottomRight);
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
    pathTest.push(grid[middle + 1][bottomLeft.col]);
    pathTest.push(grid[middle + 1][bottomRight.col]);
    pathTest.push(bottomLeft);
    pathTest.push(bottomRight);
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
