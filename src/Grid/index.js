import React, { Component } from "react";
import GridRow from "../GridRow";
import "./index.css";

const START_NODE_ROW = 10;
const START_NODE_COL = 4;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 25;

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: this.createGrid(props),
    };
  }

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

    grid[START_NODE_ROW][START_NODE_COL].start = true;
    grid[FINISH_NODE_ROW][FINISH_NODE_COL].end = true;

    return grid;
  };

  render() {
    let grid = this.state.grid.map((row, index) => {
      return <GridRow cells={row} key={index} />;
    });
    return <div className="grid">{grid}</div>;
  }
}

export default Grid;
