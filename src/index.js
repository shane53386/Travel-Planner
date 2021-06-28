import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Link , Route,Switch, } from 'react-router-dom';
import MapContent from "./text"
import MapDirection from './Plan/mapDirect';
import Expense from './ExpensePage/expense';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

const THAI_BOUNDS = {
  north: 21,
  south: 4,
  west: 94,
  east: 106,
};

ReactDOM.render(
  
  <BrowserRouter>
      <Link to="/">Home</Link>{' '}
      <Link to="/map">Map</Link>
      <Link to="/table">Table</Link>
      <Link to="/mapDirect">MapDirect</Link>
      <Switch>

        <Route path="/table" render={() => 
            <div style= {{width: '100%', height: 800,}} >
              <Expense/>      
            </div>} />
        <Route path="/map" render={()=>
            <div style= {{width: '80%', height: 600,}} >
            <MapContent id="myMap"  
            options={
              {center: { lng : 100.633214325 , lat : 13.724293875 },
              zoom: 6,
              restriction: {
                latLngBounds: THAI_BOUNDS,
                strictBounds: false,
              }
            }}
            src='https://data.opendevelopmentmekong.net/geoserver/ODMekong/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ODMekong%3Atha_admbnda_adm1_rtsd_20190221&outputFormat=application%2Fjson'/>
            </div>
          }/>
        <Route path="/mapDirect" render={()=>
          <div style= {{width: '80%', height: 600,}} >
            <MapDirection id="myMap"  
            options={
              {center: { lng : 100.633214325 , lat : 13.724293875 },
              zoom: 6}}/>
          </div> 
        }/>      
      </Switch>
    
    </BrowserRouter>
  /**/
  , document.getElementById("root"))
      
reportWebVitals();
