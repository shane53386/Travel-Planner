import React, { useEffect, useState} from 'react';
import {Tab,Tabs} from 'react-bootstrap';
import MapDirection from './mapDirect';
import TableShow from './tableShow';
import './table.css'

import {Provider} from './provider';
function OverView(props){

  
    const [key, setKey] = useState('home');
    useEffect(()=>{
      //console.log(selectedPlan,allPlans)
    },[])
    
  return (
    
    <Provider>
     
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}

    >
      
      <Tab eventKey="home" title="Plan Page">
      <div style= {{width: '100%', height: 800,float:'right'}}>
            <MapDirection id="myMap"  
                options={
                {center: { lng : 100.633214325 , lat : 13.724293875 },
                zoom: 6,
                mapId: "6ef51b53d122d80d" }}/>
            
            </div>
      </Tab>
      <Tab eventKey="profile" title="Table Result">
        <div style= {{width: '100%', height: 800,}} >
              <TableShow/>      
            </div>
      </Tab>
      
    </Tabs>
    </Provider>
  );

}
export default OverView