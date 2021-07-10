
import React, { Component,useContext } from 'react';
import html2canvas from "html2canvas";
import { InputGroup , FormControl,Form, Table , Button,DropdownButton,Dropdown} from 'react-bootstrap';
import "./table.css"
import {MContext} from './provider';

/*{ 1 : Central World , 9.00
        Siam Paragon  , 10.00
    2 : .....                   }*/

var data = new Map()
function TableShow(props) {

    const update = useContext(MContext);
    
        /*data.set("1",[ { place : "Central World" , inTime : "9.00" , outTime : "9.45" , note:"..........\n............"},
                        { place : "Siam Paragonnnnnnnnnnnnnnnnnnnnnn  nnnnnnnnnn" , inTime : "10.00" , outTime : "10.50" ,  note:"1234567 8901234789"} ])
        data.set("2",[ { place : "Central" , inTime : "9.00" , outTime : "9.30" ,  note:"......................"},
                            { place : "Siam" , inTime : "10.00" , outTime : "10.45" ,  note:"......................"}])*/

    
    
    const cutNewLine = (type,string)=>{
        if (string==null) return ""
        var offset 
        switch(type){
            case "normal":
                offset = 12
                break
            case "large":
                offset = 26
                break   
        }
        if (string.length <= offset)
            return string
        var list = string.split(" ")
        var count = 0
        var re = ""
        var x = [] , buff = null
        var i =0 , next=null
        while (true){
            
            if (i==list.length && buff==null)
                break
            console.log(buff)
            if (buff == null){
                next = list[i]
                i++
            }
            else
                next = buff

            if (next.length == 0) {
                continue
            }
            if(next.length >= offset){
                re += next.slice(0,offset-count)
                re += "\n"
                count = 0
                buff = next.slice(offset-count,next.length)
                continue
            }
            if (count + next.length > offset){
                re += "\n"
                count = 0
                buff = null
            }
            re += next + " "
            count += next.length
            buff = null
        }
        return re
    }

    const genHeader = () =>{
        return(
            <tr class="allCenter" id="header">
                <th id="placeTime">วันที่</th>
                <th id="placeTime">เวลา</th>
                <th id="placeTime">สถานที่</th>
                <th id="note">หมายเหตุ</th>
            </tr>
        )
    }
    const convertTime=(e)=>{
        var min = ""
        if (e.getMinutes() ==0){
            min = '00'
        }
        else if (e.getMinutes() < 10){
            min = '0' + String(e.getMinutes())
        }
        else{
            min = String(e.getMinutes())
        }
        return `${e.getHours()}:${min}`
    }

    const genInTime=(day,e)=>{
        
        let idx = update.data.get(day).indexOf(e)

        console.log(update.time.get(day))
        console.log(update.time.get(day).length,update.time.get(day).size)


        update.time.get(day).forEach(element => {
            console.log(element)
        });
        if (idx==0) return null
        /*var x = update.time.get(day)[idx-1]
        var y = update.data.get(day)[idx-1].departureTime.getTime()
        var d = new Date(y + x.split(" ")[0]*60*1000)
        return  convertTime(d)*/
    }
    const genOneDay=(day)=>{
        return(
            <table padding="0px" border="0">
                <td class="allCenter">
                    {day}
                </td>
                <td id = "oneDay">
                    {update.data.get(day).map((e)=>{
                        console.log(e.departureTime)
                        return (
                            <tr>
                                <table padding="0px" border="0" width="100%">
                                    <tbody>
                                        <tr>
                                            <td class="allCenter" id="placeTime">
                                                {e.departureTime && genInTime(day,e)}
                                                <br/>
                                                - <br/>
                                                {e.departureTime && convertTime(e.departureTime)}
                                            </td>
                                            <td class="allCenter" id="placeTime" rowSpan="2">
                                            {cutNewLine("normal",e.place)}
                                            </td>
                                            <td class="allCenter"id="note" rowSpan="2">
                                                {cutNewLine("large",e.note)}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </tr>
                        )
                    })}
                </td>
            </table>
        )
    }

    const genBody=()=>{

        return (
            <div>
                <thead>
                    {genHeader()}
                </thead>
                {console.log(update.data)}
                    { update.data && Array.from(update.data.keys()).map(e =>{
                        
                        return( 
                            <div>
                            {genOneDay(e)} 
                            </div>
                            )
                    })}

                
               
            </div>
        )
    }

    const exportPng=()=>{
        var data = document.getElementById('table')
        html2canvas(data).then((canvas)=>{
            var link = document.getElementById('link');
            link.setAttribute('download', 'MintyPaper.png');
            link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
            link.click();
          })
    }

    const tmp=()=>{
        console.log("sss")
        console.log(update.data)
    }
        return (
            <div>
                <Table id="table" striped bordered hover>

                        {genBody()}


                </Table>
                <Button onClick={exportPng}>Export</Button>
                <Button onClick={tmp}>xxx</Button>
                <a id="link"></a>
            </div>
        )

    
}

export default TableShow