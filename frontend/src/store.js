import { createStore } from 'redux';

// Actions
const LOGIN = 'LOGIN';

export function submitLogin(email) {
    return {
        type: LOGIN,
        payload: email
    }
}

// Reducers
function loginReducer(state = { login: '' }, action) {
    switch (action.type) {
        case LOGIN:
            return { login: action.payload }
        default:
            return state
    }
}

export const store = createStore(loginReducer,
    window.devToolsExtension ? window.devToolsExtension() : undefined  // Connect to Chrome plugin if possible
);