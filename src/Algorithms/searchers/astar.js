//https://en.wikipedia.org/wiki/A*_search_algorithm
export function astar(grid, startCell, endCell, isDiagonalOn) {
  const openSet = [];
  const closedSet = [];
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
      console.log("done");
      return openSet;
    }

    eliminateFromSet(openSet, nextCell);
    closedSet.push(nextCell);
  }
}

function eliminateFromSet(set, cell) {
  for (let i = set.length - 1; i >= 0; i--) {
    if (set[i] === cell) {
      set.splice(i, 1); //Removes cell by index from the array
    }
  }
}
