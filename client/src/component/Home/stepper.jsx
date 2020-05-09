import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
	Stepper,
	Step,
	StepButton,
	StepLabel,
	StepConnector,
} from "@material-ui/core";
import clsx from "clsx";

import TodayIcon from "@material-ui/icons/Today";
import AlarmIcon from "@material-ui/icons/Alarm";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import TimelineIcon from "@material-ui/icons/Timeline";

const ColorlibConnector = withStyles({
	alternativeLabel: {
		top: 22,
	},
	line: {
		height: 3,
		border: 0,
		backgroundColor: "#eaeaf0",
		borderRadius: 1,
	},
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
	root: {
		backgroundColor: "#ccc",
		zIndex: 1,
		color: "#fff",
		width: 50,
		height: 50,
		display: "flex",
		borderRadius: "50%",
		justifyContent: "center",
		alignItems: "center",
	},
	active: {
		backgroundImage: "linear-gradient(to top, #0a6aab 0%, #0a6aab 100%)",
		boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
	},
});

function ColorlibStepIcon(props) {
	const classes = useColorlibStepIconStyles();
	const { active, completed } = props;

	const icons = {
		1: <TodayIcon />,
		2: <AlarmIcon />,
		3: <GroupAddIcon />,
		4: <TimelineIcon />,
	};

	return (
		<div
			className={clsx(classes.root, {
				[classes.active]: active,
				[classes.completed]: completed,
			})}
		>
			{icons[String(props.icon)]}
		</div>
	);
}
const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.secondary.light,
		width: "60%",
		margin: "auto",
	},
}));

export default ({ activeStep, setActiveStep, features }) => {
	const classes = useStyles();

	const handleStep = (step) => () => {
		setActiveStep(step);
	};

	return (
		<Stepper
			alternativeLabel
			activeStep={activeStep}
			connector={<ColorlibConnector />}
			className={classes.root}
			nonLinear
		>
			{features.map(({ headline }, index) => (
				<Step key={headline}>
					<StepButton
						className={classes.button}
						onClick={handleStep(index)}
					>
						<StepLabel StepIconComponent={ColorlibStepIcon}>
							{headline}
						</StepLabel>
					</StepButton>
				</Step>
			))}
		</Stepper>
	);
};

/*
		<Stepper nonLinear activeStep={activeStep} className={classes.root}>
			{features.map(({ headline, text, icon }, index) => (
				<Step key={headline}>
					<StepButton
						onClick={handleStep(index)}
						className={classes.button}
					>
						{headline}
					</StepButton>
				</Step>
			))}
			</Stepper>*/
