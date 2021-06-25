/*import { render } from "@testing-library/react";
import React, { useEffect, useState} from "react";
import { InputGroup , FormControl, Table , Button,DropdownButton,Dropdown} from 'react-bootstrap';

function TypeRows(t){

    const [row, setRow] = useState( [ {id : 0,
                                        list : "",
                                        cost : null,
                                        amount : null,
                                        totalCost : null,
                                        type : t} ] )
    const [showRow,setShowRow] = useState([])
    const [numRow,setNumRow] = useState(1)

    const toggleShow = () => {
        if(showRow.length == 0){
            setShowRow(row);
        }
        else{
            setShowRow([])
        }
    }

    const  handleChange = (event) =>{
        const {name,value} = event.target
        var tmp = name.split(" ")
        console.log(tmp)
        row[tmp[1]][tmp[0]] = value
        calculateTotal(tmp[1])
    }

    const calculateTotal  = (idx) => {
        row[idx].totalCost = row[idx].amount * row[idx].cost 
    }

    const renderRow1 = (idx) => {
        return (
                <tr>
                    <td></td>
                    <td>
                        {idx+1}
                    </td>
                    <td>
                        <InputGroup className="mb-1" >
                            <FormControl name= {"list " + idx.toString()} value = {row[idx].list} onChange={handleChange}
                                placeholder="Ex: ค่าเข้าสวนสัตว์" autocomplete="off"/> 
                        </InputGroup>
                    </td>
                    <td> <InputGroup className="mb-1" >
                            <FormControl type="number" min="0" id = {idx} name= {"cost " + idx.toString()} value = {row[idx].cost} onChange={handleChange} autocomplete="off"/> 
                        </InputGroup>
                    </td>
                    <td><InputGroup className="mb-1" >
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">X</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl type="number" min="0" id = {idx} name= {"amount " + idx.toString()} value = {row[idx].amount} onChange={handleChange} autocomplete="off"/> 
                        </InputGroup>
                    </td>
                    <td>{row[idx].amount * row[idx].cost }</td>
                </tr>
        )
    }

    const Render

    return(
        <tr>
            {row.map((r) => (
                renderRow1(r.id)
                renderRow2(r.id)
                renderRow3(r.id)
                renderRow4(r.id)
                renderRow5(r.id)
                renderRow(r.id)
            ))}
        </tr>
      
    )
    


}

export default TypeRows*/