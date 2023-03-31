import ACTION_TYPES from '../../constants/actionTypes';

export const getRooms = () => ({ type: ACTION_TYPES.GET_ROOMS });
export const getRoomsSuccess = (roomsData) => ({ type: ACTION_TYPES.GET_ROOMS_SUCCESS, payload: roomsData });