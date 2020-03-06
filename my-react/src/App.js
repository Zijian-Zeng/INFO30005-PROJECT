import React, { useState } from "react";
import "./App.css";
import Content from "./component/content.js";
import LoginForm from "./component/loginForm.js";
import Login from "./component/login.js";
import { ThemeProvider } from "@material-ui/core/styles";

export default () => {
	const [step, setStep] = useState(0);

	switch (step) {
		case 0:
			return <Login setStep={setStep} />;
			break;
		case 1:
			return <Content />;
	}
};
