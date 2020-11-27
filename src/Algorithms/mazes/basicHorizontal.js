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
  for (let i = 2; i < grid.length - 1; i += 2) {
    if (i % 4 === 0) {
      for (let j = grid[0].length - 2; j > 0; j--) {
        path.push(grid[i][j]);
      }
    } else {
      for (let j = 1; j < grid[0].length-1; j++) {
        path.push(grid[i][j]);
      }
    }
  }

  clearInfinityVariables(grid);
  window.gridComponent.setState({ grid: grid });
  visualizeOnEmptyGrid(grid, path);
}
