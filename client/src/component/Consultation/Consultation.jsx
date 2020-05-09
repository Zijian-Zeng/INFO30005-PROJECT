import React, { useContext, useEffect } from "react";
import {
	Grid,
	CardContent,
	withWidth,
	isWidthUp,
	Button,
	Paper,
	Typography,
	LinearProgress,
} from "@material-ui/core";
import {
	makeStyles,
	useTheme,
	withStyles,
	lighten,
} from "@material-ui/core/styles";
import { UserContext, useFetch, getUser } from "../Methods";
import Layout from "../Navigation/Layout";
import Cookies from "js-cookie";
import { localeData } from "moment";

const useStyles = makeStyles((theme) => ({
	paper: {
		maxWidth: "100%",
		marginTop: theme.spacing(10),
	},
}));

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
	const classes = useStyles();

	//Set the routes.
	const { setSelectedRoute } = useContext(UserContext);
	useEffect(() => {
		setSelectedRoute("consultations");
	}, []);

	//Loading user information.
	const [user, loading] = useFetch(
		"/api/shared/users/info",
		"GET",
		Cookies.get("meetute")
	);
	if (loading) return <Loading />;

	const { type, userInfo } = user;
	const { firstName, lastName } = userInfo;

	const Content = () => {
		return (
			<h1>
				Welcome {type} {firstName} {lastName}
			</h1>
		);
	};

	return <Layout content={<Content />} type={type} />;
};
