import { visualizeCell, createGrid } from "../Algorithms/methods";

export function clearWithStatus(type) {
  if (type === "path") {
    clearVisitedCells();
  } else if (type === "grid") {
    clearBoard(window.gridComponent.props);
  }
  window.gridComponent.setState({ status: "pending" });
}

export function clearVisitedCells() {
  let newGrid = window.gridComponent.state.grid;
  for (let i = 0; i < window.gridComponent.props.rows; i++) {
    for (let j = 0; j < window.gridComponent.props.columns; j++) {
      let cell = newGrid[i][j];
      cell.id = 0;
      cell.idSec = 0;
      cell.distance = Infinity;
      cell.distanceSec = Infinity;
      cell.visited = false;
      cell.visitedSec = false;
      cell.previous = null;
      cell.previousSec = null;
      cell.direction = "";
      cell.directionSec = "";
      cell.f = Infinity;
      cell.fSec = Infinity;
      cell.g = Infinity;
      cell.gSec = Infinity;
      cell.h = Infinity;
      cell.hSec = Infinity;
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
  for (const row of window.gridComponent.state.grid) {
    for (const cell of row) {
      if (!cell.end && !cell.start) {
        visualizeCell("cell", "cell cell-empty", cell);
      }
    }
  }
}

export function clearInfinityVariables(grid) {
  for (const row of grid) {
    for (const cell of row) {
      cell.distance = Infinity;
      cell.f = Infinity;
      cell.g = Infinity;
      cell.h = Infinity;
      cell.visited = false;
      cell.id = 0;
    }
  }
  window.gridComponent.setState({ grid: grid });
}
