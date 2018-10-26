import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Admin from "./Admin";
import { store, fetchUserContext } from "./store";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div className="App">
        <Route component={App} exact path="/" />
        <Route component={Admin} path="/admin" />
      </div>
    </Router>
  </Provider>,
  document.getElementById("root")
);

(function() {
  store.dispatch(fetchUserContext())
})();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
