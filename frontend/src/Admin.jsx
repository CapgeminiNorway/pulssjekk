import React, { Component } from "react";
import { connect } from "react-redux";
import { sendQuestion } from "./store";
import { withRouter, Link } from "react-router-dom";
import "./bootstrap.min.css";
import "./admin.css";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      questions: []
    };
    this.getQuestions();
  }

  logout() {
    fetch("/logout")
      .then(response => {
        window.location.assign("/login?logout");
      })
  }

  getQuestions() {
    fetch("/api/v1/polls")
      .then(response => {
        return response.json();
      }).then(json => {
        this.setState(state => {
          return { questions: json }
        })
      }).catch(console.log);
  }

  sendClicked = event => {
    event.preventDefault();

    fetch("/api/v1/polls", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ question: this.textInput.value })
    }).then(response => {
      const location = response.headers.get("location");
      response
        .json()
        .then(json => {
          this.setState(state => {
            return {
              questions: [{
                id: json.id,
                question: json.question
              }, ...state.questions]
            }
          });
          this.props.sendQuestion({
            question: json.question,
            id: json.id,
            location: location
          });
        })
        .catch(console.log);
    });

    this.textInput.value = "";
  };

  onInputShow = event => {
    this.setState({ question: event.target.value });
  };

  questionToTableRow = question => {
    let antallJa = 0;
    let antallNei = 0;

    if (question.answers) {
      question.answers.forEach(answer => {
        if (answer.text === 'nei') {
          antallNei++;
        } else if (answer.text === 'ja') {
          antallJa++;
        }
      })
    }
    return (
      <tr key={question.id}>
        <td>{question.question}</td>
        <td>{`Ja: ${antallJa}, Nei: ${antallNei}`}</td>
      </tr>
    );
  };

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="text-right">
            <Link className="btn btn-primary btn-lg" to="/">Home</Link>
            <button className="btn btn-primary btn-lg" onClick={this.logout}>Logout</button>
          </div>
          <form>
            <textarea
              className="noresize"
              ref={ref => (this.textInput = ref)}
              id="textInput"
              cols="50"
              rows="2" 
              type="text"
              onChange={this.onInputShow}
              placeholder="Skriv inn et spørsmål"
            />
            <br />
            <input type="submit" value="Send" onClick={this.sendClicked} />
          </form>
          <table className="table">
            <thead>
              <tr>
                <th>Spørsmål</th>
                <th>Svar</th>
              </tr>
            </thead>
            {this.state.questions ? (
              <tbody>{this.state.questions.map(this.questionToTableRow)}</tbody>
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
