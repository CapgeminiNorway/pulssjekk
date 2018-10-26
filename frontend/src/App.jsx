import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import "./bootstrap.min.css";
import "./App.css";
import Poll from "./Poll";

class App extends Component {

  logout() {
    fetch("/logout")
      .then(response => {
        window.location.assign("/login?logout");
      })
  }

  isAdmin() {
    if(this.props.userContext) {
      if(this.props.userContext.username) {
        return this.props.userContext.username === 'admin';
      }
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="text-right">
          {this.isAdmin() ? <Link className="btn btn-primary btn-lg" to="/admin">Admin</Link> : ''}
          <button className="btn btn-primary btn-lg" onClick={this.logout}>Logout</button>
        </div>
        <Poll />
      </div>
    );
  }


}

function mapStateToProps(state) {
  return {
    userContext: state.userContext
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    undefined
  )(App)
);
