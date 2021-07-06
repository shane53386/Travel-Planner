import React, { useEffect, useState } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import PlaceInput from "./PlaceInput";

var idx =0
function PlanPage(props) {
	const [data, setData] = useState(new Map());
	
	const callbackFunction = (d,date) => {
		var tmp = []
		console.log("d",d)
		for (let i=0;i<d.length;i++){
			if (d[i].time == "" || d[i].place == "")
				continue
			var _time = new Date(d[i].time)
			tmp.push({place:d[i].place , departureTime:_time})
		}
		console.log("date",date)
		if (date!="" && tmp.length !=0)
		data.set(date,tmp)

		console.log("new data",data)
		//console.log("lits",list)
		
	
		setData(data);
		props.sendCallback(data)
		
	};
	const Input = (index) => <PlaceInput id={index} parentCallback={callbackFunction} />;
	const [inputList, setInputList] = useState([Input]);
	const addNewDay = () => {
		const list = [...inputList, Input];
		setInputList(list);
		
	};
	
	return (
		<div>
			{inputList &&
				inputList.map((Input, index) => {
					return (
						<div>
							<Input key={index} />
							<br></br>
						</div>
					);
				})}
			
			<button onClick={addNewDay}>New Day</button>
			<button>Save</button>
			
		</div>
	);
}

export default PlanPage;
