import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./Navigation";
import Home from "./Home";
import LogIn from "./authenticate/LogIn";
import SignUp from "./authenticate/SignUp";
import ResetPassword from "./authenticate/ResetPassword";
import MapContent from "./text"
import MapDirection from './Plan/mapDirect';
import Expense from './ExpensePage/expense';
//import PlanPage from "./Plan/PlanPage";
//import Overview from "./Overview";
import overView from "./Plan/overView";
import Review from "./rating/Review";
import { AuthProvider } from "./authenticate/Auth";
const THAI_BOUNDS = {
	north: 21,
	south: 4,
	west: 94,
	east: 106,
  };
function App() {
	return (
		<>
			<Navigation />
			<AuthProvider>
				<Router>
					<Switch>
						<Route exact path="/home" render={()=>
							<div style= {{width: '80%', height: 600,}} >
							<MapContent id="myMap"  
							options={
							{center: { lng : 100.633214325 , lat : 13.724293875 },
							zoom: 6,
							restriction: {
								latLngBounds: THAI_BOUNDS,
								strictBounds: false,
							}}}
							src='https://data.opendevelopmentmekong.net/geoserver/ODMekong/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ODMekong%3Atha_admbnda_adm1_rtsd_20190221&outputFormat=application%2Fjson'/>
							 
							</div>}
							/>
						
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
