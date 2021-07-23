import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./Navigation";
import Home from "./Home/Home.js";
import LogIn from "./authenticate/LogIn";
import SignUp from "./authenticate/SignUp";
import ResetPassword from "./authenticate/ResetPassword";
import MapContent from "./Home/text"
import MapDirection from './Plan/mapDirect';
import Expense from './ExpensePage/expense';
//import PlanPage from "./Plan/PlanPage";
//import Overview from "./Overview";
import overView from "./Plan/overView";
import Review from "./rating/Review";
import OverView from "./Overview";
import { AuthProvider } from "./authenticate/Auth";
import { HomeProvider } from "./homeProvider";
const THAI_BOUNDS = {
	north: 21,
	south: 4,
	west: 94,
	east: 106,
  };
function App() {
	return (
		<>
		<AuthProvider>
			<Navigation />
			
					<Router>
						<Switch>
							<Route exact path="/home" component={Home}/>
							<Route path="/OverView/:place" component={OverView}/>
							<Route path="/login" component={LogIn} />
							<Route path="/signup" component={SignUp} />
							<Route path="/expense" component={Expense} />
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
