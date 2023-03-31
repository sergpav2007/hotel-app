import ACTION_TYPES from '../../constants/actionTypes';

const initialState = {};

export default function roomsReducer(state = initialState, { type, payload }) {
  switch (type) {
  case ACTION_TYPES.GET_ROOMS_SUCCESS:
    return { ...state, ...payload };
  default:
    return state;
  }
}