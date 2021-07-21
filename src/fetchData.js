import { db } from "./firebase";

export const fetchPlace = async (province) => {
	let place = [];
	const response = db.collection("Places").where("Province", "==", province);
	const data = await response.get();
	data.forEach((item) => {
		place = [...place, item.data()];
	});
	return place;
};

export const fetchData = (place) => {
	const response = db.collection("Places").doc(place);
	return response.get().then((doc) => doc.data());
};
