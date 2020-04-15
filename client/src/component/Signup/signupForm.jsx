import React, { useContext, useState } from "react";
import { Typography, Container, Grow, Paper } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { AuthApi } from "./../Methods";
import Cookies from "js-cookie";

import Alert from "@material-ui/lab/Alert";

import Stepper from "./stepper";

import StepCard from "./stepCard";

function getSteps() {
    return ["Character", "Name", "Email", "Password", "Subjects"];
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
        text: "set your password:",
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
    paper: {
        minHeight: "50VH",
    },
}));

export default () => {
    const classes = useStyles();

    //Sign up states
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLasName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConformPassword] = useState("");
    const [status, setStatus] = useState("");
    const [subjects, setSubjects] = useState(["INFO30005"]);

    //Steps states
    const [activeStep, setActiveStep] = React.useState(0);
    const handleNext = () => {
        switch (activeStep) {
            case 1:
                if (firstName == "" || lastName == "") {
                    return;
                }
                break;
            case 2:
                if (email == "" || !email.includes("@")) {
                    return;
                }
                break;
            case 3:
                if (password == "" || confirmPassword == "") {
                    return;
                }
                if (password != confirmPassword) {
                    setStatus("Sorry password does not match");

                    return;
                }
                break;
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const HandleStatus = () => {
        if (status == "success") {
            return <Alert severity="success">You are good to go!</Alert>;
        }
        return (
            <Alert
                severity="error"
                onClose={() => {
                    setStatus("");
                }}
            >
                {status}
            </Alert>
        );
    };

    const { setAuth } = useContext(AuthApi);
    const signUp = async (e) => {
        setStatus("");
        console.log(password + email);

        const res = await fetch("/api/users/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                subjects: subjects,
            }),
        });
        const msg = await res.json();

        if (msg.success) {
            setStatus("success");
            handleNext();
            setAuth(true);
            Cookies.set("user", "loginTrue");
        } else {
            console.log(msg);
            setStatus(msg.message);
            if (msg.message === "Error! FirstName cannot be blank") {
                setActiveStep(1);
            }
            if (msg.message === "Error! LastName cannot be blank") {
                setActiveStep(1);
            }
            if (msg.message === "Error! email cannot be blank") {
                setActiveStep(2);
            }
            if (msg.message === "Error! password cannot be blank") {
                setActiveStep(3);
            }
        }
    };

    return (
        <div className={classes.root}>
            <Typography variant="h1">
                <br />
            </Typography>

            <Container maxWidth="md">
                <Grow in={status != ""}>
                    <Paper elevation={0}>
                        <HandleStatus />
                    </Paper>
                </Grow>
            </Container>
            <Stepper activeStep={activeStep} getSteps={getSteps} />
            <div>
                {steps.map(({ title, text, cardID }) => (
                    <StepCard
                        cardID={cardID}
                        title={title}
                        text={text}
                        handleBack={handleBack}
                        handleNext={handleNext}
                        activeStep={activeStep}
                        setEmail={setEmail}
                        setFirstName={setFirstName}
                        setLasName={setLasName}
                        setPassword={setPassword}
                        setConformPassword={setConformPassword}
                        status={status}
                        setSubjects={setSubjects}
                        handleSubmit={signUp}
                    ></StepCard>
                ))}
            </div>
            <Typography variant="h1">
                <br />
            </Typography>
        </div>
    );
};
