import React, { useState, useContext, useEffect } from "react";
import Signup from "./component/Signup/Signup";
import Cookies from "js-cookie";
import Home from "./component/Home/home";
import Test from "./component/Test/Test";
import Appointment from "./component/Appointment/Appointment";
import Consultation from "./component/Consultation/Consultation";
import Setting from "./component/Setting/Setting";
import Hub from "./component/StudyHub/Hub";
import Analytic from "./component/Analytic/Analytic";

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import { AuthApi, UserContext } from "./component/Methods";

const HomeRoute = ({ component: Component, ...rest }) => {
	const { auth } = useContext(AuthApi);
	return (
		<Route
			{...rest}
			render={() => (!auth ? <Component /> : <Redirect to="/Settings" />)}
		/>
	);
};

const ProtectedRoute = ({ component: Component, ...rest }) => {
	const { auth } = useContext(AuthApi);
	let checkAuth = false;

	const cookie = Cookies.get("meetute");
	if (cookie) {
		checkAuth = true;
	}

	return (
		<Route
			{...rest}
			render={() =>
				checkAuth || auth ? <Component /> : <Redirect to="/" />
			}
		/>
	);
};

export default () => {
	//Authentication state...
	const [auth, setAuth] = useState(false);
	const [loginEl, setLoginEl] = useState(null);

	//user state...
	const [selectedRoute, setSelectedRoute] = useState("settings");
	const [userInfo, setUserInfo] = useState(null);

	useEffect(() => {
		const cookie = Cookies.get("meetute");
		if (cookie) setAuth(true);
	}, [auth]);

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
			<UserContext.Provider
				value={{
					selectedRoute,
					setSelectedRoute,
				}}
			>
				<Router>
					<Switch>
						<ProtectedRoute
							exact
							path="/Consultations"
							component={Consultation}
						/>
						<ProtectedRoute exact path="/Hubs" component={Hub} />
						<ProtectedRoute
							exact
							path="/Analytic"
							component={Analytic}
						/>
						<ProtectedRoute
							exact
							path="/Appointments"
							component={Appointment}
						/>
						<ProtectedRoute
							exact
							path="/Settings"
							component={Setting}
						/>
						<HomeRoute exact path="/" component={Home} />

						<Route exact path="/signup" component={Signup} />
						<Route exact path="/test" component={Test} />
					</Switch>
				</Router>
			</UserContext.Provider>
		</AuthApi.Provider>
	);
};
