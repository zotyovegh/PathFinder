
import React, { Component, createRef } from "react";
import Grid from "../../path-finder/src/Grid";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      rows: 4,
      columns: 4,
    };
  }

  render() {
    return (
      <div className="App">
        <Grid rows={this.state.rows} columns={this.state.columns} />
      </div>
    );
  }
}
export default App;
