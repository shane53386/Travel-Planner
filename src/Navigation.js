import React, { useContext } from "react";
import { auth } from "./firebase";

const Navigation = () => {
	return (
		<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
			<div class="">
				<div
					class="container-fluid collapse navbar-collapse"
					id="navbarNavAltMarkup"
				>
					<div class="navbar-nav">
						<a
							class="navbar-brand mb-0 h1"
							aria-current="page"
							href="./Home"
						>
							Home
						</a>
						<>
							<a class="nav-link" href="./LogIn">
								Log In
							</a>
							<a class="nav-link" href="./SignUp">
								Sign Up
							</a>
						</>
						<a
							class="nav-link"
							href="./Home"
							onClick={() => auth.signOut()}
						>
							Sign Out
						</a>

						<a class="nav-link" href="./PlanPage">
							Plan
						</a>
						<a class="nav-link" href="./Overview">
							Overview
						</a>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navigation;
