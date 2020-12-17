import { clearVisitedCells } from "../cleaning";
import { visualizeCell } from "../methods";
export async function visualizeOnWalledGrid(grid, path) {
  window.gridComponent.setState({ status: "running" });
  for (const row of grid) {
    for (const cell of row) {
      if (!cell.end && !cell.start) {
        visualizeCell("cell", "cell cell-wall", cell);
      }
    }
  }

  for (let i = 0; i <= path.length; i++) {
  
      if (i === path.length) {
        window.gridComponent.setState({ status: "pending" });
        clearVisitedCells();
        return;
      }
      if (!path[i].end && !path[i].start) {
        visualizeCell("cell", "cell cell-empty", path[i]);
      }
      await new Promise((r) => setTimeout(r, 10));
  }
}

export function visualizeRandom(grid, path) {
  window.gridComponent.setState({ status: "running" });
  for (const row of grid) {
    for (const cell of row) {
      if (!cell.end && !cell.start) {
        visualizeCell("cell", "cell cell-empty", cell);
      }
    }
  }

  for (let i = 0; i <= path.length; i++) {
    setTimeout(() => {
      if (i === path.length) {
        window.gridComponent.setState({ status: "pending" });
        clearVisitedCells();
        return;
      }
      if (!path[i].end && !path[i].start) {
        visualizeCell("cell", "cell cell-wall", path[i]);
      }
    }, 8 * i);
  }
}

export async function visualizeABMaze(grid, path) {
  window.gridComponent.setState({ status: "running" });
  for (const row of grid) {
    for (const cell of row) {
      if (!cell.end && !cell.start) {
        visualizeCell("cell", "cell cell-wall", cell);
      }
    }
  }
  var previous = null;
  for (let i = 0; i <= path.length; i++) {
    if (i === path.length) {
      window.gridComponent.setState({ status: "pending" });
      visualizeCell("cell", "cell cell-empty", path[path.length - 1]);
      clearVisitedCells();
      return;
    }
    if (previous !== null) {
      if (previous.isWall) {
        visualizeCell("cell", "cell cell-wall", previous);
      } else {
        visualizeCell("cell", "cell cell-empty", previous);
      }
    }
    if (!path[i].end && !path[i].start) {
      visualizeCell("cell", "cell cell-currentSec", path[i]);
      previous = path[i];
    }
    await new Promise((r) => setTimeout(r, 10));
  }
}

export async function visualizeWilson(grid, path) {
  window.gridComponent.setState({ status: "running" });
  for (const row of grid) {
    for (const cell of row) {
      if (!cell.end && !cell.start) {
        visualizeCell("cell", "cell cell-wall", cell);
      }
    }
  }

  for (let i = 0; i <= path.length; i++) {
    if (i === path.length) {
      window.gridComponent.setState({ status: "pending" });
      clearVisitedCells();
      return;
    }
    var previous = null;
    var currentPath = path[i][0];
    var isOptimalPath = path[i][1];
    var aim = path[i][2] === null ? null : path[i][2];

    var type =
      aim === null
        ? null
        : document.getElementById(`${"cell"}-${aim.row}-${aim.col}`).className;
    if (aim !== null) {
      if (!aim.end && !aim.start) {
        visualizeCell("cell", "cell cell-previousSec", aim);
      }
    }

    if (!isOptimalPath) {
      for (let j = 0; j < currentPath.length; j++) {
        if (previous !== null) {
          visualizeCell("cell", "cell cell-currentSec", previous);
        }

        if (!currentPath[j].end && !currentPath[j].start) {
          visualizeCell("cell", "cell cell-previousSec", currentPath[j]);
          previous = currentPath[j];
        }

        if (currentPath[j] !== currentPath.length - 1) {
          await new Promise((r) => setTimeout(r, 5));
        }
      }
    }
    if (aim !== null) {
      if (!aim.end && !aim.start) {
        if (type === "cell cell-wall") {
          visualizeCell("cell", "cell cell-wall", aim);
        } else {
          visualizeCell("cell", "cell cell-empty", aim);
        }
      }
    }

    for (let j = currentPath.length - 1; j >= 0; j--) {
      if (!currentPath[j].end && !currentPath[j].start) {
        if (!isOptimalPath) {
          visualizeCell("cell", "cell cell-wall", currentPath[j]);
        } else {
          visualizeCell("cell", "cell cell-empty", currentPath[j]);
        }
      }
    }
  }
}

export async function visualizeOnEmptyGrid(grid, path) {
  window.gridComponent.setState({ status: "running" });
  for (const row of grid) {
    for (const cell of row) {
      if (!cell.end && !cell.start) {
        visualizeCell("cell", "cell cell-empty", cell);
      }
    }
  }

  for (let i = 0; i <= path.length; i++) {
    if (i === path.length) {
      window.gridComponent.setState({ status: "pending" });
      clearVisitedCells();
      return;
    }
    if (!path[i].end && !path[i].start) {
      visualizeCell("cell", "cell cell-wall", path[i]);
    }
    await new Promise((r) => setTimeout(r, 10));
  }
}
