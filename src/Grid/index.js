import React, { Component } from "react";
import Cell from "../Cell";
import "./index.css";
import {
  getCellsInOrder,
  clearVisitedCells,
  createGrid,
  clearBoard,
  placeWall,
} from "../Algorithms/methods";
import { animateFast, animateSlow } from "../Algorithms/animations";
import { dijkstra } from "../Algorithms/dijsktra";

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: createGrid(props),
      isMouseDown: false,
      isStartOn: false,
      isEndOn: false,
      startRow: props.startR,
      startCol: props.startC,
      endRow: props.endR,
      endCol: props.endC,
      status: "pending",
      currentAlg: "dijkstra",
    };
    window.gridComponent = this;
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
    placeWall(cell);
  };

  onMouseEnter = (cell) => {
    if (this.state.isMouseDown) {
      if (cell.start || cell.end) {
        return;
      }
      if (this.state.isStartOn) {
        let newGrid = this.state.grid.slice();
        newGrid[this.state.startRow][this.state.startCol].start = false;
        newGrid[cell.row][cell.col].start = true;
        this.setState(
          {
            grid: newGrid,
            startRow: cell.row,
            startCol: cell.col,
          },
          () => {
            if (this.state.status === "finished") {
              clearVisitedCells();
              if (this.state.currentAlg === "dijkstra") {
                this.doAlgorithm("fastDijkstra");
              }
            }
          }
        );

        return;
      } else if (this.state.isEndOn) {
        let newGrid = this.state.grid.slice();
        newGrid[this.state.endRow][this.state.endCol].end = false;
        newGrid[cell.row][cell.col].end = true;
        this.setState(
          {
            grid: newGrid,
            endRow: cell.row,
            endCol: cell.col,
          },
          () => {
            if (this.state.status === "finished") {
              clearVisitedCells();
              if (this.state.currentAlg === "dijkstra") {
                this.doAlgorithm("fastDijkstra");
              }
            }
          }
        );
        return;
      }

      placeWall(cell);
    }
  };
  onMouseUp = () => {
    this.setState({ isMouseDown: false, isStartOn: false, isEndOn: false });
  };

  doAlgorithm = (type) => {
    let { grid } = this.state;
    const startCell = grid[this.state.startRow][this.state.startCol];
    const finishCell = grid[this.state.endRow][this.state.endCol];

    if (type === "slowDijkstra") {
      if (this.state.status === "finished") {
        clearVisitedCells();
      }

      this.setState({ status: "running" });
      const visitedCells = dijkstra(grid, startCell, finishCell);
      const cellsInOrder = getCellsInOrder(finishCell);
      animateSlow(visitedCells, cellsInOrder);
    } else if (type === "fastDijkstra") {
      const visitedCells = dijkstra(grid, startCell, finishCell);
      const cellsInOrder = getCellsInOrder(finishCell);
      animateFast(visitedCells, cellsInOrder);
    }
  };

  clear = (type) => {
    if (type === "path") {
      clearVisitedCells();
    } else if (type === "grid") {
      clearBoard(this.props);
    }
    this.setState({ status: "pending" });
  };

  render() {
    let grid = this.state.grid.map((row, index) => {
      return (
        <div key={index} className="row">
          {row.map((cell, cellIndex) => {
            return (
              <Cell
                key={cellIndex}
                data={cell}
                onMouseDown={this.onMouseDown}
                onMouseEnter={this.onMouseEnter}
                onMouseUp={this.onMouseUp}
              />
            );
          })}
        </div>
      );
    });
    return (
      <div>
        <div className="grid" onMouseLeave={this.onMouseUp}>
          {grid}
        </div>
        <button
          disabled={this.state.status === "running"}
          onClick={() => this.doAlgorithm("slowDijkstra")}
        >
          Dijkstra
        </button>
        <button
          disabled={this.state.status === "running"}
          onClick={() => {
            this.clear("path");
          }}
        >
          Clear path
        </button>
        <button
          disabled={this.state.status === "running"}
          onClick={() => {
            this.clear("grid");
          }}
        >
          Clear grid
        </button>
      </div>
    );
  }
}

export default Grid;
