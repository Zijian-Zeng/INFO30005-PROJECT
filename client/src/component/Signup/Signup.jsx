import React, { useState } from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import AppBar from "../Navigation/AppBar";

import Login from "../Login/login";

import SignupForm from "./signupForm";

import WaveBorder from "../Home/waveBorder";

const useStyles = makeStyles((theme) => ({
	c1: {
		background: theme.background,
		width: "100WH",
	},
	c2: {
		background: theme.palette.secondary.light,
		height: "30VH",
	},
}));

export default () => {
	const classes = useStyles();
	const theme = useTheme();
	const [openLogin, setOpenLogin] = useState(false);

	return (
		<div>
			<AppBar setOpenLogin={setOpenLogin} />
			<Login open={openLogin} setOpenLogin={setOpenLogin} />

			<div className={classes.c1}>
				<SignupForm />
			</div>
			<div className={classes.c2}>
				<WaveBorder
					upperColor={theme.background}
					lowerColor={theme.palette.secondary.light}
					animationNegativeDelay={100}
				/>
			</div>
		</div>
	);
};
