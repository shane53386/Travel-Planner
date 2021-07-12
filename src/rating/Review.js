import React from "react";
import StarRating from "./StarRating";

function Review({ username }) {
	function handleSubmit() {}
	return (
		<form onSubmit={handleSubmit}>
			<StarRating />
			<div className="form-floating">
				<textarea
					className="form-control"
					id="review"
					placeholder="What's your feedback"
				></textarea>
				<label for="review">What's your feedback</label>
				<p>Logged in as {username}</p>
			</div>
			<input type="submit" value="Submit"></input>
		</form>
	);
}

export default Review;
