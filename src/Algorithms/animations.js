import { visualizeCell } from "../Algorithms/methods";
import { clearVisitedCells } from "../Algorithms/cleaning";

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
    }, 10 * i);
  }
}

function animatePathSlow(cellsInOrder) {
  for (let i = 0; i <= cellsInOrder.length; i++) {
    setTimeout(() => {
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
    }, 20 * i);
  }
}

export function animateFast(visitedCells, cellsInOrder) {
  for (let i = 0; i <= visitedCells.length - 1; i++) {
    const cell = visitedCells[i];

    if (cell.start && window.gridComponent.state.previousVisualization) {
      visualizeCell("num", "num num-start", cell);
    } else if (cell.end) {
      if (window.gridComponent.state.previousVisualization) {
        visualizeCell("num", "num num-end", cell);
      }
      animatePathFast(cellsInOrder);
    } else if (!cell.isWall) {
      if (!cell.start && !cell.end) {
        visualizeCell("cell", "cell cell-visited", cell);
        if (window.gridComponent.state.previousVisualization) {
          visualizeCell("num", "num num-visited", cell);
        }
      }
    }
  }
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

export function animateAstarSlow(allSet, cellsInOrder) {
  for (let i = 0; i <= allSet.length; i++) {
    if (i === allSet.length) {
      setTimeout(() => {
        animatePathSlow(cellsInOrder);
      }, 10 * i);
      return;
    }
    setTimeout(() => {
      clearVisitedCells();
      var openSet = allSet[i][0];
      var closedSet = allSet[i][1];

      for (let j = 0; j < closedSet.length; j++) {
        if (!closedSet[j].start && !closedSet[j].end) {
          visualizeCell("cell", "cell cell-previous", closedSet[j]);
        }
      }
      for (let k = 0; k < openSet.length; k++) {
        if (!openSet[k].start && !openSet[k].end) {
          visualizeCell("cell", "cell cell-current", openSet[k]);
        }
      }
      if (
        i < allSet.length - 1 &&
        !closedSet[closedSet.length - 1].start &&
        !closedSet[closedSet.length - 1].end
      ) {
        visualizeCell(
          "cell",
          "cell cell-activepath",
          closedSet[closedSet.length - 1]
        );
      }
    }, 10 * i);
  }
}

export function animateAstarFast(allSet, openSet, cellsInOrder) {
  clearVisitedCells();
  for (let k = 0; k < allSet.length; k++) {
    if (!allSet[k].start && !allSet[k].end) {
      visualizeCell("cell", "cell cell-previous", allSet[k]);
    }
  }
  for (let k = 0; k < openSet.length; k++) {
    if (!openSet[k].start && !openSet[k].end) {
      visualizeCell("cell", "cell cell-current", openSet[k]);
    }
  }
  animatePathFast(cellsInOrder);
}

export function visualizePrim(grid, path) {
  window.gridComponent.setState({ status: "running" });
  for (const row of grid) {
    for (const cell of row) {
      if (!cell.end && !cell.start) {
        visualizeCell("cell", "cell cell-wall", cell);
      }
    }
  }

  for (let i = 0; i <= path.length; i++) {
    setTimeout(() => {
      if (i === path.length) {
        window.gridComponent.setState({ status: "finished" });
        return;
      }
      if (!path[i].end && !path[i].start) {
        visualizeCell("cell", "cell cell-empty", path[i]);
      }
    }, 8 * i);
  }
}

export function visualizeRandom(grid, path) {
  window.gridComponent.setState({ status: "running" });
  for (const row of grid) {
    for (const cell of row) {
      if (!cell.end && !cell.start) {
        visualizeCell("cell", "cell cell-empty", cell);
      }
    }
  }

  for (let i = 0; i <= path.length; i++) {
    setTimeout(() => {
      if (i === path.length) {
        window.gridComponent.setState({ status: "finished" });
        return;
      }
      if (!path[i].end && !path[i].start) {
        visualizeCell("cell", "cell cell-wall", path[i]);
      }
    }, 8 * i);
  }
}

