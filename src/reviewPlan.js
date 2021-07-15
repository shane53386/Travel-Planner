import React, { useEffect,useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { useHome } from "./homeProvider";
import {Autocomplete} from '@material-ui/lab';
import {TextField}  from '@material-ui/core';
import { computeHeadingLevel } from "@testing-library/react";


export default function ReviewPlan(props) {

    const [itemData,setItemData] = useState(new Map())
    const [allPlans,setAllPlans] = useState([])
    const [selectedPlan,setSelectedPlan] = useState([])
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


    useEffect(()=>{
        itemData.set("planA", [{title : "mek" , img : "https://shopee.co.th/blog/wp-content/uploads/2020/11/%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B8%9A%E0%B8%B5%E0%B9%88.jpg" , author : "kem"}
                        ,{title : "mek1" , img : "https://www.prachachat.net/wp-content/uploads/2019/04/%E0%B8%9B%E0%B8%B0%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%87_1-728x485.jpg" , author : "kem"}
                        ,{title : "mek2" , img : "https://img.kapook.com/u/2020/Tanapol/travel/kabi/kabi9.jpg" , author : "kem"}])
                        
        
        itemData.set("planB", [{title : "mekky1" , img : "https://cms.dmpcdn.com/travel/2020/09/30/48daeb70-02cd-11eb-97e4-65e826b4aa8c_original.jpg" , author : "kem"}
                        ,{title : "mekky2" , img : "https://thesunsight.com/wp-content/uploads/2020/01/DOICHA-01-copy.jpg" , author : "kem"}])        
    
        itemData.forEach((value,key)=>{
            allPlans.push(key)
        })
    
    },[])

    const searchPlan=(event, inputValue)=>{
        if (inputValue=="" || inputValue==null) return
        setSelectedPlan(itemData.get(inputValue))
        console.log(itemData.get(inputValue))

    }

    const showDataPlace=(event,value)=>{
        console.log(event.currentTarget.id)
    }
    return (
        
        <div className={classes.root}>
            <Autocomplete
                id="combo-box-demo"
                options={allPlans}
                onInputChange={searchPlan}
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
                    <img onClick={showDataPlace} id={item.title} src={item.img} alt={item.title} />
                    <ImageListItemBar
                        title={item.title}
                        subtitle={<span>by: {item.author}</span>}
                        actionIcon={
                            <IconButton value={item.title} onClick={showDataPlace} aria-label={`info about ${item.title}`} className={classes.icon}>
                            <InfoIcon />
                            </IconButton>
                        }
                        />
                </ImageListItem>
                ))}
            </ImageList>
        </div>
        );
    


}