import { createStore, combineReducers } from "redux";
const initialState = {
  questions: []
};
// Actions
const LOGIN = "LOGIN";

const SELECTROLE = "SELECTROLE";

const SEND_QUESTION = "SEND_QUESTION";

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
    type: SEND_QUESTION,
    payload: question
  };
}

// Reducers
/*
const rootReducer = combineReducers({
  //loginReducer,
  //roleSelectReducer,
  sendQuestionReducer
});

*/
/*
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
*/
function questionReducer(state = initialState, action) {
  switch (action.type) {
    case SEND_QUESTION:
      return {
        ...state,
        questions: [...state.questions, action.payload]
      };
    default:
      return state;
  }
}

export const store = createStore(
  questionReducer,
  window.devToolsExtension ? window.devToolsExtension() : undefined // Connect to Chrome plugin if possible
);
