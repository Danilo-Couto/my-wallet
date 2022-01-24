// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { EDIT_EXPENSE, EXPENSE, FORM_EDIT,
  FORM_EDIT_TO_FALSE, REMOVELINE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  formEdit: false,
  objectToBeEdit: {},
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
  case FORM_EDIT:
    return {
      ...state,
      formEdit: !state.formEdit,
      objectToBeEdit: action.objectToBeEdit,
    };
  case FORM_EDIT_TO_FALSE:
    return {
      ...state,
      formEdit: !state.formEdit,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: state.expenses
        .map((item) => (
          item.id === action.objectToBeEdit.id ? { ...item, ...action.state } : item)) };
  default:
    return state;
  }
}

export default wallet;
