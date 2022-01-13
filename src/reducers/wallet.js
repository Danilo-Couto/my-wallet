// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { EDIT, EXPENSE, REMOVELINE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case REMOVELINE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    };
  case EDIT:
    return {
      ...state,
    };
  default:
    return state;
  }
}

export default wallet;
