import {
  DoBidirectionalAnimation,
  getMainUnvisitedNeighbors,
  getSecUnvisitedNeighbors,
} from "./dijkstraBidMethods";

export function dijkstraBidirectional(
  grid,
  startCell,
  endCell,
  isDiagonalOn,
  speed
) {
  var meetingCell = null;
  var isFinished;
  var idMain = 0;
  var idSec = 0;
  isFinished = false;
  const unvisitedCellsMain = [];
  const unvisitedCellsSec = [];
  const visitedCellsMain = [];
  const visitedCellsSec = [];
  var directionMain = "START";
  var directionSec = "START";
  var previousRowMain = startCell.row;
  var previousRowSec = endCell.row;
  startCell.distance = 0;
  endCell.distanceSec = 0;

  for (const row of grid) {
    for (const cell of row) {
      unvisitedCellsMain.push(cell);
      unvisitedCellsSec.push(cell);
    }
  }

  while (!!unvisitedCellsMain.length || !!unvisitedCellsSec.length) {
    if (isFinished) {
      DoBidirectionalAnimation(
        visitedCellsMain,
        visitedCellsSec,
        speed,
        meetingCell
      );

      return;
    }
    if (!!unvisitedCellsMain.length) {
      unvisitedCellsMain.sort((cell1, cell2) => cell1.id - cell2.id);
      unvisitedCellsMain.sort(
        (cell1, cell2) => cell1.distance - cell2.distance
      );

      const nextMainCell = unvisitedCellsMain.shift();
      if (nextMainCell.visitedSec) {
        isFinished = true;
        meetingCell = nextMainCell;
      }
      if (directionMain !== "START") {
        if (nextMainCell.row < previousRowMain) {
          directionMain = "UP";
        } else {
          directionMain = "DOWN";
        }
      }

      if (!(nextMainCell.isWall && !nextMainCell.start && !nextMainCell.end)) {
        if (nextMainCell.distance === Infinity) {
          DoBidirectionalAnimation(
            visitedCellsMain,
            visitedCellsSec,
            speed,
            meetingCell
          );

          return;
        }
        nextMainCell.visited = true;
        visitedCellsMain.push(nextMainCell);
        if (nextMainCell === endCell) {
          unvisitedCellsMain.sort((cell1, cell2) => cell1.id - cell2.id);

          DoBidirectionalAnimation(
            visitedCellsMain,
            visitedCellsSec,
            speed,
            meetingCell
          );

          return;
        }

        idMain = getMainUnvisitedNeighbors(
          nextMainCell,
          grid,
          directionMain,
          isDiagonalOn,
          "MAIN",
          idMain
        );
        if (directionMain !== "START") {
          previousRowMain = nextMainCell.row;
        }
        directionMain = "CHANGED";
      }
    }

    //*****************
    if (!!unvisitedCellsSec.length) {
      unvisitedCellsSec.sort((cell1, cell2) => cell1.idSec - cell2.idSec);
      unvisitedCellsSec.sort(
        (cell1, cell2) => cell1.distanceSec - cell2.distanceSec
      );

      const nextSecCell = unvisitedCellsSec.shift();
      if (nextSecCell.visited) {
        isFinished = true;
        meetingCell = nextSecCell;
      }
      if (directionSec !== "START") {
        if (nextSecCell.row < previousRowSec) {
          directionSec = "UP";
        } else {
          directionSec = "DOWN";
        }
      }

      if (!(nextSecCell.isWall && !nextSecCell.start && !nextSecCell.end)) {
        if (nextSecCell.distanceSec === Infinity) {
          DoBidirectionalAnimation(
            visitedCellsMain,
            visitedCellsSec,
            speed,
            meetingCell
          );
          return;
        }
        nextSecCell.visitedSec = true;
        visitedCellsSec.push(nextSecCell);
        if (nextSecCell === startCell) {
          unvisitedCellsSec.sort((cell1, cell2) => cell1.idSec - cell2.idSec);
          DoBidirectionalAnimation(
            visitedCellsMain,
            visitedCellsSec,
            speed,
            meetingCell
          );
          return;
        }

        idSec = getSecUnvisitedNeighbors(
          nextSecCell,
          grid,
          directionSec,
          isDiagonalOn,
          "SEC",
          idSec
        );
        if (directionSec !== "START") {
          previousRowSec = nextSecCell.row;
        }
        directionSec = "CHANGED";
      }
    }
  }
}
