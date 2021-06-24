import React, { Component } from 'react';
import TableComponent from './tableComponent'
import "./expense.css";
import { Table } from 'react-bootstrap';
class Expense extends Component {
    render(){
        return (
            <div>
                  <TableComponent/>
            </div>
        )
    }
}
export default Expense

