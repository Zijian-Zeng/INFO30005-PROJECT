import React from "react";
import "./../../App.css";
import Member from "./Member.js";
import { useFetch } from "./../Methods.js";

export default () => {
	// GET the information of all members
	const { data, loading } = useFetch("http://localhost:5000/api/members/");

	return (
		<div className="Page">
			<div className="Members">
				{loading ? (
					<h1>loading...</h1>
				) : (
					data.map((member) => (
						<Member member={member} key={member._id} />
					))
				)}
			</div>
		</div>
	);
};
