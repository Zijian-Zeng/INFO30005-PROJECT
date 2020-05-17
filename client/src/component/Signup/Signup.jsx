import React, { useState } from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import AppBar from "../Navigation/AppBar";

import Login from "../Login/login";

import SignupForm from "./signupForm";

import WaveBorder from "../Home/waveBorder";

const useStyles = makeStyles((theme) => ({
<<<<<<< HEAD
    c1: {
        background: theme.background,
        maxWidth: "100WH",
    },
    c2: {
        background: theme.palette.secondary.light,
        height: "80VH",
    },
=======
	c1: {
		background: theme.background,
		maxWidth: "100WH",
	},
	c2: {
		background: theme.palette.secondary.light,
		height: "80VH",
	},
>>>>>>> regina-front-end
}));

/***
 * The sign up page for student.
 */
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
