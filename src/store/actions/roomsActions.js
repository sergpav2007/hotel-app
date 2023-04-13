import ACTION_TYPES from '../../constants/actionTypes';

export const getRooms = () => ({ type: ACTION_TYPES.GET_ROOMS });
export const getRoomsSuccess = (roomsData) => ({ type: ACTION_TYPES.GET_ROOMS_SUCCESS, payload: roomsData });
export const checkInRoom = (id, fields) => ({ type: ACTION_TYPES.CHECK_IN, payload: { id, ...fields } });
export const checkOutRoom = (id) => ({ type: ACTION_TYPES.CHECK_OUT, payload: { id } });
export const updateRoomSuccess = (id, data) => ({ type: ACTION_TYPES.UPDATE_ROOM_SUCCESS, payload: { id, data } });