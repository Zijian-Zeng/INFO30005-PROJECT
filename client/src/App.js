import React, { useState, useContext, useEffect } from "react";
import Content from "./component/Dashboard/content";
import Signup from "./component/Signup/Signup";
import Cookies from "js-cookie";
import Home from "./component/Home/home";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import { AuthApi } from "./component/Methods";

const DashboardRoute = ({ component: Component, ...rest }) => {
	const { auth } = useContext(AuthApi);

	return (
		<Route
			{...rest}
			render={() => (auth ? <Component /> : <Redirect to="/" />)}
		/>
	);
};

const HomeRoute = ({ component: Component, ...rest }) => {
	const { auth } = useContext(AuthApi);
	console.log(Component);
	return (
		<Route
			{...rest}
			render={() =>
				!auth ? <Component /> : <Redirect to="/dashboard" />
			}
		/>
	);
};

export default () => {
	const [auth, setAuth] = useState(false);
	const [userInfo, setUserInfo] = useState(null);
	const [loginEl, setLoginEl] = useState(null);

	useEffect(() => {
		const readCookie = () => {
			const cookie = Cookies.get("meetute");
			if (cookie) setAuth(true);
		};
		readCookie();
	}, []);

	return (
		<AuthApi.Provider
			value={{
				userInfo,
				setUserInfo,
				auth,
				setAuth,
				loginEl,
				setLoginEl,
			}}
		>
			<Router>
				<Switch>
					<HomeRoute exact path="/" component={Home} />
					<DashboardRoute
						exact
						path="/dashboard"
						component={Content}
					/>
					<Route exact path="/signup" component={Signup} />
				</Switch>
			</Router>
		</AuthApi.Provider>
	);
};
