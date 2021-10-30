import React, { useState, useEffect } from "react";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {Autocomplete} from '@material-ui/lab';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import RepeatIcon from '@material-ui/icons/Repeat';
import Paper from '@material-ui/core/Paper'; 
import 'date-fns';
import PlanPage from "./PlanPage";
import { TextField } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Button } from '@material-ui/core';
import { useAuth } from '../authenticate/Auth';
function TabPanel(props) {
	const { children, value, index, ...other } = props;
  
	return (
	  <div
		role="tabpanel"
		hidden={value !== index}
		id={`vertical-tabpanel-${index}`}
		aria-labelledby={`vertical-tab-${index}`}
		{...other}
	  >
		{value === index && (
		  <Box p={3}>
			<Typography>{children}</Typography>
		  </Box>
		)}
	  </div>
	);
  }
  
  TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
	return {
	  id: `vertical-tab-${index}`,
	  'aria-controls': `vertical-tabpanel-${index}`,
	};
  }
  
  const useStyles = makeStyles((theme) => ({
	root: {
	  flexGrow: 1,
	  backgroundColor: theme.palette.background.paper,
	  display: 'flex',
	  height: 224,
	},
	tabs: {
	  borderRight: `1px solid ${theme.palette.divider}`,
	},
  }));

  const useTimeStyles = makeStyles((theme) => ({
	paper: {
	  padding: '6px 16px',
	},
	secondaryTail: {
	  backgroundColor: theme.palette.secondary.main,
	},
  }));

function PlaceInput(props) {
	const classes = useStyles();
	const timelineClasses = useTimeStyles();
   const [value, setValue] = React.useState(0);
	const [allDays,setAllDays] = useState([])

	var start , end ;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [inputList, setInputList] = useState({});
  const [addingTime,setAddingTime] = useState(new Date());
  const [addingPlace,setAddingPlace] = useState("")
  const [addingNote,setAddingNote] = useState("")
  const [allPlaces,setAllPlaces] = useState(props.places)
  const [editTime,setEditTime] = useState(new Date())
  const [editNote,setEditNote] = useState("")
  const [editPlace,setEditPlace] = useState("")
  const [errorMsg,setErrorMsg] = useState({start:null,end:null,time:null,plae:null})
  const [edit,setEdit] = useState("")
  const handleSelect = (event, newValue) => {
    setValue(newValue);
	setAddingPlace("")
	setAddingTime(new Date())
	setAddingNote("")
  };
  //const { selectedPlan,allPlans } = useAuth();
  useEffect(()=>{
	if (props.allPlans==null)return
	console.log(props.allPlans,props.selectedPlan)
	var s = []
	  Object.entries(props.allPlans[props.selectedPlan].planning).forEach(entry => {
		const [k, value] = entry;
		var tmp ;
		value.map(data=>{
			var _key = new Date(data.split(";")[1])
			var key = _key.toLocaleDateString()
			tmp = _key
			if (inputList[key]==null)
				inputList[key] = [{place:data.split(";")[0] , departureTime:new Date(data.split(";")[1]) , note : data.split(";")[2]}]
			else
				inputList[key].push({place:data.split(";")[0] , departureTime:new Date(data.split(";")[1]) , note : data.split(";")[2]})
			
		})
		s.push(tmp)
	
	
	});
	s.sort()

	//props.parentCallback(inputList);
	setInputList({...inputList})
	console.log(s,inputList)
	start = s[0]
	end = s[s.length-1]
	
	for (let i=0;i<s.length;i++){
		console.log(s[i])
		s[i] = s[i].toLocaleDateString()
	}
	genDays(s)
	console.log(s)
	setStartDate(start)
	setEndDate(end)
	console.log(inputList)
	//sendData()
  },[])
  const diffDay=(s,e)=>{
	var i = s.getMonth()
	var j = e.getMonth()
	var count = 0
	//assume not diff > 1 year
	while (i!=j){
		if ([0,2,4,6,7,9].includes(i)){
			count += 31
		}
		else if (i==1){
			count += 28
		}
		else {
			count += 30
		}
		i = (i+1)%12
	}
	if (s.getDate() <= e.getDate()){
		count += e.getDate() - s.getDate()
	}
	else{
		count -= s.getDate() -e.getDate()
	}
	console.log(count)
	return count
  }
  const nextDay=(date)=>{
	console.log(date.getDate(),date.getMonth())
	var re = new Date()
	re.setFullYear(date.getFullYear())
	if (date.getMonth()==1 && date.getDate()==28){
		console.log(1)
		re.setDate(1)
		re.setMonth(2)
	}
	else if ([0,2,4,6,7,9].includes(date.getMonth()) && date.getDate()==31){
		console.log(2)
		re.setDate(1)
		re.setMonth(date.getMonth()+1)
	}
	else if (date.getMonth()==11 && date.getDate()==31){
		console.log(3)
		re.setDate(1)
		re.setMonth(0)
		re.setFullYear(date.getFullYear()+1)
	}
	else if (!([0,2,4,6,7,9].includes(date.getMonth())) && date.getDate()==30){
		console.log(4)
		re.setDate(1)
		re.setMonth(date.getMonth()+1)
	}
	else{
		console.log(5,date.getDate())
		re.setDate(date.getDate()+1)
		re.setMonth(date.getMonth())
	}
	return re
  }
   const genDays=(s)=>{

	console.log("before update",inputList,s,start,end)
		if (end==undefined || start==undefined || end.getTime() < start.getTime())
			//error
			return 
		
		var nowDate = start
		//console.log(startDate.getDate(),endDate.getDate())
		var difDay = diffDay(start,end)
		for (let i=0;i<difDay+1;i++){
			console.log(nowDate.toLocaleDateString())	
			
			if (inputList[nowDate.toLocaleDateString()]==undefined){
				//console.log(allDays,nowDate.toLocaleDateString())
				s.push(nowDate.toLocaleDateString())
				inputList[nowDate.toLocaleDateString()]=[]
			}
			nowDate =nextDay(nowDate) 
		}		
		s.sort()
		setAllDays([...s])
	console.log("update",inputList,allDays)
   }

  
   const addNewTime=(date)=>{
	let dd = null
	if (inputList[allDays[value]].length==0)
		dd = new Date()
	else
		dd = inputList[allDays[value]][inputList[allDays[value]].length-1].departureTime

	   if (date.getTime() < dd.getTime())
		   errorMsg.time = "Cannot be previous"
	   else
		errorMsg.time = null
		setErrorMsg({...errorMsg})
	   
	var x = allDays[value].split("/")
	console.log(date)
	//var d = new Date(date)
	date.setDate(parseInt(x[1]))
	date.setMonth(parseInt(x[0])-1)
	date.setYear(parseInt(x[2]))
	setAddingTime(date)
   }

   const editNewTime=(date)=>{
	let dd = null
	if (inputList[allDays[value]].length==0)
		dd = new Date()
	else
		dd = inputList[allDays[value]][inputList[allDays[value]].length-1].departureTime

	   if (date.getTime() < dd.getTime())
		   errorMsg.time = "Cannot be previous"
	   else
		errorMsg.time = null
		setErrorMsg({...errorMsg})
	   
	var x = allDays[value].split("/")
	console.log(date)
	//var d = new Date(date)
	date.setDate(parseInt(x[1]))
	date.setMonth(parseInt(x[0])-1)
	date.setYear(parseInt(x[2]))
	setEditTime(date)
   }
   const addNewNote=(event)=>{
		const {value} = event.target
		setAddingNote(value)
   }
   const addNewPlace=(event,value)=>{
	   console.log(value)
	   if (value==null || value.length == 0) {
		   errorMsg.place = "Cannot be blank"
		   setErrorMsg({...errorMsg})
		   return
	   }
		   setAddingPlace(value)
	   
   }
   const editNewNote=(event)=>{
	const {value} = event.target
	setEditNote(value)
	}
	const editNewPlace=(event,value)=>{

	   setEditPlace(value)
   
}
   const submitNew=(event)=>{
	   //console.log(event.target.name.split(" "))
	   
	   if (errorMsg.start != null || errorMsg.end != null || errorMsg.time != null || errorMsg.place != null) return
		if (event.target.name == undefined || event.target.name.split(" ")[1] != "btn") return
		var day = event.target.name.split(" ")[0]
		let type= event.target.name.split(" ")[2]
	   if (type=="ADD" && addingPlace == null) {
			errorMsg.place = "Cannot be blank"
			setErrorMsg({...errorMsg})
			return
	   }
	   if(type=="EDIT" && editPlace==null){
		   return
	   }
	   if (type=="ADD"){		
			if (inputList[day]==null){
				inputList[day]=[{place:addingPlace,departureTime:addingTime,note:addingNote}]
			}
			else{
				inputList[day].push({place:addingPlace,departureTime:addingTime,note:addingNote})
			}
		}
		else{
			var idx = event.target.name.split(" ")[3]
			inputList[day][idx]={place:editPlace,departureTime:editTime,note:editNote}
			console.log(inputList)
			
		}
		setInputList({...inputList})
		setAllDays([...allDays])
		setEdit("")
		setAddingTime(new Date())
		setAddingPlace(null)
		setAddingNote("")
		console.log(inputList,allDays)
   }
   const showTime=(date)=>{
	   console.log(date)
		var x = date.toLocaleTimeString()
		if (x.split(" ")[1]=="AM"){
			return x.split(":")[0] + ":" + x.split(":")[1]
		}
		else{
			return String(parseInt(x.split(":")[0])+12) + ":" + x.split(":")[1]
		}
   }

   const handleSetStartDate=()=>{
	if (value.getTime() < new Date().getTime()){
		setStartDate(new Date())
		start = startDate
		errorMsg.start = "Cannot be previou than NOW"
		setErrorMsg({...errorMsg})
   }
	else{
		errorMsg.start = null
		setErrorMsg({...errorMsg})
		setStartDate(value)
		start = value
	}
	end=endDate
	genDays(allDays)
   }
   const handleSetEndDate=(value)=>{
	   if (value.getTime() < startDate.getTime()){
			setEndDate(startDate)
			end = startDate
			errorMsg.end = "Cannot be previou start date"
			setErrorMsg({...errorMsg})
	   }
		else{
			errorMsg.end = null
			setErrorMsg({...errorMsg})
			setEndDate(value)
			end = value
		}
		start = startDate
		genDays(allDays)
   }

   useEffect(() => {
	sendData();
}, [inputList]);

const sendData = () => {
	console.log("send")
	props.parentCallback(inputList);
};

const openEdit=(value)=>{
	var day = value.split(" ")[0]
	var index = value.split(" ")[1]
	setEditTime(inputList[day][index].departureTime)
	setEditPlace(inputList[day][index].place)
	setEditNote(inputList[day][index].note)
	setEdit(value)
}

const deleteList=(value)=>{
	var day = value.split(" ")[0]
	var index = value.split(" ")[1]
	inputList[day].splice(index,1)
	setInputList({...inputList})
	
}
const renderAddData=(type,idx)=>{
	var day
	var index
	if (idx!=null){
		day = idx.split(" ")[0]
		index = idx.split(" ")[1]
		//console.log()
		setEditTime(inputList[day][index].departureTime)
		setEditPlace(inputList[day][index].place)
		setEditNote(inputList[day][index].note)
		console.log(inputList[day][index])
	}
	return (<TimelineItem>
		<TimelineOppositeContent>
			<Typography variant="body2" color="textSecondary">
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<KeyboardTimePicker
				margin="normal"
				id="time-picker"
				label="Time picker"
				helperText={errorMsg.time}
				error={errorMsg.time!=null}
				value={type=="ADD"?addingTime:editTime}
				minTime={Date.now()}
				onChange={type=="ADD"?addNewTime:editNewTime}
				KeyboardButtonProps={{
					'aria-label': 'change time',
				}}
				/>
				</MuiPickersUtilsProvider>
			</Typography>
		</TimelineOppositeContent>
		<TimelineSeparator>
			<TimelineDot>
			</TimelineDot>
			<TimelineConnector />
		</TimelineSeparator>
		<TimelineContent>
			<Paper elevation={3} className={classes.paper}>
				<Typography variant="h6" component="h1" style={{padding:'10px'}}>
					<FormControl className={classes.formControl}>
						<div>
						<Autocomplete
							id="combo-box-demo"
							value={addingPlace}
							options={allPlaces}
							error={errorMsg.place==null}
							helperText={errorMsg.place}
							onChange={type=="ADD"?addNewPlace:editNewPlace}
							style={{ width: 300 }}
							renderInput={(params) => <TextField {...params} label="Place" variant="outlined" />}
						/>
						{type=="EDIT"?
						<>
						<Button onClick={()=>setEdit("")}>
							Cancel
						</Button>
						<Button name={day+" btn EDIT"} onClick={submitNew}>
							OK
						</Button>
						</>
						:null}
						</div>
					
					<br/>
						<TextField
							id="outlined-multiline-static"
							label="Note"
							name="note"
							multiline
							onChange={type=="ADD"?addNewNote:editNewNote}
							value={type=="ADD"?addingNote:editNote}
							rows={4}
							
							variant="outlined"
							/>
				</FormControl>
				</Typography>
			
			</Paper>
		</TimelineContent>
	</TimelineItem>)

}
  return (
	  <>
	<MuiPickersUtilsProvider utils={DateFnsUtils}>
	<Grid container justifyContent="space-around">
	  <KeyboardDatePicker
		disableToolbar
		variant="inline"
		format="MM/dd/yyyy"
		margin="normal"
		id="date-picker-inline"
		helperText={errorMsg.start}
		label="Start"
		value={startDate}
		error={errorMsg.start!=null}
		onChange={handleSetStartDate}
		KeyboardButtonProps={{
		  'aria-label': 'change date',
		}}
	  />

	<KeyboardDatePicker
		disableToolbar
		variant="inline"
		format="MM/dd/yyyy"
		margin="normal"
		id="date-picker-inline"
		label="End"
		helperText={errorMsg.end}
		error={errorMsg.end!=null}
		value={endDate}
		onChange={handleSetEndDate}
		KeyboardButtonProps={{
		  'aria-label': 'change date',
		}}
	  />
	</Grid>
	</MuiPickersUtilsProvider>
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleSelect}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
		   {allDays.map((day,idx)=>{
			   
		  	return (<Tab label={day} {...a11yProps(idx)}/>)
			 
	  })}
       
      </Tabs>
	 
	  {allDays.map((day,idx)=>{
		  return (<>
		  		<TabPanel value={value} index={idx}>
					<Timeline >
						{inputList[day] && inputList[day].map((plan,index)=>(

						`${day} ${index}`!=edit?
						<TimelineItem>
						<TimelineOppositeContent>
							<Typography variant="body2" color="textSecondary">
								{showTime(plan.departureTime)}
							</Typography>
						</TimelineOppositeContent>
						<TimelineSeparator>
							<TimelineDot>
							</TimelineDot>
							<TimelineConnector />
						</TimelineSeparator>
						<TimelineContent>
							<Paper elevation={3} className={classes.paper}>
								<Typography variant="h6" component="h1">
									<>
									<div style={{float:"left"}}>
										{plan.place}
									</div>
									<div style={{float:"right"}}>
										<Button onClick={()=>openEdit(`${day} ${index}`)}>Edit</Button>
										<Button onClick={()=>deleteList(`${day} ${index}`)}>Delete</Button>
									</div>
									</>								
								</Typography>
								<br/>
								<Typography>{plan.note}</Typography>
							</Paper>
						</TimelineContent>
					</TimelineItem>
						:
						
						<TimelineItem>
						<TimelineOppositeContent>
							<Typography variant="body2" color="textSecondary">
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<KeyboardTimePicker
								margin="normal"
								id="time-picker"
								label="Time picker"
								helperText={errorMsg.time}
								error={errorMsg.time!=null}
								value={editTime}
								minTime={Date.now()}
								onChange={editNewTime}
								KeyboardButtonProps={{
									'aria-label': 'change time',
								}}
								/>
								</MuiPickersUtilsProvider>
							</Typography>
						</TimelineOppositeContent>
						<TimelineSeparator>
							<TimelineDot>
							</TimelineDot>
							<TimelineConnector />
						</TimelineSeparator>
						<TimelineContent>
							<Paper elevation={3} className={classes.paper}>
								<Typography variant="h6" component="h1" style={{padding:'10px'}}>
									<FormControl className={classes.formControl}>
										<div>
										<Autocomplete
											id="combo-box-demo"
											value={editPlace}
											options={allPlaces}
											onChange={editNewPlace}
											style={{ width: 300 }}
											renderInput={(params) => <TextField {...params} label="Place" variant="outlined" />}
										/>
										<>
										<Button onClick={()=>setEdit("")}>
											Cancel
										</Button>
										<Button name={day+" btn EDIT "+index} onClick={submitNew}>
											OK
										</Button>
										</>
										</div>
									
									<br/>
										<TextField
											id="outlined-multiline-static"
											label="Note"
											name="note"
											multiline
											onChange={editNewNote}
											value={editNote}
											rows={4}
											
											variant="outlined"
											/>
								</FormControl>
								</Typography>
							
							</Paper>
						</TimelineContent>
					</TimelineItem>
						)
						)}
						{renderAddData("ADD")}
					</Timeline>
				<div style={{textAlign:'center'}}>
				<Button name={day+" btn ADD"} onClick={submitNew} variant="contained" color="secondary">
					Add
				</Button>
				</div>
				</TabPanel>
				</>
		  
		  )
	  })}
    </div>
	</>
  );/*
	const [inputList, setInputList] = useState({
		date: null,
		plan: [{ place: "", time: "" }],
	});

	const sendData = () => {
		props.parentCallback(inputList);
	};

	const addInputArea = () => {
		const list = [...inputList.plan, { place: "", time: "" }];
		setInputList({
			...inputList,
			plan: list,
		});
	};

	const removeInputArea = (index) => {
		const list = [...inputList.plan];
		console.log(list);
		list.splice(index, 1);
		console.log(list);
		setInputList({
			...inputList,
			plan: list,
		});
	};

	const onInputChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...inputList.plan];
		list[index][name] = value;
		setInputList({
			...inputList,
			plan: list,
		});
	};

	const getDate = () => {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth() + 1;
		var yyyy = today.getFullYear();
		if (dd < 10) {
			dd = "0" + dd;
		}
		if (mm < 10) {
			mm = "0" + mm;
		}
		today = yyyy + "-" + mm + "-" + dd;
		return today;
	};

	// console.log(getDate());

	useEffect(() => {
		sendData();
	}, [inputList]);

	return (
		<div>
			<input
				type="date"
				name="date"
				value={inputList.date}
				onChange={(e) => {
					console.log(e.target.value);
					setInputList({
						...inputList,
						date: e.target.value,
					});
				}}
				min={getDate()}
			/>
			{inputList.plan.map((item, index) => {
				return (
					<div>
						<input
							type="text"
							placeholder="Search Places"
							name="place"
							value={item.place}
							onChange={(e) => onInputChange(e, index)}
						/>
						<input
							type="time"
							placeholder="Time"
							name="time"
							value={item.time}
							onChange={(e) => onInputChange(e, index)}
							min="07:00"
							// index === 0
							// 	? "00:00"

							step="300"
						/>
						{inputList.plan.length !== 1 && (
							<button onClick={() => removeInputArea(index)}>
								Remove
							</button>
						)}
					</div>
				);
			})}
			<button onClick={addInputArea}>Add new place</button>
			<button
				onClick={() => {
					getDate();
					console.log(inputList);
				}}
			>
				Save
			</button>
		</div>
	);*/
}

export default PlaceInput;
