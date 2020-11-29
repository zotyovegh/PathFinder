import { visualizeCell } from "../methods";
export function visualizeOnWalledGrid(grid, path) {
  window.gridComponent.setState({ status: "running" });
  for (const row of grid) {
    for (const cell of row) {
      if (!cell.end && !cell.start) {
        visualizeCell("cell", "cell cell-wall", cell);
      }
    }
  }

  for (let i = 0; i <= path.length; i++) {
    setTimeout(() => {
      if (i === path.length) {
        window.gridComponent.setState({ status: "pending" });
        return;
      }
      if (!path[i].end && !path[i].start) {
        visualizeCell("cell", "cell cell-empty", path[i]);
      }
    }, 20 * i);
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
        return;
      }
      if (!path[i].end && !path[i].start) {
        visualizeCell("cell", "cell cell-wall", path[i]);
      }
    }, 8 * i);
  }
}

export function visualizeABMaze(grid, path) {
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
    setTimeout(() => {
      if (i === path.length) {
        window.gridComponent.setState({ status: "pending" });
        visualizeCell("cell", "cell cell-empty", path[path.length - 1]);
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
        visualizeCell("cell", "cell cell-current", path[i]);
        previous = path[i];
      }
    }, 10 * i);
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
      return;
    }
    var previous = null;
    var currentPath = path[i][0];
    var isOptimalPath = path[i][1];
    if (!isOptimalPath) {
      for (let j = currentPath.length - 1; j > 0; j--) {
        if (previous !== null) {
          visualizeCell("cell", "cell cell-current", previous);
        }

        if (!currentPath[j].end && !currentPath[j].start) {
          visualizeCell("cell", "cell cell-previous", currentPath[j]);
          previous = currentPath[j];
        }

        if (currentPath[j] !== currentPath.length - 1) {
          await new Promise((r) => setTimeout(r, 5));
        }
      }
    }

    for (let j = 0; j < currentPath.length; j++) {
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

export function visualizeOnEmptyGrid(grid, path) {
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
        return;
      }
      if (!path[i].end && !path[i].start) {
        visualizeCell("cell", "cell cell-wall", path[i]);
      }
    }, 10 * i);
  }
}
