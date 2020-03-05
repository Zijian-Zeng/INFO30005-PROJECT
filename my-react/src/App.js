import React from "react";
import "./App.css";
import Member from "./component/Member.js";

export default () => {
	return (
		<div className="App">
			<input className="login" type="text"></input>
			<Member num={0} />
			<Member num={1} />
			<Member num={2} />
		</div>
	);
};
