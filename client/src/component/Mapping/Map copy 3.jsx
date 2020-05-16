import React, { useContext, useEffect, useState } from "react";
import { UserContext, myFetch } from "../Methods";
import Layout from "../Navigation/Layout";
import Student from "./Student";
import Staff from "./Staff";

export default () => {
	//Set the routes.
	const {
		setSelectedRoute,
		loadingRoute,
		setLoadingRoute,
		fetchUser,
		user,
	} = useContext(UserContext);

	useEffect(() => {
		setSelectedRoute("consultations");
		fetchUser().then(() => setLoadingRoute(false));
	}, []);

	if (loadingRoute || !user.type) return <Layout />;

	return (
		<Layout
			content={user.type === "student" ? <Student /> : <Staff />}
			type={user.type}
		/>
	);
};
