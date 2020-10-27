import React, { Component } from "react";
import Cell from "../Cell";
import "./index.css";
import { createGrid, placeWall, visualizeCell } from "../Algorithms/methods";
import { clearVisitedCells, clear } from "../Algorithms/cleaning";
import { getRandomMazedGrid } from "../Algorithms/mazes/default";
import { primMaze } from "../Algorithms/mazes/prim";
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
      diagonalVisualization: true,
      optimizedVisualization: true,
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
            this.doAlgorithm("fast");
          }
        }
      );
    } else if (event.target.name === "optimized") {
      this.setState(
        { optimizedVisualization: !this.state.optimizedVisualization },
        () => {
          if (this.state.status === "finished") {
            clearVisitedCells();
            this.doAlgorithm("fast");
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
              this.doAlgorithm("fast");
            } else {
              clear("path");
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
              this.doAlgorithm("fast");
            } else {
              clear("path");
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
    const endCell = grid[this.state.endRow][this.state.endCol];

    if (this.state.currentAlg === "dijkstra") {
      dijkstra(
        grid,
        startCell,
        endCell,
        this.state.diagonalVisualization,
        speed
      );
    } else if (this.state.currentAlg === "astar") {
      astar(
        grid,
        startCell,
        endCell,
        this.state.diagonalVisualization,
        this.state.optimizedVisualization,
        speed
      );
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
            clear("path");
          }}
        >
          Clear path
        </button>
        <button
          disabled={this.state.status === "running"}
          onClick={() => {
            clear("grid");
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
        Optimized
        <label className="switch">
          <input
            disabled={
              this.state.status === "running" ||
              this.state.currentAlg === "dijkstra"
            }
            type="checkbox"
            defaultChecked={this.state.optimizedVisualization}
            onChange={this.handleChange}
            name="optimized"
          ></input>
          <span className="slider round"></span>
        </label>
        <button
          disabled={this.state.status === "running"}
          onClick={() => {
            getRandomMazedGrid(this.state.grid);
          }}
        >
          Random grid
        </button>
        <button
          disabled={this.state.status === "running"}
          onClick={() => {
            primMaze(this.state.grid);
          }}
        >
          Prim maze
        </button>
      </div>
    );
  }
}

export default Grid;
