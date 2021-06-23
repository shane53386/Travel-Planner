import reportWebVitals from './reportWebVitals';
import {compose, withProps, withStateHandlers} from "recompose"
import MapContent from "./text"
import ReactDOM from 'react-dom';

import { 
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,} from "react-google-maps"
  /*
const MapWithAMakredInfoWindow = compose(
  withStateHandlers(() => ({
    isOpen: false,
  }), {
    onToggleOpen: ({isOpen}) => () => ({
      isOpen: !isOpen,
    })
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    <Marker
      position={{ lat: -34.397, lng: 150.644 }}
      onClick={props.onToggleOpen}
    >
      {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
      <span>Something</span>

      </InfoWindow>}
    </Marker>

    <Marker
      position={{ lat: -34.41, lng: 150.65 }}
      onClick={props.onToggleOpen}
    >
      {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
      <span>Something</span>

      </InfoWindow>}
    </Marker>
  </GoogleMap>
);
*/

ReactDOM.render(
  <div style= {{width: '100%', height: 800}} >
    <MapContent id="myMap"  
    options={{center: { lng : 100.633214325 , lat : 13.724293875 },
    zoom: 6} }
    src='https://data.opendevelopmentmekong.net/geoserver/ODMekong/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ODMekong%3Atha_admbnda_adm1_rtsd_20190221&outputFormat=application%2Fjson'/>
    </div>
, document.getElementById("root"))
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
