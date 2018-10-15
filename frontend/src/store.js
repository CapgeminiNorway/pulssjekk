import { createStore, combineReducers } from "redux";

// Actions
const LOGIN = "LOGIN";

const SELECTROLE = "SELECTROLE";

export function roleSelect(role) {
  return {
    type: SELECTROLE,
    payload: role
  };
}

export function submitLogin(email) {
  return {
    type: LOGIN,
    payload: email
  };
}

// Reducers

const rootReducer = combineReducers({ loginReducer, roleSelectReducer });

function loginReducer(state = { login: "" }, action) {
  switch (action.type) {
    case LOGIN:
      return { login: action.payload };
    default:
      return state;
  }
}

function roleSelectReducer(state = { role: "" }, action) {
  switch (action.type) {
    case SELECTROLE:
      return { role: action.payload };
    default:
      return state;
  }
}

export const store = createStore(
  rootReducer,
  window.devToolsExtension ? window.devToolsExtension() : undefined // Connect to Chrome plugin if possible
);
