import { visualizeCell } from "../../methods";

export function bidirectionalSlow(main, sec, cellsInOrder) {
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
      if (i < main.length && window.gridComponent.state.previousVisualization) {
        visualizeCell("num", "num num-visited", main[i]);
      }
      if (i < sec.length && window.gridComponent.state.previousVisualization) {
        visualizeCell("num", "num num-visited", sec[i]);
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
    if (i < main.length && window.gridComponent.state.previousVisualization) {
      visualizeCell("num", "num num-visited", main[i]);
    }
    if (i < sec.length && window.gridComponent.state.previousVisualization) {
      visualizeCell("num", "num num-visited", sec[i]);
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
      if (!cell.start && !cell.end) {
        visualizeCell("cell", "cell cell-pathThirdly-animated", cell);
      }
    }, 20 * i);
  }
}

function animateBidirectionalPathFast(cellsInOrder) {
  for (let i = 0; i < cellsInOrder.length; i++) {
    const cell = cellsInOrder[i];
    if (!cell.start && !cell.end) {
      visualizeCell("cell", "cell cell-pathThird", cell);
    }
  }
}
