import React, { useState } from "react";
import StarRating from "./StarRating";
import firebase, { db } from "../firebase";
import { Image, Form } from "react-bootstrap";

function Review({ username, place, profile }) {
	const [score, setScore] = useState(0);

	async function handleSubmit(e) {
		e.preventDefault();
		const { review } = e.target.elements;
		if (review.value === "") return;
		const data = db.collection("Places").doc(place);
		await data.update({
			Reviews: firebase.firestore.FieldValue.arrayUnion({
				Username: username,
				Review: review.value,
				Time: firebase.firestore.Timestamp.now(),
				Star: score,
			}),
		});
		review.value = "";
		setScore(0);
	}
	return (
		<Form onSubmit={handleSubmit}>
			<StarRating callback={setScore} star={score} />
			<Form.Group className="mb-3">
				<Image
					src={profile}
					roundedCircle
					style={{ width: "30px", height: "30px" }}
				/>
				<Form.Label>Logged in as {username}</Form.Label>
				<Form.Control as="textarea" name="review" rows={3} />
			</Form.Group>
			<input type="submit" value="Submit"></input>
		</Form>
	);
}

export default Review;
