export function createGrid(props) {
  let grid = [];

  for (let i = 0; i < props.rows; i++) {
    grid.push([]);
    for (let j = 0; j < props.columns; j++) {
      grid[i].push({
        row: i,
        col: j,
        start: false,
        end: false,
        distance: Infinity,
        visited: false,
        isWall: false,
        previous: null,
      });
    }
  }

  grid[props.startR][props.startC].start = true;
  grid[props.endR][props.endC].end = true;

  return grid;
}

export function getCellsInOrder(endCell) {
  const cells = [];
  let cell = endCell;
  while (cell !== null) {
    cells.unshift(cell);
    cell = cell.previous;
  }
  return cells;
}

export function animateFast(visitedCells, cellsInOrder) {
  for (let i = 0; i <= visitedCells.length - 1; i++) {
    const cell = visitedCells[i];

    if (!cell.start && !cell.end) {
      document.getElementById(`cell-${cell.row}-${cell.col}`).className =
        "cell cell-visited";
    }
    if (cell.end) {
      animatePathFast(cellsInOrder);
      return;
    }
  }
}

function animatePathFast(cellsInOrder) {
  for (let i = 0; i < cellsInOrder.length; i++) {
    const cell = cellsInOrder[i];
    if (!cell.start && !cell.end) {
      document.getElementById(`cell-${cell.row}-${cell.col}`).className =
        "cell cell-path";
    }
  }
}

export function animateSlow(visitedCells, cellsInOrder) {
  for (let i = 0; i <= visitedCells.length; i++) {
    const cell = visitedCells[i];
    if (i === visitedCells.length) {
      setTimeout(() => {
        animatePathSlow(cellsInOrder);
      }, 10 * i);
      return;
    }
    setTimeout(() => {
      if (!cell.start && !cell.end) {
        document.getElementById(`cell-${cell.row}-${cell.col}`).className =
          "cell cell-visited";
      }
    }, 10 * i);
  }
}

function animatePathSlow(cellsInOrder) {
  for (let i = 0; i <= cellsInOrder.length; i++) {
    setTimeout(() => {
      if (i === cellsInOrder.length) {
        //this.setState({ status: "finished" });
        window.gridComponent.setState({ status: "finished" });
        return;
      }
      const cell = cellsInOrder[i];
      if (!cell.start && !cell.end) {
        document.getElementById(`cell-${cell.row}-${cell.col}`).className =
          "cell cell-path";
      }
    }, 20 * i);
  }
}

export function clearVisitedCells() {
  let newGrid = window.gridComponent.state.grid;
  for (let i = 0; i < window.gridComponent.props.rows; i++) {
    for (let j = 0; j < window.gridComponent.props.columns; j++) {
      let cell = newGrid[i][j];
      cell.visited = false;
      cell.isVisited = false;
      cell.distance = Infinity;
      cell.previous = null;
      if (cell.start || cell.end || cell.isWall) {
        continue;
      }
      document.getElementById(`cell-${cell.row}-${cell.col}`).className =
        "cell cell-empty";
    }
  }
  window.gridComponent.setState({ grid: newGrid });
}
