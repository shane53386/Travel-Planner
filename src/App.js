import "./App.css";
import React, { useState, useEffect } from "react";
import db from "./firebase.js";

const weatherKey = "22f30fcf6dd5b269bf5cbe441f735a39";

function App() {
	const [place, setPlace] = useState("");
	const [temp, setTemp] = useState(null);
	const fetchPlace = async () => {
		db.collection("Bangkok")
			.doc("Central World")
			.get()
			.then((doc) => {
				setPlace(doc.data());
			});
	};
	const fetchWeather = async () => {
		fetch(
		`https://api.openweathermap.org/data/2.5/onecall?lat=${place.Position.latitude}&lon=${place.Position.longitude}&exclude=hourly,daily,minutely&appid=${weatherKey}`
	)
		.then((response) => response.json())
		.then((data) => setTemp(data.current.temp));
	}
	

	useEffect(() => {
		fetchPlace();
		fetchWeather();
	}, []);

	return (
		<div className="container">
			<div className="pop-up">
				<h2>{place.Name}</h2>
				<p>{place.Description}</p>
				<div> Type : {place.Type}</div>
				<div> Temp : {temp}</div>
			</div>
		</div>
	);
}

export default App;
