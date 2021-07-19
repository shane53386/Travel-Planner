
import React, { useState, useEffect ,Component,useContext } from 'react';
import Data from "../Data";
import fetchPlace from '../fetchData';
import {Autocomplete} from '@material-ui/lab';
import {TextField}  from '@material-ui/core';
import {BrowserRouter, Link , Route,Switch,withRouter } from 'react-router-dom';
import OverView from '../Plan/overView';
import { useHome } from '../homeProvider';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

const data = new Data()
function ReviewProvince(props){

    const theme = useTheme();
    const [selectedProvince,setSelectedProvince] = useState("")
    const [itemData,setItemData] = useState([])
    const home = useHome()
    const [checkBoxes,setCheckBoxes] = useState([])
    const [selectType, setSelectType] = useState([]);
    const [allType,setAllType] = useState(["All","Mall","Nature","Culture"])
    const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

    const useStylesImg = makeStyles((theme) => ({
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
      const useStylesCheck = makeStyles((theme) => ({
        formControl: {
          margin: theme.spacing(1),
          maxWidth: '100%',
          minWidth : '200px'
        },
        chips: {
          display: 'flex',
          flexWrap: 'wrap',
        },
        chip: {
            
          margin: 2,
        },
        noLabel: {
          marginTop: theme.spacing(3),
        },
      }));
      const imgClasses = useStylesImg();
      const checkClasses = useStylesCheck();
   const searchProvince=async(event,inputValue)=>{
        itemData.length = 0
        setSelectedProvince(inputValue)
        await fetchPlace(inputValue)
        .then(e=>{
            //home.setData(e)
            e.map(data=>{
                
                if (selectType.includes("All") || selectType.includes(data.Type)){

                itemData.push({ Name : data.Name,
                                    Type : data.Type,
                                    Position : data.Position,
                                    Description : data.Description})
                }
            })
        })
        .then(e=>{
            setItemData([...itemData])
        props.searchProvince.current(inputValue,itemData,selectType)
        
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

    const handleType = (event) => {
        if (event.target.value.includes("All")){
            if(event.target.value.length == 1 || !selectType.includes("All"))
                setSelectType(["All"]);
            else if (selectType.includes("All")){
                console.log(event.target.value.splice(event.target.value.indexOf("All"), 1))
                setSelectType(event.target.value.splice(event.target.value.indexOf("All"), 1))
            }
            
        }
        else setSelectType(event.target.value);
        //searchProvince(null,selectedProvince)
      }
    useEffect(()=>{
        searchProvince(null,selectedProvince)
       
    },[selectType])
    return (
        <>
        <Autocomplete
        id="combo-box-demo"
        options={data.state.province}
        onChange={searchProvince}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
      />
      

      <FormControl className={checkClasses.formControl}>
        <InputLabel id="demo-mutiple-chip-label">Chip</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={selectType}
          onChange={handleType}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={checkClasses.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} color={value!="All"? 'primary':'secondary'} className={checkClasses.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {allType.map((name) => (
            <MenuItem key={name} value={name} style={getStyles(name, allType, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <ImageList rowHeight={180} className={imgClasses.imageList}>

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
                            <IconButton value={item.Name} onClick={showDataPlace} aria-label={`info about ${item.Name}`} className={imgClasses.icon}>
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
