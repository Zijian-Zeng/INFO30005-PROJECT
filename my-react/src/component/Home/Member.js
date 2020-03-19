import React, { useState } from "react";
import style from "./../../CSS_Module/member.module.css";

export default ({ member }) => {
	const [mouseFlag, SetmouseFlag] = useState(style.MouseOut);

	return (
		<div
			className={mouseFlag}
			onMouseMove={() => {
				SetmouseFlag(style.MouseIn);
			}}
			onMouseOut={() => {
				SetmouseFlag(style.MouseOut);
			}}
		>
			<h1>{member.firstName + " " + member.lastName}</h1>
			<p>{member.email}</p>
			<p>{member._id}</p>
		</div>
	);
};
