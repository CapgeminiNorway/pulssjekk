import React, { Component } from "react";
import { connect } from "react-redux";
import { sendQuestion, questionIdReceived } from "./store";
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
    const id = this.props.questions.length;
    const question = {
      text: this.state.question,
      id: id,
      confirmed: false
    };

    this.props.sendQuestion({
      text: this.state.question,
      id: id,
      confirmed: false
    });

    fetch("/api/v1/polls", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ question: this.textInput.value })
    })
      .then(response => {
        this.props.questionIdReceived(question);
      })
      .catch(reason => {});

    this.textInput.value = "";
    window.alert(`Du har send spørsmålet:\n${(event, null, question.text)}`);
  };

  onInputShow = event => {
    this.setState({ question: event.target.value });
  };

  questionToTableRow = question => {
    return (
      <tr key={question.id}>
        <td>{question.text}</td>
      </tr>
    );
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
            {this.props.questions ? (
              <tbody>{this.props.questions.map(this.questionToTableRow)}</tbody>
            ) : (
              <React.Fragment />
            )}
          </table>
        </div>
      </React.Fragment>
    );
  }
}

function mapDispatchSendToProps(dispatch) {
  return {
    sendQuestion: question => {
      dispatch(sendQuestion(question));
    },
    questionIdReceived: question => {
      dispatch(questionIdReceived(question));
    }
  };
}

function mapStateToProps(state) {
  return {
    questions: state.questions
  };
}
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchSendToProps
  )(Admin)
);
