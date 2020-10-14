import React from "react";
import "./index.css";
function getColor(props) {
  if (props.data.start) {
    return "cell-start";
  } else if (props.data.end) {
    return "cell-end";
  } else if (props.data.isWall) {
    return "cell-wall";
  } else {
    return "";
  }
}

const Cell = (props) => {  
  let temporary = props.data.previous === null ? "" : props.data.previous.id;
  let cell = () => {
    return (
      <div
        className={`cell ${getColor(props)}`}
        id={`cell-${props.data.row}-${props.data.col}`}
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
        <div
          className={`num ${""}`}
          id={`num-${props.data.row}-${props.data.col}`}
        >
          {props.data.distance === Infinity ? "" : props.data.id + " " + temporary}
        </div>
      </div>
    );
  };
  return cell();
};

export default Cell;
