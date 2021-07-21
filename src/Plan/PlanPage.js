import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../authenticate/Auth";
import PlaceInput from "./PlaceInput";

function PlanPage() {
	const Input = (index) => (
		<PlaceInput id={index} parentCallback={callbackFunction} />
	);

	const [inputList, setInputList] = useState([Input]);
	const [data, setData] = useState(new Map());
	const { currentUser } = useAuth();

	if (!currentUser) {
		return <Redirect to="/login" />;
	}

	const callbackFunction = (list) => {
		if (list.date === null) return;
		data.set(list.date, list.plan);
		console.log(data);
		setData(data);
	};

	const addNewDay = () => {
		setInputList([...inputList, Input]);
	};

	const removeDay = (index) => {
		const list = [...inputList];
		list.splice(index, 1);
		setInputList(list);
	};

	return (
		<div>
			{inputList &&
				inputList.map((Input, index) => {
					return (
						<div>
							<Input key={index} />
							{inputList.length !== 1 && (
								<button onClick={() => removeDay(index)}>
									Remove Day
								</button>
							)}

							<br></br>
						</div>
					);
				})}
			<button onClick={addNewDay}>New Day</button>
			<button
				onClick={() => {
					console.log(inputList);
				}}
			>
				Save
			</button>
		</div>
	);
}

export default PlanPage;
