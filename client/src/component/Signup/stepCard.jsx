import React from "react";
import {
    Grid,
    Paper,
    Typography,
    Collapse,
    Button,
    Fab,
    Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import NextIcon from "@material-ui/icons/ArrowForward";
import BackIcon from "@material-ui/icons/ArrowBack";
import SchoolIcon from "@material-ui/icons/School";
import MyField from "../Login/MyField";
import Subjects from "./subjects";

const useStyles = makeStyles((theme) => ({
    paper: {
        background: theme.background,

        [theme.breakpoints.down("sm")]: {
            marginTop: theme.spacing(8),
        },
    },
    buttons: {
        marginTop: theme.spacing(2),
    },
    staff: {
        minHeight: "4rem",
        background: "linear-gradient(to right, #f7985d 0%, #f7985d 100%)",
        borderRadius: 30,
    },
    student: {
        minHeight: "4rem",
        background: "linear-gradient(to right, #f7985d 0%, #f7985d 100%)",
        borderRadius: 30,
    },
    largeIcon: {
        width: 30,
        height: 30,
    },
    noDecoration: {
        textDecoration: "none !important",
    },
    SchoolIcon: {
        marginRight: theme.spacing(1),
    },
}));

/***
 * The step card in sign up page.
 */
export default (props) => {
    const classes = useStyles();

    //props for handling steps.
    const {
        activeStep,
        handleNext,
        handleBack,
        text,
        cardID,
        handleSubmit,
    } = props;

    //props for handling sign up information.
    const {
        setEmail,
        userType,
        setUserType,
        setFirstName,
        setLasName,
        setPassword,
        setConformPassword,
        status,
        setChosenSubjects,
        allSubjects,
    } = props;

    //Buttons for each step.
    const getButton = (cardID) => {
        switch (cardID) {
            case 5:
                return (
                    <Grid container justify="space-between" alignItems="center">
                        <Grid item xs={12}>
                            <Grid container justify="center">
                                <Link to="/" className={classes.noDecoration}>
                                    <Fab
                                        variant="extended"
                                        color="primary"
                                        aria-label="add"
                                    >
                                        <SchoolIcon
                                            className={classes.SchoolIcon}
                                        />
                                        Start your meetute life
                                    </Fab>
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                );

            case 4:
                return (
                    <Grid container justify="space-between" alignItems="center">
                        <Grid item xs={3}>
                            <Button
                                disabled={cardID === 0}
                                onClick={handleBack}
                                size="large"
                                fullWidth
                            >
                                <BackIcon />
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button
                                onClick={handleSubmit}
                                size="large"
                                fullWidth
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                );

            default:
                return (
                    <Grid container justify="space-between" alignItems="center">
                        <Grid item xs={3}>
                            <Button
                                disabled={cardID === 0}
                                onClick={handleBack}
                                size="large"
                                fullWidth
                            >
                                <BackIcon />
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button
                                onClick={handleNext}
                                size="large"
                                type="submit"
                                fullWidth
                            >
                                <NextIcon />
                            </Button>
                        </Grid>
                    </Grid>
                );
        }
    };

    //Fields for each step.
    const getField = (cardID) => {
        switch (cardID) {
            case 0:
                return (
                    <Autocomplete
                        id="combo-box-demo"
                        options={["student", "staff"]}
                        defaultValue="student"
                        getOptionLabel={(option) => option}
                        value={userType}
                        onChange={(event, newValue) => {
                            setUserType(newValue);
                        }}
                        renderInput={(params) => {
                            return (
                                <TextField
                                    {...params}
                                    label="I'm a"
                                    variant="filled"
                                    required
                                />
                            );
                        }}
                    />
                );
            case 2:
                return (
                    <MyField
                        label="Please Enter your Email"
                        setState={setEmail}
                        required={true}
                        type="email"
                        error={
                            status === "Error! email cannot be blank"
                                ? status
                                : ""
                        }
                    />
                );
            case 3:
                return (
                    <div>
                        <MyField
                            label="Set Password"
                            setState={setPassword}
                            required={true}
                            type={"password"}
                            error={
                                status === "Error! password cannot be blank"
                                    ? status
                                    : ""
                            }
                        />
                        <MyField
                            label="Confirm Password"
                            setState={setConformPassword}
                            required={true}
                            type={"password"}
                            error={
                                status === "Error! password cannot be blank"
                                    ? status
                                    : ""
                            }
                        />
                    </div>
                );
            case 4:
                return (
                    <Subjects
                        allSubjects={allSubjects}
                        setChosenSubjects={setChosenSubjects}
                    />
                );
            case 1:
                return (
                    <div>
                        <MyField
                            label="First Name"
                            setState={setFirstName}
                            required={true}
                            error={
                                status === "Error! FirstName cannot be blank"
                                    ? status
                                    : ""
                            }
                        />

                        <MyField
                            label="Last Name"
                            setState={setLasName}
                            required={true}
                            error={
                                status === "Error! lastName cannot be blank"
                                    ? status
                                    : ""
                            }
                        />
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div>
            <Collapse in={activeStep === cardID} timeout={500}>
                <Paper
                    variant="elevation"
                    elevation={0}
                    className={classes.paper}
                >
                    <Container maxWidth="md">
                        <Typography align="center" variant="h4">
                            {text}
                            <br />
                            <br />
                        </Typography>

                        <Container className={classes.buttons} maxWidth="sm">
                            <form
                                onSubmit={(event) => {
                                    event.preventDefault();
                                }}
                            >
                                {getField(cardID)}
                                <br />
                                {getButton(cardID)}
                            </form>
                        </Container>
                    </Container>
                </Paper>
            </Collapse>
        </div>
    );
};
