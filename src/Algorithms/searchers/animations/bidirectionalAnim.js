import { visualizeCell } from "../../methods";

export async function bidirectionalSlow(main, sec, cellsInOrder) {
  var length = main.length >= sec.length ? main.length : sec.length;
  for (let i = 0; i <= length; i++) {
    if (i === length) {
      animateBidirectionalPathSlow(cellsInOrder);
      await new Promise((r) => setTimeout(r, 10));
      return;
    }

    if (i < main.length && !main[i].start && !main[i].end) {
      visualizeCell("cell", "cell cell-visited-animated", main[i]);
    }
    if (i < sec.length && !sec[i].start && !sec[i].end) {
      visualizeCell("cell", "cell cell-visitedSecondary-animated", sec[i]);
    }
    if (window.gridComponent.state.previousVisualization) {
      if (i < main.length) {
        if (!main[i].start) visualizeCell("num", "num num-visited", main[i]);
        else visualizeCell("num", "num num-start", main[i]);
      }
      if (i < sec.length) {
        if (!sec[i].end) visualizeCell("num", "num num-visited", sec[i]);
        else visualizeCell("num", "num num-end", sec[i]);
      }
    }
    await new Promise((r) => setTimeout(r, 10));
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
    if (window.gridComponent.state.previousVisualization) {
      if (i < main.length) {
        if (!main[i].start) visualizeCell("num", "num num-visited", main[i]);
        else visualizeCell("num", "num num-start", main[i]);
      }
      if (i < sec.length) {
        if (!sec[i].end) visualizeCell("num", "num num-visited", sec[i]);
        else visualizeCell("num", "num num-end", sec[i]);
      }
    }
  }
}

async function animateBidirectionalPathSlow(cellsInOrder) {
  for (let i = 0; i <= cellsInOrder.length; i++) {
    if (i === cellsInOrder.length) {
      window.gridComponent.setState({ status: "finished" });
      return;
    }
    const cell = cellsInOrder[i];
    if (!cell.start && !cell.end) {
      visualizeCell("cell", "cell cell-pathThird-animated", cell);
    }
    await new Promise((r) => setTimeout(r, 20));
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
