import React, { useState } from "react";
import { useAuth } from "./Auth";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const ResetPassword = (props) => {
	const { resetPassword } = useAuth();
	const [succes, setSuccess] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();
		const { email } = e.target.elements;

		setLoading(true);
		const msg = await resetPassword(email.value);
		setLoading(false);
		
		if (!msg) {
			setSuccess("Please check your email.");
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
					<Modal.Title>Reset Password</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{error && <Alert variant="danger">{error}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id="email">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								name="email"
								required
							/>
						</Form.Group>
						<Button
							disabled={loading}
							variant="primary"
							type="submit"
						>
							Reset password
						</Button>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default ResetPassword;
