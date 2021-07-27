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
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    imageList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    }
  }));
  
function ManagePlaces(props){

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
    return (
        <>
        {console.log(new Date("Mon Jul 26 2021 14:01:26 GMT+0700 (Indochina Time)"))}
             <TextField required id="standard-required" label="Name" value={name} onChange={handleSetName}/>
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
            <TextField required id="standard-multiline-static"multiline rows={8} label="Description" value={des} onChange={handleSetDes}/>
            
            <div className={imgClasses.root}>
      <ImageList className={imgClasses.imageList} cols={2.5}>
        
        <ImageListItem key="add">
            <div style={{float:'left'}}>
            <img src={addImg} alt={addImg}/>
            </div>
            <div style={{float:'right'}}>
            <TextField required id="standard-required" label="Name" value={addImg} onChange={handleSetAddImg}/>
            <Button onClick={()=>{submit()}}>Submit</Button>
            </div>
        </ImageListItem>
      </ImageList>
    </div>
        </>

    )
} 
export default ManagePlaces

