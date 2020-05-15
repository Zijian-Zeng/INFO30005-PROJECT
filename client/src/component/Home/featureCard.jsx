import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import {
	Grid,
	CardContent,
	withWidth,
	isWidthUp,
	Typography,
	Button,
	Paper,
} from "@material-ui/core";

import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

const useStyles = makeStyles((theme) => ({
	cover: {
		maxWidth: "100%",
	},
	card: {
		marginTop: theme.spacing(3),
		backgroundColor: theme.palette.secondary.light,
	},
	text: {
		color: "#6984aa",
		fontWeight: 500,
	},
	headline: {
		color: "#33456b",
		fontWeight: 900,
	},
}));

export default (props) => {
	const theme = useTheme();
	const {
		setActiveStep,
		activeStep,
		headline,
		text,
		maxSteps,
		image,
	} = props;

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const classes = useStyles();

	return (
		<Grid container justify="center" alignItems="center">
			<Grid item xs={1}>
				<Grid container justify="center">
					<Button
						size="small"
						onClick={handleBack}
						disabled={activeStep === 0}
						className={classes.button}
					>
						{theme.direction === "rtl" ? (
							<KeyboardArrowRight />
						) : (
							<KeyboardArrowLeft />
						)}
					</Button>
				</Grid>
			</Grid>
			<Grid item xs={8}>
				<Paper elevation={0} className={classes.card}>
					{/*Image*/}
					<Grid
						container
						direction="row"
						justify="space-around"
						alignItems="center"
					>
						<Grid item xs={4}>
							<Grid
								container
								direction="column"
								justify="center"
								alignItems="center"
							>
								<img
									className={classes.cover}
									src={image}
									alt="Live from space album cover"
								/>
							</Grid>
						</Grid>

						{/*Headline of the card*/}
						<Grid item xs={6}>
							<CardContent className={classes.content}>
								<Typography
									className={classes.headline}
									variant="h4"
								>
									{headline}
								</Typography>
								<Typography
									className={classes.text}
									variant="h5"
								>
									<br />
									{text}
								</Typography>
							</CardContent>
						</Grid>
					</Grid>
				</Paper>
			</Grid>

			<Grid item xs={1}>
				<Grid container justify="center">
					<Button
						size="small"
						onClick={handleNext}
						disabled={activeStep === maxSteps - 1}
						className={classes.button}
					>
						{theme.direction === "rtl" ? (
							<KeyboardArrowLeft />
						) : (
							<KeyboardArrowRight />
						)}
					</Button>
				</Grid>
			</Grid>
		</Grid>
	);
};
