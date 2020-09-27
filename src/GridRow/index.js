import React from "react";
import Cell from "../Cell";
import "./index.css";

const GridRow = (props) => {
  let cells = props.cells.map((data, index) => {
    return (
      <Cell
        row={props.row}
        col={index}
        key={index}
        data={data}
        onMouseDown={props.onMouseDown}
        onMouseEnter={props.onMouseEnter}
        onMouseUp={props.onMouseUp}
      />
    );
  });
  //

  return <div className="row">{cells}</div>;
};

export default GridRow;
