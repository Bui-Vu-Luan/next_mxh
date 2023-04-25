import { database } from '@/firebaseConfig/config';
import { ref, set, push, get, child, onValue } from "firebase/database";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
const auth = getAuth();


export function addData(table, data) {
    return push(ref(database, table), data);
}
export function setData(table, data) {
    return set(ref(database, table), data);
}

export function checkTokenLogin() {
    let token = localStorage.getItem('token');
    if (token) {
        return token;
    }
    return false;
}


export function getData(table) {
    return get(child(ref(database), table))
}


