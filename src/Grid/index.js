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
import { dijkstra } from "../Algorithms/searchers/dijsktra";
import { astar } from "../Algorithms/searchers/astar";

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
      currentAlg: "astar",
      previousVisualization: false,
      diagonalVisualization: false,
    };
    this.handleChange = this.handleChange.bind(this);
    window.gridComponent = this;
  }

  handleChange(event) {
    if (event.target.name === "distance") {
      this.setState(
        { previousVisualization: !this.state.previousVisualization },
        () => {
          if (this.state.status === "finished") {
            clearVisitedCells();
            if (this.state.currentAlg === "dijkstra") {
              this.doAlgorithm("fast");
            }
          }
        }
      );
    } else if (event.target.name === "diagonal") {
      this.setState(
        { diagonalVisualization: !this.state.diagonalVisualization },
        () => {
          if (this.state.status === "finished") {
            clearVisitedCells();
            //  if (this.state.currentAlg === "dijkstra") {
            this.doAlgorithm("fast");
            //  }
          }
        }
      );
    } else if (event.target.name === "choice") {
      this.setState({ currentAlg: event.target.value });
    }
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
              /* if (this.state.currentAlg === "dijkstra") {*/
              this.doAlgorithm("fast");
              // }
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
              /*  if (this.state.currentAlg === "dijkstra") {*/
              this.doAlgorithm("fast");
              //}
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

  doAlgorithm = (speed) => {
    let { grid } = this.state;
    const startCell = grid[this.state.startRow][this.state.startCol];
    const finishCell = grid[this.state.endRow][this.state.endCol];
    var visitedCells = [];

    if (this.state.currentAlg === "dijkstra") {
      visitedCells = dijkstra(
        grid,
        startCell,
        finishCell,
        this.state.diagonalVisualization
      );
    } else if (this.state.currentAlg === "astar") {
      visitedCells = astar(
        grid,
        startCell,
        finishCell,
        this.state.diagonalVisualization
      );
    }

    //After search funtion is done
    const cellsInOrder = getCellsInOrder(finishCell);
    if (speed === "slow") {
      if (this.state.status === "finished") {
        clearVisitedCells();
      }
      this.setState({ status: "running" });
      animateSlow(visitedCells, cellsInOrder);
    } else if (speed === "fast") {
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
        <select
          value={this.state.currentAlg}
          onChange={this.handleChange}
          name="choice"
          disabled={this.state.status === "running"}
        >
          <option value="dijkstra">Dijkstra</option>
          <option value="astar">A* Search</option>
        </select>
        <button
          disabled={this.state.status === "running"}
          onClick={() => this.doAlgorithm("slow")}
        >
          Start
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
        Distance
        <label className="switch">
          <input
            disabled={
              this.state.status === "running" ||
              this.state.currentAlg === "astar"
            }
            type="checkbox"
            defaultChecked={this.state.previousVisualization}
            onChange={this.handleChange}
            name="distance"
          ></input>
          <span className="slider round"></span>
        </label>
        Diagonal
        <label className="switch">
          <input
            disabled={this.state.status === "running"}
            type="checkbox"
            defaultChecked={this.state.diagonalVisualization}
            onChange={this.handleChange}
            name="diagonal"
          ></input>
          <span className="slider round"></span>
        </label>
      </div>
    );
  }
}

export default Grid;
