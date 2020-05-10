import React from "react";
import { LinearProgress } from "@material-ui/core";
import { withStyles, lighten } from "@material-ui/core/styles";

const LoadingBar = withStyles({
	root: {
		display: "block",
		margin: "auto",
		backgroundColor: lighten("#00bfb8", 0.5),
	},
	bar: {
		borderRadius: 50,
		backgroundColor: "#00bfb8",
	},
})(LinearProgress);

export default (props) => {
	return <LoadingBar {...props} />;
};
