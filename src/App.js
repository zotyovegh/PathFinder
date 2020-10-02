import React, { Component } from "react";
import Grid from "../../path-finder/src/Grid";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      rows: this.getSize("rows"),
      columns: this.getSize("cols"),
      startR: this.getPosition("row"),
      startC: this.getPosition("startCol"),
      endR: this.getPosition("row"),
      endC: this.getPosition("endCol"),
    };
  }

  getPosition = (parameter) => {
    let position = null;
    if (parameter === "row") {
      position = Math.floor(this.getSize("rows") / 2);
    } else if (parameter === "startCol") {
      position = Math.floor(this.getSize("cols") / 5);
    } else if (parameter === "endCol") {
      let x = this.getSize("cols");
      let margin = Math.ceil(x / 5);
      position = x - margin;
    }

    return position;
  };

  getSize = (type) => {
    let size = null;
    if (type === "rows") {
      size = (window.innerHeight / 30).toFixed(0) - 5;
      if (size < 10) {
        return 10;
      }
    } else if (type === "cols") {
      size = (window.innerWidth / 30).toFixed(0) - 5;
      if (size < 10) {
        return 10;
      }
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
