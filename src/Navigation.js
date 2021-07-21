import React, { useState } from "react";
import { auth } from "./firebase";
import LogIn from "./authenticate/LogIn";
import { useAuth } from "./authenticate/Auth";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

const Navigation = () => {
	const { currentUser } = useAuth();
	const [logIn, setLogIn] = useState(false);
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
								<NavDropdown.Item href="#action/3.1">
									Plan1
								</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.2">
									Plan2
								</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.3">
									Plan3
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="#action/3.4">
									Add new plan
								</NavDropdown.Item>
							</NavDropdown>
						)}
					</Nav>
					<Nav>
						{currentUser ? (
							<Nav.Link
								href="./Home"
								onClick={() => auth.signOut()}
							>
								Sign Out
							</Nav.Link>
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
