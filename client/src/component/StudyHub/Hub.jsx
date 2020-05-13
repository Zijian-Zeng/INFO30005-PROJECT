import React, { useContext, useEffect, useState } from "react";
import { UserContext, myFetch } from "../Methods";
import Layout from "../Navigation/Layout";
import { useHistory } from "react-router-dom";
import Student from "./Student";
import { useRadioGroup } from "@material-ui/core";

export default () => {
	const history = useHistory();
	//Set the routes.
	const {
		setSelectedRoute,
		closeAlert,
		detectAlert,
		loadingRoute,
		setLoadingRoute,
		user,
		fetchUser,
	} = useContext(UserContext);

	//Loading user information.
	useEffect(() => {
		setSelectedRoute("hubs");
		fetchUser().then(() => setLoadingRoute(false));
	}, []);

	if (loadingRoute || !user.type) return <Layout />;

	return <Layout content={<Student />} />;
};
