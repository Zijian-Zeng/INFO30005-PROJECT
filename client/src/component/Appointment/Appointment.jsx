import React, { useContext, useEffect } from "react";
import {
	Grid,
	CardContent,
	withWidth,
	isWidthUp,
	Button,
	Paper,
	Typography,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { UserContext } from "../Methods";
import Layout from "../Navigation/Layout";

const useStyles = makeStyles((theme) => ({
	paper: {
		maxWidth: "100%",
		marginTop: theme.spacing(10),
	},
}));

export default () => {
	const classes = useStyles();
	const { setSelectedRoute } = useContext(UserContext);

	useEffect(() => {
		setSelectedRoute("appointments");
	}, []);

	return (
		<div>
			<Layout />
		</div>
	);
};
