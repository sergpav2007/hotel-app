import ACTION_TYPES from '../../constants/actionTypes';

export const showNotification = (status, message) => ({
  type: ACTION_TYPES.SHOW_NOTIFICATION,
  payload: { status, message, isShow: true },
});

export const clearNotifications = () => ({ type: ACTION_TYPES.CLEAR_NOTIFICATIONS });