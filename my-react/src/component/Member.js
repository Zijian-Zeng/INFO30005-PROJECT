import React from "react";
import { useFetch } from "./Methods.js";

export default ({ num }) => {
	let name, password, id;
	const { data, loading } = useFetch("http://localhost:5000/api/members/");

	if (loading) {
		return (
			<div>
				<h1>loading...</h1>
				{console.log("loading..")}
			</div>
		);
	} else {
		name = data[num].user_name;
		password = data[num].password;
		id = data[num]._id;
		return (
			<h1>
				{name} => {password}, id: {id}
			</h1>
		);
	}
};
