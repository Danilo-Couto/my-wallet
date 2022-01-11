
// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const EXPENSE = 'EXPENSE';

export const loginAction = (payload) => ({
  type: LOGIN,
  payload,
});

export const expenseAction = (payload) => ({
  type: EXPENSE,
  payload,
});

/* export const inicialRequest = () => ({
  type: 'request_inicial',
});

export const requestCurrencySucess = () => ({
  type: 'request_Success',
});

export function requestCurrencyThunk() {
  return (dispatch) => {
    getCurrency().then((response) => {
      //
      dispatch(requestCurrencySucess('algumacoisa'));
    });
  };
} */
