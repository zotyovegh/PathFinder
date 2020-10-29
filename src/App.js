import React, { Component } from "react";
import Grid from "../../path-finder/src/Grid";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      rows: this.getSize("row"),
      columns: this.getSize("col"),
      startR: this.getPosition("row"),
      startC: this.getPosition("startCol"),
      endR: this.getPosition("row"),
      endC: this.getPosition("endCol"),
    };
  }

  getPosition = (parameter) => {
    let position = null;
    if (parameter === "row") {
      position = Math.floor(this.getSize("row") / 2);
    } else if (parameter === "startCol") {
      position = Math.floor(this.getSize("col") / 5);
    } else if (parameter === "endCol") {
      let x = this.getSize("col");
      let margin = Math.ceil(x / 5);
      position = x - margin;
    }
    return position % 2 === 0 ? position + 1 : position;
    // return position;
  };

  getSize = (type) => {
    let size = null;
    if (type === "row") {
      size = (window.innerHeight / 30).toFixed(0) - 5;
      if (size < 10) {
        return 9;
      }
    } else if (type === "col") {
      size = (window.innerWidth / 30).toFixed(0) - 5;
      if (size < 10) {
        return 9;
      }
    }
    if (size % 2 === 0) {
      size--;
    }
    return size;
  };

  render() {
    return (
      <div className="App">
        <Grid
          rows={this.state.rows}
          columns={this.state.columns}
          startR={this.state.startR}
          startC={this.state.startC}
          endR={this.state.endR}
          endC={this.state.endC}
        />
      </div>
    );
  }
}
export default App;
