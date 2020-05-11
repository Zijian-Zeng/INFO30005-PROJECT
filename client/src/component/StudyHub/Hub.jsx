import React, { useContext, useEffect, useState } from "react";
import { UserContext, myFetch } from "../Methods";
import Layout from "../Navigation/Layout";
import { useHistory } from "react-router-dom";
import Student from "./Student";

export default () => {
	const history = useHistory();
	//Set the routes.
	const {
		setSelectedRoute,
		closeAlert,
		detectAlert,
		loadingRoute,
		setLoadingRoute,
	} = useContext(UserContext);

	//Loading user information.
	const [userInfo, setUserInfo] = useState({});
	useEffect(() => {
		setSelectedRoute("hubs");
		setLoadingRoute(true);
		closeAlert();

		//Loading user information.
		const fetchUser = async () => {
			const user = await myFetch("/api/shared/users/info", "GET");
			detectAlert(user);
			setUserInfo(user);
			setLoadingRoute(false);
			if (user.type !== "student") history.push("/");
		};
		fetchUser();
	}, []);

	if (loadingRoute) return <Layout />;

	return (
		<Layout content={<Student user={userInfo} />} type={userInfo.type} />
	);
};
