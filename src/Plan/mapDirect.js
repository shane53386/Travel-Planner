import React, { useState, useEffect ,Component } from 'react';
import Data from "../Data";
import FilterDay from "./filterDay"
import { InputGroup , FormControl,Form, Table , Button,DropdownButton,Dropdown} from 'react-bootstrap';
import PlanPage from './PlanPage';

var map;var dataLayer;var info 
var geoJson = null
var polyline
const data = new Data()
const alphabet = ["B","C","D","E","F"]
const colors = ["#FF0000","#0000FF","#00FF00","FFFF00","FF00FF","00FFFF"]
var allPlaces = new Map()
const plan = new Map() 
var daysList = []
class MapDirection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      plan : this.props.plan,
      days : new Map(),
      travelMode: 'DRIVING',
      daysList :[]
    }
    this.state.days.set("1",{place : [],
      path : [],
      markers : [],
      markersTime : [],
      route : [],
      show : true,
      polyline : []
      })
      this.state.days.set("2",{place : [],
        path : [],
        markers : [],
        markersTime : [],  // [ marker , timeLabel ]
        route : [],
        show : true,
        polyline : []
        })
    allPlaces.set("a",{pos: {lng : 100.498626 , lat : 13.742706} , province : "กรุงเทพมหานคร"})
    allPlaces.set( "b",{ pos : {lng : 100.538009 , lat : 13.764603 } , province : "กรุงเทพมหานคร"})
    allPlaces.set("c",{ pos : {lng : 100.537761 , lat :13.697441 } , province : "กรุงเทพมหานคร"})
    allPlaces.set("d",{ pos : {lng :  100.583172 , lat :13.748389 } , province : "กรุงเทพมหานคร"})

   
    this.onScriptLoad = this.onScriptLoad.bind(this)
    this.calRoute = this.calRoute.bind(this)
    this.creatMarker = this.creatMarker.bind(this)
    this.handleFilterDay = this.handleFilterDay.bind(this)
    this.sendCallback = this.sendCallback.bind(this)
  }

 handleFilterDay(check){
    for (let [key, value] of check) {
      if (value == false){
        if(this.state.days.get(key).show == true)
          for (let i =0;i<this.state.days.get(key).markers.length;i++){
            
            this.state.days.get(key).markers[i][0].setMap(null)
          }
          for (let i =0;i<this.state.days.get(key).markersTime.length;i++){
            this.state.days.get(key).markersTime[i][0].setMap(null)
          }
          for (let i =0;i<this.state.days.get(key).polyline.length;i++){
            this.state.days.get(key).polyline[i].setMap(null)
          }
          this.state.days.get(key).show = false
      }

      else{
        if(this.state.days.get(key).show == false){
          for (let i =0;i<this.state.days.get(key).markers.length;i++){
            this.state.days.get(key).markers[i][0].setMap(map)
          }
          for (let i =0;i<this.state.days.get(key).markersTime.length;i++){
            this.state.days.get(key).markersTime[i][0].setMap(map)
          }
          for (let i =0;i<this.state.days.get(key).polyline.length;i++){
            this.state.days.get(key).polyline[i].setMap(map)
          }
          this.state.days.get(key).show = true
        }
      }
    }
  }

  handleInput(inputPlan){
    var tmp = new Map()
    if (inputPlan!= this.state.plan){
      daysList.forEach(day => {
        tmp.set(day,false)
      });
      this.handleFilterDay(tmp)
      this.state.plan= inputPlan
      daysList.forEach(day => {
        this.calRoute(day)
      });
      
    }
  }

  ruturnTime(){
    var re = []
    for (let day in this.state.daysList){
      for (let {mark,time} of this.state.days.get(day).markersTime){
          re.push(time)
      }
    }
    return re
  }
  calRoute(day){
    console.log(this.state.plan,Object.keys(this.state.plan).length)
    console.log(daysList)
    if (daysList==null) return
    //if (Object.keys(this.state.plan).length==0) return
    let route = this.state.plan.get(day)
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
    console.log(route.length)
    for (let i =0;i<route.length-1;i++){
      this.creatMarker(route[i].place,route[i+1].place,day)
      
      let request = {
        origin: allPlaces.get(route[i].place).pos,
        destination:  allPlaces.get(route[i+1].place).pos,
        drivingOptions: {
          departureTime: route[i].departureTime
        },
        optimizeWaypoints: true,
        travelMode: window.google.maps.TravelMode.DRIVING,
      }
      let tmpPath = []
      let time = 0
      let timeMarker = new window.google.maps.Marker({
                      position: null,
                      map,
                      label : null,
                      icon : "../res/empty.png"           
      })
      let value= this.fadeColor(colors[daysList.indexOf(day)] , this.state.days.get(day).polyline.length)
      console.log(value)
      let polyline =  new window.google.maps.Polyline({
                  path: [],
                  geodesic: true,
                  strokeColor: value[0],
                  strokeOpacity: value[1],
                  strokeWeight: 7,
                  map
                })
      directionsService.route(request, async (response, status) => {
        if (status == window.google.maps.DirectionsStatus.OK) {

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
        
          
        var center = tmpPath[Math.floor(tmpPath.length/2)]
        timeMarker.setPosition(center)
        timeMarker.setLabel({
          text: map.getZoom()<12? null:time,
          color: "#000000",
          fontWeight: "bold"
        })
      }

      }).then( e =>
        this.state.days.get(day).markersTime.push([timeMarker,time]),
        this.state.days.get(day).path = tmpPath,
        this.state.days.get(day).polyline.push(polyline))

    }
  }

  fadeColor(baseColor , idx){
    if( idx >= alphabet.length) idx = alphabet.length - 1
    let color = baseColor
    let opactiy = 1.0
    opactiy = 1.0- (Math.floor(idx/2)+(idx%2))*0.3
    for (let i=1;i<7;i+=2){
      if (color[i] != "0"){
          color = color.substring(0,i) + alphabet[Math.floor(idx/2)] + color.substring(i+1);
      }
    }
    return [color,opactiy]
  }

  creatMarker(one,two,day){

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
    this.state.days.get(day).markers.push([marker1,one])
  }

  onScriptLoad(d) {
    /*plan.set("1",{ route :[ { place : "Suankularb Wittayalai School", departureTime : new Date(Date.now())} ,
    { place : "Victory Monument" , departureTime : new Date(Date.now()) },
    { place : "Central 3" , departureTime : new Date(Date.now())}] } )

    plan.set("2",{ route :[  { place : "Central 3" , departureTime : new Date(Date.now())},
        { place : "Bangkok Hospitel", departureTime : new Date(Date.now())}] } )*/


    map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options);
    window.google.maps.event.trigger(map, 'resize');

    
    
  }
  createZoom(day,name){
    
    map.setCenter(new window.google.maps.LatLng(data.state.centerMap[name]['lat'],data.state.centerMap[name]['lng']))
    map.setZoom(10)
    map.addListener("zoom_changed", () => {
      console.log(this.props.input)
      console.log(this.props.days)
      if (map.getZoom() < 12){
        this.state.days.get(day).markers.map(p=>{
          p[0].setLabel(null)
        })
        this.state.days.get(day).markersTime.map(p=>{
          p[0].setLabel(null)
        })
      }
      else{
        this.state.days.get(day).markers.map(p=>{
          p[0].setLabel( {
            text: p[1],
            color: "#000000",
            fontWeight: "bold"
          })
        })
        this.state.days.get(day).markersTime.map(p=>{
          console.log(p[1])
          p[0].setLabel( {
            text: p[1],
            color: "#000000",
            fontWeight: "bold"
          })
        })
      }

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
      console.log(daysList)
      s.addEventListener('load', e => {
        console.log(daysList)
        
          this.onScriptLoad()
          if (daysList!=null && daysList.length != 0){
            //let name = allPlaces.get(this.props.plan.get(this.props.daysList[0])[0].place).province
            //this.createZoom(this.props.daysList[0],name)
            daysList && daysList.forEach(day => {
              this.calRoute(day)
            });
        //}
      }
          
        
      })

        } else {
            this.onScriptLoad()
        }
  }
  sendCallback(input){
    console.log(input)
    var d = []
    if (input == null || input.length==0 )
        return
    input.forEach((values,keys)=>{
      d.push(keys)
      })
      this.setState({
        plan : input
      })
      daysList = d
      d && d.forEach(day => {
        this.state.days.set(day,{place : [],
          path : [],
          markers : [],
          markersTime : [],
          route : [],
          show : true,
          polyline : []
          })
        this.calRoute(day)
      });

    
  }
  render() {
    return (

      <div style={{ width: '100%', height: '100%' }}>
        <div style={{ width: '50%', height: '80%' ,float:"left"}} id={this.props.id}>
          
          </div>
        <FilterDay parentCallback={this.handleFilterDay} days={daysList}/>
        <div style= {{width: '50%', height: 800,float:'right'}} >
              <PlanPage sendCallback={this.sendCallback}/>      
            </div>
        </div>


    );
  }
}

export default  MapDirection

