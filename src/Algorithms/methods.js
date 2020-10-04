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

export function clearVisitedCells() {
  let newGrid = window.gridComponent.state.grid;
  for (let i = 0; i < window.gridComponent.props.rows; i++) {
    for (let j = 0; j < window.gridComponent.props.columns; j++) {
      let cell = newGrid[i][j];
      cell.visited = false;
      cell.distance = Infinity;
      cell.previous = null;

      if (cell.isWall) {
        document.getElementById(`num-${cell.row}-${cell.col}`).className =
          "num ";
      }
      if (cell.start || cell.end || cell.isWall) {
        document.getElementById(`num-${cell.row}-${cell.col}`).className =
          "num ";
        continue;
      }
      document.getElementById(`cell-${cell.row}-${cell.col}`).className =
        "cell cell-empty";
      document.getElementById(`num-${cell.row}-${cell.col}`).className = "num ";
    }
  }
  window.gridComponent.setState({ grid: newGrid });
}

export function clearBoard(props) {
  clearVisitedCells();
  window.gridComponent.setState({
    grid: createGrid(props),
    startRow: props.startR,
    startCol: props.startC,
    endRow: props.endR,
    endCol: props.endC,
  });
}

export function placeWall(cell) {
  let newCell = cell;
  let newGrid = window.gridComponent.state.grid;
  newCell.isWall = !newCell.isWall;
  document.getElementById(`num-${newCell.row}-${newCell.col}`).className =
    "num ";
  newCell.visited = false;

  newGrid[cell.row][cell.col] = newCell;
  window.gridComponent.setState({ grid: newGrid }, () => {
    if (window.gridComponent.state.status === "finished") {
      clearVisitedCells();
      if (window.gridComponent.state.currentAlg === "dijkstra") {
        window.gridComponent.doAlgorithm("fastDijkstra");
      }
    }
  });
}
