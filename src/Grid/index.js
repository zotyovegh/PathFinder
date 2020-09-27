import React, { Component } from "react";
import GridRow from "../GridRow";
import "./index.css";
import { dijkstra } from "../Methods/methods";

const START_CELL_ROW = 10;
const START_CELL_COL = 4;
const FINISH_CELL_ROW = 10;
const FINISH_CELL_COL = 25;

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: this.createGrid(props),
      isMouseDown: false,
    };
  }

  onMouseDown = (cell) => {
    console.log("down");

    let newGrid = this.manageWall(cell);
    this.setState({ grid: newGrid, isMouseDown: true });
  };
  onMouseEnter = (cell) => {
    console.log("enter");
    if (cell.start || cell.end) {
      return;
    }
    if (this.state.isMouseDown) {
      let newGrid = this.manageWall(cell);
      this.setState({ grid: newGrid });
    }
  };
  onMouseUp = () => {
    console.log("up");
    this.setState({ isMouseDown: false });
  };

  manageWall = (cell) => {
    let newCell = cell;
    let newGrid = this.state.grid;
    newCell.isWall = !newCell.isWall;
    newCell.visited = false;
    newGrid[cell.row][cell.col] = newCell;
    return newGrid;
  };

  doDijkstra = () => {
    const { grid } = this.state;
    const startCell = grid[START_CELL_ROW][START_CELL_COL];
    const finishCell = grid[FINISH_CELL_ROW][FINISH_CELL_COL];
    const visitedCells = dijkstra(grid, startCell, finishCell);
    for (let i = 0; i <= visitedCells.length - 1; i++) {
      setTimeout(() => {
        const cell = visitedCells[i];
        if (!cell.start && !cell.end) {
          document.getElementById(`cell-${cell.row}-${cell.col}`).id =
            "visited";
        }
      }, 5 * i);
    }
  };

  createGrid = (props) => {
    let grid = [];

    for (let i = 0; i < props.rows; i++) {
      grid.push([]);
      for (let j = 0; j < props.columns; j++) {
        grid[i].push({
          row: i,
          col: j,
          start: false,
          end: false,
          distance: Infinity,
          visited: false,
          isWall: false,
        });
      }
    }

    grid[START_CELL_ROW][START_CELL_COL].start = true;
    grid[FINISH_CELL_ROW][FINISH_CELL_COL].end = true;

    return grid;
  };

  render() {
    let grid = this.state.grid.map((row, index) => {
      return (
        <GridRow
          row={index}
          cells={row}
          key={index}
          onMouseDown={this.onMouseDown}
          onMouseEnter={this.onMouseEnter}
          onMouseUp={this.onMouseUp}
        />
      );
    });
    return (
      <div>
        <div className="grid">{grid}</div>
        <button onClick={this.doDijkstra}>Dijkstra</button>
      </div>
    );
  }
}

export default Grid;
