//https://en.wikipedia.org/wiki/A*_search_algorithm
export function astar(grid, startCell, endCell, isDiagonalOn) {
  const openSet = [];
  const closedSet = [];
  openSet.push(startCell);
  findNeighbors(grid);

  while (!!openSet.length) {
    var lastCell = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[lastCell].f) {
        lastCell = i;
      }
    }
    var nextCell = openSet[lastCell];
    if (nextCell === endCell) {
      console.log("done");
      return openSet;
    }

    eliminateFromSet(openSet, nextCell);
    closedSet.push(nextCell);
  }
}

function findNeighbors(grid) {
  //DIAGONALS NOT COUNTED 
  for (const row of grid) {
    for (const cell of row) {
      if (cell.row < grid[0].length - 1) {
        cell.neighbors.push(grid[cell.row + 1][cell.col]);
      }
      if (cell.row > 0) {
        cell.neighbors.push(grid[cell.row - 1][cell.col]);
      }
      if (cell.col < grid.length - 1) {
        cell.neighbors.push(grid[cell.row][cell.col + 1]);
      }
      if (cell.col > 0) {
        cell.neighbors.push(grid[cell.row][cell.col - 1]);
      }
      console.log(cell);
    }
  }
}

function eliminateFromSet(set, cell) {
  for (let i = set.length - 1; i >= 0; i--) {
    if (set[i] === cell) {
      set.splice(i, 1); //Removes cell by index from the array
    }
  }
}
