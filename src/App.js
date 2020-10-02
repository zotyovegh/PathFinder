import React, { Component } from "react";
import Grid from "../../path-finder/src/Grid";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      rows: this.getSize("rows"),
      columns: this.getSize("cols"),
    };
  }

  getSize = (type) => {
    let size = null;
    if (type === "rows") {
      size = (window.innerHeight / 30).toFixed(0) - 5;
      return size;
    } else if (type === "cols") {
      size = (window.innerWidth / 30).toFixed(0) - 5;
      return size;
    } else {
      return 20;
    }
  };

  render() {
    return (
      <div className="App">
        <Grid
          rows={this.state.rows}
          columns={this.state.columns}
          startR={10}
          startC={4}
          endR={10}
          endC={25}
        />
      </div>
    );
  }
}
export default App;
