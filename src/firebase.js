import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = firebase.initializeApp({
	/*
	key
	*/
});

// firebase.analytics();
export const db = firebaseConfig.firestore();
export const auth = firebaseConfig.auth();

export default firebaseConfig;
