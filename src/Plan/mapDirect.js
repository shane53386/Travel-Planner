import React, { useState, useEffect ,Component } from 'react';
import Data from "../Data";
import FilterDay from "./filterDay"
import { InputGroup , FormControl,Form, Table , Button,DropdownButton,Dropdown} from 'react-bootstrap';

var map;var dataLayer;var info 
var geoJson = null
var polyline
const data = new Data()
const colors = ["FF0000","0000FF","00FF00"]
var allPlaces = new Map()
const plan = { route :[ { place : "Suankularb Wittayalai School", departureTime : new Date(Date.now())} ,
{ place : "Victory Monument" , departureTime : new Date(Date.now()) },
{ place : "Central 3" , departureTime : new Date(Date.now())}] ,
day : "1"}



class MapDirection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      days : new Map(),
      travelMode: 'DRIVING'
    }
    this.state.days.set("1",{place : [],
      path : [],
      markers : [],
      markersTime : [],
      route : [],
      show : true,
      polyline : null
      })
      this.state.days.set("2",{place : [],
        path : [],
        markers : [],
        markersTime : [],
        route : [],
        show : true,
        polyline : null
        })
    allPlaces.set("Suankularb Wittayalai School",{pos: {lng : 100.498626 , lat : 13.742706} , province : "กรุงเทพมหานคร"})
    allPlaces.set( "Victory Monument",{ pos : {lng : 100.538009 , lat : 13.764603 } , province : "กรุงเทพมหานคร"})
    allPlaces.set("Central 3",{ pos : {lng : 100.537761 , lat :13.697441 } , province : "กรุงเทพมหานคร"})
    this.onScriptLoad = this.onScriptLoad.bind(this)
    this.calRoute = this.calRoute.bind(this)
    this.creatMarker = this.creatMarker.bind(this)
  }

  handleInput(){
    this.state.days.get(plan.day).route = plan.route
  }
  calRoute(){
    var day = this.state.day
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    if (this.state.days.get(day).place.length == 0){
      this.state.days.get(day).place.push(this.state.start)
      this.state.days.get(day).place.push(this.state.end)
      this.creatMarker(this.state.start,this.state.end)
    }
    else {
      this.state.days.get(day).place.push(this.state.end)
      this.creatMarker(this.state.end,null)
    }
    var request = {
      origin: allPlaces.get(this.state.start).pos,
      destination:  allPlaces.get(this.state.end).pos,
      drivingOptions: {
        departureTime: this.state.departureTime
       },
      optimizeWaypoints: true,
      travelMode: window.google.maps.TravelMode.DRIVING,
    }
    var tmpPath = []
    var time
    var timeMarker
    directionsService.route(request, function(response, status) {
      if (status == window.google.maps.DirectionsStatus.OK) {
        //directionsRenderer.setDirections(response);
        console.log(response)
        time = response.routes[0].legs[0].duration_in_traffic.text
        var steps = response.routes[0].legs[0].steps
        for (let i=0;i<steps.length;i++) {
          var nextSegment = steps[i].path;
          for (let j=0;j<nextSegment.length;j++) {
            polyline.getPath().push(nextSegment[j]);
            tmpPath.push(nextSegment[j])
          }
        }
      }
      var center = tmpPath[Math.floor(tmpPath.length/2)]
      console.log(Math.floor(tmpPath.length/2))
       timeMarker = new window.google.maps.Marker({
        position: center,
        map,
        icon : "../res/empty.png",
        label: {
          text: time,
          color: "#000000",
          fontWeight: "bold"
        }
      })
    })
    this.state.days.get(day).markersTime.push(timeMarker)
    this.state.days.get(day).path.push(tmpPath)
    console.log(this.state.days.get(day).path)
    polyline.setPath(this.state.days.get(day).path)
    polyline.setMap(map);
    console.log(polyline)
   
  }

  creatMarker(one,two){
    var day = this.state.day
    console.log([one,two])
    var marker1 = new window.google.maps.Marker({
      position: allPlaces.get(one).pos,
      map,
      icon : null,
      label : {
        text : map.getZoom()<12? null:one,
        color: "#000000",
        fontWeight: "bold"
      }
    })
    marker1.addListener("click",e=>{
      this.setState({
        start :"Victory Monument",
        end : "Central 3"
      })
      this.calRoute()

    })
    if (two!=null){
      var marker2 = new window.google.maps.Marker({
        position: allPlaces.get(two).pos,
        map,
        label : {
          text : map.getZoom()<12? null:two,
          color: "#000000",
          fontWeight: "bold"
        }
      })
      this.state.days.get(day).markers.push([marker2,two])
    }
    this.state.days.get(day).markers.push([marker1,one])
    
  }

  onScriptLoad() {
    map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options);
    window.google.maps.event.trigger(map, 'resize');

    let name = allPlaces.get(this.state.start).province
    this.createZoom(name)
    polyline = new window.google.maps.Polyline({
      path: null,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 0.5,
      strokeWeight: 8,
    });
    
  }
  createZoom(name){
    let day = this.state.day
    map.setCenter(new window.google.maps.LatLng(data.state.centerMap[name]['lat'],data.state.centerMap[name]['lng']))
    map.setZoom(10)
    map.addListener("zoom_changed", () => {
      this.state.days.get(day).markers.map(p=>{
        if (map.getZoom() < 12)
          p[0].setLabel(null)
        else
          p[0].setLabel( {
                        text: p[1],
                        color: "#000000",
                        fontWeight: "bold"
                      })
      })
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
        this.calRoute()
      })
        } else {
        this.onScriptLoad()
        }
  }

  render() {
    return (

      <div style={{ width: '100%', height: '100%' }}>
        <div style={{ width: '80%', height: '80%' ,float:"left"}} id={this.props.id}>
          </div>
        <FilterDay parentCallback={this.selectDat} days={["1","2"]}/>
        </div>


    );
  }
}

export default  MapDirection

