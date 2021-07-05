import React, { useState } from "react";
import PlaceInput from "./PlaceInput";

function PlanPage() {
	const [data, setData] = useState([]);
	const callbackFunction = (d) => {
		const list = [...data, d];
		setData(list);
		console.log(`d`, d);
		console.log(`data`, data);
	};
	const Input = () => <PlaceInput parentCallback={callbackFunction} />;
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
