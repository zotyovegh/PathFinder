import { visualizeCell } from "../methods";
import { clearVisitedCells } from "../cleaning";

export function bidirectionalSlow(main, sec, cellsInOrder) {
  console.log(cellsInOrder.length);
  var length = main.length >= sec.length ? main.length : sec.length;
  for (let i = 0; i <= length; i++) {
    if (i === length) {
      setTimeout(() => {
        animateBidirectionalPathSlow(cellsInOrder);
      }, 10 * i);
      return;
    }
    setTimeout(() => {
      if (i < main.length && !main[i].start && !main[i].end) {
        visualizeCell("cell", "cell cell-visited-animated", main[i]);
      }
      if (i < sec.length && !sec[i].start && !sec[i].end) {
        visualizeCell("cell", "cell cell-visitedSecondary-animated", sec[i]);
      }
    }, 10 * i);
  }
}
export function bidirectionalFast(main, sec, cellsInOrder) {
  var length = main.length >= sec.length ? main.length : sec.length;
  for (let i = 0; i <= length; i++) {
    if (i === length) {
      animateBidirectionalPathFast(cellsInOrder);
    }

    if (i < main.length && !main[i].start && !main[i].end) {
      visualizeCell("cell", "cell cell-visited", main[i]);
    }
    if (i < sec.length && !sec[i].start && !sec[i].end) {
      visualizeCell("cell", "cell cell-visitedSec", sec[i]);
    }
  }
}

function animateBidirectionalPathSlow(cellsInOrder) {
  for (let i = 0; i <= cellsInOrder.length; i++) {
    setTimeout(() => {
      if (i === cellsInOrder.length) {
        window.gridComponent.setState({ status: "finished" });
        return;
      }
      const cell = cellsInOrder[i];
      visualizeCell("cell", "cell cell-pathThirdly-animated", cell);
      if (window.gridComponent.state.previousVisualization) {
        visualizeCell("num", "num num-path", cell);
      }
    }, 20 * i);
  }
}

function animateBidirectionalPathFast(cellsInOrder) {
  for (let i = 0; i < cellsInOrder.length; i++) {
    const cell = cellsInOrder[i];
    visualizeCell("cell", "cell cell-pathThird", cell);
    if (window.gridComponent.state.previousVisualization) {
      visualizeCell("num", "num num-path", cell);
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
  for (let i = 0; i < visitedCells.length; i++) {
    const cell = visitedCells[i];

    if (cell.start && window.gridComponent.state.previousVisualization) {
      visualizeCell("num", "num num-start", cell);
    } else if (!cell.end && !cell.start) {
      visualizeCell("cell", "cell cell-visited", cell);
      if (window.gridComponent.state.previousVisualization) {
        visualizeCell("num", "num num-visited", cell);
      }
    } else {
      if (window.gridComponent.state.previousVisualization) {
        visualizeCell("num", "num num-end", cell);
      }
      animatePathFast(cellsInOrder);
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
        animateAstarPathSlow(cellsInOrder);
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
  animateAstarPathFast(cellsInOrder);
}

function animateAstarPathFast(cellsInOrder) {
  for (let i = 0; i < cellsInOrder.length; i++) {
    const cell = cellsInOrder[i];
    if (!cell.start && !cell.end) {
      visualizeCell("cell", "cell cell-pathSec", cell);
    }
  }
}

function animateAstarPathSlow(cellsInOrder) {
  for (let i = 0; i <= cellsInOrder.length; i++) {
    setTimeout(() => {
      if (i === cellsInOrder.length) {
        window.gridComponent.setState({ status: "finished" });
        return;
      }
      const cell = cellsInOrder[i];
      if (!cell.start && !cell.end) {
        visualizeCell("cell", "cell cell-pathSecondary-animated", cell);
      }
    }, 20 * i);
  }
}
