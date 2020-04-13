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
import AppBar from "../AppBar";
import { AuthApi } from "../Methods";

const useStyles = makeStyles((theme) => ({
	paper: {
		maxWidth: "100%",
		marginTop: theme.spacing(10),
	},
}));

export default () => {
	const classes = useStyles();
	const { auth, setAuth, userInfo } = useContext(AuthApi);

	if (userInfo) {
		const { firstName, lastName, subjects } = userInfo;

		return (
			<div>
				<AppBar auth={auth} setAuth={setAuth} />

				<div>
					<Typography variant="h1" className={classes.paper}>
						Welcome to meetute! {firstName} {lastName}
						<br />
						subjects:
					</Typography>
					{subjects.map((subject) => (
						<Typography variant="h1">{subject}</Typography>
					))}
				</div>
			</div>
		);
	}
	return <AppBar auth={auth} setAuth={setAuth} />;
};
