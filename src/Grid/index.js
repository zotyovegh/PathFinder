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
    };
  }

  doDijkstra = () => {
    const startCell = this.state.grid[START_CELL_ROW][START_CELL_COL];
    const finishCell = this.state.grid[FINISH_CELL_ROW][FINISH_CELL_COL];
    const visitedCells = dijkstra(this.state.grid, startCell, finishCell);
    console.log(visitedCells);
    for (let i = 0; i <= visitedCells.length-1; i++) {
      setTimeout(() => {
        const cell = visitedCells[i];
        const grid = this.state.grid.slice();

        console.log(cell);
        grid[cell.y][cell.x].visited = true;
        this.setState({ grid: grid });
      }, 10 * i);
    }
  };

  createGrid = (props) => {
    let grid = [];

    for (let i = 0; i < props.rows; i++) {
      grid.push([]);
      for (let j = 0; j < props.columns; j++) {
        grid[i].push({
          x: j,
          y: i,
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
      return <GridRow cells={row} key={index} />;
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
