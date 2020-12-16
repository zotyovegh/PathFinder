import { visualizeCell } from "../../methods";
import { clearVisitedCells } from "../../cleaning";

export function animateAstarSlow(allSet, cellsInOrder) {
  for (let i = 0; i <= allSet.length; i++) {
    if (i === allSet.length) {
      setTimeout(() => {
        animateAstarPathSlow(cellsInOrder, "cell cell-path-animated");
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
  animateAstarPathFast(cellsInOrder, "cell cell-path");
}

export function animateAstarPathFast(cellsInOrder, type) {
  for (let i = 0; i < cellsInOrder.length; i++) {
    const cell = cellsInOrder[i];
    if (!cell.start && !cell.end) {
      visualizeCell("cell", type, cell);
    }
  }
}

export function animateAstarPathSlow(cellsInOrder, type) {
  for (let i = 0; i <= cellsInOrder.length; i++) {
    setTimeout(() => {
      if (i === cellsInOrder.length) {
        window.gridComponent.setState({ status: "finished" });
        return;
      }
      const cell = cellsInOrder[i];
      if (!cell.start && !cell.end) {
        visualizeCell("cell", type, cell);
      }
    }, 20 * i);
  }
}
