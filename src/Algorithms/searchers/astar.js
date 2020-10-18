//https://en.wikipedia.org/wiki/A*_search_algorithm
export function astar(grid, startCell, endCell, isDiagonalOn) {
  findNeighbors(grid);
  const openSet = [];
  const closedSet = [];
  const allSet = [];
  openSet.push(startCell);

  while (!!openSet.length) {
    var lastCell = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[lastCell].f) {
        lastCell = i;
      }
    }
    var nextCell = openSet[lastCell];
    if (nextCell === endCell) {
      return allSet;
    }

    eliminateFromSet(openSet, nextCell);
    closedSet.push(nextCell);
    var neighbors = nextCell.neighbors;
    for (let i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];
      if (!closedSet.includes(neighbor) && !neighbor.isWall) {
        var g = nextCell.g + 1;

        if (openSet.includes(neighbor)) {
          if (g < neighbor.g) {
            neighbor.g = g;
          }
        } else {
          neighbor.g = g;
          openSet.push(neighbor);
          allSet.push(neighbor);
        }
        neighbor.h =
          Math.abs(neighbor.row - endCell.row) +
          Math.abs(neighbor.col - endCell.col);
        neighbor.f = neighbor.g + neighbor.h; //score
        neighbor.previous = nextCell;
      }
    }
  }
  return allSet;
}

function findNeighbors(grid) {
  //DIAGONALS NOT COUNTED
  for (const row of grid) {
    for (const cell of row) {
      cell.neighbors = [];
      if (cell.row > 0) {
        //UP
        cell.neighbors.push(grid[cell.row - 1][cell.col]);
      }
      if (cell.col < grid[0].length - 1) {
        //RIGHT
        cell.neighbors.push(grid[cell.row][cell.col + 1]);
      }

      if (cell.row < grid.length - 1) {
        //DOWN
        cell.neighbors.push(grid[cell.row + 1][cell.col]);
      }

      if (cell.col > 0) {
        //LEFT
        cell.neighbors.push(grid[cell.row][cell.col - 1]);
      }
      if (cell.row > 0 && cell.col < grid[0].length - 1) {
        //UPRIGHT
        if (
          !grid[cell.row - 1][cell.col].isWall ||
          !grid[cell.row][cell.col + 1].isWall
        ) {
          cell.neighbors.push(grid[cell.row - 1][cell.col + 1]);
        }
      }
      if (cell.col < grid[0].length - 1 && cell.row < grid.length - 1) {
        //RIGHTDOWN
        if (
          !grid[cell.row + 1][cell.col].isWall ||
          !grid[cell.row][cell.col + 1].isWall
        ) {
          cell.neighbors.push(grid[cell.row + 1][cell.col + 1]);
        }
      }
      if (cell.row < grid.length - 1 && cell.col > 0) {
        //DOWNLEFT
        if (
          !grid[cell.row + 1][cell.col].isWall ||
          !grid[cell.row][cell.col - 1].isWall
        ) {
          cell.neighbors.push(grid[cell.row + 1][cell.col - 1]);
        }
      }
      if (cell.col > 0 && cell.row > 0) {
        //LEFTUP
        if (
          !grid[cell.row][cell.col - 1].isWall ||
          !grid[cell.row - 1][cell.col].isWall
        ) {
          cell.neighbors.push(grid[cell.row - 1][cell.col - 1]);
        }
      }
    }
  }
  console.log(grid);
}

function eliminateFromSet(set, cell) {
  for (let i = set.length - 1; i >= 0; i--) {
    if (set[i] === cell) {
      set.splice(i, 1); //Removes cell by index from the array
    }
  }
}
