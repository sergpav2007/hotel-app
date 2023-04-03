import ACTION_TYPES from '../../constants/actionTypes';

const initialState = {
  accounts: {},
  authUser: {
    isAuthorized: false,
    username: '',
  },
};

export default function usersReducer(state = initialState, { type, payload }) {
  switch (type) {
  case ACTION_TYPES.GET_ACCOUNTS_SUCCESS:
    return {
      ...state,
      accounts: { ...state.accounts, ...payload },
    };
  case ACTION_TYPES.LOGIN_SUCCESS:
    return {
      ...state,
      authUser: { ...state.authUser, isAuthorized: true, ...payload },
    };
  case ACTION_TYPES.LOGOUT_SUCCESS:
    return {
      ...state,
      authUser: { isAuthorized: false, username: '' },
    };
  default:
    return state;
  }
}