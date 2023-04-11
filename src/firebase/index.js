import 'firebase/database';
import { collection } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { getDocs, query, updateDoc } from 'firebase/firestore';

export const accountsRef = collection(db, "Accounts");
export const roomsRef = collection(db, "Rooms");

export const getAccountsFirebase = async () => {
  let accounts = {};
  const dbAccounts = await getDocs(query(accountsRef));
  accounts = { ...accounts, ...dbAccounts.data };
  dbAccounts.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
  return accounts;
};

export const getRoomsFirebase = async () => {
  const rooms = await getDocs(query(roomsRef));
  rooms.forEach((doc) => {
    console.log(doc.data());
  });
  return rooms;
};

export const updateRoomFirebase = (id) => {
  updateDoc(roomsRef, id, { capital: true });
};