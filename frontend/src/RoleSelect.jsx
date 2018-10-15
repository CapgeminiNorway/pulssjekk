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
    this.adminClicked = this.adminClicked.bind(this);
    this.userClicked = this.userClicked.bind(this);
  }
  adminClicked(event) {
    event.preventDefault();
    this.props.roleSelect("admin");
  }

  userClicked(event) {
    event.preventDefault();
    this.props.roleSelect("user");
  }

  render() {
    return (
      <div className="roleSelect">
        <form>
          <button color="primary" className="px-30" onClick={this.adminClicked}>
            Admin
          </button>
          <button color="primary" className="px-30" onClick={this.userClicked}>
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
      props.history.push("/admin");
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
