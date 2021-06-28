import React, { useState, useEffect ,Component } from 'react';


var map;var dataLayer;var info 
var geoJson = null
var polyline
class MapDirection extends Component {

  constructor(props) {
    super(props);
    this.state = {
       path : [],
       start : "Grand Central Station",
       end : "Port Authority Bus Terminal",
       travelMode: 'DRIVING',
        departureTime: new Date(Date.now()+100000),
        trafficModel: 'pessimistic'
    }

    this.onScriptLoad = this.onScriptLoad.bind(this)
    this.calRoute = this.calRoute.bind(this)
    
  }

  calRoute(){
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
    var request = {
      origin: this.state.start,
      destination:  this.state.end,
      drivingOptions: {
        departureTime: this.state.departureTime,
        trafficModel: 'pessimistic'
       },
      optimizeWaypoints: true,
      travelMode: window.google.maps.TravelMode.DRIVING,
    }
    var tmpPath = []
    directionsService.route(request, function(response, status) {
      if (status == window.google.maps.DirectionsStatus.OK) {
        //directionsRenderer.setDirections(response);
        var steps = response.routes[0].legs[0].steps
        for (let i=0;i<steps.length;i++) {
          var nextSegment = steps[i].path;
          for (let j=0;j<nextSegment.length;j++) {
            polyline.getPath().push(nextSegment[j]);
                    }
        }
      }
    })
    console.log(tmpPath)
    //polyline.setPath(tmpPath)
    polyline.setMap(map);
    console.log(polyline)
  }
  

  onScriptLoad() {
    map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options);
    polyline = new window.google.maps.Polyline({
      path: [{lat: 40.753150000000005, lng: -73.97783000000001},
        {lat: 40.75312, lng: -73.97786},
        {lat: 40.75312, lng: -73.97786},
        {lat: 40.75329, lng: -73.97828000000001},
        {lat: 40.753350000000005, lng: -73.97844},
        {lat: 40.753420000000006, lng: -73.9786}],
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2,
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

