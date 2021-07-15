import React, { useState, useEffect ,Component,useContext } from 'react';
import Data from "./Data";
//import MarkerPin from "./src/MarkerPin"
import fetchPlace from './fetchData';
import {Autocomplete} from '@material-ui/lab';
import {TextField}  from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {BrowserRouter, Link , Route,Switch,withRouter } from 'react-router-dom';
import OverView from './Plan/overView';
import { useHome } from './homeProvider';

var map;var dataLayer;var info 
var geoJson = null
const data = new Data()
const weatherKey = "22f30fcf6dd5b269bf5cbe441f735a39";

var focusProvince = {province : "null" , feature : "null"}
var usedMarker = []
function MapContent (props){

  const home = useHome();
  const [inProvince,setInprovince] = useState([])
  //const [usedMarker,setUsedMarker] = useState([])
  const [usedInfo,setUsedInfo] = useState(null)
 
  //const [focusProvince,setFocusProvince] = useState({province : "null" , feature : "null"})
     
   
  const xxxx1=()=>{
    console.log("Yes")
    let path = `overView`;
    props.history.push(path);
    //document.getElementById("toDetail").innerHTML = "going";
  }
  
   const createZoom=()=>{
    map.data.addListener("click", e => {
      
      var name = e.feature.getProperty("ADM1_TH")
      clearOldInfo()
      if (focusProvince.province == name) return
      map.setZoom(9.5)
      window.google.maps.event.trigger(map, 'resize');
      map.setCenter(new window.google.maps.LatLng(data.state.centerMap[name]['lat'],data.state.centerMap[name]['lng']))
      
      createMarker(e.feature.getProperty("ADM1_TH"))
     
      map.data.overrideStyle(focusProvince.feature, { fillOpacity: 0.3 });
      focusProvince = {province : name , feature : e.feature}
      map.data.overrideStyle( e.feature, { fillOpacity: 0.1 });
      console.log(e.feature)
    })

    map.addListener("zoom_changed", () => {
      var tmp = map
      if (map.getZoom() < 7.5){
        tmp = null
      }
      usedMarker && usedMarker.map(p=>{
          p.setMap(tmp)
        })
      })
  }

  const onScriptLoad=()=> {
    map = new window.google.maps.Map(
      document.getElementById(props.id),props.options);
  }

  const dataHandler=()=>{
    if (geoJson==null){
      fetch(props.src)
        .then(response => response.json())
        .then(data => geoJson = data)
        .then(data=> dataLayer = map.data.addGeoJson(data))
    }
    
    dataLayer = map.data.addGeoJson(geoJson)
    map.data.setStyle({
      fillColor: 'blue',
      strokeWeight: 0.8,
      fillOpacity: 0.3
  });
    map.data.addListener('mouseover', (event) => {
        map.data.overrideStyle(event.feature, {fillOpacity: 0.1 });
    });
    map.data.addListener('mouseout', (event) => {
      console.log(focusProvince)
      if (focusProvince.province == event.feature.getProperty("ADM1_TH")) return
      map.data.overrideStyle(event.feature, { fillOpacity: 0.3 });

    });
    
}

  const clearOldInfo=()=>{
    //console.log(this.state.usedInfo)
    usedInfo && usedInfo.close() 
  }

  const clearOldMarker=()=>{
      console.log(usedMarker)
      usedMarker && usedMarker.map(p=>{
        p.setMap(null)
        p.setVisible(false)
      })
      
      usedMarker = []
      console.log(usedMarker)
   
  }

  const genContent=(p,data)=>{
    var path = "xxx"
    return ('<div id = "content">' +
      '<div id = "siteNotice"/>'+
            '<h1 id="firstHeading" class="firstHeading"><b>'+p.name+'</b></h1> <br>'+
            `<p>${p.description}</p>`+
            `<div>Type : ${p.type}</div>`+
            `<div>Temp : ${data.current==null? "Unknown":data.current.temp}</div>`+
            `<img src=${data.current==null? "":"http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png"}/>`+
            '<div id=toDetail></div>'+
            `<input type='button' id='butSubmit' value='Procurar' onclick={console.log("path",${path})}>`+
            '<BrowserRouter>'+
              `<Link to="/table">ReadMore</Link>`+
              '<Route path="/table" render={() => <div style= {{width: "100%", height: 800,}} >   <OverView/>    </div>} />'+
            '</BrowserRouter>'+
      '</div>'+
      '</div>')
  }


  const renderBtn=()=>{
    return "<Button onClick={this.toDetail()}>Read More</Button>"
    
  }
  const createMarker=(province)=>{
    
    //clear old markers
    clearOldInfo()
    //clear old Info
    clearOldMarker()

    //find new
    var place = new Map()
    var content = fetchPlace(province)
    
    var markerList = []
    console.log(province)
    content && content
    .then(e=>{
      home.setData(e)
      e.map(data=>{
        place.set(data.Name,{ name : data.Name,
                              type : data.Type,
                              position : data.Position,
                              description : data.Description})
      })
  })
  .then(e=>{
    
    place && place.forEach((p,keys)=>{
      console.log(place)
        var tmp = new window.google.maps.Marker({
          position: {lng : p.position.longitude , lat : p.position.latitude},
          map,
          animation : window.google.maps.Animation.DROP,
          icon : data.state.markerIcon["Market"]
        })

        var contentInfo
        let path = `overView`;
        var x = props.history
        var tmpInfo = new window.google.maps.InfoWindow({
        })
        fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${p.position.latitude}&lon=${p.position.longitude}&exclude=hourly,daily,minutely&appid=${weatherKey}`
        )
          .then((res) => res.json())
          .then((data) => {  
            contentInfo = genContent(p,data)
              //infowindow.setContent('<input type="button" value="View" onclick="joinFunction()"><input type="button" value="Join" onclick="alert(\"infoWindow\")">');
            tmpInfo.setContent(contentInfo)
          })

        var nameInfo = 
        `<div>${p.name}</div>`
        var tmp2Info = new window.google.maps.InfoWindow({
          content : nameInfo
        })
        tmp.addListener("click",e=>{
            clearOldInfo()
            tmpInfo.open({
              anchor : tmp,
              map,
              shouldFocus: true
            })
            setUsedInfo(tmpInfo)
        })
        tmp.addListener("mouseover",e=>{
          tmp2Info.open({
            anchor : tmp,
            map,
            shouldFocus: true
          })
        })
        tmp.addListener("mouseout",e=>{
          tmp2Info.close()
        })
        console.log(tmp)
        markerList.push(tmp)
    })
    usedMarker =markerList
    console.log(usedMarker)
  })
  }

  
  useEffect(()=> {
    console.log("render")
    if (!window.google) {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAAxJFxw0jQWyJIyB7K48-PKniPK8JUhuk`;
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
      // Below is important. 
      //We cannot access google.maps until it's finished loading
      s.addEventListener('load', e => {
        onScriptLoad()
        dataHandler()
        createZoom()
      })
    }
    else {
      onScriptLoad()
    }
    },["s"])
  
  const searchProvince=(event, inputValue)=>{
    if (inputValue=="" || inputValue==null) return
   
    clearOldInfo()
    //if (this.state.focusProvince.province ==  inputValue) return
    map.setZoom(9.5)
    window.google.maps.event.trigger(map, 'resize');
    map.setCenter(new window.google.maps.LatLng(data.state.centerMap[inputValue]['lat'],data.state.centerMap[inputValue]['lng']))
  
    
    map.data.overrideStyle(focusProvince.feature, { fillOpacity: 0.3 });
    createMarker(inputValue)
    var f = null;
      
      map.data.forEach(function(feature){
        if (feature.getProperty('ADM1_TH')==inputValue){
          f = feature;
          return;
        }
       
      })
      if (f!=null){
        map.data.overrideStyle(f, { fillOpacity: 0.1 });
        
        focusProvince={province : inputValue ,
          feature : f}
          console.log(focusProvince)
    }
  }


    return (
      <>
      
      <Autocomplete
        id="combo-box-demo"
        options={data.state.province}
        onInputChange={searchProvince}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
      />
        <div style={{ width: '100%', height: '100%' }} id={props.id}>
            
        </div>
       
        </>
    );
    }
export default withRouter(MapContent)

