import React, { useEffect, useMemo } from 'react';
import { Route } from 'react-router-dom';
import {Switch} from 'antd';
import { message, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import AuthPage from '../../pages/AuthPage';
import { getAccountsState } from '../../store/selectors/usersSelectors';
import { getNotificationData } from '../../store/selectors/notificationsSelectors';
import { getAccounts, logIn } from '../../store/actions/usersActions';
import { clearNotifications } from '../../store/actions/notificationsActions';
import PrivateRoute from '../PrivateRoute';
import RoomsTablePage from '../../pages/RoomsTablePage';
import SingleRoomPage from '../../pages/SingleRoomPage';
import './Wrapper.scss';

const Wrapper = () => {
  const notification = useSelector(getNotificationData);
  const accounts = useSelector(getAccountsState);
  const dispatch = useDispatch();

  const isEmptyAccounts = useMemo(() => {
    if (!accounts) return true;

    return !Object.keys(accounts).length;
  }, [accounts]);

  useEffect(() => {
    dispatch(getAccounts());
  }, [dispatch]);

  useEffect(() => {
    const authData = localStorage.getItem('authData');

    if (isEmptyAccounts || !authData) return;

    dispatch(logIn(JSON.parse(authData)));
  }, [accounts, dispatch, isEmptyAccounts]);

  useEffect(() => {
    if (!notification) return;

    const { status, message: content, isShow } = notification;

    if (isShow) {
      message[status](content).then(dispatch(clearNotifications()));
    }
  }, [dispatch, notification]);

  return isEmptyAccounts ? (
    <div className="loading-wrap">
      <Spin size="large" />
    </div>
  ) : (
    <Switch>
      <Route exact path="/login" component={AuthPage} />
      <PrivateRoute exact path="/" component={RoomsTablePage} />
      <PrivateRoute exact to="/rooms?:roomId" component={SingleRoomPage} />
    </Switch>
  );
};

export default Wrapper;