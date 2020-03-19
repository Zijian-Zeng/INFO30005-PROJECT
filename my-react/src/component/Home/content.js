import React, { useContext } from "react";
import "./../../App.css";
import Member from "./Member.js";
import { useFetch } from "./../Methods.js";
import AppBar from "./../AppBar";
import { AuthApi } from "./../Methods";

export default () => {
	// GET the information of all members
	const [posts, loading] = useFetch("http://localhost:5000/api/posts/");
	const { auth, setAuth } = useContext(AuthApi);
	return (
		<div className="Page">
			<AppBar title="MeeTute" auth={auth} setAuth={setAuth} />
			<div className="Members">
				{loading ? (
					<h1>loading...</h1>
				) : (
					posts.map((member) => (
						<Member member={member} key={member._id} />
					))
				)}
			</div>
		</div>
	);
};
