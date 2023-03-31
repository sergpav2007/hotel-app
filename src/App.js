import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAccounts } from './store/actions/usersActions';
import { getRooms } from './store/actions/roomsActions';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAccounts());
    dispatch(getRooms());
  }, []);

  return (
    <div className="App" />
  );
}

export default App;