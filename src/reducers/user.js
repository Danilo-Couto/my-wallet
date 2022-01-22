import { LOGIN } from '../actions';

// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  email: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return { email: action.payload };
  default:
    return state;
  }
}

export default user;
