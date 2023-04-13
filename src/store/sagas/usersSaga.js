import { takeEvery, put, select, call } from 'redux-saga/effects';
import ACTION_TYPES from '../../constants/actionTypes';
import { getAccountsSuccess, logInSuccess, logOutSuccess } from '../actions/usersActions';
import { NOTIFICATION_MESSAGE, NOTIFICATION_STATUS } from '../../constants/notifications';
import { showNotification } from '../actions/notificationsActions';
import { getAccountsState } from '../selectors/usersSelectors';
import { getAccountsFirebase } from '../../firebase';

function* getAccounts() {
  try {
    const accounts = yield call(getAccountsFirebase);
    yield put(getAccountsSuccess(accounts));
  } catch (err) {
    yield put(showNotification(NOTIFICATION_STATUS.ERROR, NOTIFICATION_MESSAGE.GET_ACCOUNTS_ERROR));
  }
}

function* userLogIn({ payload }) {
  const { username, pass, remember } = payload;
  const accounts = yield select(getAccountsState);
  const currentAccount = accounts[username];
  const isValid = !!(currentAccount && currentAccount.password === pass);
  if (isValid) {
    yield put(logInSuccess({ username, image: currentAccount.image }));
    if (remember) {
      yield call([localStorage, 'setItem'], 'authData', JSON.stringify({ username, pass }));
    }
  } else {
    yield put(showNotification(NOTIFICATION_STATUS.ERROR, NOTIFICATION_MESSAGE.LOGIN_ERROR));
  }
}

function* userLogOut() {
  yield call([localStorage, 'removeItem'], 'authData');
  yield put(logOutSuccess());
}

export default function* watchUsersSaga() {
  yield takeEvery(ACTION_TYPES.GET_ACCOUNTS, getAccounts);
  yield takeEvery(ACTION_TYPES.LOGIN, userLogIn);
  yield takeEvery(ACTION_TYPES.LOGOUT, userLogOut);
}