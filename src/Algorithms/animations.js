import { visualizeCell, clearVisitedCells } from "../Algorithms/methods";

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

export function animateAstarSlow(allSet) {
  console.log(allSet);
  for (let i = 0; i < allSet.length; i++) {
    setTimeout(() => {
      clearVisitedCells();
      var openSet = allSet[i][0];
      var closedSet = allSet[i][1];
      console.log(openSet.length + " " + closedSet.length);

      for (let j = 0; j < closedSet.length; j++) {
        visualizeCell("cell", "cell cell-previous", closedSet[j]);
      }
      for (let k = 0; k < openSet.length; k++) {
        visualizeCell("cell", "cell cell-current", openSet[k]);
      }
    }, 30 * i);
  }

  /* for (let i = 0; i < triedPaths.length; i++) {
    setTimeout(() => {
      for (let j = 0; j < triedPaths[i].length; j++) {
        const cell = triedPaths[i][j];
        if (!cell.isWall) {
          if (!cell.start && !cell.end) {
            visualizeCell("cell", "cell cell-previous", cell);
          }
        }
      }
    }, 1000 * i);
  }*/

  /*for (let i = 0; i <= visitedCells.length - 1; i++) {
    const cell = visitedCells[i];
    
  }*/
}

export function animateAstarFast(visitedCells) {
  for (let i = 0; i <= visitedCells.length - 1; i++) {
    const cell = visitedCells[i];
    visualizeCell("cell", "cell cell-current", cell);
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
