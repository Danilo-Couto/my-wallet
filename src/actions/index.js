// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const EXPENSE = 'EXPENSE';
export const REMOVELINE = 'REMOVELINE';
export const OPEN_EDIT_TABLE = 'OPEN_EDIT_TABLE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const FORM_EDIT = 'FORM_EDIT';
export const FORM_EDIT_TO_FALSE = 'FORM_EDIT_TO_FALSE';

export const loginAction = (payload) => ({
  type: LOGIN,
  payload,
});

export const expenseAction = (payload) => ({
  type: EXPENSE,
  payload,
});

export const deleteBtnAction = (payload) => ({
  type: REMOVELINE,
  payload,
});

export const formEditAction = (objectToBeEdit) => ({
  type: FORM_EDIT,
  objectToBeEdit,
});

export const formEditToFalseAction = () => ({
  type: FORM_EDIT_TO_FALSE,
});

export const editBtnAction = (state, objectToBeEdit, formEdit) => ({
  type: EDIT_EXPENSE,
  state,
  objectToBeEdit,
  formEdit,
});
