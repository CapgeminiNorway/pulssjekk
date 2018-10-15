import React, { Component } from "react";
import { connect } from "react-redux";
import { sendQuestion } from "./store";
import { withRouter } from "react-router-dom";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: ""
    };
  }
  sendClicked = event => {
    event.preventDefault();
    this.props.sendQuestion(this.state.question);
  };

  onInputShow = event => {
    this.setState({ question: event.target.value });
  };

  render() {
    return (
      <div className="admin">
        <form>
          <input
            type="text"
            onChange={this.onInputShow}
            placeholder="Skriv din spørsmål"
          />
          <br />
          <input type="submit" value="Send" onClick={this.sendClicked} />
        </form>
      </div>
    );
  }
}

function mapDispatchSendToProps(dispatch, props) {
  return {
    sendQuestion: question => {
      props.history.push("/admin");
      dispatch(sendQuestion(question));
    }
  };
}
export default withRouter(
  connect(
    undefined,
    mapDispatchSendToProps
  )(Admin)
);
