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
			<h1>{member.user_name}</h1>
			<p>{member.password}</p>
			<p>{member._id}</p>
		</div>
	);
};
