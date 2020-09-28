import React from "react";
import "./index.css";

const Cell = (props) => {
  let cell = () => {
    if (props.data.start) {
      return (
        <div
          className="cell"
          id="start"
          onMouseDown={(e) => {
            e.preventDefault();
            props.onMouseDown(props.data);
          }}
          onMouseEnter={() => props.onMouseEnter(props.data)}
          onMouseUp={() => props.onMouseUp(props.data)}
          onContextMenu={(e) => {
            e.preventDefault();
          }}
        >
          {" "}
        </div>
      );
    } else if (props.data.end) {
      return (
        <div
          className="cell"
          id="end"
          onMouseDown={(e) => {
            e.preventDefault();
            props.onMouseDown(props.data);
          }}
          onMouseEnter={() => props.onMouseEnter(props.data)}
          onMouseUp={() => props.onMouseUp(props.data)}
          onContextMenu={(e) => {
            e.preventDefault();
          }}
        >
          {" "}
        </div>
      );
    } else if (props.data.isWall) {
      return (
        <div
          className="cell"
          id="wall"
          onMouseDown={(e) => {
            e.preventDefault();
            props.onMouseDown(props.data);
          }}
          onMouseEnter={() => props.onMouseEnter(props.data)}
          onMouseUp={() => props.onMouseUp(props.data)}
          onContextMenu={(e) => {
            e.preventDefault();
          }}
        >
          {" "}
        </div>
      );
    } else if (props.data.visited) {
      return (
        <div
          className="cell"
          id="visited"
          onMouseDown={(e) => {
            e.preventDefault();
            props.onMouseDown(props.data);
          }}
          onMouseEnter={() => props.onMouseEnter(props.data)}
          onMouseUp={() => props.onMouseUp(props.data)}
          onContextMenu={(e) => {
            e.preventDefault();
          }}
        >
          {" "}
        </div>
      );
    } else {
      return (
        <div
          className="cell"
          onMouseDown={(e) => {
            e.preventDefault();
            props.onMouseDown(props.data);
          }}
          onMouseEnter={() => props.onMouseEnter(props.data)}
          onMouseUp={() => props.onMouseUp(props.data)}
          onContextMenu={(e) => {
            e.preventDefault();
          }}
        >
          {" "}
        </div>
      );
    }
  };
  return cell();
};

export default Cell;
