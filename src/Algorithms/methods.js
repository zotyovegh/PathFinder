export function createGrid(props) {
  let grid = [];

  for (let i = 0; i < props.rows; i++) {
    grid.push([]);
    for (let j = 0; j < props.columns; j++) {
      grid[i].push({
        id: 0,
        row: i,
        col: j,
        start: false,
        end: false,
        distance: Infinity,
        visited: false,
        isWall: false,
        previous: null,
        //TODO: ASTAR scenario (this variables shall be handled differently later)
        f: Infinity,
        g: Infinity,
        h: Infinity,
        neighbors: [],
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

export function clear(type) {
  if (type === "path") {
    clearVisitedCells();
  } else if (type === "grid") {
    clearBoard(window.gridComponent.props);
  }
  window.gridComponent.setState({ status: "pending" });
}

export function clearVisitedCells() {
  console.log("heyy");
  let newGrid = window.gridComponent.state.grid;
  for (let i = 0; i < window.gridComponent.props.rows; i++) {
    for (let j = 0; j < window.gridComponent.props.columns; j++) {
      let cell = newGrid[i][j];
      cell.visited = false;
      cell.distance = Infinity;
      cell.previous = null;
      cell.f = Infinity;
      cell.g = Infinity;
      cell.h = Infinity;
      cell.neighbors = [];

      visualizeCell("num", "num", cell);
      if (!cell.isWall && !cell.end && !cell.start) {
        visualizeCell("cell", "cell cell-empty", cell);
      }
      if (cell.isWall && !cell.end && !cell.start) {
        visualizeCell("cell", "cell cell-wall", cell);
      }
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
  if (newCell.isWall) {
    visualizeCell("cell", "cell cell-wall-animated", cell);
  } else {
    visualizeCell("cell", "cell cell-empty", cell);
  }

  visualizeCell("num", "num", newCell);
  newCell.visited = false;

  newGrid[cell.row][cell.col] = newCell;
  window.gridComponent.setState({ grid: newGrid }, () => {
    if (window.gridComponent.state.status === "finished") {
      clearVisitedCells();
      window.gridComponent.doAlgorithm("fast");
    }
  });
}

export function visualizeCell(category, name, cell) {
  document.getElementById(
    `${category}-${cell.row}-${cell.col}`
  ).className = name;
}
