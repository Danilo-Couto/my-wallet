import { LOGIN } from '../actions';

// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  user: {
    email: '',
  },
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return { email: action.payload }; //    return { ...state, user: { email: action.payload } }; assim ele guarda certo, mas nao passa no
  default:
    return state;
  }
}

export default userReducer;
