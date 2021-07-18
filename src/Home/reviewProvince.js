
import React, { useState, useEffect ,Component,useContext } from 'react';
import Data from "../Data";
import fetchPlace from '../fetchData';
import {Autocomplete} from '@material-ui/lab';
import {TextField}  from '@material-ui/core';
import {BrowserRouter, Link , Route,Switch,withRouter } from 'react-router-dom';
import OverView from '../Plan/overView';
import { useHome } from '../homeProvider';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const data = new Data()
function ReviewProvince(props){

    const [selectedProvince,setSelectedProvince] = useState([])
    const [itemData,setItemData] = useState([])
    const home = useHome()
    
    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          overflow: 'hidden',
          backgroundColor: theme.palette.background.paper,
        },
        imageList: {
          width: 500,
          height: 450,
        },
        icon: {
          color: 'rgba(255, 255, 255, 0.54)',
        },
      }));
      const classes = useStyles();
   const searchProvince=async(event,inputValue)=>{
        itemData.length = 0
        await fetchPlace(inputValue)
        .then(e=>{
            //home.setData(e)
            e.map(data=>{
                itemData.push({ Name : data.Name,
                                    Type : data.Type,
                                    Position : data.Position,
                                    Description : data.Description})
            })
            console.log(itemData)
        })
        .then(e=>{
        props.searchProvince.current(inputValue)
        setSelectedProvince(inputValue)
        })
        
    }
    
    const showDataPlace=async(event,value)=>{
        
        home.setFocusPlace(event.currentTarget.id)
        itemData.get(home.plan).map(place=>{
            if (place.Name == event.currentTarget.id){
                props.showOnePlace.current(place,itemData.get(home.plan))
                return
            }
        })
        

    }

    useEffect(()=>{
        
    },[])
    return (
        <>
        <Autocomplete
        id="combo-box-demo"
        options={data.state.province}
        onChange={searchProvince}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
      />
      <ImageList rowHeight={180} className={classes.imageList}>

                <ImageListItem key="Subheader" cols={2} style={{ height: 'auto' }}>
                <ListSubheader component="div">Places</ListSubheader>
                </ImageListItem>
                {itemData && itemData.map((item) => (
                    console.log(item),
                <ImageListItem  key={item.Name} >
                    <img onClick={showDataPlace} id={item.Name} src="https://image.shutterstock.com/image-vector/empty-set-symbol-on-white-260nw-1720537468.jpg" alt={item.title} />
                    <ImageListItemBar
                        title={item.Name}
                        subtitle={<span>by: {item.Province}</span>}
                        actionIcon={
                            <IconButton value={item.Name} onClick={showDataPlace} aria-label={`info about ${item.Name}`} className={classes.icon}>
                            <InfoIcon />
                            </IconButton>
                        }
                        />
                </ImageListItem>
                ))}
            </ImageList>
            </>
    )
}

export default ReviewProvince
