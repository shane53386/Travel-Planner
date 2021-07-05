
import React, { Component } from 'react';
import html2canvas from "html2canvas";
import { InputGroup , FormControl,Form, Table , Button,DropdownButton,Dropdown} from 'react-bootstrap';
import "./table.css"


/*{ 1 : Central World , 9.00
        Siam Paragon  , 10.00
    2 : .....                   }*/

var data = new Map()
var dataList = ["1","2"]
class TableShow extends Component {

    constructor(props){
        super(props)
        data.set("1",[ { place : "Central World" , inTime : "9.00" , outTime : "9.45" , note:"..........\n............"},
                        { place : "Siam Paragonnnnnnnnnnnnnnnnnnnnnn  nnnnnnnnnn" , inTime : "10.00" , outTime : "10.50" ,  note:"1234567 8901234789"} ])
        data.set("2",[ { place : "Central" , inTime : "9.00" , outTime : "9.30" ,  note:"......................"},
                            { place : "Siam" , inTime : "10.00" , outTime : "10.45" ,  note:"......................"}])
        
    }
    
    componentDidMount(){
        

    }
    
    cutNewLine(type,string){
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

    genHeader(){
        return(
            <tr class="allCenter" id="header">
                <th id="placeTime">วันที่</th>
                <th id="placeTime">เวลา</th>
                <th id="placeTime">สถานที่</th>
                <th id="note">หมายเหตุ</th>
            </tr>
        )
    }

    genOneDay(day){
        return(
            <table padding="0px" border="0">
                <td class="allCenter">
                    {day}
                </td>
                <td id = "oneDay">
                    {data.get(day).map((e)=>{
                        return (
                            <tr>
                                <table padding="0px" border="0" width="100%">
                                    <tbody>
                                        <tr>
                                            <td class="allCenter" id="placeTime">
                                                {e.inTime} <br/>
                                                - <br/>
                                                {e.outTime}
                                            </td>
                                            <td class="allCenter" id="placeTime" rowSpan="2">
                                            {this.cutNewLine("normal",e.place)}
                                            </td>
                                            <td class="allCenter"id="note" rowSpan="2">
                                                {this.cutNewLine("large",e.note)}
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

    genBody(){

        return (
            <div>
                <thead>
                    {this.genHeader()}
                </thead>
                    {console.log(data.keys())}
                    { Array.from(data.keys()).map(e =>{
                        return( 
                            <div>
                            {this.genOneDay(e)} 
                            </div>
                            )
                    })}

                
               
            </div>
        )
    }

    exportPng(){
        var data = document.getElementById('table')
        html2canvas(data).then((canvas)=>{
            var link = document.getElementById('link');
            link.setAttribute('download', 'MintyPaper.png');
            link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
            link.click();
          })
    }

    render() {
        return (
            <div>
                <Table id="table" striped bordered hover>

                        {this.genBody()}


                </Table>
                <Button onClick={this.exportPng}>Export</Button>
                <a id="link"></a>
            </div>
        )

    }
}

export default TableShow