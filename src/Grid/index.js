import React, { Component } from "react";
import GridRow from "../GridRow";
import "./index.css";
import { dijkstra } from "../Methods/methods";

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: this.createGrid(props),
      isMouseDown: false,
      isStartOn: false,
      isEndOn: false,
      startRow: props.startR,
      startCol: props.startC,
      endRow: props.endR,
      endCol: props.endC,
      status: "pending",
    };
  }

  onMouseDown = (cell) => {
    if (this.state.status === "running") {
      return;
    }
    this.setState({ isMouseDown: true });
    if (cell.start) {
      this.setState({ isStartOn: true });
      return;
    }
    if (cell.end) {
      this.setState({ isEndOn: true });
      return;
    }
    this.manageWall(cell);
  };
  onMouseEnter = (cell) => {
    if (this.state.status === "running") {
      return;
    }
    if (this.state.isMouseDown) {
      if (cell.start || cell.end) {
        return;
      }
      if (this.state.isStartOn) {
        let newGrid = this.state.grid.slice();
        newGrid[this.state.startRow][this.state.startCol].start = false;
        newGrid[cell.row][cell.col].start = true;
        newGrid[cell.row][cell.col].isWall = false;
        this.setState({
          grid: newGrid,
          startRow: cell.row,
          startCol: cell.col,
        });
        if (this.state.status === "finished") {
          this.clearGrid();
          this.doDijkstraFast();
        }

        return;
      } else if (this.state.isEndOn) {
        let newGrid = this.state.grid.slice();
        newGrid[this.state.endRow][this.state.endCol].end = false;
        newGrid[cell.row][cell.col].end = true;
        newGrid[cell.row][cell.col].isWall = false;
        this.setState({
          grid: newGrid,
          endRow: cell.row,
          endCol: cell.col,
        });
        if (this.state.status === "finished") {
          this.clearGrid();
          this.doDijkstraFast();
        }
        return;
      }

      this.manageWall(cell);
    }
  };
  onMouseUp = () => {
    if (this.state.status === "running") {
      return;
    }
    this.setState({ isMouseDown: false, isStartOn: false, isEndOn: false });
  };

  manageWall = (cell) => {
    let newCell = cell;
    let newGrid = this.state.grid;
    newCell.isWall = !newCell.isWall;
    newCell.visited = false;
    newGrid[cell.row][cell.col] = newCell;
    this.setState({ grid: newGrid });
  };

  doDijkstra = () => {
    if (this.state.status === "running") {
      return;
    }
    if (this.state.status === "finished") {
      console.log("again");
      this.clearGrid();
    } else {
      console.log("first");
    }

    this.setState({ status: "running" });

    const { grid } = this.state;
    const startCell = grid[this.state.startRow][this.state.startCol];
    const finishCell = grid[this.state.endRow][this.state.endCol];
    const visitedCells = dijkstra(grid, startCell, finishCell);
    for (let i = 0; i <= visitedCells.length - 1; i++) {
      setTimeout(() => {
        const cell = visitedCells[i];
        const grid = this.state.grid;

        grid[cell.row][cell.col].visited = true;
        this.setState({ grid: grid });
        if (i === visitedCells.length - 1) {
          this.setState({ status: "finished" });
        }
      }, 13 * i);
    }
  };

  doDijkstraFast = () => {
    const { grid } = this.state;
    const startCell = grid[this.state.startRow][this.state.startCol];
    const finishCell = grid[this.state.endRow][this.state.endCol];
    const visitedCells = dijkstra(grid, startCell, finishCell);
    for (let i = 0; i <= visitedCells.length - 1; i++) {
      const cell = visitedCells[i];
      const grid = this.state.grid;

      grid[cell.row][cell.col].visited = true;
      this.setState({ grid: grid });
    }
  };

  clearGrid = () => {
    let newGrid = this.state.grid;
    for (let i = 0; i < this.props.rows; i++) {
      for (let j = 0; j < this.props.columns; j++) {
        newGrid[i][j].visited = false;
        newGrid[i][j].distance = Infinity;
      }
    }
    this.setState({ grid: newGrid });
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

    grid[props.startR][props.startC].start = true;
    grid[props.endR][props.endC].end = true;

    return grid;
  };

  render() {
    let grid = this.state.grid.map((row, index) => {
      return (
        <GridRow
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
        <div className="grid" onMouseLeave={this.onMouseUp}>
          {grid}
        </div>
        <button onClick={this.doDijkstra}>Dijkstra</button>
        <button onClick={this.clearGrid}>Clear grid</button>
      </div>
    );
  }
}

export default Grid;
