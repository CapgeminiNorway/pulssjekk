import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { roleSelect } from "./store";
import { connect } from "react-redux";

class RoleSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: ""
    };
  }
  buttonClicked = event => {
    event.preventDefault();
    this.props.roleSelect(event.target.name);
  };

  render() {
    return (
      <div className="roleSelect">
        <form>
          <button
            color="primary"
            name="admin"
            className="px-30"
            onClick={this.buttonClicked}
          >
            Admin
          </button>
          <button
            color="primary"
            name="user"
            className="px-30"
            onClick={this.buttonClicked}
          >
            User
          </button>
        </form>
      </div>
    );
  }
}

function mapDispacthClickToProps(dispatch, props) {
  return {
    roleSelect: role => {
      if (role === "user") {
        props.history.push("/user");
      } else if (role === "admin") {
        props.history.push("/admin");
      }
      dispatch(roleSelect(role));
    }
  };
}

export default withRouter(
  connect(
    undefined,
    mapDispacthClickToProps
  )(RoleSelect)
);
