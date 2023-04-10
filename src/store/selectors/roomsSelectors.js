export const getRoomsState = (state) => Object.values(state.rooms);
export const getSingleRoom = (state, search) => state.rooms[search];