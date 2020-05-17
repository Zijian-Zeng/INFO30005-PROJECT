import React, { useContext, useEffect, useState } from "react";
import {
    Grid,
    Button,
    ButtonGroup,
    Fade,
    Tabs,
    AppBar,
    Tab,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    Select,
    MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import legend from "./legend.svg";
import TimeTable from "../Timetable";
import Header from "./StudentHeader";
import Content from "./StudentContent";
import { myFetch, UserContext, StudentContext } from "../Methods";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
    paper: {
        maxHeight: "60VH",
    },
    fab: {
        position: "fixed",
        bottom: theme.spacing(1) * 6,
        right: theme.spacing(1) * 6,
    },
    noDecoration: {
        textDecoration: "none !important",
    },
    delete: {
        textTransform: "none",
        color: theme.palette.getContrastText(grey[700]),
        background: grey[700],
        "&:hover": {
            color: theme.palette.getContrastText(grey[900]),
            background: grey[900],
        },
    },
    legend: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            minWidth: "40%",
            minHeight: "40%",
        },
        [theme.breakpoints.down("sm")]: {
            minWidth: "100%",
            minHeight: "100%",
        },
    },
}));

/***
 * Consultation page for student.
 */
export default withWidth()(({ width }) => {
    const classes = useStyles();

    const largeScreen = isWidthUp("lg", width);

    const [data, setData] = useState([]);

    //timetable values...
    const [currentDate, setCurrentDate] = useState(new Date());
    const [cancelAppointment, setCancelAppointment] = useState("");
    const [currentSubject, setCurrentSubject] = useState(0);
    const [loading, setLoading] = useState(true);
    const [mainResourceName, setMainResourceName] = useState("booking");
    const changeMainResource = (mainResourceName) => {
        setMainResourceName(mainResourceName);
    };

    const { alert, detectAlert, user, setUser } = useContext(UserContext);

    const reloadUser = async (simpleReload) => {
        //reloading user information.
        setLoading(true);
        const user = await myFetch("/api/shared/users/info", "GET");
        detectAlert(user);
        setUser(user);
        if (simpleReload) setLoading(false);

        return user;
    };

    //Fetch the consultations of the current subject.
    const fetchConsult = async () => {
        if (currentSubject == 0) {
            const res = await myFetch(
                "/api/student/consult/viewRegistered",
                "GET"
            );
            return res.consultations;
        }
        const body = {
            subjectCode: userInfo.subjects[currentSubject - 1],
        };
        const res = await myFetch("/api/student/consult/viewAll", "POST", body);
        return res.consultations;
    };

    const getBookingStatus = (consultation, user) => {
        if (
            user.userInfo.registeredConsult.filter(
                (each) => each == consultation._id
            ).length > 0
        )
            return "BOOKED";

        if (consultation.slotsAvailable < 1) return "FULL";
        return "AVAILABLE";
    };

    //Updating consultations Information.
    useEffect(() => {
        reloadUser(false).then((user) => {
            fetchConsult().then((consultations) => {
                if (!consultations) return;

                //Formatting data for timetable to render.
                const consults = [];

                consultations.map((consultation) => {
                    consults.push({
                        title: consultation.subjectCode,
                        startDate: new Date(consultation.startDate),
                        endDate: new Date(consultation.endDate),
                        id: consultation._id,
                        location: consultation.location,
                        slotsAvailable: consultation.slotsAvailable,
                        totalStudent: consultation.studentRegistered.length,
                        booking: getBookingStatus(consultation, user),
                    });
                });
                setData(consults);
                setLoading(false);
                console.log("?");
            });
        });
    }, [alert.status, currentSubject]);

    //Cancel a booking.
    const cancel = async () => {
        setLoading(true);
        const body = {
            id: cancelAppointment,
        };
        const res = await myFetch("/api/student/consult/cancel", "POST", body);
        detectAlert(res, "Successfully canceled.");
        setCancelAppointment("");
    };

    const { userInfo } = user;
    return (
        <StudentContext.Provider
            value={{
                currentDate,
                setCurrentDate,
                cancelAppointment,
                setCancelAppointment,
                data,
                setData,
                userInfo,
                loading,
                setLoading,
            }}
        >
            <Dialog
                open={cancelAppointment !== ""}
                onClose={() => setCancelAppointment("")}
                fullWidth
            >
                <DialogTitle>Cancel your booking?</DialogTitle>
                <DialogContent>
                    Do you want to cancel this booking?
                </DialogContent>
                <DialogActions>
                    <ButtonGroup fullWidth>
                        <Button
                            fullWidth
                            onClick={() => setCancelAppointment("")}
                            style={{
                                textTransform: "none",
                            }}
                        >
                            No, thanks.
                        </Button>
                        <Button
                            fullWidth
                            color="primary"
                            variant="contained"
                            onClick={cancel}
                            className={classes.delete}
                        >
                            Yes, please cancel it.
                        </Button>
                    </ButtonGroup>
                </DialogActions>
            </Dialog>
            <AppBar position="relative" color="default">
                <Grid container justify="space-between">
                    <Grid item xs={largeScreen ? 10 : 12}>
                        <Tabs
                            value={currentSubject}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={(event, newValue) => {
                                setCurrentSubject(newValue);
                                if (newValue == currentSubject)
                                    reloadUser(true, newValue);
                            }}
                            variant="scrollable"
                            scrollButtons="auto"
                        >
                            <Tab label="Registered" />
                            {user.userInfo.subjects.map((subject) => (
                                <Tab label={subject} key={subject} />
                            ))}
                        </Tabs>
                    </Grid>
                    {largeScreen ? (
                        <Grid item xs={2}>
                            <Select
                                value={mainResourceName}
                                onChange={(e) =>
                                    setMainResourceName(e.target.value)
                                }
                                variant="outlined"
                                fullWidth
                            >
                                <MenuItem key="booking" value="booking">
                                    Booking
                                </MenuItem>
                                <MenuItem key="title" value="title">
                                    Subjects
                                </MenuItem>
                            </Select>
                        </Grid>
                    ) : null}
                </Grid>
            </AppBar>
            <Grid container justify="flex-end">
                <img className={classes.legend} src={legend} alt="legend" />
            </Grid>

            <Fade in timeout={500}>
                <div className={classes.paper}>
                    <TimeTable
                        data={data}
                        currentDate={currentDate}
                        setCurrentDate={setCurrentDate}
                        header={Header}
                        content={Content}
                        loading={loading}
                        viewChange={true}
                        changeMainResource={changeMainResource}
                        mainResourceName={mainResourceName}
                        subjects={user.userInfo.subjects}
                    />
                </div>
            </Fade>
        </StudentContext.Provider>
    );
});
