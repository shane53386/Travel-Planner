import React, { useState, useEffect, useContext } from "react";
import { auth } from "../firebase";

export const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
	const [loading, setLoading] = useState(true);
	const [currentUser, setCurrentUser] = useState(null);

	function signUp(email, password) {
		auth.createUserWithEmailAndPassword(email, password).then(
			(userCredential) => {
				userCredential.user.sendEmailVerification();
				auth.signOut();
			}
		);

		return;
	}

	function logIn(email, password) {
		return auth.signInWithEmailAndPassword(email, password);
	}

	function logOut() {
		return auth.signOut();
	}

	function resetPassword(email) {
		return auth.sendPasswordResetEmail(email);
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
		logIn,
		signUp,
		logOut,
		resetPassword,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
};
