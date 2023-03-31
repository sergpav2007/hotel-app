import { call, put, takeEvery } from 'redux-saga/effects';
import ACTION_TYPES from '../../constants/actionTypes';
import { getAccountsSuccess } from '../actions/usersActions';
import { NOTIFICATION_MESSAGE, NOTIFICATION_STATUS } from '../../constants/notifications';
import { showNotification } from '../actions/notificationsActions';
import { getAccountsFirebase } from '../../firebase';

function* getAccounts() {
  try {
    const accounts = yield call(getAccountsFirebase);
    yield put(getAccountsSuccess(accounts));
  } catch (err) {
    yield put(showNotification(NOTIFICATION_STATUS.ERROR, NOTIFICATION_MESSAGE.GET_ACCOUNTS_ERROR));
  }
}

export default function* watchUsersSaga() {
  yield takeEvery(ACTION_TYPES.GET_ACCOUNTS, getAccounts);
}