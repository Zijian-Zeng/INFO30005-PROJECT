import React, { useContext, useEffect, useState } from "react";
import { UserContext, myFetch } from "../Methods";
import Layout from "../Navigation/Layout";
import Student from "./Student";
import Staff from "./Staff";

export default () => {
	//Set the routes.
	const {
		setSelectedRoute,
		closeAlert,
		detectAlert,
		loadingRoute,
		setLoadingRoute,
		fetchUser,
		user,
	} = useContext(UserContext);

	//Loading user information.
	const [userInfo, setUserInfo] = useState({});
	useEffect(() => {
		setSelectedRoute("appointments");
		closeAlert();
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
