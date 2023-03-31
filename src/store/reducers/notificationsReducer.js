import ACTION_TYPES from '../../constants/actionTypes';

const initialState = { status: '', message: '', isShow: false };

export default function notificationsReducer(state = initialState, { type, payload }) {
  switch (type) {
  case ACTION_TYPES.SHOW_NOTIFICATION:
    return payload;
  case ACTION_TYPES.CLEAR_NOTIFICATIONS:
    return initialState;
  default:
    return state;
  }
}