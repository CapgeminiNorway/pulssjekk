import { createStore } from "redux";


const initialState = {
  questions: [],
  userContext: {}
};
// Actions
const SEND_QUESTION = "SEND_QUESTION";

const Actions = {
  FETCH_USER_CONTEXT: 'FETCH_USER_CONTEXT',
  SET_USER_CONTEXT: 'SET_USER_CONTEXT',
}

export function fetchUserContext() {
  return {
    type: Actions.FETCH_USER_CONTEXT
  }
}

function setUserContext(userContext) {
  return {
    type: Actions.SET_USER_CONTEXT,
    payload: userContext
  }
}


export function sendQuestion(question) {
  return {
    type: SEND_QUESTION,
    payload: question
  };
}


function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SEND_QUESTION:
      return {
        ...state,
        questions: [...state.questions, action.payload]
      };
    case Actions.FETCH_USER_CONTEXT:
      fetch("/api/v1/usercontext")
        .then(response => response.json()
          .then(userContext => store.dispatch(setUserContext(userContext)))
          .catch(console.log)
        );
      return state;
    case Actions.SET_USER_CONTEXT:
      return {
        ...state,
        userContext: action.payload
      };
    default:
      return state;
  }
}

export const store = createStore(
  rootReducer, 
  window.devToolsExtension ? window.devToolsExtension() : undefined // Connect to Chrome plugin if possible
);