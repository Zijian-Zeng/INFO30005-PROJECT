import React from "react";

import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import AppBar from "../Navigation/AppBar";
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
            <Header setOpenLogin={setOpenLogin} />
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
