
import React, { Component, useState,useEffect } from 'react';
import { InputGroup , FormControl,Form,DropdownButton,Dropdown} from 'react-bootstrap';
import { DataGrid } from '@material-ui/data-grid';
import TextField from '@material-ui/core/TextField';
import "./expense.css";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import PropTypes from 'prop-types';
import { MapOutlined } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import InputNewType from './modal.js';

    
    function TableComponent(props){        
        const createData=(type,num, cost)=> {
                return {
                  type,
                  num,
                  cost,
                  detail: [
                    { id: 1 , name: null , cost : 0 , amount: 0},
                  ],
                  
                };
              }
        
        //const [allData,setAllData] = useState(["อื่นๆ"])
        //const [rows,setRows] = useState(["อื่นๆ"])
        const [rows,setRows] = useState([
            createData('อื่นๆ', 1, 0),
            
          ]);
        const [open, setOpen] = useState({อื่นๆ:false});
        const [totalCost,setTotalCost] = useState(0);
        //open.set("อื่นๆ",false)
        
        const useRowStyles = makeStyles({
            root: {
              '& > *': {
                border: 'none',
                
              },
            },
          });
          const classes = useRowStyles();
        const [save,setSave] = useState(false);

        const deleteType=(event)=>{
            var type = event.target.value
            for (let i=0;i<rows.length;i++){
                if (rows[i].type==type){
                    rows.splice(i,1)
                    setRows([...rows])
                    calTotalCost()
                    return
                }
            }
        }
        const deleteData=(event)=>{
            var type = event.target.value.split(" ")[0]
            var id = event.target.value.split(" ")[1]
            for (let i=0;i<rows.length;i++){
                if (rows[i].type==type){
                    for (let j=id;j<rows[i].detail.length;j++){
                        rows[i].detail[j].id--
                    }
                    rows[i].cost -= rows[i].detail[id-1].amount * rows[i].detail[id-1].cost 
                    rows[i].detail.splice(id-1,1)
                    rows[i].num -=1
                    setRows([...rows])
                    calTotalCost()
                    return
                    
                }
            }
        }

        const addData=(event)=>{
            console.log("click")
            var type = event.target.value
            for (let i=0;i<rows.length;i++){
                console.log(rows[i].type,event.target)
                if (rows[i].type==type){
                    rows[i].detail.push({ id:++rows[i].num  , name: null , cost : 0 , amount: 0})
                    setRows([...rows])
                    return
                    
                }
            }
        }

        const addNewType=(type)=>{
            rows.push(createData(type,1,0))
            setRows([...rows])
        }
        const calTotalCost=()=>{
            var tmp = 0
            rows.map(row=>{
                tmp+=row.cost
            })
            setTotalCost(tmp)

        }
        const renderRow=(row,id)=>{
            return (
        
                <React.Fragment>
                  <TableRow style={id % 2==0? { background : "#e0e0e0" }:{ background : "white" }} >
                    <TableCell id="center">
                      <IconButton aria-label="expand row" size="small" onClick={() => {open[row.type]=!open[row.type] ; setOpen({...open})} }>
                        {open[row.type] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                      </IconButton>
                    </TableCell>
                    <TableCell component="th" id="center" scope="row">
                      {row.type}
                    </TableCell>
                    <TableCell align="right" id="center">{row.num}</TableCell>
                    <TableCell align="right"id="center">{row.cost}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                      <Collapse in={open[row.type]} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <div style={{display:"inline"}}>
                          <Typography variant="h6" gutterBottom component="div" style={{display:"inline"}}>
                            รายละเอียด   
                          </Typography>
                          &emsp;
                          <Button value={row.type} size="small" color="primary" variant="contained" onClick={addData}>Add</Button>
                          <Button value={row.type} size="small" color="primary" variant="contained" onClick={deleteType}>Delete</Button>
                            </div>
                          <Table size="small" aria-label="purchases">
                            <TableHead>
                              <TableRow>
                                <TableCell  class="head" id="headCenter">ID</TableCell>
                                <TableCell class="head" id="headCenter">รายการ</TableCell>
                                <TableCell class="head" align="right" id="headCenter">จำนวน</TableCell>
                                <TableCell class="head" align="right" id="headCenter">ราคาต่อหน่วย</TableCell>
                                <TableCell class="head" align="right" id="headCenter">ราคารวม</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {row.detail.map((e) => (
                                <TableRow key={e.id}>
                                    <TableCell id="leftCenter" component="th" scope="row">
                                    {e.id}
                                  </TableCell>
                                  <TableCell id="center"component="th" scope="row">
                                  <TextField 
                                          autoComplete='off'
                                          error={(e.type==null || e.type.length==0) &&save?true:false}
                                          id={(e.type==null || e.type.length==0) &&save?"standard-error-helper-text":"standard-basic"}
                                          label={(e.type==null || e.type.length==0) &&save?"Cannot be blank!":null}
                                          disabled={!save?false:true}
                                          
                                          name={row.type + " " + "type" + " " + e.id}
                                          value={e.type}
                                          onChange={handleInput}
                                          type="text"
                                          InputLabelProps={{
                                              shrink: true,
                                          }}
                                      />
                                  </TableCell>
                                  <TableCell id="center"><TextField 
                                          id="standard-number"
                                          label="Number"
                                          InputProps={{
                                            inputProps: { min: 0 
                                            }
                                        }}
                                          disabled={!save?false:true}
                                          name={row.type + " " + "cost" + " " + e.id}
                                          value={!save?e.cost:Math.max(e.cost,0)}
                                          onChange={handleInput}
                                          type="number"
                                          InputLabelProps={{
                                              shrink: true,
                                          }}
                                      /></TableCell>
                                  <TableCell id="center"align="right">
                                      <TextField 
                                          id="standard-number"
                                          disabled={!save?false:true}
                                          label="Number"
                                          name={row.type + " " + "amount" + " " + e.id}
                                          value={!save?e.amount:Math.max(e.amount,0)}
                                          onChange={handleInput}
                                          type="number"
                                          InputLabelProps={{
                                              shrink: true,
                                          }}
                                      />
                                  </TableCell>
                                  <TableCell id="center" align="right">
                                    {e.cost*e.amount}
                                  </TableCell>
                                  <TableCell id="rightCenter">
                                    <Button value={row.type + " " + e.id} variant="contained"	color="secondary" onClick={deleteData} className={classes.button}startIcon={<DeleteIcon />}>
                                        Delete
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              );
            
        }
        const handleSave=(event)=>{
            var valid = true
            if(!save){
                for (let i=0;i<rows.length;i++){
                    for (let j=0;j<rows[i].detail.length;j++){
                        var t=false
                        if (rows[i].detail[j].name==null ||rows[i].detail[j].name.length==0) valid = false
                        var tmp = rows[i].detail[j].cost*rows[i].detail[j].amount
                        if (rows[i].detail[j].cost<0){
                            rows[i].detail[j].cost = 0
                            t=true
                        }
                        if (rows[i].detail[j].amount<0){
                            t = true
                            rows[i].detail[j].amount = 0
                        }
                        if(t) rows[i].cost -=tmp


                    }
                }
                calTotalCost()
                if (valid){
                  //update rows to database
                }
                
            }

            setSave(!save)
        }
        const handleInput=(event)=>{
            var type = event.target.name.split(" ")[0]
            var name = event.target.name.split(" ")[1]
            var id = event.target.name.split(" ")[2]
            console.log(type,name,event.target.value)
            for (let i=0;i<rows.length;i++){
                console.log(rows[i])
                if (rows[i].type==type){
                    var tmp =  rows[i].detail[id-1]["amount"] * rows[i].detail[id-1]["cost"] 
                    rows[i].detail[id-1][name] = event.target.value
                    if (name == "amount" || name=="cost"){
                        rows[i].cost = rows[i].cost - tmp +  rows[i].detail[id-1]["amount"] * rows[i].detail[id-1]["cost"] 
                    }
                    calTotalCost()
                    setRows([...rows])
                    return
                    console.log(rows[i][name])
                }
            }
          }
        return (
            <>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead >
                        <TableRow >
                          <TableCell id='leftCenter'>
                               <Button variant="contained"	color="secondary" onClick={handleSave} >
                                        {save?"Edit":"Save"}
                                </Button>
                                <InputNewType sendCallback={addNewType}/>
                            </TableCell>
                          <TableCell class="head"id="center">ประเภท</TableCell>
                          <TableCell class="head" id="center" align="right">จำนวนรายการ</TableCell>
                          <TableCell class="head" align="right" id="center">ค่าใช้จ่าย</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody stripedRows>
                      {rows.map((k,id) => (
                            renderRow(k,id)
                        ))}
                        <TableRow className={classes.root}>
                            <TableCell/>
                            <TableCell/>
                            <TableCell/>
                            <TableCell class="head" id="center">
                                {totalCost}
                            </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  
                  </>
                );
}
//
export default TableComponent


function Row(props) {
    
    const { row } = props;
    
  
}
  
 
  Row.propTypes = {
    row: PropTypes.shape({
      calories: PropTypes.number.isRequired,
      carbs: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      history: PropTypes.arrayOf(
        PropTypes.shape({
          amount: PropTypes.number.isRequired,
          customerId: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
        }),
      ).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      protein: PropTypes.number.isRequired,
    }).isRequired,
  };
