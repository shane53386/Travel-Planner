import React, { useState } from "react";
import { useAuth } from "./Auth";
import SignUp from "./SignUp";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const LogIn = ({ show, onHide }) => {
	const { logIn } = useAuth();
	const [validated, setValidated] = useState(false);
	const [signUp, setSignUp] = useState(false);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();
		setValidated(true);
		if (!e.target.checkValidity()) return;
		const { email, password } = e.target.elements;

		setLoading(true);
		const msg = await logIn(email.value, password.value);
		setLoading(false);

		if (!msg) {
			onHide();
		} else {
			setError(msg);
			setTimeout(() => {
				setError("");
			}, 3000);
		}
	}

	return (
		<>
			<Modal
				show={show}
				onHide={() => {
					onHide();
					setValidated(false);
				}}
				size="lg"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title>Log In</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{error && <Alert variant="danger">{error}</Alert>}
					<Form
						noValidate
						validated={validated}
						onSubmit={handleSubmit}
					>
						<Form.Group id="email">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" name="email" required />
							<Form.Control.Feedback type="invalid">
								Please fill your email.
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group id="password">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								name="password"
								required
							/>
							<Form.Control.Feedback type="invalid">
								Please enter your password.
							</Form.Control.Feedback>
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
								onHide();
								setValidated(false);
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
