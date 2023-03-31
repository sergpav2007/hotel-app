import ACTION_TYPES from '../../constants/actionTypes';

export const getAccounts = () => ({ type: ACTION_TYPES.GET_ACCOUNTS });
export const getAccountsSuccess = (accountData) => ({ type: ACTION_TYPES.GET_ACCOUNTS_SUCCESS, payload: accountData });