import React, { useState, useEffect ,Component,useContext } from 'react';
import Data from "../Data";
import {MContext} from './provider';
import PlaceInput from './PlaceInput';
import { useAuth } from '../authenticate/Auth';
import { fetchData,fetchPlace } from '../fetchData';
var map;var dataLayer;var info 
var geoJson = null
var polyline
const data = new Data()
const alphabet = ["B","C","D","E","F"]
const colors = ["#FF0000","#0000FF","#00FF00","FFFF00","FF00FF","00FFFF"]
var allPlaces = new Map()
var daysList = []
var province = null

function MapDirection(props) {
 
  var plan
  const [days,setDays] = useState(new Map())
  const [reRender,setReRender] = useState([])
  const [allMarkerPlaces,setAllMarkerPlaces] = useState([])
  const [allPlacesName,setAllPlacesName] = useState([])
  const travelMode = 'DRIVING'
  //const [daysList,setDaysList] = useState([])
  const update = useContext(MContext)
  const { selectedPlan,allPlans } = useAuth();


  useEffect(()=>{
    if (selectedPlan==null)return
    console.log(allPlans,selectedPlan)
    allPlans[selectedPlan].places && allPlans[selectedPlan].places.map(e=>{
      fetchData(e)
      .then(p=>{
        console.log(e,p)
        console.log(p.Position,p.Position.latitude)
        allPlaces.set(e,{pos: {lng : p.Position.longitude , lat : p.Position.latitude} , province : "กรุงเทพมหานคร"})
        allPlacesName.push(e)
        
      })
    })
    setAllPlacesName([...allPlacesName])
  },[selectedPlan])
  useEffect(()=>{
  

    if (!window.google) {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = ''/*key*/ ;
     
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);

      // Below is important. 
      //We cannot access google.maps until it's finished loading
      console.log(daysList)
    
      s.addEventListener('load', e => {     
          onScriptLoad()   
          initAllMarkers() 
      })
        } else {
            onScriptLoad() 
            initAllMarkers() 
        }
      var e = "กรุงเทพมหานคร"
      fetchPlace(e)
      .then(p=>p.forEach(p => {
        console.log(e,p)
        allPlaces.set(p.Name,{pos: {lng : p.Position.longitude , lat : p.Position.latitude} , province : "กรุงเทพมหานคร"})
        allPlacesName.push(p.Name)
      }))
    
    },[])
  
const initAllMarkers=()=>{
  var tmp = []
  allPlaces.forEach((value,key)=>{
    var marker = new window.google.maps.Marker({
      position: value.pos,
      label:key,
      icon : null       
      })
      marker.addListener("mouseover",e=>{
       
      })
     
    tmp.push([marker,key])
     
  })
  setAllMarkerPlaces(tmp)
  setReRender([...reRender])
}
 const handleFilterDay = (check) =>{
    for (let [key, value] of check) {
      if (value == false){
        if(days.get(key).show == true){
          for (let i =0;i<days.get(key).markers.length;i++){
            
            days.get(key).markers[i][0].setMap(null)
          }
          for (let i =0;i<days.get(key).markersTime.length;i++){
            days.get(key).markersTime[i][0].setMap(null)
          }
          for (let i =0;i<days.get(key).polyline.length;i++){
            days.get(key).polyline[i].setMap(null)
          }
          days.get(key).show = false
      }
    }
      else{
        if(days.get(key).show == false){
          for (let i =0;i<days.get(key).markers.length;i++){
            days.get(key).markers[i][0].setMap(map)
          }
          for (let i =0;i<days.get(key).markersTime.length;i++){
            days.get(key).markersTime[i][0].setMap(map)
          }
          for (let i =0;i<days.get(key).polyline.length;i++){
           days.get(key).polyline[i].setMap(map)
          }
          days.get(key).show = true
        }
      }
    }
  }

  const ruturnTime = ()=>{
    var re = []
    for (let day in daysList){
      for (let {mark,time} of days.get(day).markersTime){
          re.push(time)
      }
    }
    return re
  }

  const calRoute = async (day)=>{
    console.log(plan)
    if (daysList==null) return
    //if (Object.keys(plan).length==0) return
    let route = plan[day]
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
    console.log(route.length)
    var times = new Array()
    var index = Array(route.length-1).fill().map((x,i)=>i)
     const promises =index.map(i=>{
      creatMarker(route[i].place,route[i+1].place,day)
      
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
      let time = null
      let timeMarker = new window.google.maps.Marker({
                      position: null,
                      map,
                      label : null,
                      icon : "../res/empty.png"           
      })
      let value= fadeColor(colors[daysList.indexOf(day)] , days.get(day).polyline.length)
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
          console.log(time)
          times.push(time)
        var center = tmpPath[Math.floor(tmpPath.length/2)]
        timeMarker.setPosition(center)
        timeMarker.setLabel({
          text: map.getZoom()<12? null:time,
          color: "#000000",
          fontWeight: "bold"
        })

          console.log(days.get(day).markersTime)
          days.get(day).markersTime.push([timeMarker,time])
          setReRender([...reRender,time])
          days.get(day).path = tmpPath
          days.get(day).polyline.push(polyline)
       
        }
      })

    })
    await Promise.all(promises)
    days.get(day).markersTime.map((e)=>{
      times.push(e[1])
    })
    console.log(times)
    return times
  }

  const fadeColor = (baseColor , idx) =>{
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

  const creatMarker = (one,two,day)=>{

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
    days.get(day).markers.push([marker2,two])
    days.get(day).markers.push([marker1,one])
  }

  const onScriptLoad = (d) =>{
    
    map = new window.google.maps.Map(
      document.getElementById(props.id),
      props.options);
    window.google.maps.event.trigger(map, 'resize');
  }

  const createZoom = (name)=>{
    console.log(name)
    map.setCenter(new window.google.maps.LatLng(data.state.centerMap[name]['lat'],data.state.centerMap[name]['lng']))
    map.setZoom(10)
    map.addListener("zoom_changed", () => {
      console.log(props.input)
      console.log(props.days)
      daysList.map((day)=>{
        if (map.getZoom() < 12){
          days.get(day).markers.map(p=>{
            p[0].setLabel(null)
          })
          days.get(day).markersTime.map(p=>{
            p[0].setLabel(null)
          })
          allMarkerPlaces.map(p=>{
            p[0].setLabel(null)
          })

        }
        else{
          days.get(day).markers.map(p=>{
            p[0].setLabel( {
              text: p[1],
              color: "#000000",
              fontWeight: "bold"
            })
          })
          days.get(day).markersTime.map(p=>{
            console.log(p[1])
            p[0].setLabel( {
              text: p[1],
              color: "#000000",
              fontWeight: "bold"
            })
          })
          
          allMarkerPlaces.map(p=>{

            p[0].setLabel( {
              text: p[1],
              color: "#000000",
              fontWeight: "bold"
            })
          })
        }
      })
      })
    }
     


  const clearOldData = (day)=>{
    if (days.get(day) == null)
      return 
    days.get(day).markers.map(p=>{
      p[0].setMap(null)
    })
    days.get(day).markers = []
    days.get(day).markersTime.map(p=>{
      p[0].setMap(null)
    })
    days.get(day).markersTime = []
    days.get(day).polyline.map(p=>{
      p.setMap(null)
    })
    days.get(day).polyline = []
  }

  const sendCallback=(input)=>{
    console.log("receive ", input)
        var d = []
    var m = new Map()
    var tmpTime = new Map()
    if (input == null || input.length==0 )
        return
    Object.keys(input).forEach(key => {
      if (input[key].length != 0){
        m.set(key,input[key])
        d.push(key)
      }
    })
    
    plan = input

    daysList = d
    if (d.length==0) return
    console.log(allPlaces.get(input[d[0]][0].place))
    if (false){
    if (allPlaces.get(input[d[0]][0].place)==undefined)return
    //console.log(input[d[0]][0].place,allPlaces)
    if (province != allPlaces.get(input[d[0]][0].place).province){
      province = allPlaces.get(input[d[0]][0].place).province
      createZoom(province)
    }
    d && d.forEach(day => {  
      clearOldData(day)
      days.set(day,{place : [],
        path : [],
        markers : [],
        markersTime : [],
        route : [],
        show : true,
        polyline : []
        })
        
        tmpTime.set(day,calRoute(day))
    });
    }
    else{
     
        
        createZoom("กรุงเทพมหานคร")
      
      d && d.forEach(day => {  
        clearOldData(day)
        days.set(day,{place : [],
          path : [],
          markers : [],
          markersTime : [],
          route : [],
          show : true,
          polyline : []
          })
          
          tmpTime.set(day,calRoute(day))
      });
    }
    update.setTime(tmpTime)
    update.setData(m)
    console.log("send to table",m)
  }


  const handleSwitch=(show)=>{

    console.log(allMarkerPlaces.length)
    if (show){
      allMarkerPlaces.map(e=>{
        
        e[0].setMap(map)
      })
    }
    else{
      allMarkerPlaces.map(e=>{
        e[0].setMap(null)
      })
    }
  }

  return (


      <div style={{ width: '100%', height: '100%' }}>
        <div style={{ width: '45%', height: '80%' ,float:"left"}} id={props.id}>
          
          </div>
        
        <div style= {{width: '55%', height: 800,float:'right'}} >
              <PlaceInput places={allPlacesName} allPlans={allPlans} selectedPlan={selectedPlan}parentCallback={sendCallback}/>      
            </div>
        </div>


    );
    //<Filter checkCallback={handleFilterDay} switchCallback={handleSwitch} days={daysList}/>

}

export default  MapDirection
