import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

export const firebaseConfig = firebase.initializeApp({
	apiKey: "AIzaSyAFJbF0GbtVCH70GhIkKAC9qpWoapvclNk",
	authDomain: "travel-planner-317607.firebaseapp.com",
	projectId: "travel-planner-317607",
	storageBucket: "travel-planner-317607.appspot.com",
	messagingSenderId: "704456727208",
	appId: "1:704456727208:web:48faa5d958bbd50683409d",
	measurementId: "G-JQV2031YPF",
});

// firebase.analytics();
export const db = firebaseConfig.firestore();
export const auth = firebaseConfig.auth();
export const storage = firebaseConfig.storage();

export default firebase;
