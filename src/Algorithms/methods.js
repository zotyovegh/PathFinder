import { clearVisitedCells } from "../Algorithms/cleaning";

export function createGrid(props) {
  let grid = [];

  for (let i = 0; i < props.rows; i++) {
    grid.push([]);
    for (let j = 0; j < props.columns; j++) {
      grid[i].push({
        id: 0,
        idTemp: 0,
        row: i,
        col: j,
        start: false,
        end: false,
        distance: Infinity,
        distanceTemp: Infinity,
        visited: false,
        isWall: false,
        previous: null,
        direction: "",
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
