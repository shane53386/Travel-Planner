import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./Navigation";
import Home from "./Home";
import LogIn from "./authenticate/LogIn";
import SignUp from "./authenticate/SignUp";
import ResetPassword from "./authenticate/ResetPassword";
//import PlanPage from "./Plan/PlanPage";
//import Overview from "./Overview";
import overView from "./Plan/overView";
import Review from "./rating/Review";
import { AuthProvider } from "./authenticate/Auth";

function App() {
	return (
		<>
			<Navigation />
			<AuthProvider>
				<Router>
					<Switch>
						<Route exact path="/home" component={Home} />
						
						<Route path="/login" component={LogIn} />
						<Route path="/signup" component={SignUp} />
						
						<Route path="/planPage" component={overView} />
						<Route
							path="/resetpassword"
							component={ResetPassword}
						/>
					</Switch>
				</Router>
			</AuthProvider>
		</>
	);
}

export default App;
