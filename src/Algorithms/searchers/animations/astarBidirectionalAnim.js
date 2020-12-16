import { clearVisitedCells } from "../../cleaning";
import { visualizeCell } from "../../methods";
import { animateAstarPathSlow, animateAstarPathFast } from "./astarAnim";

export function animateAstarBidirectionalSlow(main, sec, cellsInOrder) {
  var length = main.length >= sec.length ? main.length : sec.length;
  for (let i = 0; i <= length; i++) {
    if (i === length) {
      setTimeout(() => {
        animateAstarPathSlow(cellsInOrder, "cell cell-pathThird-animated");
        return;
      }, 10 * i);
    }
    setTimeout(() => {
      if (i < main.length && !main[i].start && !main[i].end) {
        var openSetMain = main[i][0];
        var closedSetMain = main[i][1];
        for (let j = 0; j < closedSetMain.length; j++) {
          visualizeCell("cell", "cell cell-previous", closedSetMain[j]);
        }
        for (let k = 0; k < openSetMain.length; k++) {
          visualizeCell("cell", "cell cell-current", openSetMain[k]);
        }
        if (
          i < main.length - 1 &&
          !closedSetMain[closedSetMain.length - 1].start &&
          !closedSetMain[closedSetMain.length - 1].end
        ) {
          visualizeCell(
            "cell",
            "cell cell-activepath",
            closedSetMain[closedSetMain.length - 1]
          );
        }
      }
      if (i < sec.length && !sec[i].start && !sec[i].end) {
        var openSetSec = sec[i][0];
        var closedSetSec = sec[i][1];
        for (let j = 0; j < closedSetSec.length; j++) {
          visualizeCell("cell", "cell cell-previousSec", closedSetSec[j]);
        }
        for (let k = 0; k < openSetSec.length; k++) {
          visualizeCell("cell", "cell cell-currentSec", openSetSec[k]);
        }
        if (
          i < sec.length - 1 &&
          !closedSetSec[closedSetSec.length - 1].start &&
          !closedSetSec[closedSetSec.length - 1].end
        ) {
          visualizeCell(
            "cell",
            "cell cell-activepathSec",
            closedSetSec[closedSetSec.length - 1]
          );
        }
      }
    }, 10 * i);
  }
}

export function animateAstarBidirectionalFast(
  allSetMain,
  allSetSec,
  openSetMain,
  openSetSec,
  cellsInOrder
) {
  clearVisitedCells();
  for (let k = 0; k < allSetMain.length; k++) {
    if (!allSetMain[k].start && !allSetMain[k].end) {
      visualizeCell("cell", "cell cell-previous", allSetMain[k]);
    }
  }
  for (let k = 0; k < allSetSec.length; k++) {
    if (!allSetSec[k].start && !allSetSec[k].end) {
      visualizeCell("cell", "cell cell-previousSec", allSetSec[k]);
    }
  }
  for (let k = 0; k < openSetMain.length; k++) {
    if (!openSetMain[k].start && !openSetMain[k].end) {
      visualizeCell("cell", "cell cell-current", openSetMain[k]);
    }
  }

  for (let k = 0; k < openSetSec.length; k++) {
    if (!openSetSec[k].start && !openSetSec[k].end) {
      visualizeCell("cell", "cell cell-currentSec", openSetSec[k]);
    }
  }
  if (cellsInOrder !== null) {
    animateAstarPathFast(cellsInOrder, "cell cell-pathThird");
  }
}
