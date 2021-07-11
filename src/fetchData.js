
import {db} from "./firebase.js";

const fetchPlace = async (province) => {
	let place = [];
	const response = db.collection("Places").where("Province","==",province);
	const data = await response.get();
	data.docs.forEach((item) => {
		place = [...place, item.data()];
	});
	console.log(place)
	return place;
};

export default fetchPlace;
