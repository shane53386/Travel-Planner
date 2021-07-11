import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { useAuth } from "./Auth";
import { Modal, Button } from "react-bootstrap";

const LogIn = ({ show }) => {
	const { currentUser, logIn } = useAuth();
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { email, password } = e.target.elements;
		try {
			setLoading(true);
			await logIn(email.value, password.value);
		} catch (error) {
			console.log(error);
			alert(error);
		}
	};

	if (currentUser) {
		return <Redirect to="../PlanPage" />;
	}

	return (
		<>
			<Modal show={show}>
				<Modal.Header closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Woohoo, you're reading this text in a modal!
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary">Close</Button>
					<Button variant="primary">Save Changes</Button>
				</Modal.Footer>
			</Modal>

			{/* --------------------------------------------------------------------------------- */}
			<div className="container mt-5">
				<h1>Log In</h1>
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
					</div>
					<div className="d-grid gap-2 d-md-flex justify-content-md-end">
						<button
							type="submit"
							className="btn btn-primary"
							disabled={loading}
						>
							Log In
						</button>
						<Link to="./ResetPassword">
							<button type="button" className="btn btn-warning">
								Forget password
							</button>
						</Link>
					</div>
				</form>
			</div>
		</>
	);
};

export default LogIn;
