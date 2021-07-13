import React, { useContext } from "react";
import { auth } from "./firebase";
import { Button,Form,FormControl,NavDropdown,Nav, Navbar,MenuItem,Dropdown } from "react-bootstrap";

const genPlan=()=>{
	var planList = ["one","two","three"]
	//fecth plan from context
	let buffer = []
	planList.map((l)=>{
		buffer.push(<NavDropdown.Item href="./planPage">{l}</NavDropdown.Item>)

	})
	return buffer
	
}

const Navigation = () => {
	
	return (

		<Navbar bg="primary" variant="dark">
			<Navbar.Brand href="#home">Navbar</Navbar.Brand>
			<Nav className="mr-auto">
			<Nav.Link href="./Home">Home</Nav.Link>
			
			<NavDropdown type="button" title="Plans" id="basic-nav-dropdown">
				
				{genPlan()}
				
				<NavDropdown.Divider />
				<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
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
    {false? null:<Dropdown.Item href="./Home">Logout</Dropdown.Item>}
	
  </Dropdown.Menu>
</Dropdown>
			
			</Form>
		</Navbar>
		
		
	);
};

export default Navigation;
