import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "./Auth";

const ResetPassword = () => {
	const { currentUser, resetPassword } = useAuth();
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { email } = e.target.elements;
		try {
			setLoading(true);
			await resetPassword(email.value);
			alert("Check your inbox for further instructions");
		} catch (error) {
			alert(error);
		}
	};

	if (currentUser) {
		return <Redirect to="../PlanPage" />;
	}

	return (
		<>
			<div className="container mt-5">
				<h1>Reset Password</h1>
				<form onSubmit={handleSubmit}>
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
					</div>
					<button
						type="submit"
						className="btn btn-primary"
						disabled={loading}
					>
						Reset Password
					</button>
				</form>
			</div>
		</>
	);
};

export default ResetPassword;
