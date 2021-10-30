import React, { useState } from "react";
import { useAuth } from "./Auth";
import { storage } from "../firebase";
import ResetPassword from "./ResetPassword";
import { Image, Modal, Button, Form, Alert } from "react-bootstrap";

const SignUp = ({ show, onHide }) => {
	const avatar = "https://image.flaticon.com/icons/png/128/149/149071.png";
	const { signUp } = useAuth();
	const [validated, setValidated] = useState(false);
	const [url, setURL] = useState(avatar);
	const [reset, setReset] = useState(false);
	const [succes, setSuccess] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	async function selectProfile(e) {
		const file = e.target.files[0];
		console.log(file);
		if (!file.type.includes("image")) return;
		const storageRef = storage.ref(`/images`);
		const fileRef = storageRef.child(file.name);
		await fileRef.put(file);
		const link = await fileRef.getDownloadURL();
		setURL(link);
	}

	async function handleSubmit(e) {
		e.preventDefault();
		setValidated(true);
		if (!e.target.checkValidity()) return;
		const { username, email, password, confirmpassword } =
			e.target.elements;

		if (password.value !== confirmpassword.value) {
			setError("Password doesn't match.");
			setTimeout(() => {
				setError("");
			}, 3000);
			return;
		}

		setLoading(true);
		const msg = await signUp(
			username.value,
			email.value,
			password.value,
			url
		);
		setLoading(false);

		if (!msg) {
			setSuccess("Sign Up complete. Please verify your email.");
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
					setURL(avatar);
					setValidated(false);
				}}
				size="lg"
				scrollable
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title>Sign Up</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{error && <Alert variant="danger">{error}</Alert>}
					<Form
						noValidate
						validated={validated}
						onSubmit={handleSubmit}
					>
						<Form.Group
							controlId="formFile"
							id="profile"
							className="d-flex flex-column align-items-center"
						>
							<Image
								src={url}
								roundedCircle
								style={{ width: "150px", height: "150px" }}
								className="mb-3"
							/>
							<Form.Control
								type="file"
								name="profile"
								onChange={selectProfile}
								style={{ width: "97px" }}
							/>
						</Form.Group>
						<Form.Group id="username">
							<Form.Label>Username</Form.Label>
							<Form.Control
								type="text"
								name="username"
								required
							/>
							<Form.Control.Feedback type="invalid">
								Please fill your username.
							</Form.Control.Feedback>
						</Form.Group>
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
						<Form.Group id="confirmpassword">
							<Form.Label>Confirmation Password</Form.Label>
							<Form.Control
								type="password"
								name="confirmpassword"
								required
							/>
							<Form.Control.Feedback type="invalid">
								Please enter your password again.
							</Form.Control.Feedback>
						</Form.Group>
						<Button
							disabled={loading}
							variant="primary"
							type="submit"
							// className="d-flex"
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
								onHide();
								setURL(avatar);
								setValidated(false);
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
