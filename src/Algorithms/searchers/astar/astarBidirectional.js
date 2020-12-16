import {
  DoBidirectionalAnimation,
  findNeighbors,
  heuristic,
  eliminateFromSet,
  dScore,
} from "./astarMethods";
export function astarBidirectional(
  grid,
  startCell,
  endCell,
  isDiagonalOn,
  optimized,
  speed
) {
  findNeighbors(grid, isDiagonalOn);
  const openSetMain = [];
  const openSetSec = [];
  const cameFromMain = [];
  const cameFromSec = [];
  var allSetMain = [];
  var allSetSec = [];
  openSetMain.push(startCell);
  openSetSec.push(endCell);
  startCell.g = 0;
  endCell.gSec = 0;
  startCell.f = heuristic(startCell, endCell, isDiagonalOn, optimized);
  endCell.fSec = heuristic(startCell, endCell, isDiagonalOn, optimized);

  while (!!openSetMain.length || !!openSetSec.length) {
    var currentMain = 0;
    var currentSec = 0;
    for (let j = 0; j < openSetMain.length; j++) {
      if (openSetMain[j].f < openSetMain[currentMain].f) {
        currentMain = j;
      }
    }
    for (let j = 0; j < openSetSec.length; j++) {
      if (openSetSec[j].f < openSetSec[currentSec].f) {
        currentSec = j;
      }
    }
    var currentCellMain = openSetMain[currentMain];
    var currentCellSec = openSetSec[currentSec];
    if (currentCellMain === endCell) {
      console.log("end found");
      DoBidirectionalAnimation(
        allSetMain,
        allSetSec,
        openSetMain,
        openSetSec,
        endCell,
        speed
      );
      // DoAnimation(allSet, openSet, endCell, speed);
      return;
    }
    if (currentCellSec === startCell) {
      console.log("start found");
      DoBidirectionalAnimation(
        allSetMain,
        allSetSec,
        openSetMain,
        openSetSec,
        startCell,
        speed
      );
      // DoAnimation(allSet, openSet, endCell, speed);
      return;
    }

    //----------------------------------------------
    //----------------------------------------------
    if (!!openSetMain.length) {
      eliminateFromSet(openSetMain, currentCellMain);
      var neighborsMain = currentCellMain.neighbors;

      for (let k = 0; k < neighborsMain.length; k++) {
        var neighborMain = neighborsMain[k];
        if (
          !(neighborMain.isWall && !neighborMain.start && !neighborMain.end)
        ) {
          var tentative_gScoreMain =
            currentCellMain.g +
            dScore(neighborMain, currentCellMain, optimized);
          if (tentative_gScoreMain < neighborMain.g) {
            cameFromMain.push(neighborMain);
            neighborMain.g = tentative_gScoreMain;
            neighborMain.h = heuristic(
              neighborMain,
              endCell,
              isDiagonalOn,
              optimized
            );
            neighborMain.f = neighborMain.g + neighborMain.h;
            neighborMain.previous = currentCellMain;
            if (!openSetMain.includes(neighborMain)) {
              openSetMain.push(neighborMain);
              if (speed === "slow") {
                allSetMain.push([openSetMain.slice(0), cameFromMain.slice(0)]);
              } else if (speed === "fast") {
                allSetMain.push(neighborMain);
              }
            }
          }
        }
      }
    }
    //----------------------------------------------
    //----------------------------------------------
    //----------------------------------------------
    //----------------------------------------------
    //----------------------------------------------
    if (!!openSetSec.length) {
      var neighborsSec = currentCellSec.neighbors;
      eliminateFromSet(openSetSec, currentCellSec);

      for (let k = 0; k < neighborsSec.length; k++) {
        var neighborSec = neighborsSec[k];
        if (!(neighborSec.isWall && !neighborSec.start && !neighborSec.end)) {
          var tentative_gScoreSec =
            currentCellSec.gSec +
            dScore(neighborSec, currentCellSec, optimized);
          if (tentative_gScoreSec < neighborSec.gSec) {
            cameFromSec.push(neighborSec);
            neighborSec.gSec = tentative_gScoreSec;
            neighborSec.hSec = heuristic(
              neighborSec,
              endCell,
              isDiagonalOn,
              optimized
            );
            neighborSec.fSec = neighborSec.gSec + neighborSec.hSec;
            neighborSec.previous = currentCellSec;
            if (!openSetSec.includes(neighborSec)) {
              openSetSec.push(neighborSec);
              if (speed === "slow") {
                allSetSec.push([openSetSec.slice(0), cameFromSec.slice(0)]);
              } else if (speed === "fast") {
                allSetSec.push(neighborSec);
              }
            }
          }
        }
      }
    }
  }
  console.log("finish in the end");
  DoBidirectionalAnimation(
    allSetMain,
    allSetSec,
    openSetMain,
    openSetSec,
    endCell,
    speed
  );
  // DoAnimation(allSet, openSet, endCell, speed);
}
