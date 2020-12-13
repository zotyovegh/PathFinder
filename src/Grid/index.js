import React, { Component } from "react";
import Cell from "../Cell";
import "./index.css";
import { createGrid, placeWall } from "../Algorithms/methods";
import { clearVisitedCells, clearWithStatus } from "../Algorithms/cleaning";
import { getRandomMazedGrid } from "../Algorithms/mazes/default";
import { primMaze } from "../Algorithms/mazes/prim";
import { iterativeMaze } from "../Algorithms/mazes/iterativeDF";
import { recursiveMaze } from "../Algorithms/mazes/recursiveDF";
import { aldousBroderMaze } from "../Algorithms/mazes/aldousBroder";
import { kruskalMaze } from "../Algorithms/mazes/kruskal";
import { wilsonMaze } from "../Algorithms/mazes/wilson";
import { recursiveDivision } from "../Algorithms/mazes/recursiveDivision";
import { basicHorizontal } from "../Algorithms/mazes/basicHorizontal";
import { basicVertical } from "../Algorithms/mazes/basicVertical";
import { binaryTreeAlg } from "../Algorithms/mazes/binaryTree";
import { ellerMaze } from "../Algorithms/mazes/eller";
import { dijkstraStandard } from "../Algorithms/searchers/dijkstra/dijkstraStandard";
import { dijkstraBidirectional } from "../Algorithms/searchers/dijkstra/dijsktraBidirectional";
import { astar } from "../Algorithms/searchers/astar";
import { depthFirst } from "../Algorithms/searchers/depthFirst";
import { breadthFirst } from "../Algorithms/searchers/breadthFirst";

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
      currentMaze: "default",
      previousVisualization: true,
      diagonalVisualization: false,
      optimizedVisualization: true,
      bidirectionalVisualization: true,
    };
    this.handleAlgoChange = this.handleAlgoChange.bind(this);
    this.handleButtonChange = this.handleButtonChange.bind(this);
    this.handleMazeChange = this.handleMazeChange.bind(this);
    window.gridComponent = this;
  }

  handleAlgoChange(event) {
    this.setState({ currentAlg: event.target.value });
  }
  handleButtonChange(event) {
    if (event.target.name === "distance") {
      this.setState(
        { previousVisualization: !this.state.previousVisualization },
        () => {
          if (this.state.status === "finished") {
            clearVisitedCells();
            this.doAlgorithm("fast");
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
    } else if (event.target.name === "bidirectional") {
      this.setState(
        { bidirectionalVisualization: !this.state.bidirectionalVisualization },
        () => {
          if (this.state.status === "finished") {
            clearVisitedCells();
            this.doAlgorithm("fast");
          }
        }
      );
    }
  }
  handleMazeChange(event) {
    if (event.target.value === "random") getRandomMazedGrid(this.state.grid);
    else if (event.target.value === "prim") primMaze(this.state.grid);
    else if (event.target.value === "iterative") iterativeMaze(this.state.grid);
    else if (event.target.value === "recursive") recursiveMaze(this.state.grid);
    else if (event.target.value === "aldousBroder")
      aldousBroderMaze(this.state.grid);
    else if (event.target.value === "kruskal") kruskalMaze(this.state.grid);
    else if (event.target.value === "wilson") wilsonMaze(this.state.grid);
    else if (event.target.value === "recursiveDivision")
      recursiveDivision(this.state.grid);
    else if (event.target.value === "basicHorizontal")
      basicHorizontal(this.state.grid);
    else if (event.target.value === "basicVertical")
      basicVertical(this.state.grid);
    else if (event.target.value === "eller") ellerMaze(this.state.grid);
    else if (event.target.value === "binaryTreeNW")
      binaryTreeAlg(this.state.grid, "NorthWest");
    else if (event.target.value === "binaryTreeNE")
      binaryTreeAlg(this.state.grid, "NorthEast");
    else if (event.target.value === "binaryTreeSW")
      binaryTreeAlg(this.state.grid, "SouthWest");
    else if (event.target.value === "binaryTreeSE")
      binaryTreeAlg(this.state.grid, "SouthEast");
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
              clearWithStatus("path");
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
              clearWithStatus("path");
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
    if (this.state.status === "finished") {
      clearVisitedCells();
    }
    let { grid } = this.state;
    const startCell = grid[this.state.startRow][this.state.startCol];
    const endCell = grid[this.state.endRow][this.state.endCol];

    if (this.state.currentAlg === "dijkstra") {
      if (this.state.bidirectionalVisualization) {
        dijkstraBidirectional(
          grid,
          startCell,
          endCell,
          this.state.diagonalVisualization,
          speed
        );
      } else {
        dijkstraStandard(
          grid,
          startCell,
          endCell,
          this.state.diagonalVisualization,
          speed
        );
      }
    } else if (this.state.currentAlg === "astar") {
      astar(
        grid,
        startCell,
        endCell,
        this.state.diagonalVisualization,
        this.state.optimizedVisualization,
        speed
      );
    } else if (this.state.currentAlg === "depthFirst") {
      depthFirst(grid, startCell, endCell, speed);
    } else if (this.state.currentAlg === "breadthFirst") {
      breadthFirst(grid, startCell, endCell, speed);
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
          onChange={this.handleAlgoChange}
          disabled={this.state.status === "running"}
        >
          <option value="dijkstra">Dijkstra</option>
          <option value="astar">A* Search</option>
          <option value="depthFirst">Depth-First Search</option>
          <option value="breadthFirst">Breadth-First Search</option>
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
            clearWithStatus("path");
          }}
        >
          Clear path
        </button>
        <button
          disabled={this.state.status === "running"}
          onClick={() => {
            clearWithStatus("grid");
          }}
        >
          Clear grid
        </button>
        Distance
        <label className="switch">
          <input
            disabled={
              this.state.status === "running" ||
              this.state.currentAlg === "astar" ||
              this.state.currentAlg === "depthFirst" ||
              this.state.currentAlg === "breadthFirst"
            }
            type="checkbox"
            defaultChecked={this.state.previousVisualization}
            onChange={this.handleButtonChange}
            name="distance"
          ></input>
          <span className="slider round"></span>
        </label>
        Diagonal
        <label className="switch">
          <input
            disabled={
              this.state.status === "running" ||
              this.state.currentAlg === "depthFirst" ||
              this.state.currentAlg === "breadthFirst"
            }
            type="checkbox"
            defaultChecked={this.state.diagonalVisualization}
            onChange={this.handleButtonChange}
            name="diagonal"
          ></input>
          <span className="slider round"></span>
        </label>
        Optimized
        <label className="switch">
          <input
            disabled={
              this.state.status === "running" ||
              this.state.currentAlg === "dijkstra" ||
              this.state.currentAlg === "depthFirst" ||
              this.state.currentAlg === "breadthFirst"
            }
            type="checkbox"
            defaultChecked={this.state.optimizedVisualization}
            onChange={this.handleButtonChange}
            name="optimized"
          ></input>
          <span className="slider round"></span>
        </label>
        Bidirectional
        <label className="switch">
          <input
            disabled={this.state.status === "running"}
            type="checkbox"
            defaultChecked={this.state.bidirectionalVisualization}
            onChange={this.handleButtonChange}
            name="bidirectional"
          ></input>
          <span className="slider round"></span>
        </label>
        <select
          value={this.state.currentMaze}
          onChange={this.handleMazeChange}
          disabled={this.state.status === "running"}
        >
          <option value="default" disabled hidden>
            Mazes
          </option>
          <optgroup label="Patterns">
            <option value="random">Random</option>
            <option value="basicHorizontal">Basic Horizontal</option>
            <option value="basicVertical">Basic Vertical</option>
          </optgroup>
          <optgroup label="Algorithms">
            <option value="prim">Prim</option>
            <option value="iterative">Iterative Depth-first</option>
            <option value="recursive">Recursive Depth-first</option>
            <option value="aldousBroder">Aldous-Broder</option>
            <option value="kruskal">Kruskal</option>
            <option value="wilson">Wilson</option>
            <option value="recursiveDivision">Recursive Division</option>
            <option value="eller">Eller</option>
          </optgroup>
          <optgroup label="&nbsp;&nbsp;&nbsp;Binary Tree Algorithm">
            <option value="binaryTreeSE">&nbsp;&nbsp;&nbsp;South-East</option>
            <option value="binaryTreeSW">&nbsp;&nbsp;&nbsp;South-West</option>
            <option value="binaryTreeNE">&nbsp;&nbsp;&nbsp;North-East</option>
            <option value="binaryTreeNW">&nbsp;&nbsp;&nbsp;North-West</option>
          </optgroup>
        </select>
      </div>
    );
  }
}

export default Grid;
