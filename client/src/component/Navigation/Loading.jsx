import React from "react";
import { LinearProgress } from "@material-ui/core";
import { withStyles, lighten, makeStyles } from "@material-ui/core/styles";

const BorderLinearProgress = withStyles({
	root: {
		height: 5,
		backgroundColor: lighten("#0a6aab", 0.5),
	},
	bar: {
		borderRadius: 100,
		backgroundColor: "#0a6aab",
	},
})(LinearProgress);

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	margin: {
		margin: theme.spacing(8),
	},
}));

export default (props) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<BorderLinearProgress className={classes.margin} />
		</div>
	);
};