import React, { useContext, useState, useEffect } from "react";
import {
	Typography,
	Container,
	Grow,
	Paper,
	Collapse,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AuthApi } from "./../Methods";
import Cookies from "js-cookie";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import Alert from "@material-ui/lab/Alert";
import Stepper from "./stepper";
import StepCard from "./stepCard";
import { myFetch } from "../Methods";

function getSteps() {
	return ["User Type", "Name", "Email", "Password", "Subjects"];
}

const steps = [
	{
		text: "Sign up as...",
		cardID: 0,
	},
	{
		text: "What's your name?",
		cardID: 1,
	},

	{
		text: "Please enter your email:",
		cardID: 2,
	},

	{
		text: "Set your password:",
		cardID: 3,
	},
	{
		text: "Subjects you would like to pick?",
		cardID: 4,
	},
	{
		text: "We are all set! enjoy meeting tutors!",
		cardID: 5,
	},
];

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		background: theme.background,
	},
	stepper: {
		background: theme.background,
	},
	button: {
		marginTop: theme.spacing(1),
		marginRight: theme.spacing(1),
	},
	actionsContainer: {
		marginBottom: theme.spacing(2),
	},
	resetContainer: {
		padding: theme.spacing(3),
	},
}));

/***
 * Sign up form
 */
export default withWidth()(({ width }) => {
	const classes = useStyles();

	//Sign up information.
	const [email, setEmail] = useState("");
	const [userType, setUserType] = useState("student");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLasName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConformPassword] = useState("");
	const [chosenSubjects, setChosenSubjects] = useState(["INFO30005"]);

	//Feedback from backend.
	const [status, setStatus] = useState("");
	//Steps states
	const [activeStep, setActiveStep] = React.useState(0);

	//loading data.
	const [loading, setLoading] = useState(true);
	const [allSubjects, setAllSubjects] = useState([]);

	const { setAuth } = useContext(AuthApi);

	//Loading subjects from database.
	useEffect(() => {
		const fetchSubjects = async () => {
			const { subjectList } = await myFetch(
				"/api/shared/users/allSubjects",
				"GET"
			);
			setAllSubjects(subjectList);
			setLoading(false);
		};
		fetchSubjects();
	}, [status]);

	const handleNext = () => {
		switch (activeStep) {
			case 1:
				if (firstName === "" || lastName === "") {
					return;
				}
				break;
			case 2:
				if (email === "" || !email.includes("@")) {
					return;
				}
				if (email.length < 6) {
					setStatus(
						"Sorry email length has to be greater than 6 characters"
					);
					return;
				}
				break;
			case 3:
				if (password === "" || confirmPassword === "") {
					return;
				}
				if (password !== confirmPassword) {
					setStatus("Sorry password does not match");
					return;
				}
				if (password.length < 6) {
					setStatus(
						"Sorry password length has to be greater than 6 characters"
					);
					return;
				}
				break;
			default:
				break;
		}
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	//Handling feedback from backend.
	const HandleStatus = () => {
		if (status === "success") {
			return (
				<Alert variant="filled" elevation={6} severity="success">
					You are good to go!
				</Alert>
			);
		}
		return (
			<Alert
				severity="error"
				variant="filled"
				elevation={6}
				onClose={() => {
					setStatus("");
				}}
			>
				{status}
			</Alert>
		);
	};

	//Fetch sign up API.
	const signUp = async (e) => {
		setStatus("");
		const msg = await myFetch("/api/shared/users/signup", "POST", {
			email: email,
			password: password,
			firstName: firstName,
			lastName: lastName,
			subjects: chosenSubjects,
			userType: userType,
		});

		if (msg.success) {
			setStatus("success");
			handleNext();
			Cookies.set("meetute", msg.token);
			setAuth(true);
		} else {
			setStatus(msg.error);
			if (msg.error.includes("ype")) {
				setActiveStep(0);
			}
			if (msg.error.includes("Name")) {
				setActiveStep(1);
			}
			if (msg.error.includes("email")) {
				setActiveStep(2);
			}
			if (msg.error.includes("password")) {
				setActiveStep(3);
			}
		}
	};

	return (
		<div className={classes.root}>
			<Typography variant="h1">
				<br />
			</Typography>
			{isWidthUp("sm", width) ? (
				<Stepper activeStep={activeStep} getSteps={getSteps} />
			) : null}

			<Container maxWidth="md">
				<Grow in={status !== ""}>
					<Paper elevation={0}>
						<HandleStatus />
					</Paper>
				</Grow>
				<br />
			</Container>
			<Collapse in={!loading} timeout={1000}>
				{loading ? null : (
					<div>
						{steps.map(({ title, text, cardID }) => (
							<StepCard
								cardID={cardID}
								title={title}
								text={text}
								handleBack={handleBack}
								handleNext={handleNext}
								activeStep={activeStep}
								userType={userType}
								setUserType={setUserType}
								setEmail={setEmail}
								setFirstName={setFirstName}
								setLasName={setLasName}
								setPassword={setPassword}
								setConformPassword={setConformPassword}
								status={status}
								setChosenSubjects={setChosenSubjects}
								handleSubmit={signUp}
								key={cardID}
								allSubjects={allSubjects}
							></StepCard>
						))}
					</div>
				)}
			</Collapse>
			<Typography variant="h1">
				<br />
			</Typography>
		</div>
	);
});
