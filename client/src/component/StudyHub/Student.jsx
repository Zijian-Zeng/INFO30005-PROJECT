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
import { UserContext } from "../Methods";

const useStyles = makeStyles((theme) => ({
	paper: {
		maxWidth: "100%",
		marginTop: theme.spacing(10),
	},
}));

export default () => {
	const classes = useStyles();

	const { user } = useContext(UserContext);

	const { type, userInfo } = user;
	const { firstName, lastName } = userInfo;

	return (
		<h1>
			Welcome {type} {firstName} {lastName}
		</h1>
	);
};
