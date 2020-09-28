import React from "react";
import "./index.css";
function getColor(props) {
  if (props.data.start) {
    return "start";
  } else if (props.data.end) {
    return "end";
  } else if (props.data.isWall) {
    return "wall";
  } else if (props.data.visited) {
    return "visited";
  } else {
    return "";
  }
}
const Cell = (props) => {
  let cell = () => {
    return (
      <div
        className="cell"
        id={getColor(props)}
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
  };
  return cell();
};

export default Cell;
