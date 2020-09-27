import React from "react";
import "./index.css";

const Cell = (props) => {
  const extraClassName = props.data.start
    ? "start"
    : props.data.end
    ? "end"
    : props.data.isWall
    ? "wall"
    : props.data.visited
    ? "visited"
    : "";

  return (
    <div
      id={`cell-${props.row}-${props.col}`}
      className={`cell ${extraClassName}`}
      onMouseDown={() => props.onMouseDown(props.data)}
      onMouseEnter={() => props.onMouseEnter(props.data)}
      onMouseUp={() => props.onMouseUp(props.data)}
    >
      {" "}
    </div>
  );
};

export default Cell;
