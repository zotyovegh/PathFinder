import { clearWithStatus, clearInfinityVariables } from "../cleaning";
import { visualizeRD } from "./animations";
export function recursiveDivision(originalGrid) {
  clearWithStatus("path");
  var path = [];
  var grid = JSON.parse(JSON.stringify(originalGrid));
  for (const row of grid) {
    for (const cell of row) {
      cell.isWall = false;
    }
  }
  drawEdges(grid, path);
  recursion(
    grid[1][1],
    grid[1][grid[1].length - 2],
    grid[grid.length - 2][1],
    grid[grid.length - 2][grid[1].length - 2],
    grid,
    path
  );

  clearInfinityVariables(grid);
  window.gridComponent.setState({ grid: grid });
  visualizeRD(grid, path);
}

function drawEdges(grid, path) {
  var middle = Math.floor(grid[0].length / 2);
  var leftIndex = middle - 1;
  var rightIndex = middle + 1;
  path.push(grid[0][middle]);
  grid[0][middle].isWall = true;
  while (leftIndex >= 0) {
    path.push(grid[0][leftIndex]);
    path.push(grid[0][rightIndex]);
    grid[0][leftIndex].isWall = true;
    grid[0][rightIndex].isWall = true;
    leftIndex--;
    rightIndex++;
  }
  for (let i = 1; i < grid.length - 1; i++) {
    path.push(grid[i][0]);
    path.push(grid[i][grid[0].length - 1]);
    grid[i][0].isWall = true;
    grid[i][grid[0].length - 1].isWall = true;
  }
  leftIndex = 0;
  rightIndex = grid[0].length - 1;

  while (leftIndex !== middle) {
    path.push(grid[grid.length - 1][leftIndex]);
    path.push(grid[grid.length - 1][rightIndex]);
    grid[grid.length - 1][leftIndex].isWall = true;
    grid[grid.length - 1][rightIndex].isWall = true;
    leftIndex++;
    rightIndex--;
  }
  path.push(grid[grid.length - 1][middle]);
  grid[grid.length - 1][middle].isWall = true;
}

function recursion(topLeft, topRight, bottomLeft, bottomRight, grid, path) {
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
        grid[i][middle].isWall = true;
      }
    }
    if (height < 4 && width < 4) {
      return;
    }
    verticalLeft(grid, topLeft, bottomLeft, middle, path);
    verticalRight(
      grid,
      topLeft,
      topRight,
      bottomLeft,
      bottomRight,
      middle,
      path
    );
    return;
  } else {
    //Horizontal
    middle = getMiddleLine(height, topLeft.row);
    randomPosition = getRandomPosition(width);
    for (let i = topLeft.col; i < topLeft.col + width; i++) {
      if (i !== topLeft.col + randomPosition - 1) {
        path.push(grid[middle][i]);
        grid[middle][i].isWall = true;
      }
    }
    if (height < 4 && width < 4) {
      return;
    }
    horizontalTop(
      grid,
      topLeft,
      topRight,
      bottomLeft,
      bottomRight,
      middle,
      path
    );
    horizontalBottom(grid, bottomLeft, bottomRight, middle, path);
    return;
  }
}

function verticalLeft(grid, topLeft, bottomLeft, middle, path) {
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
      path
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
  path
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
      path
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
  path
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
      path
    );
  }
  return;
}

function horizontalBottom(grid, bottomLeft, bottomRight, middle, path) {
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
      path
    );
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
