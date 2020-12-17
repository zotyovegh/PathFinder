import { visualizeCell } from "../../methods";

export async function animateSlow(visitedCells, cellsInOrder) {
  for (let i = 0; i <= visitedCells.length; i++) {
    const cell = visitedCells[i];
    if (i === visitedCells.length) {
      animatePathSlow(cellsInOrder);
      await new Promise((r) => setTimeout(r, 10));
      return;
    }

    if (cell.start && window.gridComponent.state.previousVisualization) {
      visualizeCell("num", "num num-start", cell);
    }
    if (cell.end && window.gridComponent.state.previousVisualization) {
      visualizeCell("num", "num num-end", cell);
    }
    if (!cell.isWall) {
      if (!cell.start && !cell.end) {
        visualizeCell("cell", "cell cell-visited-animated", cell);
        if (window.gridComponent.state.previousVisualization) {
          visualizeCell("num", "num num-visited", cell);
        }
      }
    }
    await new Promise((r) => setTimeout(r, 10));
  }
}

async function animatePathSlow(cellsInOrder) {
  for (let i = 0; i <= cellsInOrder.length; i++) {
    if (i === cellsInOrder.length) {
      window.gridComponent.setState({ status: "finished" });
      return;
    }
    const cell = cellsInOrder[i];
    if (!cell.start && !cell.end) {
      visualizeCell("cell", "cell cell-path-animated", cell);
      if (window.gridComponent.state.previousVisualization) {
        visualizeCell("num", "num num-path", cell);
      }
    }
    await new Promise((r) => setTimeout(r, 20));
  }
}

export function animateFast(visitedCells, cellsInOrder) {
  for (let i = 0; i < visitedCells.length; i++) {
    const cell = visitedCells[i];

    if (cell.start && window.gridComponent.state.previousVisualization) {
      visualizeCell("num", "num num-start", cell);
    } else if (!cell.end && !cell.start && !cell.isWall) {
      visualizeCell("cell", "cell cell-visited", cell);
      if (window.gridComponent.state.previousVisualization) {
        visualizeCell("num", "num num-visited", cell);
      }
    } else {
      if (window.gridComponent.state.previousVisualization) {
        visualizeCell("num", "num num-end", cell);
      }
    }
  }
  animatePathFast(cellsInOrder);
}

function animatePathFast(cellsInOrder) {
  for (let i = 0; i < cellsInOrder.length; i++) {
    const cell = cellsInOrder[i];
    if (!cell.start && !cell.end) {
      visualizeCell("cell", "cell cell-path", cell);
      if (window.gridComponent.state.previousVisualization) {
        visualizeCell("num", "num num-path", cell);
      }
    }
  }
}
