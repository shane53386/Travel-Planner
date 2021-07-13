import { db } from "./firebase";

const fetchPlace = async (province) => {
	let place = [];
	const response = db.collection("Places").where("Province", "==", province);
	
	const data = await response.get();
	data.docs.forEach((item) => {
		place = [...place, item.data()];
	});
	return place;
};

export const fetchData = async (place) => {
	let data;
	const response = db.collection("Places").where("Name", "==", place);
	const res = await response.get();
	res.docs.forEach((item) => {
		data = item.data();
	});
	return data;
};

export default fetchPlace;
