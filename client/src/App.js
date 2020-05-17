import React, { useState, useContext, useEffect } from "react";
import Signup from "./component/Signup/Signup";
import Cookies from "js-cookie";
import Home from "./component/Home/home";
import Appointment from "./component/Appointment/Appointment";
import Consultation from "./component/Consultation/Consultation";
import Setting from "./component/Setting/Setting";
import Hub from "./component/StudyHub/Hub";
import Analytic from "./component/Analytic/Analytic";
import About from "./component/About/About";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import { AuthApi, UserContext, myFetch } from "./component/Methods";

/***
 * The route for home page, redirect to settings page once login in.
 */
const HomeRoute = ({ component: Component, ...rest }) => {
	const { auth } = useContext(AuthApi);
	return (
		<Route
			{...rest}
			render={() => (!auth ? <Component /> : <Redirect to="/Settings" />)}
		/>
	);
};

/***
 * The routes under protection,
 * redirect to home page if authentication is missing.
 */
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

/***
 * http://meetute.herokuapp.com
 * Designed by Xiaoyue Lin, Zhishang Wang, Yuxuan Liu, Regina Lin, Zijian Zeng.
 */
export default () => {
	//Authentication state...
	const [auth, setAuth] = useState(false);
	const [loginEl, setLoginEl] = useState(null);
	const [openLogin, setOpenLogin] = React.useState(false);

	//Loading routes context...
	const [selectedRoute, setSelectedRoute] = useState("settings");
	const [loadingRoute, setLoadingRoute] = useState(true);

	//user information...
	const [user, setUser] = useState({});

	//Alerting context
	const [alert, setAlert] = useState({ status: "", message: "" });

	//Alerting responses from back end (eg. back end error)...
	const detectAlert = (res, succeed, info) => {
		if (res.success) {
			if (succeed) {
				setAlert({
					status: "success",
					message: succeed,
				});
			} else if (info) {
				setAlert({
					status: "info",
					message: info,
				});
			}
		} else {
			let message = "Unknown error.";
			if (res.error) message = res.error;
			else if (res.message) message = res.message;

			setAlert({
				status: "error",
				message: message,
			});
		}
	};

	//Close the alert bar.
	const closeAlert = () => setAlert({ status: "", message: "" });

	//Loading user information.
	const fetchUser = async () => {
		setLoadingRoute(true);
		const res = await myFetch("/api/shared/users/info", "GET");
		detectAlert(res);
		setUser(res);
		return res;
	};

	//Make authentication.
	useEffect(() => {
		const cookie = Cookies.get("meetute");
		if (cookie) setAuth(true);
	}, [auth]);

	return (
		<AuthApi.Provider
			value={{
				auth,
				setAuth,
				loginEl,
				setLoginEl,
				openLogin,
				setOpenLogin,
			}}
		>
			<UserContext.Provider
				value={{
					selectedRoute,
					setSelectedRoute,
					alert,
					detectAlert,
					closeAlert,
					setAlert,
					loadingRoute,
					setLoadingRoute,
					fetchUser,
					user,
					setUser,
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
						<Route exact path="/about" component={About} />
						<Route exact path="/signup" component={Signup} />
					</Switch>
				</Router>
			</UserContext.Provider>
		</AuthApi.Provider>
	);
};
