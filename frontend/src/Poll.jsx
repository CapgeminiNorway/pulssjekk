import React, { Component } from "react";
import "./poll.css";

class Poll extends Component {

  constructor(props) {
    super(props);

    fetch("/api/v1/polls/unanswered")
      .then(response => {
        response.json()
          .then(polls => {
            console.log("polls from fetch: " + polls);
            this.setState({polls: polls});
            this.selectCurrentPoll();
          }).catch(console.log)
      }).catch(console.log);

    this.state = {
      currentPoll: undefined,
      polls: []
    }

    this.selectCurrentPoll.bind(this);
    this.onAnswerSubmit.bind(this);
  }

  selectCurrentPoll() {
    let newPolls = this.state.polls;
    let newCurrentPoll = undefined;
    if(newPolls.length !== 0) {
      newCurrentPoll = newPolls.pop();
    }
    this.setState({currentPoll: newCurrentPoll, polls: newPolls});
  }

  renderCurrentPoll(currentPoll) {
    if (!currentPoll) {
      return <h1>Ingen ting å gjøre her :-)</h1>;
    }

    return (<React.Fragment>
      <h2>{currentPoll.question}</h2>
      <button className="btn btn-success m-2" onClick={this.onAnswerSubmit} name='ja'>Ja</button>
      <button className="btn btn-danger m-2" onClick={this.onAnswerSubmit} name='nei'>Nei</button>
    </React.Fragment>);
  }

  onAnswerSubmit = e => {
    e.preventDefault();

    let answer = e.target.name;

    fetch(`/api/v1/polls/${this.state.currentPoll.id}/answers`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: answer
    })
    .then(response => {
      this.selectCurrentPoll();
    })
    .catch(console.log);
  }

  renderCurrentPoll

  render() {
    return (
      <div className="form-group">
        <form className="poll">
          {this.renderCurrentPoll(this.state.currentPoll)}
        </form>
      </div>
    );
  }
}

export default Poll;
