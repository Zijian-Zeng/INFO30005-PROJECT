import React from "react";

import {
<<<<<<< HEAD
    Grid,
    Typography,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Paper,
    Container,
    Grow,
} from "@material-ui/core";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import withWidth, { isWidthUp, isWidthDown } from "@material-ui/core/withWidth";
=======
	Grid,
	Typography,
	CardContent,
	CardHeader,
	Divider,
	Paper,
	Container,
	Grow,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
>>>>>>> regina-front-end

import AppBar from "../Navigation/AppBar";
import aboutImg from "./img/about.png";
import background from "./img/background.svg";
import { cyan } from "@material-ui/core/colors";
import Login from "../Login/login";

const useStyles = makeStyles((theme) => ({
<<<<<<< HEAD
    root: {
        backgroundImage:
            "linear-gradient(45deg, #42a5f5 0%, #c8e6c9 25%, #fad0ba 50%, #fff59d 100%)",

        minHeight: "110VH",
    },
    image: {
        width: "100%",
        marginTop: theme.spacing(20),
    },
    paper: {
        borderRadius: 30,
        [theme.breakpoints.down("md")]: {
            marginTop: theme.spacing(10),
        },
        [theme.breakpoints.up("md")]: {
            marginTop: theme.spacing(20),
        },
        background: "#fffde7",
    },

    card: {
        borderRadius: 30,

        background: "inherit",
        borderColor: cyan,
        border: "solid  #4dd0e1 5px",
        marginTop: theme.spacing(10),
    },
}));

export default withWidth()(({ width }) => {
    const classes = useStyles();
    const theme = useTheme();
    const largeScreen = isWidthUp("md", width);

    return (
        <div className={classes.root}>
            <AppBar aboutBar />
            <Login />
            <Container maxWidth="md">
                <Grid container spacing={4} alignItems="center">
                    <Grow in timeout={1000}>
                        <Grid item xs={largeScreen ? 6 : 12}>
                            <img
                                src={aboutImg}
                                alt="about"
                                className={classes.image}
                            />
                        </Grid>
                    </Grow>
                    <Grid item xs={largeScreen ? 6 : 12}>
                        <Grow in timeout={1200}>
                            <Paper className={classes.paper}>
                                <CardHeader
                                    title={
                                        <Typography
                                            align="center"
                                            style={
                                                largeScreen
                                                    ? {
                                                          fontSize: "30px",
                                                          color: "#37474f",
                                                          fontWeight: 900,
                                                          fontFamily: "Arial",
                                                          textTransform: "none",
                                                      }
                                                    : {
                                                          fontSize: "25px",
                                                          color: "#37474f",
                                                          fontWeight: 900,
                                                          fontFamily: "Arial",
                                                          textTransform: "none",
                                                      }
                                            }
                                        >
                                            Who is MeeTute?
                                        </Typography>
                                    }
                                ></CardHeader>
                                <Divider
                                    style={{ width: "80%", margin: "auto" }}
                                />
                                <CardContent>
                                    <Typography
                                        align="center"
                                        style={
                                            largeScreen
                                                ? {
                                                      fontSize: "20px",
                                                      color: "#37474f",
                                                      fontWeight: 900,
                                                      fontFamily: "Arial",
                                                      textTransform: "none",
                                                  }
                                                : {
                                                      fontSize: "15px",
                                                      color: "#37474f",
                                                      fontWeight: 900,
                                                      fontFamily: "Arial",
                                                      textTransform: "none",
                                                  }
                                        }
                                    >
                                        {" "}
                                        Our mission is to optimise your time
                                        management for a better working life.
                                        <br />
                                        <br />
                                    </Typography>

                                    <Typography
                                        style={
                                            largeScreen
                                                ? {
                                                      fontSize: "15px",
                                                      color: "#37474f",
                                                      fontWeight: 600,
                                                      fontFamily: "Arial",
                                                      textTransform: "none",
                                                  }
                                                : {
                                                      fontSize: "13px",
                                                      color: "#37474f",
                                                      fontWeight: 600,
                                                      fontFamily: "Arial",
                                                      textTransform: "none",
                                                  }
                                        }
                                    >
                                        {" "}
                                        MeeTute identifies the problem of the
                                        underutilisation of consultation hours
                                        during off-peak times, potentially
                                        leading to a negative impact on the work
                                        efficiency of our teaching staff. In
                                        addition, as students, we truly
                                        understand the challenges of getting the
                                        help we need from teaching staff during
                                        assignment or exam seasons. This is an
                                        issue that affects over 48,000 students
                                        and staff, and probably the wider
                                        community.
                                        <br />
                                        <br />
                                        MeeTute wants to implement a platform
                                        for staff to better manage their
                                        consultation hours and for students to
                                        easily book private appointments with
                                        their lecturers/tutors and form study
                                        groups with their fellow peers. The
                                        ultimate goal of our solution is to
                                        better connect students with teaching
                                        staff as well as fellow classmates.
                                        <br />
                                        <br />
                                    </Typography>
                                </CardContent>
                            </Paper>
                        </Grow>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
=======
	root: {
		backgroundImage:
			"linear-gradient(45deg, #42a5f5 0%, #c8e6c9 25%, #fad0ba 50%, #fff59d 100%)",

		minHeight: "110VH",
	},
	image: {
		width: "100%",
		marginTop: theme.spacing(20),
	},
	paper: {
		borderRadius: 30,
		[theme.breakpoints.down("md")]: {
			marginTop: theme.spacing(10),
		},
		[theme.breakpoints.up("md")]: {
			marginTop: theme.spacing(20),
		},
		background: "#fffde7",
	},

	card: {
		borderRadius: 30,

		background: "inherit",
		borderColor: cyan,
		border: "solid  #4dd0e1 5px",
		marginTop: theme.spacing(10),
	},
}));

/***
 * About page.
 */
export default withWidth()(({ width }) => {
	const classes = useStyles();
	const largeScreen = isWidthUp("md", width);

	return (
		<div className={classes.root}>
			<AppBar aboutBar />
			<Login />
			<Container maxWidth="md">
				<Grid container spacing={4} alignItems="center">
					<Grow in timeout={1000}>
						<Grid item xs={largeScreen ? 6 : 12}>
							<img
								src={aboutImg}
								alt="about"
								className={classes.image}
							/>
						</Grid>
					</Grow>
					<Grid item xs={largeScreen ? 6 : 12}>
						<Grow in timeout={1200}>
							<Paper className={classes.paper}>
								<CardHeader
									title={
										<Typography
											align="center"
											style={
												largeScreen
													? {
															fontSize: "30px",
															color: "#37474f",
															fontWeight: 900,
															fontFamily: "Arial",
															textTransform:
																"none",
													  }
													: {
															fontSize: "25px",
															color: "#37474f",
															fontWeight: 900,
															fontFamily: "Arial",
															textTransform:
																"none",
													  }
											}
										>
											Who is MeeTute?
										</Typography>
									}
								></CardHeader>
								<Divider
									style={{ width: "80%", margin: "auto" }}
								/>
								<CardContent>
									<Typography
										align="center"
										style={
											largeScreen
												? {
														fontSize: "20px",
														color: "#37474f",
														fontWeight: 900,
														fontFamily: "Arial",
														textTransform: "none",
												  }
												: {
														fontSize: "15px",
														color: "#37474f",
														fontWeight: 900,
														fontFamily: "Arial",
														textTransform: "none",
												  }
										}
									>
										{" "}
										Our mission is to optimise your time
										management for a better working life.
										<br />
										<br />
									</Typography>

									<Typography
										style={
											largeScreen
												? {
														fontSize: "15px",
														color: "#37474f",
														fontWeight: 600,
														fontFamily: "Arial",
														textTransform: "none",
												  }
												: {
														fontSize: "13px",
														color: "#37474f",
														fontWeight: 600,
														fontFamily: "Arial",
														textTransform: "none",
												  }
										}
									>
										{" "}
										MeeTute identifies the problem of the
										underutilisation of consultation hours
										during off-peak times, potentially
										leading to a negative impact on the work
										efficiency of our teaching staff. In
										addition, as students, we truly
										understand the challenges of getting the
										help we need from teaching staff during
										assignment or exam seasons. This is an
										issue that affects over 48,000 students
										and staff, and probably the wider
										community.
										<br />
										<br />
										MeeTute wants to implement a platform
										for staff to better manage their
										consultation hours and for students to
										easily book private appointments with
										their lecturers/tutors and form study
										groups with their fellow peers. The
										ultimate goal of our solution is to
										better connect students with teaching
										staff as well as fellow classmates.
										<br />
										<br />
									</Typography>
								</CardContent>
							</Paper>
						</Grow>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
>>>>>>> regina-front-end
});
