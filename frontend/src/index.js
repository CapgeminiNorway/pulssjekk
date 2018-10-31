import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Admin from "./Admin";
import { store, fetchUserContext } from "./store";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./index.css";
//import myServiceWorker from "./myServiceWorker";

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
  store.dispatch(fetchUserContext());
})();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker.register("./sw_push.js");
// }

//const config = {
//  onUpdate: () => console.log("update!")
//};

//serviceWorker.register(config);

Notification.requestPermission(permission => {
  console.log(permission);
  const now = Date.now();

  const title = "Pulssjekk";
  const body = "Har du det bra?";
  const tag = now;
  const icon = "favicon.ico";

  const options = {
    tag: tag,
    body: body,
    icon: icon,
    lang: "en",
    dir: "ltr"
  };
  let v = new Notification(title, options);
});
