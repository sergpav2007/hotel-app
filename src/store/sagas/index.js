import { all, call } from 'redux-saga/effects';
import usersSaga from './usersSaga';
import roomsSaga from './roomsSaga';

const sagasList = [
  usersSaga,
  roomsSaga,
];

export default function* watchRootSaga() {
  yield all(sagasList.map((saga) => call(saga)));
}