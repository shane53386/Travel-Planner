import React, { useState, useEffect } from "react";

function PlaceInput(props) {
	const [inputList, setInputList] = useState([{ place: "", time: "" }]);

	const sendData = () => {
		var tmp = inputList
		var day = tmp[0].time.split("T")[0]
		props.parentCallback(tmp,day);
		console.log(`send inputList`, inputList);
		console.log("data sent");
	};

	const addInputArea = () => {
		console.log(`add inputList`, inputList);
		setInputList([...inputList, { place: "", time: "" }]);
		
		// const data = await fetchPlace("Bangkok");
		// return data;
	};
	const removeInputArea = (index) => {
		const list = [...inputList];
		list.splice(index, 1);
		setInputList(list);
	};
	const onInputChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...inputList];
		list[index][name] = value;
		console.log(list)
		setInputList(list);
	};
	useEffect(() => {
		sendData();
		console.log(`add inputList`, inputList);
	}, [inputList]);
	return (
		<div>
			{inputList.map((item, index) => {
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
							type="datetime-local"
							placeholder="Time"
							name="time"
							value={item.time}
							onChange={(e) => onInputChange(e, index)}
						/>
						{inputList.length !== 1 && (
							<button onClick={() => removeInputArea(index)}>
								Remove
							</button>
						)}
						{inputList.length - 1 === index && (
							<button onClick={addInputArea}>
								Add new place
							</button>
						)}
					</div>
				);
			})}
		</div>
	);
}

export default PlaceInput;
