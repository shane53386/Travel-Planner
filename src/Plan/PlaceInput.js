import React, { useState, useEffect } from "react";

function PlaceInput(props) {
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
	);
}

export default PlaceInput;
