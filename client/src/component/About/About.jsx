import React from "react";

import {
    Grid,
    Container,
    Hidden,
    withWidth,
    isWidthUp,
    Typography,
    Grow,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
} from "@material-ui/core";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "../Navigation/AppBar";
import aboutImg from "./img/about.png";
import { cyan } from "@material-ui/core/colors";
import Login from "../Login/login";

const useStyles = makeStyles((theme) => ({
    c1: {
        backgroundColor: theme.palette.secondary.light,
    },
    c2: {
        backgroundColor: theme.palette.primary.light,
    },
    root: {
        //backgroundColor: "#e0f2f1",

        backgroundImage: "linear-gradient(45deg, #b2dfdb 20%, #fafafa 100% )",
        minHeight: "100VH",
    },
    images: {
        position: "relative",
        top: "20VH",
        margin: "auto",
    },
    card: {
        position: "relative",
        borderRadius: 30,
        top: "20VH",
        margin: "auto",
        background: "inherit",
        borderColor: cyan,
        border: "solid  #4dd0e1 5px",
    },
}));

export default () => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <div className={classes.root}>
            <AppBar />
            <Login />
            <Grid container justify="space-around">
                <Grid item xs={5}>
                    <Grid container justify="center" className={classes.images}>
                        <img
                            style={{ maxWidth: "100%" }}
                            src={aboutImg}
                            alt="about"
                        />
                    </Grid>
                </Grid>
                <Grid item xs={5}>
                    <Card className={classes.card} color="">
                        <CardHeader
                            title={
                                <Typography
                                    align="center"
                                    style={{
                                        fontSize: "30px",
                                        color: "#37474f",
                                        fontWeight: 900,
                                        fontFamily: "Arial",
                                        textTransform: "none",
                                    }}
                                >
                                    Who is MeeTute?
                                </Typography>
                            }
                        ></CardHeader>
                        <Divider style={{ width: "80%", margin: "auto" }} />
                        <CardContent>
                            <Typography
                                style={{
                                    fontSize: "20px",
                                    color: "#37474f",
                                    fontWeight: 900,
                                    fontFamily: "Arial",
                                    textTransform: "none",
                                }}
                            >
                                {" "}
                                Our mission is to optimise your time management
                                for a better working life.
                                <br />
                                <br />
                            </Typography>

                            <Typography>
                                {" "}
                                MeeTute identifies the problem of the
                                underutilisation of consultation hours during
                                off-peak times, potentially leading to a
                                negative impact on the work efficiency of our
                                teaching staff. In addition, as students, we
                                truly understand the challenges of getting the
                                help we need from teaching staff during
                                assignment or exam seasons. This is an issue
                                that affects over 48,000 students and staff, and
                                probably he wider community.
                                <br />
                                <br />
                            </Typography>
                            <Typography>
                                MeeTute wants to implement a platform for staff
                                to better manage their consultation hours and
                                for students to easily book private appointments
                                with their lecturers/tutors and form study
                                groups with their fellow peers. The ultimate
                                goal of our solution is to better connect
                                students with teaching staff as well as fellow
                                classmates.
                                <br />
                                <br />
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};
