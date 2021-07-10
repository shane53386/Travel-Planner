import React, { useState, useEffect ,Component } from 'react';
import Data from "./Data";
//import MarkerPin from "./src/MarkerPin"
import { render } from 'react-dom';
import { isElementOfType } from 'react-dom/cjs/react-dom-test-utils.production.min';
import fetchPlace from './fetchData';
import {Button,DropdownButton,Dropdown} from 'react-bootstrap';

var map;var dataLayer;var info 
var geoJson = null
const data = new Data()
const weatherKey = "22f30fcf6dd5b269bf5cbe441f735a39";

class MapContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
        place : new Map() ,
        inProvince : [],
        usedMarker : [],
        usedInfo : null,
        focusProvince : {province : null , feature : null}
    }
    //this.state.place.set("กรุงเทพมหานคร" , [])
    //this.state.place.get("กรุงเทพมหานคร").push({name : "One" , type : "Market" , position : {lng : 100.633214325 , lat : 13.724293875}})
    //this.state.place.get("กรุงเทพมหานคร").push({name : "Two" , type : "Nature" , position : {lng : 100.634114325 , lat : 13.730293875}})
    
    this.onScriptLoad = this.onScriptLoad.bind(this)
    this.createZoom = this.createZoom.bind(this)
    this.createMarker = this.createMarker.bind(this)
    this.clearOldInfo = this.clearOldInfo.bind(this)
    this.clearOldMarker = this.clearOldMarker.bind(this)
  }

   createZoom(){
    map.data.addListener("click", e => {
      
      let name = e.feature.getProperty("ADM1_TH")
      this.clearOldInfo()
      if (this.state.focusProvince.province == name) return
      window.google.maps.event.trigger(map, 'resize');
      map.setCenter(new window.google.maps.LatLng(data.state.centerMap[name]['lat'],data.state.centerMap[name]['lng']))
      map.setZoom(9.5)
      this.createMarker(e.feature.getProperty("ADM1_TH"))

      map.data.overrideStyle(this.state.focusProvince.feature, { fillOpacity: 0.3 });
      this.setState({
        focusProvince : {province : name ,
                        feature : e.feature}
      })
    })
    map.addListener("zoom_changed", () => {
      if (map.getZoom() < 7.5){
        this.state.usedMarker && this.state.usedMarker.map(p=>{
          p.setMap(null)
        })
      }
      else {
        this.state.usedMarker && this.state.usedMarker.map(p=>{
          p.setMap(map)
        })
      }
    });
  }

  onScriptLoad() {
    map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options);
  }

  dataHandler(){
    if (geoJson==null){
      fetch(this.props.src)
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
    var showProvinceName = new window.google.maps.InfoWindow()
    map.data.addListener('mouseover', (event) => {
        //map.data.revertStyle();
        map.data.overrideStyle(event.feature, {fillOpacity: 0.1 });
    });
    map.data.addListener('mouseout', (event) => {
      if (this.state.focusProvince.province == event.feature.getProperty("ADM1_TH")) return
      map.data.overrideStyle(event.feature, { fillOpacity: 0.3 });

    });
}

  clearOldInfo(){
    console.log(this.state.usedInfo)
    this.state.usedInfo && this.state.usedInfo.close() 
  }
  clearOldMarker(){
    this.setState( prev => {
      prev.usedMarker && prev.usedMarker.map(p=>{
        p.setMap(null)
      })
      return {
          usedMarker : [],
      } 
    })
  }

  createMarker(province){
    if (province != "กรุงเทพมหานคร") return
    //clear old markers
    this.clearOldInfo()
    //clear old Info
    this.clearOldMarker()
    //find new
    //this.state.place = fetchOverview(province)
    var content = fetchPlace("Bangkok")
    content
    .then(e=>{
      e.map(data=>{
        this.state.place.set(data.Name,{      name : data.Name,
                                              type : data.Type,
                                              position : data.Position})
      })
  })
  console.log(this.state.place)
    this.state.place && this.state.place.forEach((p,keys)=>{
       
        console.log({lng : p.position.longitude , lat : p.position.latitude});
        var tmp = new window.google.maps.Marker({
          position: {lng : p.position.longitude , lat : p.position.latitude},
          map,
          animation : window.google.maps.Animation.DROP,
          icon : data.state.markerIcon["Market"]
        })
        
    
        //this.genPopup(p.name)
        var contentInfo = 
        '<div id = "content">' +
        '<div id = "siteNotice"/>'+
          '<h1 id="firstHeading" class="firstHeading"><b>'+p.name+'</b></h1> <br>'+
          '<div> <Button onClick={}>Read More</Button> </div>'+
        '</div>'
        var tmpInfo = new window.google.maps.InfoWindow({
          content : contentInfo
        })
        var nameInfo = 
        '<div>name</div>'
        var tmp2Info = new window.google.maps.InfoWindow({
          content : nameInfo
        })
        tmp.addListener("click",e=>{
            this.clearOldInfo()
            tmpInfo.open({
              anchor : tmp,
              map,
              shouldFocus: true
            })
            this.setState({
              usedInfo : tmpInfo
            })
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
        this.state.usedMarker.push(tmp)
        
       
    })

  }
  async genPopup(name){
    //fecth weather api
    let place = this.state.place.get(name)
    let lat = place.position.lat
    let lon = place.position.lng
    fetch(
			`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily,minutely&appid=${weatherKey}`
		)
			.then((res) => res.json())
			.then((data) => {
          let returnText = 
          `<div className="pop-up">` +
            `<h2>${name}</h2>`
            `<p>${place.Description}</p>`
            `<div>Type : ${place.Type}</div>`
            `<div>Temp : ${data.current.temp}</div>`
            `<img src=${"http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png"}/>`
          `</div>`
          return returnText
      });	
  }
  componentDidMount() {
    if (!window.google) {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAAxJFxw0jQWyJIyB7K48-PKniPK8JUhuk`;
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
      // Below is important. 
      //We cannot access google.maps until it's finished loading
      
      s.addEventListener('load', e => {
        this.onScriptLoad()
        this.dataHandler()
        this.createZoom()
        
      })
    } else {
      this.onScriptLoad()
    }
  }

  render() {
    return (
        <div style={{ width: '100%', height: '100%' }} id={this.props.id}>
            
        </div>
    );
  }
}

export default MapContent

