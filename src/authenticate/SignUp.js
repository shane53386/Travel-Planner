import React, { useState } from "react";
import { useAuth } from "./Auth";
import ResetPassword from "./ResetPassword";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const SignUp = (props) => {
	const { signUp } = useAuth();
	const [reset, setReset] = useState(false);
	const [succes, setSuccess] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();
		const { username, email, password, confirmpassword } =
			e.target.elements;

		if (password.value !== confirmpassword.value) {
			setError("Password doesn't match.");
			setTimeout(() => {
				setError("");
			}, 3000);
			return;
		}
		console.log(
			username.value,
			email.value,
			password.value,
			confirmpassword.value
		);
		setLoading(true);
		const msg = await signUp(username.value, email.value, password.value);
		setLoading(false);
		if (!msg) {
			setSuccess("Sign Up complete. Please verify your email.");
			setTimeout(() => {
				setSuccess("");
			}, 3000);
			props.onHide();
		} else {
			setError(msg);
			setTimeout(() => {
				setError("");
			}, 3000);
		}
	}

	return (
		<>
			{succes && <Alert variant="success">{succes}</Alert>}
			<Modal {...props} size="lg" centered>
				<Modal.Header closeButton>
					<Modal.Title>Sign Up</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{error && <Alert variant="danger">{error}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id="username">
							<Form.Label>Username</Form.Label>
							<Form.Control
								type="text"
								name="username"
								required
							/>
						</Form.Group>
						<Form.Group id="email">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" name="email" required />
						</Form.Group>
						<Form.Group id="password">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								name="password"
								required
							/>
						</Form.Group>
						<Form.Group id="confirmpassword">
							<Form.Label>Confirmation Password</Form.Label>
							<Form.Control
								type="password"
								name="confirmpassword"
								required
							/>
						</Form.Group>
						<Button
							disabled={loading}
							variant="primary"
							type="submit"
						>
							Sign Up
						</Button>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<span>
						<a
							href="#"
							onClick={() => {
								props.onHide();
								setReset(true);
							}}
						>
							Forget a password?
						</a>
					</span>
				</Modal.Footer>
			</Modal>
			<ResetPassword show={reset} onHide={() => setReset(false)} />
		</>
	);
};

export default SignUp;
