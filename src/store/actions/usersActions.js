import ACTION_TYPES from '../../constants/actionTypes';

export const getAccounts = () => ({ type: ACTION_TYPES.GET_ACCOUNTS });
export const getAccountsSuccess = (accountData) => ({ type: ACTION_TYPES.GET_ACCOUNTS_SUCCESS, payload: accountData });
export const logIn = (userData) => ({ type: ACTION_TYPES.LOGIN, payload: userData });
export const logInSuccess = (userData) => ({ type: ACTION_TYPES.LOGIN_SUCCESS, payload: userData });
export const logOut = () => ({ type: ACTION_TYPES.LOGOUT });
export const logOutSuccess = () => ({ type: ACTION_TYPES.LOGOUT_SUCCESS });