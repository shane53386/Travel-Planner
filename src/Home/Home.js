import React from "react";
import MapContent from './text'
import Data from "../Data";
import ReviewPlan from "./reviewPlan"
import ReviewProvince from "./reviewProvince";
import { HomeProvider } from "../homeProvider";
import { AuthProvider, useAuth } from "../authenticate/Auth";

const data = new Data()

function Home(){
	const auth = useAuth()
	const showOnePlan = React.useRef(null);
	const searchProvince = React.useRef(null)
	const showOnePlace = React.useRef(null);


	
	return (
		<HomeProvider>
			<AuthProvider>
		<div style={{display:"inline"}}>
		<div style={true?{width:'25%' , height: 600,padding:"10px", float:"left"}
					:{width:'40%' , height: 600,padding:"10px", float:"left"}} >
			<ReviewProvince
			searchProvince = {searchProvince}
			showOnePlace ={showOnePlace }/>
			</div>
			<div style= {true?{width:'50%' , height: 600,padding:"10px", float:"left"}
					:{width:'60%' , height: 600,padding:"10px", float:"left"}} >
            	<MapContent id="myMap"  
					options={
					{center: { lng : 100.633214325 , lat : 13.724293875 },
					zoom: 6,
					restriction: {
						latLngBounds: data.state.THAI_BOUNDS,
						strictBounds: false,
					}
					}}
					searchProvince = {searchProvince}
					showOnePlan ={showOnePlan}
					showOnePlace ={showOnePlace }
					src='https://data.opendevelopmentmekong.net/geoserver/ODMekong/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ODMekong%3Atha_admbnda_adm1_rtsd_20190221&outputFormat=application%2Fjson'/>
            </div>
			
			{auth.currentUser == null? null:<div style= {{width: '25%', height: 600,padding:"10px", float:"right"}} >
				<ReviewPlan 
					showOnePlan ={showOnePlan}
					showOnePlace ={showOnePlace }/>
			</div>}
			</div>
			</AuthProvider>
		</HomeProvider>
	);
};

export default Home;
