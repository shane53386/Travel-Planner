import "./App.css";
import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import db from "./firebase.js";

const weatherKey = "22f30fcf6dd5b269bf5cbe441f735a39";

function App() {
	const [place, setPlace] = useState([]);
	const [temp, setTemp] = useState(null);
	const [icon, setIcon] = useState(null);
	const fetchPlace = async () => {
		const response = db.collection("Bangkok");
		const data = await response.get();
		data.docs.forEach((item) => {
			setPlace([...place, item.data()]);
		});
	};
	const fetchWeather = async (lat, lon) => {
		fetch(
			`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily,minutely&appid=${weatherKey}`
		)
			.then((res) => res.json())
			.then((data) => {
				setTemp(data.current.temp);
				setIcon(data.current.weather[0].icon);
			});
	};

	useEffect(() => {
		fetchPlace();
	}, []);

	return (
		<div className="container">
			{place &&
				place.map((place) => {
					fetchWeather(
						place.Position.latitude,
						place.Position.longitude
					);
					return (
						<div className="pop-up">
							<h2>{place.Name}</h2>
							<p>{place.Description}</p>
							<div>Type : {place.Type}</div>
							<div>Temp : {temp}</div>
							<img
								src={
									"http://openweathermap.org/img/wn/" +
									 icon +
									"@2x.png"
								}
							/>
						</div>
					);
				})}
		</div>
	);
}

export default App;
