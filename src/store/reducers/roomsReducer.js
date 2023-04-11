import ACTION_TYPES from '../../constants/actionTypes';

const initialState = {};

export default function roomsReducer(state = initialState, { type, payload }) {
  switch (type) {
  case ACTION_TYPES.GET_ROOMS_SUCCESS:
    return { ...state, ...payload };
  case ACTION_TYPES.UPDATE_ROOM_SUCCESS:
    return {
      ...state,
      [payload.id]: {
        ...state[payload.id],
        ...payload.data,
      },
    };
  case ACTION_TYPES.LOGOUT:
    return initialState;
  default:
    return state;
  }
}