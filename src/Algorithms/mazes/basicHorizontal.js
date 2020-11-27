import { clearWithStatus, clearInfinityVariables } from "../cleaning";
import { visualizeOnEmptyGrid } from "./animations";
export function basicHorizontal(originalGrid) {
  clearWithStatus("path");
  var path = [];
  var grid = JSON.parse(JSON.stringify(originalGrid));
  for (const row of grid) {
    for (const cell of row) {
      cell.isWall = false;
    }
  }
  drawEdges(grid, path);
  for (let i = 2; i < grid.length - 1; i += 2) {
    var exc = Math.floor(Math.random() * (grid[0].length - 2 - 1 + 1)) + 1;
    if (i % 4 === 0) {
      for (let j = grid[0].length - 2; j > 0; j--) {
        if (j === exc) continue;
        path.push(grid[i][j]);
        grid[i][j].isWall = true;
      }
    } else {
      for (let j = 1; j < grid[0].length - 1; j++) {
        if (j === exc) continue;
        path.push(grid[i][j]);
        grid[i][j].isWall = true;
      }
    }
  }

  clearInfinityVariables(grid);
  window.gridComponent.setState({ grid: grid });
  visualizeOnEmptyGrid(grid, path);
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
