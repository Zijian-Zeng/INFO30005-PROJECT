import React, { useContext, useEffect } from "react";
import { UserContext } from "../Methods";
import Layout from "../Navigation/Layout";
import Student from "./Student";
import Staff from "./Staff";

/***
 * Appointment page for student and staff.
 */
export default () => {
	//Set the routes.
	const {
		setSelectedRoute,
		closeAlert,
		loadingRoute,
		setLoadingRoute,
		fetchUser,
		user,
	} = useContext(UserContext);

	//Loading user information before render this page.
	useEffect(() => {
		setSelectedRoute("appointments");
		closeAlert();
		fetchUser().then(() => setLoadingRoute(false));
	}, []);

	//loading...
	if (loadingRoute || !user.type) return <Layout />;

	return (
		<Layout
			content={user.type === "student" ? <Student /> : <Staff />}
			type={user.type}
		/>
	);
};
