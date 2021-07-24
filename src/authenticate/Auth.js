import React, { useState, useEffect, useContext } from "react";
import { auth, db } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [selectedPlan,setSelectedPlan] = useState(null);
	const [allPlans,setAllPlans] =useState(null);

	async function signUp(username, email, password) {
		const userRef = db.collection("Users").doc(username);
		const userDoc = await userRef.get();
		if (userDoc.exists) return "Username already exists.";
		return auth
			.createUserWithEmailAndPassword(email, password)
			.then((userCredential) => {
				userCredential.user.sendEmailVerification();
				userCredential.user
					.updateProfile({
						displayName: username,
					})
					.then(() =>
						userRef.set({
							email: email,
							emailVerify: false,
						})
					);
				auth.signOut();
			})
			.catch((err) => {
				if (err.code === "auth/email-already-in-use")
					return "Email already in use.";
				else if (err.code === "auth/weak-password")
					return "Weak password";
				else return err.code;
			});
	}

	async function logIn(email, password) {
		// const userRef = db.collection("Users").where("email", "==", email);
		// const doc = await userRef.get();
		// console.log(doc.data());
		return (
			auth
				.signInWithEmailAndPassword(email, password)
				.then((userCredential) => {
					if (userCredential.user.emailVerified) return;
					auth.signOut();
					return "Please verify your email";
				})
				.catch((err) => {
					if (err.code === "auth/user-not-found")
						return "User not found.";
					else if (err.code === "auth/wrong-password")
						return "Invalid password.";
					return "Too many attempts to login. Please reset your password and try again.";
				})
		);
	}

	function logOut() {
		return auth.signOut();
	}

	function resetPassword(email) {
		return auth.sendPasswordResetEmail(email).catch((err) => {
			if (err.code === "auth/user-not-found") return "User not found.";
			return err.code;
		});
	}

	async function selectPlan(plan) {
		
	}
	async function getPlan(user){
		console.log(user.email)
		const userRef = db.collection("Users").doc(user.displayName);
		userRef.get().then((doc) => setAllPlans(doc.data().Plan));
		
		//console.log(doc.data());
	}
	useEffect(()=>{
		console.log(allPlans)
		console.log(selectedPlan)
	},[allPlans])

	useEffect(()=>{
		console.log(selectedPlan)
	},[selectedPlan])

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);

			if (user != null)
			getPlan(user);
			setLoading(false);
		});
		return unsubscribe;
	}, []);

	const value = {
		currentUser,allPlans,selectedPlan,setSelectedPlan,
		signUp,
		logIn,
		logOut,
		resetPassword,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
