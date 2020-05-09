import React, { useContext } from "react";
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

import { useFetch } from "../Methods.js";
import AppBar from "../Navigation/AppBar";
import { AuthApi } from "../Methods";
import Nav from "../Navigation/BottonNav";
import Layout from "../Navigation/Layout";

const useStyles = makeStyles((theme) => ({
	paper: {
		maxWidth: "100%",
		marginTop: theme.spacing(10),
	},
}));

export default () => {
	const classes = useStyles();
	const { auth, setAuth } = useContext(AuthApi);

	return (
		<div>
			<Layout />
		</div>
	);
};
