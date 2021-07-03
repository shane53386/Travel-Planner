
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
        data.set("1",[ { place : "Central World" , time : "9.00"},
                        { place : "Siam Paragon" , time : "10.00"}])
        data.set("2",[ { place : "Central World" , time : "9.00"},
                            { place : "Siam Paragon" , time : "10.00"}])
        
    }
    
    componentDidMount(){
        

    }
    
    genHeader(){
        return(
            <tr>
                <th>วันที่</th>
                <th>เวลา</th>
                <th>สถานที่</th>
                <th>หมายเหตุ</th>
            </tr>
        )
    }

    genOneDay(day){
        return(
            <tr>
                <td>
                    {day}
                </td>
                <td id = "oneDay" colSpan="2">
                <table padding="0px" border="0" width="100%">
                    <tbody>
                        {data.get(day).map(e =>{
                            return (
                                <tr>
                                    <td>{e.time}</td>
                                </tr>
                            )
                        })}     
                    </tbody>
                    </table>
                </td>
                <td id = "oneDay" colSpan="2">
                <table >
                    <tbody>
                        {data.get(day).map(e =>{
                            return (
                                <tr>
                                    <td>{e.place}</td>
                                </tr>
                            )
                        })}     
                    </tbody>
                    </table>
                </td>
            </tr>
        )
    }

    genBody(){
        
       

        console.log(data.get("1"))
        return (
            <div>
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
                    <thead>
                        {this.genHeader()}
                    </thead>
                    <tbody>
                        {this.genBody()}
                    </tbody>

                </Table>
                <Button onClick={this.exportPng}/>
                <a id="link"></a>
            </div>
        )

    }
}

export default TableShow