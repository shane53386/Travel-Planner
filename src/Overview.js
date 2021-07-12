import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { fetchData } from "./fetchData";
import Review from "./rating/Review";
import { useAuth } from "./authenticate/Auth";

function Overview(props) {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	useEffect(async () => {
		setData(await fetchData("Paragon"));
		setLoading(false);
	}, []);
	const { currentUser } = useAuth();

	if (!currentUser) {
		return <Redirect to="/login" />;
	}

	if (loading)
		return (
			<div className="text-center">
				<div className="spinner-border text-info m-5" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
			</div>
		);

	const { Name, Description, Type, Province, Image } = data;

	return (
		<div className="container mt-4">
			<div
				id="carousel"
				className="carousel slide"
				data-bs-ride="carousel"
			>
				<ol className="carousel-indicators">
					{Image.map((img, idx) => {
						const c = idx == 0 ? "active" : "";
						return (
							<button
								className={c}
								data-bs-target="#carousel"
								data-bs-slide-to={idx}
							/>
						);
					})}
				</ol>
				<div className="carousel-inner">
					{Image.map((img, idx) => {
						const c =
							idx == 0 ? "carousel-item active" : "carousel-item";
						console.log(img);
						return (
							<div className={c} data-bs-interval="5000">
								<img
									src={img}
									className="d-block w-100"
									alt={Name}
								/>
							</div>
						);
					})}
				</div>
				<button
					className="carousel-control-prev"
					type="button"
					data-bs-target="#carousel"
					data-bs-slide="prev"
				>
					<span
						className="carousel-control-prev-icon"
						aria-hidden="true"
					></span>
					<span className="visually-hidden">Previous</span>
				</button>
				<button
					className="carousel-control-next"
					type="button"
					data-bs-target="#carousel"
					data-bs-slide="next"
				>
					<span
						className="carousel-control-next-icon"
						aria-hidden="true"
					></span>
					<span className="visually-hidden">Next</span>
				</button>
			</div>
			<h2>{Name}</h2>
			<div>
				<p>{Description}</p>
			</div>
			<Review username={currentUser.displayName} />
		</div>
	);
}

export default Overview;
