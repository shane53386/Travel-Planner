import { useEffect, useState } from "react"
import PlanPage from './PlanPage';
import MapDirection from './mapDirect';

function MainPlan (){

    const [inputList,setInputList] = useState(null)

    const [days,setDays] = useState(null)

    const sendCallback=(input)=>{
        console.log(input)
        if (input == null || input.length==0 )
            return
        setInputList(input)
        var tmpDays = []
        input.forEach((values,keys)=>{
          tmpDays.push(keys)
          })
        setDays(tmpDays)
        console.log(days)
        
    }


    useEffect(()=>{
        console.log("use effect")
        console.log(inputList)
        console.log(days)
    },[days])
    return(
        <div>
          
            <div style= {{width: '100%', height: 800,float:'right'}}>
            <MapDirection id="myMap"  
                plan={inputList}
                daysList={["2021-07-06"]}
                test={new Date()}
                options={
                {center: { lng : 100.633214325 , lat : 13.724293875 },
                zoom: 6,
                mapId: "6ef51b53d122d80d" }}/>
            </div>
        </div>
    )
}

export default MainPlan
/* <MapDirection id="myMap" 
              input = {inputList} 
              days = {days}
              options={
                {center: { lng : 100.633214325 , lat : 13.724293875 },
                zoom: 6,
                mapId: "6ef51b53d122d80d" }}/>*/