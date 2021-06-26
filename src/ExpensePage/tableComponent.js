
import React, { Component } from 'react';
import { InputGroup , FormControl, Table , Button,DropdownButton,Dropdown} from 'react-bootstrap';
import InputNewType from './modal.js'
import "./expense.css";
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
                                    overAllCost : 0,
                                    readOnly : false
                                } )

        this.handleChange = this.handleChange.bind(this)
        this.upDate = this.upDate.bind(this)
        this.toggleShow = this.toggleShow.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.addRow = this.addRow.bind(this)
        this.addNewType = this.addNewType.bind(this)
        this.disableForm = this.disableForm.bind(this)
        this.deleteRow = this.deleteRow.bind(this)
    }
    renderHeader(){
        return (<tr id="headerTable">
                    <th id="mediumRow">ประเภท</th>
                    <th id="minRow">No.</th>
                    <th id="maxRow">รายการ</th>
                    <th >ราคาต่อหน่วย</th>
                    <th>จำนวน</th>
                    <th>รวม</th>
                    <th id="mediumRow"></th>
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

    addRow(event){
        const {name} = event.target
        var typeDb = this.state.allType.get(name)

        typeDb.row.push({id : typeDb.numRow,
            list : "",
            cost : null,
            amount : null,
            totalCost : null})
       
        typeDb.numRow += 1
        this.upDate()
    }

    toggleShow(event){
        const {name} = event.target
        var typeDb = this.state.allType.get(name)
        if (typeDb.showRow.length == 0)
            typeDb.showRow = typeDb.row
        else 
            typeDb.showRow = []
        console.log(typeDb.showRow)
        this.upDate()
    }
    
    renderRow (idx,key) {
        var typeDb = this.state.allType.get(key)
        console.log(typeDb)
        return (
                <tr id="rowInType">
                    <td id="mediumRow">{key}</td>
                    <td id="minRow">
                        {idx+1}
                    </td>
                    <td id="maxRow">
                        <InputGroup className="mb-1" >
                            <FormControl name= {`list ${idx.toString()} ${key}`} value = { typeDb.row[idx].list} onChange={this.handleChange}
                                placeholder="Ex: ค่าเข้าสวนสัตว์" autocomplete="off" readOnly={typeDb.readOnly}/> 
                        </InputGroup>
                    </td>
                    <td> <InputGroup className="mb-1" >
                            <FormControl type="number" min="0" id = {idx} name= {`cost ${idx.toString()} ${key}`} value = {typeDb.row[idx].cost} 
                            onChange={this.handleChange} autocomplete="off" readOnly={typeDb.readOnly}/> 
                        </InputGroup>
                    </td>
                    <td><InputGroup className="mb-1" >
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">X</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl type="number" min="0" id = {idx} name= {`amount ${idx.toString()} ${key}`} value = {typeDb.row[idx].amount} 
                            onChange={this.handleChange} autocomplete="off" readOnly={typeDb.readOnly}/> 
                        </InputGroup>
                    </td>
                    <td>{typeDb.row[idx].amount * typeDb.row[idx].cost }</td>
                    <td>
                        <Button disabled={typeDb.readOnly} name={`${key} ${idx}`} onClick={this.deleteRow}>Delete</Button>
                    </td>
                </tr>
        )
    }

    deleteRow(event){
        let {name} = event.target
        let tmp = name.split(" ")
        var key = tmp[0] ; var idx = tmp[1]
        var typeDb = this.state.allType.get(key)
        typeDb.row.splice(idx,1)
        typeDb.numRow -= 1
        for (let i = idx;i<typeDb.numRow;i++){
            typeDb.row[i].id -= 1

        }
        this.upDate()
    }

    addNewType(type){
        console.log(this.state.nameType)
       this.state.nameType.push(type)
       this.state.allType.set(type,{
        row : [ {id : 0,
                list : "",
                cost : null,
                amount : null,
                totalCost : null} ]  ,
        showRow : [] ,
        numRow : 1 ,
        overAllCost : 0
    })
    this.upDate()
    }
    disableForm(event){
        const {name} = event.target
        var typeDb = this.state.allType.get(name)
        typeDb.readOnly = !typeDb.readOnly
        //chech form valid
        this.upDate()
    }
    render(){
        console.log(this.state)
        return (
            <div id="tableExpense">
               <Table striped bordered hover>
                    <thead>
                        {this.renderHeader()}
                    </thead>
                    <tbody>
                        {this.state.nameType.map((name) =>(
                            <tr >
                                <td colSpan = "7" id='rowType'>
                                    <div>
                                        {name}
                                        <Button name={name} onClick={this.toggleShow}>Show</Button>
                                        <Button name={name} onClick={this.addRow}>Add Row</Button>
                                        { this.state.allType.get(name).showRow.length != 0?
                                            <Button visibility={false} name={name} onClick={this.disableForm}>{this.state.allType.get(name).readOnly? "Edit":"Save"}</Button>
                                            : null
                                        }
                                        {`${this.state.allType.get(name).numRow} รายการ  `}
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

                <InputNewType sendCallback={this.addNewType}/>
                
            </div>
        )
    }
}
export default TableComponent

