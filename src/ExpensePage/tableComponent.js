
import React, { Component } from 'react';
import { InputGroup , FormControl,Form, Table , Button,DropdownButton,Dropdown} from 'react-bootstrap';
import InputNewType from './modal.js'
import "./expense.css";
class TableComponent extends Component {

    constructor(props){
        super(props)
        this.state = {
            allType : new Map(),
            nameType : ["อื่นๆ"],
            totalCost : 0
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
                                    readOnly : false,
                                    inValid : []
                                } )

        this.handleChange = this.handleChange.bind(this)
        this.upDate = this.upDate.bind(this)
        this.toggleShow = this.toggleShow.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.addRow = this.addRow.bind(this)
        this.addNewType = this.addNewType.bind(this)
        this.disableForm = this.disableForm.bind(this)
        this.deleteRow = this.deleteRow.bind(this)
        this.deleteType = this.deleteType.bind(this)
        this.checkValid = this.checkValid.bind(this)
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
        let total = 0
        this.state.nameType.map((e)=>{
            total += this.state.allType.get(e).overAllCost
        })
        this.setState({

                totalCost : total

            }
        )
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
                    <td id="mediumRow"></td>
                    <td id="minRow">
                        {idx+1}
                    </td>
                    <td id="maxRow">
                        <InputGroup className="mb-1" >
                            <Form.Control class="invalid-feedback" required name= {`list ${idx.toString()} ${key}`} value = { typeDb.row[idx].list} onChange={this.handleChange}
                                placeholder="Ex: ค่าเข้าสวนสัตว์" autocomplete="off" readOnly={typeDb.readOnly} isInvalid={typeDb.inValid[idx]}/> 
                             <Form.Control.Feedback type='invalid'>
                                Cannot be blank
                            </Form.Control.Feedback>
                        </InputGroup>
                    </td>
                    <td >
                    <FormControl type="number" min="0" id = {idx} name= {`cost ${idx.toString()} ${key}`} value = {typeDb.row[idx].cost} 
                            onChange={this.handleChange} autocomplete="off" readOnly={typeDb.readOnly}/> 
                       
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
        let {name,value} = event.target
        let tmp = name.split(" ")
        var key = tmp[0] ; var idx = tmp[1]
        var typeDb = this.state.allType.get(key)
        typeDb.overAllCost -= typeDb.row[idx].totalCost
        this.state.totalCost -= typeDb.row[idx].totalCost
        typeDb.row.splice(idx,1)
        typeDb.numRow -= 1
        for (let i = idx;i<typeDb.numRow;i++){
            typeDb.row[i].id -= 1

        }
        
        this.upDate()
    }
    checkValid(name){
        let tmp = false
        
        var typeDb = this.state.allType.get(name)
        typeDb.inValid = []
        for (let i=0;i<typeDb.row.length;i++){
            if (typeDb.row[i].list == ""){
                typeDb.inValid.push(true)
                tmp = true
            }
            else
                typeDb.inValid.push(null)
        }
        if (tmp)
            return false
        return true
    }
    addNewType(type){
    
       this.state.nameType.push(type)
       this.state.allType.set(type,{
        row : [ {id : 0,
                list : "",
                cost : null,
                amount : null,
                totalCost : null} ]  ,
        showRow : [] ,
        numRow : 1 ,
        overAllCost : 0,
        inValid : []
    })
    this.upDate()
    }
    disableForm(event){
        //chech form valid
        const {name} = event.target
        if (this.checkValid(name)==true){
            
            var typeDb = this.state.allType.get(name)
            typeDb.readOnly = !typeDb.readOnly
            
           
        }
        else{

        }
        this.upDate()
    }
    deleteType(event){
        let {name} = event.target
        this.state.totalCost -= this.state.allType.get(name).overAllCost
        this.state.allType.delete(name)
        
        var index = this.state.nameType.indexOf(name);
        if (index >= 0) {
            this.state.nameType.splice( index, 1 );
        }
        this.upDate()
        //var tmp = <InputNewType sendCallback={this.addNewType} province={}/>
    }
    renderButton(name){
        return (
           <div>
               <div class="left main" >
                    <td id="rowHeaderType">
                        {name}
                    </td>
                    <td id="rowHeaderType" colSpan="3">
                        <Button name={name} onClick={this.toggleShow}>{this.state.allType.get(name).showRow.length != 0? "Hide":"Show"}</Button>
                        { (this.state.allType.get(name).showRow.length != 0) || (this.state.allType.get(name).row.length == 0)?
                            <Button name={name} onClick={this.addRow}>Add Row</Button> 
                            : null
                        }
                        { (this.state.allType.get(name).showRow.length != 0)?
                        
                            <Button name={name} onClick={this.disableForm}>{this.state.allType.get(name).readOnly? "Edit":"Save"}</Button>
                            : null
                        }
                        <Button name={name} onClick={this.deleteType}>Delete</Button>
                    </td>
                </div>
                
                <div class="right main" >
                    <td id="rowHeaderType">
                        {`${this.state.allType.get(name).numRow} รายการ`}
                    </td>
                    <td id="rowHeaderType">
                        {this.state.allType.get(name).overAllCost}
                    </td>
                     <td id="rowHeaderType">

                     </td>
                </div>

            </div>
        )
            }
    render(){
        console.log(this.state)
        return (
            <div id="tableExpense">
               <Table striped bordered hover class="center">
                    <thead>
                        {this.renderHeader()}
                    </thead>
                    <tbody>
                        {this.state.nameType.map((name) =>(
                            <tr>
                                <td colSpan = "7" id='rowType'>
                                    {this.renderButton(name)}
                                    
                                    {this.state.allType.get(name).showRow.map((data) => (
                                        console.log(data.id),
                                        this.renderRow(data.id,name)
                                    ))}
                                </td>
                            </tr>
                        ))} 
                        <tr>
                            <div class="right main" >
                                <td id="rowHeaderType">
                                    {this.state.totalCost}
                                </td>
                                
                            </div>
                        </tr>
                    </tbody>
                </Table>

                <InputNewType sendCallback={this.addNewType}/>
                
            </div>
        )
    }
}
export default TableComponent

