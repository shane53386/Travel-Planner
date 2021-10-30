import React, { useState } from "react";
import "./StarRating.css";

function StarIcon({ fill, onClick, onMouseEnter, onMouseLeave }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="star"
			fill={fill}
			viewBox="0 0 24 24"
			stroke="none"
			onClick={onClick}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			<path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
		</svg>
	);
}

function StarRating({ callback, star = 0, enable = true }) {
	const [rating, setRating] = useState(star);
	const [hoverRating, setHoverRating] = useState(0);

	function onMouseEnter(idx) {
		setHoverRating(idx);
	}
	function onMouseLeave() {
		setHoverRating(0);
	}
	function onClick(idx) {
		setRating(idx);
		callback(idx);
	}

	if (!enable) {
		return (
			<div className="bar">
				{[1, 2, 3, 4, 5].map((idx, key) => {
					return (
						<StarIcon
							key={key}
							index={idx}
							fill={rating >= idx ? "gold" : "lightslategrey"}
						/>
					);
				})}
			</div>
		);
	}

	return (
		<div className="bar">
			{[1, 2, 3, 4, 5].map((idx, key) => {
				return (
					<StarIcon
						key={key}
						index={idx}
						onClick={() => onClick(idx)}
						onMouseEnter={() => onMouseEnter(idx)}
						onMouseLeave={onMouseLeave}
						fill={
							(hoverRating || rating) >= idx
								? "gold"
								: "lightslategrey"
						}
					/>
				);
			})}
		</div>
	);
}

export default StarRating;
