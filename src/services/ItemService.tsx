import axios from "axios";
import DataListInterafce from "../model/DataListInterafce";

export const getDataFromServer = () => {
	return axios.get<DataListInterafce[]>('http://localhost:4001/items')
		.then(response => response.data);
};

export const pushDataFromUser = (newPurchase: Omit<DataListInterafce, "id">) => {
	axios.post<DataListInterafce>(
		'http://localhost:4001/items',
		newPurchase, {
		headers: {
			'Content-Type': 'application/json'
		}
	}
	)
		.then(response => response.data);
}
