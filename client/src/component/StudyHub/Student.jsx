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
import { makeStyles, withStyles, lighten } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	paper: {
		maxWidth: "100%",
		marginTop: theme.spacing(10),
	},
}));

export default ({ user }) => {
	const classes = useStyles();

	const { type, userInfo } = user;
	const { firstName, lastName } = userInfo;

	return (
		<h1>
			Welcome {type} {firstName} {lastName}
		</h1>
	);
};
