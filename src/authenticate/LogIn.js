import React, { useState } from "react";
import { useAuth } from "./Auth";
import SignUp from "./SignUp";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const LogIn = (props) => {
	const { logIn } = useAuth();
	const [signUp, setSignUp] = useState(false);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();
		const { email, password } = e.target.elements;

		setLoading(true);
		const msg = await logIn(email.value, password.value);
		setLoading(false);
		
		if (!msg) {
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
			<Modal {...props} size="lg" centered>
				<Modal.Header closeButton>
					<Modal.Title>Log In</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{error && <Alert variant="danger">{error}</Alert>}
					<Form onSubmit={handleSubmit}>
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
						<Button
							disabled={loading}
							variant="primary"
							type="submit"
						>
							Log In
						</Button>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<span>
						Didn't have an account?{" "}
						<a
							href="#"
							onClick={() => {
								props.onHide();
								setSignUp(true);
							}}
						>
							Sign Up
						</a>
					</span>
				</Modal.Footer>
			</Modal>
			<SignUp show={signUp} onHide={() => setSignUp(false)} />
		</>
	);
};

export default LogIn;
