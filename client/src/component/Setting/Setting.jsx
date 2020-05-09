import React, { useContext, useEffect } from "react";
import { LinearProgress } from "@material-ui/core";
import { makeStyles, withStyles, lighten } from "@material-ui/core/styles";
import { UserContext, useFetch, getUser } from "../Methods";
import Layout from "../Navigation/Layout";
import Cookies from "js-cookie";
import Student from "./Student";
import Staff from "./Staff";

const Loading = withStyles({
	root: {
		display: "block",
		margin: "auto",
		backgroundColor: lighten("#00bfb8", 0.5),
	},
	bar: {
		borderRadius: 50,
		backgroundColor: "#00bfb8",
	},
})(LinearProgress);

export default () => {
	//Set the routes.
	const { setSelectedRoute } = useContext(UserContext);
	useEffect(() => {
		setSelectedRoute("settings");
	}, []);

	//Loading user information.
	const [user, loading] = useFetch(
		"/api/shared/users/info",
		"GET",
		Cookies.get("meetute")
	);
	if (loading) return <Loading />;

	return (
		<Layout
			content={
				user.type === "student" ? (
					<Student user={user} />
				) : (
					<Staff user={user} />
				)
			}
			type={user.type}
		/>
	);
};
