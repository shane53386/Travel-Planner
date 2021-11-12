import { useAuth } from "./authenticate/Auth";
import React, { useContext, useEffect, useState } from "react";
import { withRouter,Redirect,Route } from 'react-router-dom';
import { Form,FormControl,NavDropdown,Nav, Navbar,MenuItem,Dropdown,Table } from "react-bootstrap";
import {IconButton,Button} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import "./index.css";
import CheckModal from "./checkModal";
import { makeStyles } from '@material-ui/core/styles';
import { auth } from "./firebase";
import overView from "./Plan/overView";
import LogIn from "./authenticate/LogIn";
const useStyles = makeStyles((theme) => ({
	button: {
	  margin: theme.spacing(1),
	},
  }));

const Navigation = (props) => {
	const { currentUser,selectedPlan,allPlans,setSelectedPlan } = useAuth();
	const [logIn, setLogIn] = useState(false);
	const [newPlan,setNewPlan] = useState(null)
	const [show,setShow] = useState(false)
	const [willDeletePlan,setDeletePlan] = useState(null)
	const [redirect,setRedirect] = useState(false)
	const classes = useStyles();
	//const history = useHistory();

    const handleClick = () => {
        ;
    }
	//const auth = useAuth();


	useEffect(()=>{
		//auth.signOut()
		console.log(currentUser)

	},[])

	const handleSelectedPlan=(event)=>{
		console.log(event.target.name)
		setSelectedPlan(event.target.name)
		setRedirect(true)
		//console.log(event)
		//props.history.push("/planPage")

		//setSelectedPlan(event)
		//return <Redirect to='/planPage'  />
	}
	const genPlan=()=>{

		//gen from plan of current user in auth
		var planList = Object.keys(allPlans)
		//var planList = ["one","two","three"]
		//fecth plan from context
		let buffer = []
		planList.map((l)=>{
			buffer.push(
						<tr style={{verticalAlign:"middle", padding:"0px",margin:"0px",border:"none"}}>
							<td style={{padding:"0px",margin:"0px",border:"none"}}>
								<a class="dropdown-item" name={l} value={l} onClick={handleSelectedPlan}>{l}</a>
								
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
		<>

		<Navbar bg="primary" variant="dark">
			<Navbar.Brand>TravelPlanner</Navbar.Brand>
			<Nav className="mr-auto">
				<Nav.Link href="/Home">Home</Nav.Link>
				{currentUser != null? null:
					<Nav.Link href="/PlanPage">Plan</Nav.Link>
				}
				{currentUser == null? null:
				<>
				<NavDropdown type="button" title="Plans" id="basic-nav-dropdown">
					<Table class="table table-hover" id="plantTable">
						{allPlans && genPlan()}
					</Table>
					<NavDropdown.Divider />
						<NavDropdown.ItemText style={{justifyContent:'center'}}>
							<FormControl onChange={handlenewPlan} value={newPlan} type="text" placeholder="Add Plan" className="mr-sm-2"/>
							<Button variant="contained"	color="primary" className={classes.button} onClick={addNewPlan}>Add</Button>
						</NavDropdown.ItemText>
					</NavDropdown>
					
				</>
				}
				
			</Nav>
			<Nav>
		
			{currentUser ? (
							<Nav.Link
							href="./Home"
								onClick={() => auth.signOut()}
							>
								Sign Out
							</Nav.Link>
						) : (
							<Nav.Link href="#" onClick={() => setLogIn(true)}>
								Log In
							</Nav.Link>
							
						)}
			
			</Nav>
			<CheckModal show={show} name={willDeletePlan} callback={deletePlan}/>
		</Navbar>
		<LogIn show={logIn} onHide={() => setLogIn(false)} />
		{redirect?<><Redirect to="/planPage"/><Route path="/planPage" component={overView} /></>:null}
		</>
		)
		/*
		<>
			<Navbar
				collapseOnSelect
				expand="xl"
				bg="primary"
				variant="dark"
				sticky="top"
			>
				<Navbar.Brand href="./Home">Home</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse
					id="responsive-navbar-nav"
					className="justify-content-between"
				>
					<Nav className="mr-auto">
						<Nav.Link href="./Overview">Overview</Nav.Link>
						{currentUser && (
							<NavDropdown
								title="Plan"
								id="collasible-nav-dropdown"
							>
								<NavDropdown.Item href="#action/3.1">
									Plan1
								</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.2">
									Plan2
								</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.3">
									Plan3
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="#action/3.4">
									Add new plan
								</NavDropdown.Item>
							</NavDropdown>
						)}
					</Nav>
					<Nav>
						{currentUser ? (
							<Nav.Link
								href="./Home"
								onClick={() => auth.signOut()}
							>
								Sign Out
							</Nav.Link>
						) : (
							<Nav.Link href="#" onClick={() => setLogIn(true)}>
								Log In
							</Nav.Link>
						)}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
			<LogIn show={logIn} onHide={() => setLogIn(false)} />
		</>)*/
//>>>>>>> 0012c318ee4c20735207705558135cf1402673ce

};

export default withRouter(Navigation);
