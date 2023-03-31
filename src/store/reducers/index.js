import { combineReducers } from 'redux';
import roomsReducer from './roomsReducer';
import usersReducer from './usersReducer';
import notificationsReducer from './notificationsReducer';

const rootReducer = combineReducers({
  rooms: roomsReducer,
  users: usersReducer,
  notifications: notificationsReducer,
});

export default rootReducer;