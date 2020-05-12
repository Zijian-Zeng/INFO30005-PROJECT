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
	} = useContext(UserContext);

	//Loading user information.
	const [userInfo, setUserInfo] = useState({});
	useEffect(() => {
		setSelectedRoute("consultations");
		setLoadingRoute(true);
		closeAlert();

		//Loading user information.
		const fetchUser = async () => {
			const user = await myFetch("/api/shared/users/info", "GET");
			detectAlert(user);
			setUserInfo(user);
			setLoadingRoute(false);
		};
		fetchUser();
	}, []);

	if (loadingRoute) return <Layout />;

	return (
		<Layout
			content={
				userInfo.type === "student" ? (
					<Student user={userInfo} setUser={setUserInfo} />
				) : (
					<Staff user={userInfo} />
				)
			}
			type={userInfo.type}
		/>
	);
};
