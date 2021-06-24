import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Link } from 'react-router-dom';
import MapContent from "./text"
import Expense from './ExpensePage/expense';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <BrowserRouter>
    <div style= {{width: '100%', height: 800,}} >
      <Expense/>
      
      </div>
    </BrowserRouter>
, document.getElementById("root"))

/*
<MapContent id="myMap"  
      options={{center: { lng : 100.633214325 , lat : 13.724293875 },
      zoom: 6} }
      src='https://data.opendevelopmentmekong.net/geoserver/ODMekong/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ODMekong%3Atha_admbnda_adm1_rtsd_20190221&outputFormat=application%2Fjson'/>
*/
      
reportWebVitals();
