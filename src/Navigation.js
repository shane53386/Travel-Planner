import React, { useContext, useEffect, useState } from "react";
import { auth } from "./firebase";
import { Button,Form,FormControl,NavDropdown,Nav, Navbar,MenuItem,Dropdown,Table } from "react-bootstrap";
import "./index.css";
import CheckModal from "./checkModal";




function Navigation(){
	const [newPlan,setNewPlan] = useState(null)
	const [show,setShow] = useState(false)
	const [willDeletePlan,setDeletePlan] = useState(null)
	useEffect(()=>{
		
	},[])
	const genPlan=()=>{
		
		var planList = ["one","two","three"]
		//fecth plan from context
		let buffer = []
		planList.map((l)=>{
			buffer.push(
								<tr style={{padding:"0px",margin:"0px",border:"none"}}>
										<td style={{padding:"0px",margin:"0px",border:"none"}}>
										<a class="dropdown-item" href="./planPage">{l}</a>
										</td>
										<td id="planDelete" style={{border:"none",textAlign:"center",minWidth:"50px",padding:"0px",margin:"0px"}}>
										<Button name={l} onClick={showModal}></Button>
										</td>
									</tr>
	
							
					)
	
		})
		return buffer
		
	}
	
	const showModal=(event)=>{
		console.log(event.target.name)

		setDeletePlan(event.target.name)
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
			<Navbar.Brand href="#home">Navbar</Navbar.Brand>
			<Nav className="mr-auto">
			<Nav.Link href="./Home">Home</Nav.Link>
			
			<NavDropdown type="button" title="Plans" id="basic-nav-dropdown">
			
			<Table class="table table-hover" id="plantTable">
				{genPlan()}
			</Table>
				<NavDropdown.Divider />
				<NavDropdown.ItemText >
					<FormControl onChange={handlenewPlan} value={newPlan} type="text" placeholder="Add Plan" className="mr-sm-2"/>
					<Button onClick={addNewPlan}></Button>
				</NavDropdown.ItemText>
			</NavDropdown>
			</Nav>
			<Form inline>
			<FormControl type="text" placeholder="Search" className="mr-sm-2" />
			<Button variant="outline-light">Search</Button>

			
	<Dropdown>
  <Dropdown.Toggle variant="primary" id="dropdown-basic" >
  <span class="navbar-toggler-icon"></span>
  </Dropdown.Toggle>

  <Dropdown.Menu align="right">
    {false? null:<Dropdown.Item href="./LogIn">Login</Dropdown.Item>}
    {false? null:<Dropdown.Item href="./Home" onClick={() => auth.signOut()}>Logout</Dropdown.Item>}
	
  </Dropdown.Menu>
</Dropdown>
			
			</Form>
			<CheckModal show={show} name={willDeletePlan} callback={deletePlan}/>
		</Navbar>
		
		
	);
};

export default Navigation;
