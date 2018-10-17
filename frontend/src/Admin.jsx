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
    const question = this.state.question;
    this.props.sendQuestion(question);

    fetch("/api/v1/polls", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ content: this.textInput.value })
    });

    this.textInput.value = "";
    window.alert(`Du har send spørsmålet:\n${(event, null, question)}`);
  };

  onInputShow = event => {
    this.setState({ question: event.target.value });
  };

  render() {
    return (
      <div className="admin">
        <form>
          <input
            ref={ref => (this.textInput = ref)}
            id="textInput"
            type="text"
            onChange={this.onInputShow}
            placeholder="Skriv din spørsmål"
          />
          <br />
          <input type="submit" value="Send" onClick={this.sendClicked} />
          <button
            color="primary"
            name="showMessages"
            className="px-30"
            onClick={this.buttonClicked}
          >
            Sendte spørsmål
          </button>
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
