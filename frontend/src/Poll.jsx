import React, { Component } from "react";
import "./poll.css";

class Poll extends Component {
  render() {
    return (
      <div class="form-group">
        <form className="poll">
          <h2>Har du hatt en fin dag på jobb i dag?</h2>
          <button class="btn btn-success m-2">YES</button>
          <button class="btn btn-danger m-2">NO</button>
        </form>
      </div>
    );
  }
}

export default Poll;
