import React from "react";
import MapContent from './text'
import Data from "./Data";
import ReviewPlan from "./reviewPlan"
import { HomeProvider } from "./homeProvider";


const data = new Data()
const Home = () => {

	return (
		<HomeProvider>
		<div style={{display:"inline"}}>
			<div style= {{width: '70%', height: 600,padding:"10px", float:"left"}} >
            	<MapContent id="myMap"  
					options={
					{center: { lng : 100.633214325 , lat : 13.724293875 },
					zoom: 6,
					restriction: {
						latLngBounds: data.state.THAI_BOUNDS,
						strictBounds: false,
					}
					}}
					src='https://data.opendevelopmentmekong.net/geoserver/ODMekong/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ODMekong%3Atha_admbnda_adm1_rtsd_20190221&outputFormat=application%2Fjson'/>
            </div>

			<div style= {{width: '30%', height: 600,padding:"10px", float:"right"}} >
				<ReviewPlan/>
			</div>
			</div>
		</HomeProvider>
	);
};

export default Home;
