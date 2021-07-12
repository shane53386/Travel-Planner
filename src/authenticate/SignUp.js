import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "./Auth";

const SignUp = () => {
	const { currentUser, signUp } = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	if (currentUser) {
		return <Redirect to="../PlanPage" />;
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { username, email, password, confirmationpassword } =
			e.target.elements;
		if (password.value !== confirmationpassword.value) {
			document
				.getElementById("inputConfirmationPassword5")
				.classList.add("is-invalid");
			setError("Password doesn't match");
			return;
		}
		try {
			setLoading(true);
			await signUp(email.value, password.value, username.value);
		} catch (error) {
			alert(error);
		}
	};

	return (
		<>
			<div className="container mt-5">
				<h1>Sign Up</h1>
				<form onSubmit={handleSubmit}>
					<div className="mb-3">
						<label for="username" class="form-label">
							Username
						</label>
						<input
							type="text"
							class="form-control"
							id="username"
							name="username"
							title="Invalid Username"
							required
						/>
					</div>
					<div className="mb-3">
						<label for="exampleInputEmail1" class="form-label">
							Email address
						</label>
						<input
							type="email"
							class="form-control"
							id="exampleInputEmail1"
							name="email"
							title="Invalid Email"
							pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
							required
						/>
						<div id="emailHelp" class="form-text">
							We'll never share your email with anyone else.
						</div>
					</div>
					<div className="mb-3">
						<label for="inputPassword5" className="form-label">
							Password
						</label>
						<input
							type="password"
							id="inputPassword5"
							className="form-control"
							name="password"
							title="Must contain at least one number, one lowercase letter, and must be 8-20 characters"
							pattern="(?=.*\d)(?=.*[a-z]).{8,20}"
							required
						/>
						<div id="passwordHelpBlock" className="form-text">
							Must contain at least one number, one lowercase
							letter, and must be 8-20 characters
						</div>
					</div>
					<div className="mb-3">
						<label
							for="inputConfirmationPassword5"
							className="form-label"
						>
							Confirmation password
						</label>
						<input
							type="password"
							id="inputConfirmationPassword5"
							className="form-control"
							name="confirmationpassword"
							title="Must contain at least one number, one lowercase letter, and must be 8-20 characters"
							pattern="(?=.*\d)(?=.*[a-z]).{8,20}"
							required
						/>
						<div
							id="confirmationPasswordHelpBlock"
							className="invalid-feedback"
						>
							{error}
						</div>
					</div>
					<div className="d-grid gap-2 d-md-flex justify-content-md-end">
						<button
							type="submit"
							className="btn btn-primary"
							disabled={loading}
						>
							Sign Up
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default SignUp;
