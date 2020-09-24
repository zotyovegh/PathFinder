import React from "react";
import "./index.css";

const Cell = (props) => {
  let cell = () => {
    if (props.data.start) {
      return <div className="cell" id="start"> </div>;
    }else if (props.data.end) {
      return <div className="cell" id="end"> </div>;
    }else if (props.data.visited) {
      return <div className="cell" id="visited"> </div>;
    } else {
      return <div className="cell"> </div>;
    }
  };
  return cell();
};

export default Cell;
