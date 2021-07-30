import React, { useState, useEffect, useContext } from "react";
import {  auth, db } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);

	async function signUp(username, email, password, url) {
		const userRef = db.collection("Users").doc(username);
		const userDoc = await userRef.get();
		if (userDoc.exists) return "Username already exists.";
		return auth
			.createUserWithEmailAndPassword(email, password)
			.then(async (userCredential) => {
				userCredential.user.sendEmailVerification();
				userCredential.user
					.updateProfile({
						displayName: username,
						photoURL: url,
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
		return auth
			.signInWithEmailAndPassword(email, password)
			.then((userCredential) => {
				if (userCredential.user.emailVerified) return;
				auth.signOut();
				return "Please verify your email";
			})
			.catch((err) => {
				console.log(err.code);
				if (err.code === "auth/user-not-found")
					return "User not found.";
				else if (err.code === "auth/wrong-password")
					return "Invalid password.";
				else if (err.code === "auth/too-many-requests")
					return "Too many attempts to login. Please reset your password and try again.";
				else if (err.code === "auth/invalid-email")
					return "Invalid email.";
				return err.code;
			});
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

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setLoading(false);
		});
		return unsubscribe;
	}, []);

	const value = {
		currentUser,
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
