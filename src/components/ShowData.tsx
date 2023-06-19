import { useEffect, useState } from "react";
import { getDataFromServer } from "../services/ItemService";
import DataListInterafce from "../model/DataListInterafce";
import ExpenseTracker from "./ShowForm";

function ShowData() {
	// Item
	const [items, setItems] = useState<DataListInterafce[]>([]);
	// Sum
	const [sum, setSum] = useState<number | null>(0);
	// Error
	const [error, setError] = useState<Error | null>(null);
	// Rahul Spent
	const [rahulSpent, setRahulSpent] = useState<number>(0);
	// Ramesh Spent
	const [rameshSpent, setRameshSpent] = useState<number>(0);
	// Show Form
	const [showForm, setShowForm] = useState<boolean>(false);

	useEffect(() => {
		const fetchItems = async () => {
			try {
				const data = await getDataFromServer();
				setItems(data);
				calculateExpense(data)
				setSum(data.reduce((sum, item) => sum + item.price, 0))
			} catch (error: any) {
				console.error(error);
				setError(error);
			}
		}
		fetchItems();
	}, [showForm])

	const calculateExpense = (data: DataListInterafce[]) => {
		let rahulShare = 0
		let rameshShare = 0

		data.forEach(item => {
			item.payeeName === 'Rahul' ?
				(rahulShare += item.price) :
				(rameshShare += item.price)
		})
		setRahulSpent(rahulShare)
		setRameshSpent(rahulShare)
	}


	return (
		<>
			<header id="page-Header">Expense Tracker</header>
			{/* Add button */}
			<button id="Add-Button" onClick={() => setShowForm(true)}>Add</button>
			{
				showForm && (
					<div className="form">
						<ExpenseTracker onTrue={() => setShowForm(false)} onClose={() => setShowForm(false)}></ExpenseTracker>
					</div>
				)
			}
			<>
				<div className="use-inline date header-color">Date</div>
				<div className="use-inline header-color">Product Purchased</div>
				<div className="use-inline price header-color">Price</div>
				<div className="use-inline header-color" style={{ width: 112 }}>Payee</div>
			</>
			{
				items && items.map((user, idx) => {
					return (<div key={idx}>
						<div className="use-inline date">{user.setDate}</div>
						<div className="use-inline">{user.product}</div>
						<div className="use-inline price">{user.price}</div>
						<div className={`use-inline ${user.payeeName}`}>{user.payeeName}</div>
					</div>)
				})
			}
			<hr />
			<div className="use-inline ">Total: </div>
			<span className="use-inline total">{sum}</span> <br />
			<div className="use-inline ">Rahul paid: </div>
			<span className="use-inline total Rahul">{rahulSpent}</span> <br />
			<div className="use-inline ">Ramesh paid: </div>
			<span className="use-inline total Ramesh">{rameshSpent}</span> <br />
			<span className="use-inline payable">{rahulSpent > rameshSpent ? "Pay Rahul " : "Pay Ramesh"}</span>
			<span className="use-inline payable price"> {Math.abs((rahulSpent - rameshSpent) / 2)}</span>
			{
				error && (
					<>
						{error?.message}
					</>
				)
			}
		</>
	);
}

export default ShowData;
