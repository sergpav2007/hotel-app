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
  default:
    return state;
  }
}