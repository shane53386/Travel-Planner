import { useAuth } from "./authenticate/Auth";
import React, { useContext, useEffect, useState } from "react";
import { withRouter,Redirect,Route } from 'react-router-dom';
//import { Form,FormControl,NavDropdown,Nav, Navbar,MenuItem,Dropdown,Table } from "react-bootstrap";
import {IconButton,Button, Select} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import "./index.css";
import CheckModal from "./checkModal";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const useImgStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      height:'100%',
      
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    imageList: {
      flexWrap: 'nowrap',
    height: '100%',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      
    }
  }));
  
function ManagePlaces(props){

    var map;
    const types = ["Mall","Nature","Culture"]
    const [name,setName] = useState(null)
    const [type,setType] = useState(null)
    const [pos,setPos] = useState(null)
    const [des,setDes] = useState("")
    const classes = useStyles();
    const [itemData,setItemdata] = useState([])
    const [addImg,setAddImg] = useState(null)
    const imgClasses = useImgStyles();

    const handleSetName=(event)=>{
        setName(event.target.value)
    }
    const handleSetDes=(event)=>{
        setDes(event.target.value)
    }
    const handleSetAddImg=(event)=>{
        setAddImg(event.target.value)
    }
    const submit=(event)=>{
        itemData.push(addImg)
        setItemdata([...itemData])
        setAddImg(null)
    }

    const search=()=>{
      const card = document.getElementById("pac-card");
      const input = document.getElementById("pac-input");
      const options = {
        componentRestrictions: { country: "th" },
        fields: ["formatted_address", "geometry", "name"],
        strictBounds: false
      };
      console.log(window.google.maps.places)
      map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(card);
      const autocomplete = new window.google.maps.places.Autocomplete(input, options);
      // Bind the map's bounds (viewport) property to the autocomplete object,
      // so that the autocomplete requests use the current map bounds for the
      // bounds option in the request.
      autocomplete.bindTo("bounds", map);
      const infowindow = new window.google.maps.InfoWindow();
      const infowindowContent = document.getElementById("infowindow-content");
      infowindow.setContent(infowindowContent);
      const marker = new window.google.maps.Marker({
        map,
        anchorPoint: new window.google.maps.Point(0, -29),
      });
      autocomplete.addListener("place_changed", () => {
        infowindow.close();
        marker.setVisible(false);
        const place = autocomplete.getPlace();
    
        if (!place.geometry || !place.geometry.location) {
          // User entered the name of a Place that was not suggested and
          // pressed the Enter key, or the Place Details request failed.
          window.alert("No details available for input: '" + place.name + "'");
          return;
        }
    
        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);
          map.setZoom(17);
        }
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
        infowindowContent.children["place-name"].textContent = place.name;
        infowindowContent.children["place-address"].textContent =
          place.formatted_address;
        infowindow.open(map, marker);
      });
    
    }

    const onScriptLoad = () =>{
    
      map = new window.google.maps.Map(
        document.getElementById('rootMap'))
        console.log(map)
      window.google.maps.event.trigger(map, 'resize');
      search()
    }

    useEffect(()=>{

      if (!window.google) {
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAAxJFxw0jQWyJIyB7K48-PKniPK8JUhuk&libraries=places`;
       
        var x = document.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);

        s.addEventListener('load', e => {     
            onScriptLoad()   
            console.log("..")
        })
          } else {
              //onScriptLoad()    
              console.log("loading map")
          }
        } ,[])

    return (
        <>
       
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <caption>
                <div className={imgClasses.root}>
                <ImageList className={imgClasses.imageList} cols={1} rowHeight={300}>
                  
                  <ImageListItem key="add" style={{width:'50%'}}>
                      <div>
                        <img src={addImg} alt={addImg}/>
                      </div>
                      <div>
                        <TextField required id="standard-required" label="Name" value={addImg} onChange={handleSetAddImg}/>
                        <Button onClick={()=>{submit()}}>Submit</Button>
                      </div>
                  </ImageListItem>
                  <ImageListItem key="add">
                      <div>
                        <img src={addImg} alt={addImg}/>
                      </div>
                      <div>
                        <TextField required id="standard-required" label="Name" value={addImg} onChange={handleSetAddImg}/>
                        <Button onClick={()=>{submit()}}>Submit</Button>
                      </div>
                  </ImageListItem>
                </ImageList>
                </div>
              </caption>
              <TableHead/>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <TextField required id="standard-required" label="Name" value={name} onChange={handleSetName}/>
                  </TableCell>
                  <TableCell>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={type}
                            onChange={setType}
                        >
                        {types.map(t=>{
                            return (<MenuItem value={t}>{t}</MenuItem>)

                        })}
                        </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <TextField required id="standard-multiline-static"multiline rows={8} label="Description" value={des} onChange={handleSetDes}/>
                  </TableCell>
                  <TableCell>
                    <div class="pac-card" id="pac-card">
                      <div id="title">Autocomplete search</div>
                      <div id="pac-container">
                        <input id="pac-input" type="text" placeholder="Enter a location" />
                      </div>
                    </div>
                   
                  </TableCell>
              </TableRow>
              <TableRow>
      
                </TableRow>
            </TableBody>
      </Table>
      </TableContainer>
        </>

    )
} 
export default ManagePlaces

