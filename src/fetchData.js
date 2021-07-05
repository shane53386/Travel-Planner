import db from "./firebase.js";

const fetchPlace = async (province) => {
	let place = [];
	const response = db.collection(province);
	const data = await response.get();
	data.docs.forEach((item) => {
		place = [...place, item.data()];
	});
	return place;
};

export default fetchPlace;
