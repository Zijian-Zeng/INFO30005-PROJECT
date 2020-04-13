import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	Avatar,
	Button,
	CssBaseline,
	FormControlLabel,
	Checkbox,
	Grid,
	Container,
	Card,
	Paper,
	CardHeader,
	CardActions,
	Grow,
	IconButton,
} from "@material-ui/core";
import MyField from "./MyField";
import { Close, ErrorOutline } from "@material-ui/icons";
import { AuthApi } from "./../Methods";
import Cookies from "js-cookie";

// Extension Styles
const useStyles = makeStyles((theme) => ({
	paper: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		width: "90%",
		height: "90%",
	},
	error: {
		width: "85%",
		backgroundImage: "linear-gradient(-20deg, #f794a4 0%, #fdd6bd 100%)",
		fontSize: "30%",
	},
	avatar: {
		width: theme.spacing(10),
		height: theme.spacing(10),
	},
	form: {
		marginTop: theme.spacing(3),
		// Fix IE 11 issue.
	},
	submit: {
		margin: theme.spacing(2, 0, 0),
	},
	lowerCase: {
		textTransform: "none",
		flexGrow: "1",
	},
	text: {
		fontSize: "130%",
		fontWeight: "500",
		margin: "auto",
	},
	cancel: {
		marginTop: theme.spacing(1.4),
	},
	warn: {
		marginTop: theme.spacing(0.8),
	},
	close: {
		position: "absolute",
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
}));

export default ({ closeLoginWindow }) => {
	const classes = useStyles();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const { setAuth, setUserInfo } = useContext(AuthApi);

	const login = async (e) => {
		e.preventDefault();
		setError("");
		console.log(password + email);

		const res = await fetch("/api/users/login", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		});
		const msg = await res.json();

		if (msg.success) {
			setAuth(true);
			setUserInfo({
				firstName: "a",
				lastName: "b",
				subjects: ["c", "d"],
			});
			Cookies.set("user", "loginTrue");

			closeLoginWindow();
		} else {
			console.log(msg);
			setError(msg.message);
		}
	};

	return (
		<Paper elevation={0} className={classes.paper}>
			<Avatar
				className={classes.avatar}
				src="http:/api/images/unimelb"
				shape="square"
			></Avatar>
			{error !== "" ? (
				<Grow in={true}>
					<Card className={classes.error}>
						<CardHeader
							avatar={<ErrorOutline className={classes.warn} />}
							action={
								<IconButton
									onClick={() => {
										setError("");
									}}
									size="small"
									className={classes.cancel}
								>
									<Close />
								</IconButton>
							}
							title={<p className={classes.text}>{error}</p>}
						></CardHeader>
					</Card>
				</Grow>
			) : null}

			<form className={classes.form} onSubmit={login}>
				<MyField
					label="Email"
					setState={setEmail}
					required={true}
					error={error}
				/>
				<MyField
					label="Password"
					setState={setPassword}
					required={true}
					type={"password"}
					error={error}
				/>
				<FormControlLabel
					control={<Checkbox value="remember" color="primary" />}
					label="Remember me"
				/>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					className={classes.submit}
					size="large"
				>
					Login In
				</Button>
			</form>
			<CardActions>
				<Button size="small" className={classes.lowerCase}>
					Forgot Password?
				</Button>
				<Button
					size="small"
					color="primary"
					className={classes.lowerCase}
				>
					Don't have an account? Sign Up
				</Button>
			</CardActions>
			<br />
			<br />
		</Paper>
	);
};
