import React, { useState, useEffect } from "react";
import { fetchData, fetchPlace } from "./fetchData";
import Review from "./rating/Review";
import { useAuth } from "./authenticate/Auth";
import { Spinner, Carousel } from "react-bootstrap";

function Overview(props) {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [index, setIndex] = useState(0);
	const place = "Paragon";

	useEffect(async () => {
		setData(await fetchData(place));
		setLoading(false);
	}, []);

	const { currentUser } = useAuth();

	const handleSelect = (selectedIndex) => {
		setIndex(selectedIndex);
	};

	if (loading)
		return (
			<div className="text-center">
				<Spinner animation="border" variant="primary" />
			</div>
		);

	const { Description, Type, Province, Image, Reviews } = data;

	return (
		<div className="container mt-4">
			<Carousel activeIndex={index} onSelect={handleSelect}>
				{Image.map((img, idx) => {
					return (
						<Carousel.Item key={idx}>
							<img
								className="d-block w-100"
								src={img}
								alt={place}
							/>
						</Carousel.Item>
					);
				})}
			</Carousel>
			<h2>{place}</h2>
			<p>{Description}</p>
			{currentUser && (
				<Review
					username={currentUser.displayName}
					place={place}
					reviews={Reviews}
				/>
			)}
		</div>
	);
}

export default Overview;
