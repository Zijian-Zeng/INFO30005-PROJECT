import React, { useContext, useEffect } from "react";
import { UserContext } from "../Methods";
import Layout from "../Navigation/Layout";
import Student from "./Student";
import Staff from "./Staff";

/**
 * Consultation page for student and staff.
 */
export default () => {
	const {
		setSelectedRoute,
		loadingRoute,
		setLoadingRoute,
		fetchUser,
		user,
	} = useContext(UserContext);

	//Set up
	useEffect(() => {
		setSelectedRoute("consultations");
		fetchUser().then(() => setLoadingRoute(false));
	}, []);

	//Loading...
	if (loadingRoute || !user.type) return <Layout />;

	return (
		<Layout
			content={user.type === "student" ? <Student /> : <Staff />}
			type={user.type}
		/>
	);
};
