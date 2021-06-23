import React, { Component } from 'react';
import Data from "./Data";
//import MarkerPin from "./src/MarkerPin"
import { render } from 'react-dom';
import { isElementOfType } from 'react-dom/cjs/react-dom-test-utils.production.min';

var map;var dataLayer;var info 
var geoJson = null
const data = new Data()
class MapContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
        infoContent : "....." ,
        place : new Map() ,
        usedMarker : [],
        usedInfo : [],
        focusProvince : null
    }
    this.state.place.set("กรุงเทพมหานคร" , [])
    this.state.place.get("กรุงเทพมหานคร").push({name : "One" , type : "Market" , position : {lng : 100.633214325 , lat : 13.724293875}})
    this.state.place.get("กรุงเทพมหานคร").push({name : "Two" , type : "Nature" , position : {lng : 100.634114325 , lat : 13.730293875}})
    
    this.onScriptLoad = this.onScriptLoad.bind(this)
    this.createZoom = this.createZoom.bind(this)
    this.createMarker = this.createMarker.bind(this)
  }

  createZoom(){
    map.data.addListener("click", e => {
      window.google.maps.event.trigger(map, 'resize');
      let name = e.feature.getProperty("ADM1_TH")
      map.setCenter(new window.google.maps.LatLng(data.state.centerMap[name]['lat'],data.state.centerMap[name]['lng']))
      map.setZoom(9.5)
      this.createMarker(e.feature.getProperty("ADM1_TH"))
      this.setState({
        focusProvince : name
      })
    })
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
    console.log(geoJson)
    dataLayer = map.data.addGeoJson(geoJson)
    /*fetch(getJson)
        .then(src => {dataLayer = map.data.loadGeoJson(src)})
        .then(featureCollection => {
            console.log(featureCollection)
            dataLayer = map.data.loadGeoJson(featureCollection)
            // ADD SOME NEW STYLE IF YOU WANT TO
            map.data.setStyle({strokeWeight: 0.5, fillOpacity: 0 });
        }
        );*/
    map.data.addListener('mouseover', (event) => {
        map.data.revertStyle();
        map.data.overrideStyle(event.feature, {strokeWeight: 1, fillOpacity: 0.1 });
    });
    map.data.addListener('mouseout', (event) => {
        if (event.feature.getProperty("ADM1_TH") != this.state.focusProvince){
          console.log(event.feature.getProperty("ADM1_TH") + " / " + this.state.focusProvince)
          map.data.revertStyle();
    }
    });
}

  createMarker(province){
    //clear old markers
    this.setState( prev => {
      prev.usedMarker && prev.usedMarker.map(p=>{
        p.setMap(null)
      })
      prev.usedInfo && prev.usedInfo.map(i=>{
        i.close()
      })
      return {
          usedMarker : [],
          usedInfo : []
      } 
    })
    //clear old Info

    //find new
    var places = this.state.place.get(province)
    places && places.map(p =>{
        var tmp = new window.google.maps.Marker({
          position: p.position,
          map,
          animation : window.google.maps.Animation.DROP,
          icon : data.state.markerIcon["Market"],
          title: p.name 
        })

        //val content = fetchInfo(province,p.name)
        var contentInfo = 
        '<div id = "content">' +
        '<div id = "siteNotice"'+
          '<h2>Hello WOrld</h2>'+
        '</div>'+
        '</div>'
        var tmpInfo = new window.google.maps.InfoWindow({
          content : contentInfo
        })
        tmp.addListener("click",e=>{
            tmpInfo.open({
              anchor : tmp,
              map,
              shouldFocus: false
            })
        })

        this.state.usedMarker.push(tmp)
        this.state.usedInfo.push(tmpInfo)
    })

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
        this.createZoom("")
        
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

