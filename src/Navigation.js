import React, { useContext, useEffect, useState } from "react";
import { Form,FormControl,NavDropdown,Nav, Navbar,MenuItem,Dropdown,Table } from "react-bootstrap";
import {IconButton,Button} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import "./index.css";
import CheckModal from "./checkModal";
import { makeStyles } from '@material-ui/core/styles';
import { useHome } from './homeProvider';
import { useAuth } from "./authenticate/Auth";

const useStyles = makeStyles((theme) => ({
	button: {
	  margin: theme.spacing(1),
	},
  }));


function Navigation(){
	const [newPlan,setNewPlan] = useState(null)
	const [show,setShow] = useState(false)
	const [willDeletePlan,setDeletePlan] = useState(null)
	const classes = useStyles();
	const auth = useAuth();

	
	useEffect(()=>{
		
	},[])

	const selectPlan=(event)=>{
		console.log(event.target.value)
		//data.setPlan()
	}
	const genPlan=()=>{
		
		//gen from plan of current user in auth
		var planList = ["one","two","three"]
		//fecth plan from context
		let buffer = []
		planList.map((l)=>{
			buffer.push(
						<tr style={{padding:"0px",margin:"0px",border:"none"}}>
							<td style={{padding:"0px",margin:"0px",border:"none"}}>
								<a class="dropdown-item" href="./planPage" value={l} onClick={selectPlan}>{l}</a>
							</td>
							<td id="planDelete" style={{border:"none",textAlign:"center",minWidth:"50px",padding:"0px",margin:"0px"}}>
							<Button variant="contained"	color="secondary" value={l} onClick={showModal} className={classes.button}startIcon={<DeleteIcon />}>
								Delete
							</Button>
							</td>
						</tr>	
					)
		})
		return buffer
	}
	
	const showModal=(e)=>{
		console.log(e.currentTarget.value)

		setDeletePlan(e.currentTarget.value)
		setShow(true)
	}
	const deletePlan=(confirm)=>{
		setShow(false)
		if (confirm=="Yes"){
			console.log("yes",newPlan)
			//delte newPlan plan
		}
		else{
			console.log("No",newPlan)
		}
	}

	const handlenewPlan=(event)=>{
	
			let {value} = event.target
			setNewPlan(value)
		
	
	}

	const addNewPlan=(event)=>{
		console.log(newPlan)
		//add newPlan to firebase
	}
	return (

		<Navbar bg="primary" variant="dark">
			<Navbar.Brand href="/home">Navbar</Navbar.Brand>
			<Nav className="mr-auto">
				<Nav.Link href="/Home">Home</Nav.Link>
				{auth.currentUser != null? null:
				<>
				<NavDropdown type="button" title="Plans" id="basic-nav-dropdown">
					<Table class="table table-hover" id="plantTable">
						{genPlan()}
					</Table>
					<NavDropdown.Divider />
						<NavDropdown.ItemText >
							<FormControl onChange={handlenewPlan} value={newPlan} type="text" placeholder="Add Plan" className="mr-sm-2"/>
							<Button variant="contained"	color="primary" className={classes.button} onClick={addNewPlan}>Add</Button>
						</NavDropdown.ItemText>
					</NavDropdown>
				<Nav.Link href="/expense">Expense</Nav.Link>
				</>
				}
			</Nav>
			<Form inline>
			<FormControl type="text" placeholder="Search" className="mr-sm-2" />
			<Button variant="outlined"	 className={classes.button} onClick={addNewPlan}>Search</Button>

			
	<Dropdown>
  <Dropdown.Toggle variant="primary" id="dropdown-basic" >
  <span class="navbar-toggler-icon"></span>
  </Dropdown.Toggle>

  <Dropdown.Menu align="right">
    {false? null:<Dropdown.Item href="/LogIn">Login</Dropdown.Item>}
    {false? null:<Dropdown.Item href="/Home" onClick={() => auth.signOut()}>Logout</Dropdown.Item>}
	
  </Dropdown.Menu>
</Dropdown>
			
			</Form>
			<CheckModal show={show} name={willDeletePlan} callback={deletePlan}/>
		</Navbar>
		
		
	);
};

export default Navigation;
