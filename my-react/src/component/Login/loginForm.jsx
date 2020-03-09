import React, { useState } from "react";
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
	CardActions
} from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";
import MyField from "../MyField.jsx";

// Extension Styles
const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(15),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		width: "100%",
		height: "60vh",
		backgroundImage:
			"linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%)"
	},
	avatar: {
		margin: theme.spacing(3),
		width: theme.spacing(10),
		height: theme.spacing(10)
	},
	form: {
		width: "85%", // Fix IE 11 issue.
		height: "55%",
		marginTop: theme.spacing(0)
	},
	submit: {
		margin: theme.spacing(2, 0, 0)
	},
	lowerCase: {
		textTransform: "none",
		flexGrow: "1"
	}
}));

export default function LoginForm({ setStep }) {
	const classes = useStyles();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const login = (e) => {
		e.preventDefault();
		console.log(email + password);
	};

	return (
		<Container component="main" maxWidth="xs">
			<Grid container spacing={3}></Grid>
			<CssBaseline />
			<Card className={classes.paper}>
				<Avatar className={classes.avatar}></Avatar>
				<form className={classes.form} onSubmit={login}>
					<MyField
						label="Email"
						setState={setEmail}
						required={true}
					/>
					<MyField
						label="Password"
						setState={setPassword}
						required={true}
						type={"password"}
					/>
					<FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
					/>
					<Button
						component={Link}
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						size="large"
						to="/home"
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
			</Card>
		</Container>
	);
}
