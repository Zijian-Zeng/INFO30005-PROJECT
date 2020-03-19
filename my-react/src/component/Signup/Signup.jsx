import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "../AppBar";

const useStyles = makeStyles(() => ({
	root: {
		backgroundImage: "url(http://localhost:5000/api/images/melb)",
		height: "100vh",
		width: "100vw"
	}
}));

export default () => {
	const classes = useStyles();

	return (
		<Grid className={classes.root}>
			<AppBar title="sign up today" />
		</Grid>
	);
};
