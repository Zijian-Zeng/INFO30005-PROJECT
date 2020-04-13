import React, { useContext } from "react";
import { Grid, Dialog, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LoginForm from "./loginForm.jsx";
import { AuthApi } from "./../Methods";
import { Close } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
	root: {
		margin: "auto",
		maxWidth: theme.spacing(55),
	},
	close: {
		marginTop: theme.spacing(1),
	},
}));

export default ({ open, setOpenLogin }) => {
	const classes = useStyles();
	const { setLoginEl } = useContext(AuthApi);

	const closeLoginWindow = () => {
		setOpenLogin(false);
		setLoginEl(null);
	};

	return (
		<Dialog
			onClose={closeLoginWindow}
			aria-labelledby="customized-dialog-title"
			open={open}
			className={classes.root}
		>
			<Grid container justify="flex-end">
				<Grid item xs={2}>
					<IconButton
						className={classes.close}
						onClick={closeLoginWindow}
					>
						<Close />
					</IconButton>
				</Grid>
			</Grid>

			<Grid container justify="center">
				<LoginForm closeLoginWindow={closeLoginWindow} />
			</Grid>
		</Dialog>
	);
};
