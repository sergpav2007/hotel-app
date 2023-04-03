// import firebase from 'firebase/app';
import 'firebase/database';
import { collection } from 'firebase/firestore';
import { db } from './firebase';
import { getDocs, query } from 'firebase/firestore';
// import firebaseConfig from './firebase';

// To initialize your database, create a config.js file with your firebase configurations
// if (!db.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// } else {
//   firebase.app(); // if already initialized, use that one
// }

// const databaseRef = firebase.database().ref();
export const accountsRef = collection(db, "Accounts");
export const roomsRef = collection(db, "Rooms");

// export default firebase;

export const getAccountsFirebase = async () => {
  let accounts = {};
  const dbAccounts = await getDocs(query(accountsRef));
  accounts = { ...accounts, ...dbAccounts.val() };
  return accounts;
};

export const getRoomsFirebase = async () => {
  const dbRooms = await getDocs(query(roomsRef));
  return dbRooms.val().reduce((acc, room) => ({ ...acc, [room.id]: room }), {});
};