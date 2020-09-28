import React, { Component } from "react";
import Grid from "../../path-finder/src/Grid";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      rows: 21,
      columns: 30,
    };
  }

  render() {
    return (
      <div className="App">
        <Grid rows={this.state.rows} columns={this.state.columns} startR={10} startC={4}endR={10} endC={25}/>
      </div>
    );
  }
}
export default App;
