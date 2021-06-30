import { thisExpression } from '@babel/types';
import React, { useEffect, useState} from 'react';
import {Dropdown,DropdownButton , InputGroup ,FormControl,Button,Form} from 'react-bootstrap';

function FilterDay(props){

    const [show,setShow] = useState(false)

    const btn = ()=>{
        setShow(!show)
    }
    const updateFilter = (event)=>{
        let {name,checked} = event.target
        console.log([name,checked])
    }
    return(
        <div>
        <Button onClick={btn}/>
        {show==true?
            <div>
                <table>
                    {props.days.map((p)=>(
                        <div>
                            <input class="form-check-input" type="checkbox" name={p} onClick={updateFilter} value="" id="flexCheckDefault"/> {p}
                            </div>
                    ))}
                </table>
            </div>
            : null
        }
        </div>
    )

    
}

export default FilterDay