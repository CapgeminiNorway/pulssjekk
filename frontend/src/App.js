import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";

class App extends Component {
  isLoggedIn() {
    if (this.props.login) {
      return true;
    }
    return false;
  }

  render() {
    if (!this.isLoggedIn()) {
      return <Redirect to="/login" />;
    }

    return <div>Hei {this.props.login}</div>;
  }
}

function mapStateToProps({ login }) {
  return { login };
}

export default connect(
  mapStateToProps,
  undefined
)(App);
