import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	Avatar,
	Button,
	FormControlLabel,
	FormControl,
	RadioGroup,
	FormLabel,
	Radio,
	Card,
	Paper,
	Grow,
} from "@material-ui/core";
import MyField from "./MyField";

import { AuthApi } from "./../Methods";
import Cookies from "js-cookie";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";

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
		marginTop: theme.spacing(2),
	},
	avatar: {
		width: theme.spacing(10),
		height: theme.spacing(10),
	},
	form: {
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(2, 0, 0),
	},
	signUpButton: {
		textTransform: "none",
		flexGrow: "1",
		color: "#31a065",
	},
	text: {
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
	const history = useHistory();
	const classes = useStyles();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [userType, setUserType] = useState("student");
	const [error, setError] = useState("");
	const { setAuth, setUserInfo } = useContext(AuthApi);

	const login = async (e) => {
		e.preventDefault();
		setError("");
		const res = await fetch(
			"http://localhost:5000/api/shared/users/login",
			{
				method: "post",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({
					email: email,
					password: password,
					userType: userType,
				}),
			}
		);
		const msg = await res.json();

		if (msg.success) {
			setAuth(true);
			Cookies.set("meetute", msg.token);
			history.push("/consultations");
		} else {
			setError(msg.error);
		}
	};

	return (
		<Paper elevation={0} className={classes.paper}>
			<Avatar className={classes.avatar}></Avatar>
			{error !== "" ? (
				<Grow in={true}>
					<Card className={classes.error}>
						<Alert
							severity="error"
							onClose={() => {
								setError("");
							}}
						>
							{error}
						</Alert>
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
				<FormControl component="fieldset">
					<FormLabel component="legend">login as</FormLabel>
					<RadioGroup
						row
						aria-label="position"
						name="position"
						value={userType}
					>
						<FormControlLabel
							value="student"
							control={<Radio color="primary" />}
							onChange={(event) => {
								setUserType(event.target.value);
							}}
							label="Student"
						/>

						<FormControlLabel
							value="staff"
							control={<Radio color="primary" />}
							onChange={(event) => {
								setUserType(event.target.value);
							}}
							label="Staff"
						/>
					</RadioGroup>
				</FormControl>
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
			<br />
			<Button
				size="small"
				color="primary"
				className={classes.signUpButton}
				fullWidth
				onClick={() => {
					closeLoginWindow();
					history.push("/signup");
				}}
			>
				Don't have an account? Sign Up
			</Button>
			<br />
		</Paper>
	);
};
