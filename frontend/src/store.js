import { createStore, combineReducers } from "redux";

// Actions
const LOGIN = "LOGIN";

const SELECTROLE = "SELECTROLE";

const QUESTION = "QUESTION";

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

export function sendQuestion(question) {
  return {
    type: QUESTION,
    payload: question
  };
}

// Reducers

const rootReducer = combineReducers({
  loginReducer,
  roleSelectReducer,
  sendQuestionReducer
});

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

function sendQuestionReducer(state = { question: "" }, action) {
  switch (action.type) {
    case QUESTION:
      return { question: action.payload };
    default:
      return state;
  }
}

export const store = createStore(
  rootReducer,
  window.devToolsExtension ? window.devToolsExtension() : undefined // Connect to Chrome plugin if possible
);
