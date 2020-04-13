import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Snackbar, Slide } from "@material-ui/core";
//import MuiAlert from "@material-ui/lab/Alert";

const TransitionDown = (props) => {
	return <Slide {...props} direction="down" />;
};

export default ({ error, setError }) => {
	const close = () => {
		setError("");
	};
	return (
		<Snackbar
			open={error === "" ? false : true}
			autoHideDuration={6000}
			onClose={close}
			TransitionComponent={TransitionDown}
		></Snackbar>
	);
};
