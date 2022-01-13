// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const EXPENSE = 'EXPENSE';
export const REMOVELINE = 'REMOVELINE';
export const EDIT = 'EDIT';

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

export const editBtnAction = (payload) => ({
  type: EDIT,
  payload,
});
