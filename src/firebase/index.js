import firebase from 'firebase/app';
import 'firebase/database';
import firebaseConfig from './firebase';

// To initialize your database, create a config.js file with your firebase configurations
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const databaseRef = firebase.database().ref();
export const accountsRef = databaseRef.child('Accounts');
export const roomsRef = databaseRef.child('Rooms');

export default firebase;

export const getAccountsFirebase = async () => {
  let accounts = {};
  const dbAccounts = await accountsRef.once('value');
  accounts = { ...accounts, ...dbAccounts.val() };
  return accounts;
};

export const getRoomsFirebase = async () => {
  const dbRooms = await roomsRef.once('value');
  return dbRooms.val().reduce((acc, room) => ({ ...acc, [room.id]: room }), {});
};