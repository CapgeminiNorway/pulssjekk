import React, { Component } from "react";
import { connect } from "react-redux";
import { sendQuestion } from "./store";
import { withRouter } from "react-router-dom";
import "./bootstrap.min.css";
import "./admin.css";
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
      body: JSON.stringify({ question: this.textInput.value })
    });

    this.textInput.value = "";
    window.alert(`Du har send spørsmålet:\n${(event, null, question)}`);
  };

  onInputShow = event => {
    this.setState({ question: event.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <form>
            <textarea
              className="noresize"
              ref={ref => (this.textInput = ref)}
              id="textInput"
              cols="50"
              rows="2"
              type="text"
              onChange={this.onInputShow}
              placeholder="Skriv din spørsmål"
            />
            <br />
            <input type="submit" value="Send" onClick={this.sendClicked} />
          </form>
        </div>
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th>Spørsmål</th>
                <th>Svar</th>
              </tr>
            </thead>
          </table>
        </div>
      </React.Fragment>
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
