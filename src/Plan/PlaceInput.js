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
import { ShowChartTwoTone } from "@material-ui/icons";
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


  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [inputList, setInputList] = useState({});
  const [addingTime,setAddingTime] = useState(new Date());
  const [addingPlace,setAddingPlace] = useState("")
  const [addingNote,setAddingNote] = useState("")
  const [allPlaces,setAllPlaces] = useState(["a","b","c","d"])
  const [errorMsg,setErrorMsg] = useState({start:null,end:null,time:null})
  const handleSelect = (event, newValue) => {
    setValue(newValue);
	setAddingPlace("")
	setAddingTime(new Date())
	setAddingNote("")
  };

  const diffDay=()=>{
	var i = startDate.getMonth()
	var j = endDate.getMonth()
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
	if (startDate.getDate() <= endDate.getDate()){
		count += endDate.getDate() - startDate.getDate()
	}
	else{
		count -= startDate.getDate() -endDate.getDate()
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
   useEffect(()=>{
		if (endDate.getTime() < startDate.getTime())
			//error
			return 
		var tmp = []
		var nowDate = startDate
		console.log(startDate.getDate(),endDate.getDate())
		var difDay = diffDay()
		for (let i=0;i<difDay+1;i++){
			
			tmp.push(nowDate.toLocaleDateString())
			inputList[nowDate.toLocaleDateString()]=[]
			nowDate =nextDay(nowDate) 
			
			//{ place: "", time: "" }
		}

		setAllDays(tmp)


	console.log("update")
   },[startDate,endDate])

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

   const addNewNote=(event)=>{
		const {value} = event.target
		setAddingNote(value)
   }
   const addNewPlace=(event,value)=>{

		   setAddingPlace(value)
	   
   }
   const submitNew=(event)=>{
	   console.log("add")
		if (errorMsg.start != null || errorMsg.end != null || errorMsg.time != null) return
	   if (event.target.name == undefined || event.target.name.split(" ")[1] != "btn") return
		var day = event.target.name.split(" ")[0]
		
		if (inputList[day]==null){
			inputList[day]=[{place:addingPlace,departureTime:addingTime,note:addingNote}]
		}
		else{
			inputList[day].push({place:addingPlace,departureTime:addingTime,note:addingNote})
		}
		setInputList({...inputList})
		setAllDays([...allDays])
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

   const handleSetEndDate=(value)=>{
	   if (value.getTime() < startDate.getTime()){
			setEndDate(startDate)
			errorMsg.end = "Cannot be previou start date"
			setErrorMsg({...errorMsg})
	   }
		else{
			errorMsg.end = null
			setErrorMsg({...errorMsg})
			setEndDate(value)
		}
   }

   useEffect(() => {
	sendData();
}, [inputList]);

const sendData = () => {
	console.log("send")
	props.parentCallback(inputList);
};

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
		onChange={setStartDate}
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
						{inputList[day].map(plan=>{
						console.log(plan)
						return (
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
								{plan.place}
								</Typography>
								<Typography>{plan.note}</Typography>
							</Paper>
						</TimelineContent>
					</TimelineItem>
						)})}
					
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
								value={addingTime}
								minTime={Date.now()}
								onChange={addNewTime}
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
										
									<Autocomplete
										id="combo-box-demo"
										options={allPlaces}
										onChange={addNewPlace}
										style={{ width: 300 }}
										renderInput={(params) => <TextField {...params} label="Place" variant="outlined" />}
									/>
									<br/>
										<TextField
											id="outlined-multiline-static"
											label="Note"
											name="note"
											multiline
											onChange={addNewNote}
											value={addingNote}
											rows={4}
											
											variant="outlined"
											/>
								</FormControl>
								</Typography>
							
							</Paper>
						</TimelineContent>
					</TimelineItem>

					</Timeline>
				<div style={{textAlign:'center'}}>
				<Button name={day+" btn"} onClick={submitNew} variant="contained" color="secondary">
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
