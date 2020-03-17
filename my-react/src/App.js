import React, { useState } from "react";
import "./App.css";
import Content from "./component/Home/content";
import Login from "./component/Login/login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppBar from "./component/AppBar";

export default () => {
	return (
		<div>
			<AppBar title="MeeTute" />
			<Router>
				<Switch>
					<Route exact path="/" component={Login} />
					<Route exact path="/home" component={Content} />
				</Switch>
			</Router>
		</div>
	);
};
