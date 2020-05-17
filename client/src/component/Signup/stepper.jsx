import React from "react";
import {
	StepConnector,
	Stepper,
	Step,
	StepLabel,
	Grow,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";

/***
 * Customized step connector.
 */
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

	completed: {
		"& $line": {
			backgroundImage:
				"linear-gradient(to right, #47cc89 0%, #47cc89 100%)",
		},
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
		backgroundImage: "linear-gradient(to right, #47cc89 0%, #47cc89 100%)",
		boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
	},
	completed: {
		backgroundImage: "linear-gradient(to right, #47cc89 0%, #47cc89 100%)",
	},
});

/***
 * Customized step icons for each step.
 */
const ColorlibStepIcon = (props) => {
	const classes = useColorlibStepIconStyles();
	const { active, completed } = props;

	const icons = {
		1: <LockOutlinedIcon />,
		2: <LockOutlinedIcon />,
		3: <LockOutlinedIcon />,
		4: <LockOutlinedIcon />,
		5: <LockOutlinedIcon />,
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
};

const useStyles = makeStyles((theme) => ({
	root: {
		background: theme.background,
	},
}));

/***
 * The stepper in sign up page.
 */
export default ({ activeStep, getSteps }) => {
	const classes = useStyles();
	const steps = getSteps();

	return (
		<Grow in>
			<Stepper
				connector={<ColorlibConnector />}
				alternativeLabel
				activeStep={activeStep}
				className={classes.root}
			>
				{steps.map((label, index) => (
					<Step key={label}>
						<StepLabel StepIconComponent={ColorlibStepIcon}>
							{label}
						</StepLabel>
					</Step>
				))}
			</Stepper>
		</Grow>
	);
};
