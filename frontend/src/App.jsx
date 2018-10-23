import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./bootstrap.min.css";
import "./App.css";
import Poll from "./Poll";

class App extends Component {
  sendToAdmin = event => {
    this.props.history.push("/admin");
  };

  render() {
    return (
      <div className="container-fluid">
        <div class="text-right">
          <button
            className="btn btn-primary btn-lg mr-20%"
            onClick={this.sendToAdmin}
          >
            Admin
          </button>
        </div>
        <Poll />
      </div>
    );
  }
}

export default withRouter(
  connect(
    undefined,
    undefined
  )(App)
);
