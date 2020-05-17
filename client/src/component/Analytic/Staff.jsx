import React, { useContext } from "react";
import { UserContext } from "../Methods";

/***
 * Analytic page for staff.
 */
export default () => {
	const { user } = useContext(UserContext);

	const { type, userInfo } = user;
	const { firstName, lastName } = userInfo;

	//Developing, to be continued...
	return (
		<h1>
			Welcome {type} {firstName} {lastName}
		</h1>
	);
};
