import React, { useState, useEffect } from "react";
import { fetchData, fetchPlace } from "./fetchData";
import Review from "./rating/Review";
import StarRating from "./rating/StarRating";
import { useAuth } from "./authenticate/Auth";
import firebase, { db } from "./firebase";
import {
	Button,
	Card,
	Spinner,
	Carousel,
	DropdownButton,
	Dropdown,
} from "react-bootstrap";

function Overview(props) {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [index, setIndex] = useState(0);
	const [plan, setPlan] = useState([]);
	const place = "Central World";

	useEffect(async () => {
		setData(await fetchData(place));
		setLoading(false);
	}, []);

	const { currentUser } = useAuth();

	async function getPlan() {
		const ref = db.collection("Users").doc(currentUser.displayName);
		const data = await ref.get().then((doc) => doc.data());
		setPlan(Object.keys(data.Plan));
	}

	async function addToPlan(Name, Place) {
		const data = db.collection("Users").doc(currentUser.displayName);
		await data.update({
			[`Plan.${Name}.places`]:
				firebase.firestore.FieldValue.arrayUnion(Place),
		});
	}

	const handleSelect = (selectedIndex) => {
		setIndex(selectedIndex);
	};

	if (loading)
		return (
			<div className="text-center">
				<Spinner animation="border" variant="primary" />
			</div>
		);

	if (currentUser) getPlan();

	const { Name, Description, Type, Province, Image, Reviews } = data;

	return (
		<div className="container mt-4">
			<Carousel activeIndex={index} onSelect={handleSelect}>
				{Image.map((img, idx) => {
					return (
						<Carousel.Item key={idx}>
							<img
								className="d-block w-100"
								src={img}
								alt={Name}
							/>
						</Carousel.Item>
					);
				})}
			</Carousel>
			<h1>{Name}</h1>
			<p>{Description}</p>
			{currentUser && (
				<DropdownButton id="dropdown-basic-button" title="Add to plan">
					{plan.map((name, idx) => {
						return (
							<Dropdown.Item
								key={idx}
								as="button"
								onClick={() => addToPlan(name, Name)}
							>
								{name}
							</Dropdown.Item>
						);
					})}
				</DropdownButton>
			)}

			<h5>Reviews {Reviews && Reviews.length}</h5>
			{Reviews &&
				Reviews.map((review, idx) => {
					const timeStamp = new Date(review.Time.seconds * 1000);
					const date = timeStamp.toLocaleDateString("th-TH");
					const time = timeStamp.toLocaleTimeString("th-TH");
					return (
						<Card key={idx} className="mb-4">
							<Card.Body>
								<Card.Title>
									<StarRating
										star={review.Star}
										enable={false}
									/>
								</Card.Title>
								<Card.Text>{review.Review}</Card.Text>
							</Card.Body>
							<Card.Footer>
								<small className="text-muted ml-auto">
									{review.Username} at {time} {date}
								</small>
							</Card.Footer>
						</Card>
					);
				})}
			{/* {getPlan()} */}
			{/* {JSON.stringify(currentUser)} */}
			<hr />
			{currentUser && (
				<Review
					username={currentUser.displayName}
					profile={currentUser.photoURL}
					place={place}
					reviews={Reviews}
				/>
			)}
		</div>
	);
}

export default Overview;
