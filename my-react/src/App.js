import React, { useState, useContext, useMemo, useEffect } from "react";
import "./App.css";
import Content from "./component/Home/content";
import Login from "./component/Login/login";
import Signup from "./component/Signup/Signup";
import Cookies from "js-cookie";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
} from "react-router-dom";
import { AuthApi } from "./component/Methods";

const HomeRoute = ({ component: Component, ...rest }) => {
	const { auth } = useContext(AuthApi);

	return (
		<Route
			{...rest}
			render={() => (auth ? <Component /> : <Redirect to="/login" />)}
		/>
	);
};

const LoginRoute = ({ component: Component, ...rest }) => {
	const { auth } = useContext(AuthApi);
	console.log(Component);
	return (
		<Route
			{...rest}
			render={() => (!auth ? <Component /> : <Redirect to="/home" />)}
		/>
	);
};

export default () => {
	const [auth, setAuth] = useState(false);

	useEffect(() => {
		const readCookie = () => {
			const cookie = Cookies.get("user");
			if (cookie) setAuth(true);
		};
		readCookie();
	}, []);

	return (
		<AuthApi.Provider value={{ auth, setAuth }}>
			<Router>
				<Switch>
					<LoginRoute exact path="/login" component={Login} />
					<HomeRoute exact path="/home" component={Content} />
					<Route exact path="/signup" component={Signup} />
				</Switch>
			</Router>
		</AuthApi.Provider>
	);
};
