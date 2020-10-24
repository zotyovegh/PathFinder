import { clearVisitedCells } from "../../Algorithms/methods";

export function getRandomMazedGrid(grid) {
  clearVisitedCells();
  for (const row of grid) {
    for (const cell of row) {
      cell.isWall = false;
    }
  }
  var numberOfCells = (grid.length - 1) * (grid[0].length - 1);

  var wallAmount = Math.floor(numberOfCells * 0.4); //0.4 should be later replaced with the amount

  for (let i = 0; i < wallAmount; i++) {
    let row = Math.floor(Math.random() * (grid.length - 1));
    let col = Math.floor(Math.random() * (grid[0].length - 1));

    let cell = grid[row][col];
    if (cell.start || cell.end || cell.isWall) {
      i--;
    } else {
      cell.isWall = true;
    }
  }
  window.gridComponent.setState({ grid: grid });
}
