import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";

import AppBar from "../AppBar";
import Header from "./header";
import WaveBorder from "./waveBorder";
import Features from "./features";
import Login from "../Login/login";

const useStyles = makeStyles((theme) => ({
	c1: {
		backgroundColor: theme.palette.secondary.light,
	},
	c2: {
		backgroundColor: theme.palette.primary.light,
	},
}));

export default () => {
	const classes = useStyles();
	const theme = useTheme();
	const [openLogin, setOpenLogin] = React.useState(false);

	return (
		<div className={classes.root}>
			<AppBar setOpenLogin={setOpenLogin} />
			<Login open={openLogin} setOpenLogin={setOpenLogin} />
			<Header />
			<WaveBorder
				upperColor={theme.background}
				lowerColor={theme.palette.secondary.light}
				animationNegativeDelay={100}
			/>
			<Features />
			<WaveBorder
				upperColor={theme.palette.secondary.light}
				lowerColor={theme.palette.primary.light}
				animationNegativeDelay={100}
			/>
			<div className={classes.c2}>
				<Typography variant="subtitle1" align="center">
					Copyright @ MeeTute 2020
				</Typography>
			</div>
		</div>
	);
};
