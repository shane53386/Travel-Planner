import React, { Component } from 'react';
import TableComponent from './tableComponent'
import "./expense.css";
class Expense extends Component {
    render(){
        return (
            <div style={{width:'75%',justifyContent:'center'}}>
                  <TableComponent/>
            </div>
        )
    }
}
export default Expense
