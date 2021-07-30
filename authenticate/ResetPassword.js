import React, { useState } from "react";
import { useAuth } from "./Auth";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const ResetPassword = ({ show, onHide }) => {
	const { resetPassword } = useAuth();
	const [validated, setValidated] = useState(false);
	const [succes, setSuccess] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();
		setValidated(true);
		if (!e.target.checkValidity()) return;

		const { email } = e.target.elements;

		setLoading(true);
		const msg = await resetPassword(email.value);
		setLoading(false);

		if (!msg) {
			setSuccess("Please check your email.");
			setTimeout(() => {
				setSuccess("");
			}, 3000);
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
			{succes && <Alert variant="success">{succes}</Alert>}
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
					<Modal.Title>Reset Password</Modal.Title>
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
