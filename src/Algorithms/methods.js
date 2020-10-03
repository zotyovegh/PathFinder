export function getCellsInOrder(endCell) {
  const cells = [];
  let cell = endCell;
  while (cell !== null) {
    cells.unshift(cell);
    cell = cell.previous;
  }
  return cells;
}

export function animateFast(visitedCells, cellsInOrder){
  for (let i = 0; i <= visitedCells.length - 1; i++) {
    const cell = visitedCells[i];

    if (!cell.start && !cell.end) {
      document.getElementById(`cell-${cell.row}-${cell.col}`).className =
        "cell cell-visited";
    }
    if (cell.end) {
      animatePathFast(cellsInOrder);
      return;
    }
  }
};

function animatePathFast(cellsInOrder){
  for (let i = 0; i < cellsInOrder.length; i++) {
    const cell = cellsInOrder[i];
    if (!cell.start && !cell.end) {
      document.getElementById(`cell-${cell.row}-${cell.col}`).className =
        "cell cell-path";
    }
  }
};