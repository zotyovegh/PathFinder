import { clearVisitedCells } from "../../cleaning";
import { visualizeCell } from "../../methods";

export function animateAstarBidirectionalSlow(main, sec, cellsInOrder) {
  var length = main.length >= sec.length ? main.length : sec.length;
  for (let i = 0; i <= length; i++) {
    if (i === length) {
      return;
    }
    setTimeout(() => {
      clearVisitedCells();

      if (i < main.length && !main[i].start && !main[i].end) {
        var openSetMain = main[i][0];
        var closedSetMain = main[i][1];
        for (let j = 0; j < closedSetMain.length; j++) {
          visualizeCell("cell", "cell cell-previous", closedSetMain[j]);
        }
        for (let k = 0; k < openSetMain.length; k++) {
          visualizeCell("cell", "cell cell-current", openSetMain[k]);
        }
      }
      if (i < sec.length && !sec[i].start && !sec[i].end) {
        var openSetSec = sec[i][0];
        var closedSetSec = sec[i][1];
        for (let j = 0; j < closedSetSec.length; j++) {
          visualizeCell("cell", "cell cell-previous", closedSetSec[j]);
        }
        for (let k = 0; k < openSetSec.length; k++) {
          visualizeCell("cell", "cell cell-current", openSetSec[k]);
        }
      }

      /* if (
        i < allSet.length - 1 &&
        !closedSet[closedSet.length - 1].start &&
        !closedSet[closedSet.length - 1].end
      ) {
        visualizeCell(
          "cell",
          "cell cell-activepath",
          closedSet[closedSet.length - 1]
        );
      }*/
    }, 10 * i);
  }
}
