import React, { useContext, useEffect } from "react";
import { UserContext } from "../Methods";
import Layout from "../Navigation/Layout";
import { useHistory } from "react-router-dom";
import Staff from "./Staff";

/***
 * Analytic page for staff.
 */
export default () => {
	const {
		setSelectedRoute,
		loadingRoute,
		setLoadingRoute,
		fetchUser,
		user,
	} = useContext(UserContext);
	const history = useHistory();

	//Loading user information.
	useEffect(() => {
		setSelectedRoute("analytic");
		fetchUser().then((user) => {
			//push back to setting page if user is not authorized.
			if (user.type !== "staff") {
				history.push("/Settings");
			}
			setLoadingRoute(false);
		});
	}, []);

	//Loading...
	if (loadingRoute || !user.type) return <Layout />;

	return <Layout content={<Staff />} type={user.type} />;
};
