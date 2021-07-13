import { thisExpression } from '@babel/types';
import React, { Component, useEffect, useState} from 'react';
import {Dropdown,DropdownButton , InputGroup ,FormControl,Button,Form} from 'react-bootstrap';
import '../Plan/table.css'
class Filter extends Component{

    constructor(props){
        super(props)
        this.state = {
            show : false,
            check : new Map(),
            checkAll : true
        }
        this.btn = this.btn.bind(this)
        this.updateFilter = this.updateFilter.bind(this)
    }
   

    btn(event) {
        this.setState((prev)=>{
            return {
                show : !prev.show
            }
        })
    }

    updateFilter(event){
        
        let {name,checked} = event.target
        if (name=="switch"){
            this.props.switchCallback(checked)
            return
        }
        
        if (name=="all_day"){
            this.setState({
                checkAll : checked   
            })
            for (let [key,value] of this.state.check ){
                this.state.check.set(key,checked)
            }
        }
        else {
            this.state.check.set(name,checked)
            if (checked == false){
                this.setState({
                    checkAll : false  
                })
            }
            else{
                let t = true
                console.log(this.state.check)
                for (let [key,value] of this.state.check ){
                    if (value==false) t = false
                }
                this.setState({
                    checkAll : t
                })
            }
            
        }
            this.props.checkCallback(this.state.check)
           
        
        this.setState((prev)=>{
            return prev     
        })
    }
    componentDidMount(){
        this.props.daysList && this.props.days.map((p)=>{
            this.state.check.set(p,true)
        })
    }
   
    render(){
    return(
        <div id="filter">
            <Button onClick={this.btn}/>
            {this.state.show==true?
                <div>
                    <table>
                    <input class="form-check-input" checked={this.state.checkAll} type="checkbox" name="all_day" onClick={this.updateFilter} value="" id="flexCheckDefault"/> All day
                        {this.props.days.map((p)=>(
                            <div>
                            
                            
                                <input class="form-check-input" checked={this.state.check.get(p)} type="checkbox" name={p} onClick={this.updateFilter} value="" id="flexCheckDefault"/> {p}
                                </div>
                        ))}
                    </table>
                </div>
                : null
            }
            <Form.Check 
                type="switch"
                name="switch"
                id="custom-switch"
                label="Show all place in this plan"
                onClick={this.updateFilter}
            />
        </div>
    )
    }
    
}

export default Filter