import React, { useEffect,useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { useHome } from "../homeProvider";
import {Autocomplete} from '@material-ui/lab';
import { useAuth } from "../authenticate/Auth";
import {TextField}  from '@material-ui/core';
import { computeHeadingLevel } from "@testing-library/react";


export default function ReviewPlan(props) {

    const [itemData,setItemData] = useState(new Map())
    const [allPlans,setAllPlans] = useState([])
    const [selectedPlan,setSelectedPlan] = useState([])
    const home = useHome()
    const auth = useAuth()
    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          overflow: 'hidden',
          backgroundColor: theme.palette.background.paper,
        },
        imageList: {
          height: 450,
        },
        icon: {
          color: 'rgba(255, 255, 255, 0.54)',
        },
      }));

    const classes = useStyles();


    useEffect(()=>{
        //fetch plan from auth.currentUser
        itemData.set("planA", [{Name : "mek" , img : "https://shopee.co.th/blog/wp-content/uploads/2020/11/%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B8%9A%E0%B8%B5%E0%B9%88.jpg" , Province : "kem"
                                , Type : "Mall"  ,  Position:{longitude : 100.498626 , latitude: 13.742706}}
                        ,{Name : "mek1" , img : "https://www.prachachat.net/wp-content/uploads/2019/04/%E0%B8%9B%E0%B8%B0%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%87_1-728x485.jpg" , Province : "kem"
                            , Type : "Mall"  ,  Position: {longitude : 100.538009 , latitude : 13.764603 }}
                        ,{Name : "mek2" , img : "https://img.kapook.com/u/2020/Tanapol/travel/kabi/kabi9.jpg" , Province : "kem"
                            , Type : "Mall"  ,  Position:{longitude : 100.537761 , latitude :13.697441 }}])
                        
        
        itemData.set("planB", [{Name : "mekky1" , img : "https://cms.dmpcdn.com/travel/2020/09/30/48daeb70-02cd-11eb-97e4-65e826b4aa8c_original.jpg" ,Province : "kem"
                                , Type: "Mall" , Position:{longitude :  100.583172 , latitude :13.748389 }}])
                        //,{Name : "mekky2" , img : "https://thesunsight.com/wp-content/uploads/2020/01/DOICHA-01-copy.jpg" , Province : "kem"])        
    
        itemData.forEach((value,key)=>{
            allPlans.push(key)
        })
    
    },[])

    const searchPlan=(event, inputValue)=>{
        
        if (inputValue=="" || inputValue==null) return
        setSelectedPlan(itemData.get(inputValue))
        home.setPlan(inputValue)
        console.log(props)
        props.showOnePlan.current(itemData.get(inputValue))

    }

    const update=(event)=>{
        console.log(home.plan,event)
        props.showOnePlan.current(itemData.get(home.plan))
    }
    const showDataPlace=(event,value)=>{
        home.setFocusPlace(event.currentTarget.id)
        itemData.get(home.plan).map(place=>{
            if (place.Name == event.currentTarget.id){
                props.showOnePlace.current(place,itemData.get(home.plan))
                return
            }
        })
        

    }
    return (
        
        <>
            <Autocomplete
                id="combo-box-demo"
                options={allPlans}
                onChange={searchPlan}
                onClick={update}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
            />

            <ImageList rowHeight={180} className={classes.imageList}>

                <ImageListItem key="Subheader" cols={2} style={{ height: 'auto' }}>
                <ListSubheader component="div">Places</ListSubheader>
                </ImageListItem>
                {console.log(selectedPlan)}
                {selectedPlan && selectedPlan.map((item) => (
                <ImageListItem  key={item.img} >
                    <img onClick={showDataPlace} id={item.Name} src={item.img} alt={item.title} />
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
        );
    


}