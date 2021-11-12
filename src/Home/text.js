import React, { useState, useEffect} from 'react';
import Data from "../Data";
import {fetchPlace} from '../fetchData';
import Button from '@material-ui/core/Button';
import {withRouter } from 'react-router-dom';
import OverView from '../Plan/overView';
import { useHome } from '../homeProvider';

var map;var dataLayer;var info 
var geoJson = null
const data = new Data()
const weatherKey = "22f30fcf6dd5b269bf5cbe441f735a39";

var focusProvince = {province : "null" , feature : "null"}
var province_usedMarker = []
var plan_usedMarker = []
var usedInfo = {info : null,name:""}
//var nullButton = []
var focus = "province"
function MapContent (props){

  const home = useHome();
  const [nullButton,setNullButton] = useState([])
  //const [usedMarker,setUsedMarker] = useState([])
 
  //const [focusProvince,setFocusProvince] = useState({province : "null" , feature : "null"})
     
   
  const xxxx1=()=>{
    console.log("Yes")
    let path = `overView`;
    props.history.push(path);
    //document.getElementById("toDetail").innerHTML = "going";
  }
  
   const createZoom=()=>{
    map.data.addListener("rightclick", e => {
      focus = "province"
      
      var name = e.feature.getProperty("ADM1_TH")
      clearOldInfo()
      if (focusProvince.province == name) return
      map.setZoom(9.5)
      window.google.maps.event.trigger(map, 'resize');
      map.setCenter(new window.google.maps.LatLng(data.state.centerMap[name]['lat'],data.state.centerMap[name]['lng']))
      
      province_createMarker(e.feature.getProperty("ADM1_TH"))
     
      map.data.overrideStyle(focusProvince.feature, { fillOpacity: 0.3 });
      focusProvince = {province : name , feature : e.feature}
      map.data.overrideStyle( e.feature, { fillOpacity: 0.1 });
      
    })

    map.addListener("zoom_changed", () => {
      var tmp = map
      if (map.getZoom() < 7.5){
        tmp = null
      }
      province_usedMarker &&province_usedMarker.map(p=>{
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
    console.log(usedInfo)
    usedInfo.info && usedInfo.info.close() 
  }

  const province_clearOldMarker=()=>{
    province_usedMarker && province_usedMarker.map(p=>{
        p.setMap(null)
        p.setVisible(false)
      })
      province_usedMarker = []
  }
  
  const plan_clearOldMarker=()=>{
    plan_usedMarker && plan_usedMarker.map(p=>{
        p.setMap(null)
        p.setVisible(false)
      })
      plan_usedMarker = []
  }

  const showOnePlan=(places)=>{
    console.log(places)
    plan_clearOldMarker()
    //clearOldInfo()
    province_clearOldMarker()
    focusProvince =  {province : "null" , feature : "null"}
    focus = "plan"
    var markerList = []
    places.map(p=>{
      markerList.push(createOneMarker(p,"plan"))
    })
    console.log(focus)
    plan_usedMarker=markerList
  }

  const showOnePlace=(place,plan)=>{
    if (plan==null) focus="province"
    else{
      if (focus=="province"){
        showOnePlan(plan)
      }
    }
    clearOldInfo()
    console.log(place.Name+"Marker")
    document.getElementById(place.Name+"Marker").click();
    map.setZoom(10)
    window.google.maps.event.trigger(map, 'resize');
    map.setCenter({lng : place.Position.longitude , lat : place.Position.latitude})
  }

  const genContent=(p,data)=>{
    nullButton.push()
    var path = "xxx"
    return ('<div id = "content">' +
      '<div id = "siteNotice"/>'+
            '<h1 id="firstHeading" class="firstHeading"><b>'+p.Name+'</b></h1> <br>'+
            `<p>${p.Description}</p>`+
            `<div>Type : ${p.Type}</div>`+
            '<div id=toDetail></div>'+
            `<input type='button' id='butSubmit' value='Information' onclick={document.getElementById("toDetail").click()} )}>`+
           
      '</div>'+
      '</div>')
  }
  /*
  `<div>Temp : ${data.current==null? "Unknown":data.current.temp}</div>`+
  `<img src=${data.current==null? "":"http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png"}/>`+
  */


  const renderBtn=()=>{
    return "<Button onClick={this.toDetail()}>Read More</Button>"
    
  }
  const province_createMarker=(province)=>{
  
    //clear old markers
    clearOldInfo()
    //clear old Info
    province_clearOldMarker()
    plan_clearOldMarker()
    //find new
    var place = new Map()
    var markerList = []
    var content = fetchPlace(province).then(allData=>{
        allData.forEach(data => {
          place.set(data.Name,{ Name : data.Name,
            Type : data.Type,
            Position : data.Position,
            Description : data.Description})
        });       
      }).then(()=>{
    console.log(place)
    place && place.forEach((p,keys)=>{
      markerList.push(createOneMarker(p)) 
    })
    province_usedMarker =markerList
    console.log(province_usedMarker)
  })
  
  }

  const createOneMarker=(p)=>{

    console.log(p)
    home.setFocusPlace(p.Name)
    //console.log(p.Name+"Marker")
    var tmp = new window.google.maps.Marker({
      position: {lng : p.Position.longitude , lat : p.Position.latitude},
      map,
      animation : window.google.maps.Animation.DROP,
      icon : data.state.markerIcon["Market"]
    })
   
    
    //tmp.set("id", p.Name+"Marker");
    //console.log(tmp.get("id"));
    var contentInfo
    let path = `overView`;
    var x = props.history
    var tmpInfo = new window.google.maps.InfoWindow({
    })
    usedInfo = {info:tmpInfo , name :p.Name}
    console.log(p.Name+"Marker")
    nullButton.push(<div style={{display:"none"}}>
                          <Button id={p.Name+"Marker"}
                                  onClick={()=>{
                                    clearOldInfo()
                                    tmpInfo.open({
                                      anchor : tmp,
                                      map,
                                      shouldFocus: true
                                      })
                                    usedInfo = {info:tmpInfo,name:p.Name}
                                  }}/>
                        </div>)
    setNullButton([...nullButton])
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${p.Position.latitude}&lon=${p.Position.longitude}&exclude=hourly,daily,minutely&appid=${weatherKey}`
    )
      .then((res) => res.json())
      .then((data) => {  
        
        contentInfo = genContent(p,data)
          //infowindow.setContent('<input type="button" value="View" onclick="joinFunction()"><input type="button" value="Join" onclick="alert(\"infoWindow\")">');
          tmpInfo.setContent(contentInfo)
        
      })

    var nameInfo = 
    `<div>${p.Name}</div>`
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
        usedInfo = {info : tmpInfo , name:p.Name}
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

    console.log(nullButton)
    return tmp
   
  }
  
  const toDetailPage=()=>{
    console.log(usedInfo.name)
    return <OverView/>
  }

  useEffect(()=> {
    props.showOnePlace.current = showOnePlace
    props.showOnePlan.current = showOnePlan
    props.searchProvince.current = searchProvince
    if (!window.google) {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = ''/*key*/ ;
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
  
  const searchProvince=(inputValue,itemData)=>{
    if (inputValue=="" || inputValue==null) return
     console.log(inputValue,itemData)
    clearOldInfo()
    //if (this.state.focusProvince.province ==  inputValue) return
    map.setZoom(9.5)
    window.google.maps.event.trigger(map, 'resize');
    map.setCenter(new window.google.maps.LatLng(data.state.centerMap[inputValue]['lat'],data.state.centerMap[inputValue]['lng']))
  
    
    map.data.overrideStyle(focusProvince.feature, { fillOpacity: 0.3 });
    province_createMarker(inputValue)
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
      <div style={{display:"none"}}>
        <Button href={"./OverView/"+usedInfo.name} id="toDetail"/>
      </div>
      
        <div style={{ width: '100%', height: '100%' }} id={props.id}>
            
        </div>
        
      {nullButton.map(btn=>{
        return btn
      })}
       
        </>
    );
    }
export default withRouter(MapContent)

