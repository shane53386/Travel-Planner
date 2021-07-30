import React, { useState } from "react";
import { auth } from "./firebase";
import LogIn from "./authenticate/LogIn";
import { useAuth } from "./authenticate/Auth";
import { Image, Navbar, Nav, NavDropdown } from "react-bootstrap";
import firebase, { db } from "./firebase";

const Navigation = () => {
	const { currentUser, logOut, resetPassword } = useAuth();
	const [logIn, setLogIn] = useState(false);

	async function deletePlan(Name) {
		const data = db.collection("Users").doc(currentUser.displayName);
		await data.update({
			[`Plan.${Name}`]: firebase.firestore.FieldValue.delete(),
		});
	}

	async function addPlan(Name) {
		const data = db.collection("Users").doc(currentUser.displayName);
		await data.update({
			[`Plan.${Name}`]: { expense: {}, places: [], planning: {} },
		});
	}

	async function addToPlan(Name, Place) {
		const data = db.collection("Users").doc(currentUser.displayName);
		await data.update({
			[`Plan.${Name}.places`]:
				firebase.firestore.FieldValue.arrayUnion(Place),
		});
	}

	return (
		<>
			<Navbar
				collapseOnSelect
				expand="xl"
				bg="primary"
				variant="dark"
				sticky="top"
			>
				<Navbar.Brand href="./Home">Home</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse
					id="responsive-navbar-nav"
					className="justify-content-between"
				>
					<Nav className="mr-auto">
						<Nav.Link href="./Overview">Overview</Nav.Link>
						{currentUser && (
							<NavDropdown
								title="Plan"
								id="collasible-nav-dropdown"
							>
								<NavDropdown.Item
									as="button"
									onClick={() => deletePlan("plan1")}
								>
									Plan1
								</NavDropdown.Item>
								<NavDropdown.Item
									as="button"
									onClick={() => deletePlan("plan2")}
								>
									Plan2
								</NavDropdown.Item>
								<NavDropdown.Item
									as="button"
									onClick={() => addToPlan("plan3", "ABC")}
								>
									Plan3
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item
									as="button"
									onClick={() => addPlan("plan4")}
								>
									Add new plan
								</NavDropdown.Item>
							</NavDropdown>
						)}
					</Nav>
					<Nav>
						{currentUser ? (
							<NavDropdown
								title={
									<Image
										src={currentUser.photoURL}
										roundedCircle
										style={{
											width: "40px",
											height: "40px",
										}}
									/>
								}
								id="collasible-nav-dropdown"
								alignRight
							>
								<NavDropdown.Item
									as="button"
									onClick={() =>
										resetPassword(currentUser.email)
									}
								>
									Reset Password
								</NavDropdown.Item>
								<NavDropdown.Item as="button" onClick={logOut}>
									Sign Out
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item
									as="button"
									onClick={() => addPlan("plan4")}
								>
									Settings
								</NavDropdown.Item>
							</NavDropdown>
						) : (
							<Nav.Link href="#" onClick={() => setLogIn(true)}>
								Log In
							</Nav.Link>
						)}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
			<LogIn show={logIn} onHide={() => setLogIn(false)} />
		</>
	);
};

export default Navigation;
