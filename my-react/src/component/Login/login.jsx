import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LoginForm from "./loginForm.jsx";
import { AuthApi } from "./../Methods";
import Cookies from "js-cookie";
import AppBar from "./../AppBar";

const useStyles = makeStyles(() => ({
	root: {
		backgroundImage: "url(http://localhost:5000/api/images/melb)",
		height: "100vh",
		width: "100vw"
	}
}));

const Login = (props) => {
	const classes = useStyles();
	const { auth, setAuth } = useContext(AuthApi);
	console.log(props);
	const approve = () => {
		setAuth(true);
		Cookies.set("user", "loginTrue");
	};

	return (
		<Grid className={classes.root}>
			<AppBar title="MeeTute" auth={auth} setAuth={setAuth} />
			<LoginForm approve={approve} />
		</Grid>
	);
};

export default Login;
