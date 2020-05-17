import React, { useContext, useEffect } from "react";
import { UserContext } from "../Methods";
import Layout from "../Navigation/Layout";
import { useHistory } from "react-router-dom";
import Student from "./Student";

/***
 * Study hub page.
 */
export default () => {
	const history = useHistory();
	const {
		setSelectedRoute,
		loadingRoute,
		setLoadingRoute,
		user,
		fetchUser,
	} = useContext(UserContext);

	//Loading user information.
	useEffect(() => {
		setSelectedRoute("hubs");
		fetchUser().then((user) => {
			if (user.type !== "student") {
				history.push("/Settings");
			}

			setLoadingRoute(false);
		});
	}, []);

	if (loadingRoute || !user.type) return <Layout />;

	return <Layout content={<Student />} type={user.type} />;
};
