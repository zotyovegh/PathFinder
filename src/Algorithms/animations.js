export function animateFast(visitedCells, cellsInOrder) {
  for (let i = 0; i <= visitedCells.length - 1; i++) {
    const cell = visitedCells[i];

    if (cell.start && window.gridComponent.state.previousVisualization) {
      document.getElementById(`num-${cell.row}-${cell.col}`).className =
        "num num-start";
    } else if (cell.end) {
      if (window.gridComponent.state.previousVisualization) {
        document.getElementById(`num-${cell.row}-${cell.col}`).className =
          "num num-end";
      }
      animatePathFast(cellsInOrder);
    } else if (!cell.isWall) {
      if (!cell.start && !cell.end) {
        document.getElementById(`cell-${cell.row}-${cell.col}`).className =
          "cell cell-visited";
        if (window.gridComponent.state.previousVisualization) {
          document.getElementById(`num-${cell.row}-${cell.col}`).className =
            "num num-visited";
        }
      }
    }
  }
}

function animatePathFast(cellsInOrder) {
  for (let i = 0; i < cellsInOrder.length; i++) {
    const cell = cellsInOrder[i];
    if (!cell.start && !cell.end) {
      document.getElementById(`cell-${cell.row}-${cell.col}`).className =
        "cell cell-path";
      if (window.gridComponent.state.previousVisualization) {
        document.getElementById(`num-${cell.row}-${cell.col}`).className =
          "num num-path";
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
        document.getElementById(`num-${cell.row}-${cell.col}`).className =
          "num num-start";
      }
      if (cell.end && window.gridComponent.state.previousVisualization) {
        document.getElementById(`num-${cell.row}-${cell.col}`).className =
          "num num-end";
      }
      if (!cell.isWall) {
        if (!cell.start && !cell.end) {
          document.getElementById(`cell-${cell.row}-${cell.col}`).className =
            "cell cell-visited";
          if (window.gridComponent.state.previousVisualization) {
            document.getElementById(`num-${cell.row}-${cell.col}`).className =
              "num num-visited";
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
        document.getElementById(`cell-${cell.row}-${cell.col}`).className =
          "cell cell-path";
        if (window.gridComponent.state.previousVisualization) {
          document.getElementById(`num-${cell.row}-${cell.col}`).className =
            "num num-path";
        }
      }
    }, 20 * i);
  }
}
