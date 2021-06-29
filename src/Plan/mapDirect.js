import React, { useState, useEffect ,Component } from 'react';

import { InputGroup , FormControl,Form, Table , Button,DropdownButton,Dropdown} from 'react-bootstrap';

var map;var dataLayer;var info 
var geoJson = null
var polyline
var allPlaces = new Map()
class MapDirection extends Component {

  constructor(props) {
    super(props);
    this.state = {
       place : [],
       path : [],
       markers : [],
       markersTime : [],
       start : "Suankularb Wittayalai School",
       end : "Victory Monument",
       travelMode: 'DRIVING',
        departureTime: new Date(Date.now()),
    }
    allPlaces.set("Suankularb Wittayalai School",{lng : 100.498626 , lat : 13.742706})
    allPlaces.set( "Victory Monument",{lng : 100.538009 , lat : 13.764603 })
    allPlaces.set("Central 3",{lng : 100.537761 , lat :13.697441 })
    this.onScriptLoad = this.onScriptLoad.bind(this)
    this.calRoute = this.calRoute.bind(this)
    this.creatMarker = this.creatMarker.bind(this)
  }

  calRoute(){
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
    if (this.state.place.length == 0){
      this.state.place.push(this.state.start)
      this.state.place.push(this.state.end)
      this.creatMarker(this.state.start,this.state.end)
    }
    else {
      this.state.place.push(this.state.end)
      this.creatMarker(this.state.end,null)
    }
    var request = {
      origin: allPlaces.get(this.state.start),
      destination:  allPlaces.get(this.state.end),
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
    this.state.markersTime.push(timeMarker)
    this.state.path.push(tmpPath)
    console.log(this.state.path)
    polyline.setPath(this.state.path)
    polyline.setMap(map);
    console.log(polyline)
   
  }

  creatMarker(one,two){
    var marker1 = new window.google.maps.Marker({
      position: allPlaces.get(one),
      map,
      icon : null,
      label: {
        text: one,
        color: "#000000",
        fontWeight: "bold"
      }
    })
    marker1.addListener("click",e=>{
      this.setState({
        start :"Victory Monument",
        end : "Central 3",
        label: {
          text: "Central 3",
          color: "#000000",
          fontWeight: "bold"
        }
      })
      this.calRoute()

    })
    if (two!=null){
      var marker2 = new window.google.maps.Marker({
        position: allPlaces.get(two),
        map,
        label: {
          text: two,
          color: "#000000",
          fontWeight: "bold"
        }
      })
    }
    this.state.markers.push(marker1)
    this.state.markers.push(marker2)
  }

  onScriptLoad() {
    map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options);
    polyline = new window.google.maps.Polyline({
      path: null,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 0.5,
      strokeWeight: 8,
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
        this.calRoute()
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

export default  MapDirection

