
import React, { Component } from 'react';
import { InputGroup , FormControl, Table , Button,DropdownButton,Dropdown} from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

class TableComponent extends Component {

    constructor(props){
        super(props)
        this.state = {
            allType : new Map(),
            nameType : ["อื่นๆ"]
            }      
        
        this.state.allType.set("อื่นๆ" , {
                                    row : [ {id : 0,
                                            list : "",
                                            cost : null,
                                            amount : null,
                                            totalCost : null} ]  ,
                                    showRow : [] ,
                                    numRow : 1 ,
                                    overAllCost : 0
                                } )

        this.handleChange = this.handleChange.bind(this)
        this.upDate = this.upDate.bind(this)
        this.toggleShow = this.toggleShow.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.addRow = this.addRow.bind(this)
    }
    renderHeader(){
        return (<tr>
                    <th>ประเภท</th>
                    <th>No.</th>
                    <th>รายการ</th>
                    <th>ราคาต่อหน่วย</th>
                    <th>จำนวน</th>
                    <th>รวม</th>
                </tr>)
    }
    handleChange(event){
        const {name,value} = event.target
        var tmp = name.split(" ")
        
        let _name = tmp[0] ; let id = tmp[1] ; let type = tmp[2]
        var typeDb = this.state.allType.get(type)
        typeDb.row[id][_name] = value
        typeDb.overAllCost -= typeDb.row[id].totalCost
        typeDb.row[id].totalCost = typeDb.row[id].amount * typeDb.row[id].cost
        typeDb.overAllCost += typeDb.row[id].totalCost
       this.upDate()
    }
    upDate(){
        this.setState((prev)=>{
            return prev     
        })
    }

    addRow(){
        let name = "อื่นๆ"
        var typeDb = this.state.allType.get(name)

        typeDb.row.push({id : typeDb.numRow,
            list : "",
            cost : null,
            amount : null,
            totalCost : null})
       
        typeDb.numRow += 1
        this.upDate()
    }
    toggleShow(){
        let name = "อื่นๆ"
        var typeDb = this.state.allType.get(name)
        if (typeDb.showRow.length == 0)
            typeDb.showRow = typeDb.row
        else 
            typeDb.showRow = []
        console.log(typeDb.showRow)
        this.upDate()
    }
    
    renderRow (idx,key) {
        //console.log("ss")
        var typeDb = this.state.allType.get(key)
        console.log(typeDb)
        return (
                <tr>
                    <td>{key}</td>
                    <td>
                        {idx+1}
                    </td>`
                    <td>
                        <InputGroup className="mb-1" >
                            <FormControl name= {`list ${idx.toString()} ${key}`} value = { typeDb.row[idx].list} onChange={this.handleChange}
                                placeholder="Ex: ค่าเข้าสวนสัตว์" autocomplete="off"/> 
                        </InputGroup>
                    </td>
                    <td> <InputGroup className="mb-1" >
                            <FormControl type="number" min="0" id = {idx} name= {`cost ${idx.toString()} ${key}`} value = {typeDb.row[idx].cost} onChange={this.handleChange} autocomplete="off"/> 
                        </InputGroup>
                    </td>
                    <td><InputGroup className="mb-1" >
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">X</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl type="number" min="0" id = {idx} name= {`amount ${idx.toString()} ${key}`} value = {typeDb.row[idx].amount} onChange={this.handleChange} autocomplete="off"/> 
                        </InputGroup>
                    </td>
                    <td>{typeDb.row[idx].amount * typeDb.row[idx].cost }</td>
                </tr>
        )
    }

    render(){
        return (
            <div id="tableExpense">
               <Table striped bordered hover>
                    <thead>
                        {this.renderHeader()}
                    </thead>
                    <tbody>
                        
                    
                        {this.state.nameType.map((name) =>(
                            <tr>
                                <td colSpan = "6">
                                    <div>
                                        <Button onClick={this.toggleShow}>Show</Button>
                                        <Button onClick={this.addRow}>Add Row</Button>
                                        {this.state.allType.get(name).overAllCost}
                                    </div>
                                    {this.state.allType.get(name).showRow.map((data) => (
                                        console.log(data.id),
                                        this.renderRow(data.id,name)
                                    ))}
                                </td>
                            </tr>
                        
                        ))} 
                    </tbody>
                </Table>
                
            </div>
        )
    }
}
export default TableComponent

