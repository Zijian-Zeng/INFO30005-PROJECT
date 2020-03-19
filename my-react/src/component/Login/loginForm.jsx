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
	CardActions,
	Grow
} from "@material-ui/core";
import MyField from "./MyField";
import Error from "./Error";
import MuiAlert from "@material-ui/lab/Alert";

// Extension Styles
const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(15),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		width: "100%",
		height: "100%"
	},
	avatar: {
		margin: theme.spacing(3),
		width: theme.spacing(10),
		height: theme.spacing(10)
	},
	form: {
		width: "85%", // Fix IE 11 issue.
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

export default ({ approve }) => {
	const classes = useStyles();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const login = async (e) => {
		e.preventDefault();
		console.log(password + email);
		const res = await fetch("http://localhost:5000/api/users/login", {
			method: "post",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		});
		const msg = await res.json();

		if (msg.success) approve();
		else {
			console.log(msg);
			setError(msg.message);
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<Grid container spacing={3}></Grid>
			<CssBaseline />
			<Card className={classes.paper}>
				<Avatar
					className={classes.avatar}
					src="http://localhost:5000/api/images/unimelb"
					shape="square"
				></Avatar>
				{error !== "" ? (
					<Grow in={true}>
						<MuiAlert
							open={false}
							onClose={() => {
								setError("");
							}}
							severity="error"
						>
							{error}
						</MuiAlert>
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
			</Card>
		</Container>
	);
};
