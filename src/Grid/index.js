import React, { Component } from "react";
import Cell from "../Cell";
import "./index.css";
import {
  getCellsInOrder,
  animateFast,
  animateSlow,
  clearVisitedCells,
  createGrid,
  clearBoard,
} from "../Algorithms/methods";
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
        this.setState(
          {
            grid: newGrid,
            startRow: cell.row,
            startCol: cell.col,
          },
          () => {
            if (this.state.status === "finished") {
              clearVisitedCells();
              this.doAlgorithm("fastDijkstra");
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
              this.doAlgorithm("fastDijkstra");
            }
          }
        );
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
    this.setState({ grid: newGrid }, () => {
      if (this.state.status === "finished") {
        clearVisitedCells();
        this.doAlgorithm("fastDijkstra");
      }
    });
  };

  doAlgorithm = (type) => {
    let { grid } = this.state;
    const startCell = grid[this.state.startRow][this.state.startCol];
    const finishCell = grid[this.state.endRow][this.state.endCol];

    if (type === "slowDijkstra") {
      if (this.state.status === "running") {
        return;
      }
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
        <button onClick={() => this.doAlgorithm("slowDijkstra")}>
          Dijkstra
        </button>
        <button
          onClick={() => {
            if (this.state.status === "running") {
              return;
            }
            clearVisitedCells();
            this.setState({ status: "pending" });
          }}
        >
          Clear path
        </button>
        <button
          onClick={() => {
            if (this.state.status === "running") {
              return;
            }
            clearBoard(this.props);
            this.setState({ status: "pending" });
          }}
        >
          Clear grid
        </button>
      </div>
    );
  }
}

export default Grid;
