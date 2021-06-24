import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyAFJbF0GbtVCH70GhIkKAC9qpWoapvclNk",
	authDomain: "travel-planner-317607.firebaseapp.com",
	projectId: "travel-planner-317607",
	storageBucket: "travel-planner-317607.appspot.com",
	messagingSenderId: "704456727208",
	appId: "1:704456727208:web:48faa5d958bbd50683409d",
	measurementId: "G-JQV2031YPF"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore();

export default db;
