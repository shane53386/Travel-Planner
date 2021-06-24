import React, { Component } from 'react';
import { InputGroup , FormControl, Table } from 'react-bootstrap';

class TableComponent extends Component {

    constructor(props){
        super(props)
        this.state= {
            row : [ {list : "",
                    cost : null,
                    amount : null,
                    totalCost : null}
                  ]   , 
            numRow : 0
        }
        this.handleChange = this.handleChange.bind(this)
    }
    renderHeader(){
        return (<tr>
                    <th>No.</th>
                    <th>รายการ</th>
                    <th>ราคาต่อหน่วย</th>
                    <th>จำนวน</th>
                    <th>รวม</th>
                </tr>)
    }
    handleChange(event){
        const {name,value} = event.target
        this.state.row[0][name] = value

        this.calculateTotal(0)
        this.setState((prev)=>{
            return prev     
        })
    }
    calculateTotal(idx){
        this.state.row[idx].totalCost = this.state.row[idx].amount * this.state.row[idx].cost 
        
        console.log(this.state.row[idx])
    }

    renderRow(idx){
        return (
            <tr>
                    <td>
                        {this.state.numRow+1}
                    </td>
                    <td>
                        <InputGroup className="mb-1" >
                            <FormControl name= "list" value = {this.state.row[idx].list} onChange={this.handleChange}
                            placeholder="Ex: ค่าเข้าสวนสัตว์" autocomplete="off"/> 
                        </InputGroup>
                    </td>
                    <td> <InputGroup className="mb-1" >
                            <FormControl type="number" min="0" name= "cost" value = {this.state.row[idx].cost} onChange={this.handleChange} autocomplete="off"/> 
                        </InputGroup></td>
                    <td><InputGroup className="mb-1" >
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">X</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl type="number" min="0" name= "amount" value = {this.state.row[idx].amount} onChange={this.handleChange} autocomplete="off"/> 
                        </InputGroup></td>
                    <td>{this.state.row[idx].amount * this.state.row[idx].cost }</td>
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
                        {this.renderRow(this.state.numRow)}
                    </tbody>
                </Table>
            </div>
        )
    }
}
export default TableComponent

