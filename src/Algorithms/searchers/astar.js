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
  //DIAGONALLY AS WELL
  for (const row of grid) {
    for (const cell of row) {
      for (let row = -1; row <= 1; row++) {
        for (let col = -1; col <= 1; col++) {
          if (cell.col + row >= 0 && cell.row + col >= 0) {
            let rowOff = row + cell.col;
            let colOff = col + cell.row;
            if (rowOff < grid.length && colOff < grid[0].length) {
              if (!(row === 0 && col === 0)) {
                console.log("row: " + row + " col: " + col);
                grid[cell.row][cell.col].neighbors.push(grid[row][col]);
              }
            }
          }
        }
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
