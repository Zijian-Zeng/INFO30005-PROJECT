import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LoginForm from "./loginForm.jsx";

const useStyles = makeStyles(() => ({
	root: {
		backgroundImage:
			"url(http://localhost:5000/api/images/loginBackground)",
		height: "vh",
		width: "100vw"
	}
}));

export default ({ setStep }) => {
	const classes = useStyles();

	return (
		<Grid className={classes.root}>
			<LoginForm setStep={setStep} />
		</Grid>
	);
};
