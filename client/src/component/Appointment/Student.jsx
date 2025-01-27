import React, { useContext, useEffect, useState } from "react";
import {
    Grid,
    Button,
    ButtonGroup,
    Fade,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import TimeTable from "../Timetable";
import Header from "./StudentHeader";
import Content from "./StudentContent";
import StudentQuery from "./StudentQuery";
import TimetableBar from "./TimetableBar";
import { myFetch, UserContext, StudentContext } from "../Methods";
import legend from "./legend.svg";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
    paper: {
        maxHeight: "70VH",
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
    query: {
        maxHeight: "30VH",
        height: "30VH",
        overflow: "scroll",
    },
    table: {
        marginTop: theme.spacing(4),
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
 * Dialog for student to cancel a consultation.
 */
const CancelDialog = ({
    cancelAppointment,
    setCancelAppointment,
    classes,
    cancel,
}) => (
    <Dialog
        open={cancelAppointment !== ""}
        onClose={() => setCancelAppointment("")}
        fullWidth
    >
        <DialogTitle>Delete your Appointment?</DialogTitle>
        <DialogContent>Do you want to delete this Appointment?</DialogContent>
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
                    variant="contained"
                    onClick={cancel}
                    className={classes.delete}
                >
                    Yes, please delete it.
                </Button>
            </ButtonGroup>
        </DialogActions>
    </Dialog>
);

/***
 * Consultation page for student.
 */
export default withWidth()(({ width }) => {
    const classes = useStyles();
    const largeScreen = isWidthUp("lg", width);
    //timetable values...
    const [data, setData] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [cancelAppointment, setCancelAppointment] = useState("");
    const [loading, setLoading] = useState(true);

    //Timetable bar....
    const [currentStatus, setCurrentStatus] = useState(0);
    const [mainResourceName, setMainResourceName] = useState("status");

    const { alert, detectAlert, user, setUser } = useContext(UserContext);
    const { userInfo } = user;

    //Reloading user information.
    const reloadUser = async () => {
        const res = await myFetch("/api/shared/users/info", "GET");
        detectAlert(res);
        setUser(res);
        return res;
    };

    const formatData = (data, status) => {
        //Formatting data for timetable to render.
        const appoints = [];
        data.map((appointment) => {
            switch (status) {
                case 1:
                    if (appointment.status !== "PENDING") return null;
                    break;
                case 2:
                    if (appointment.status !== "APPROVED") return null;
                    break;
                case 3:
                    if (appointment.status !== "DECLINED") return null;
                    break;
                default:
                    break;
            }
            appoints.push({
                title: appointment.subjectCode,
                startDate: new Date(appointment.startDate),
                endDate: new Date(appointment.endDate),
                id: appointment._id,
                location: appointment.location,
                status: appointment.status,
                staff: appointment.staff,
                comments: appointment.comment,
            });
            return null;
        });
        setData(appoints);
        setLoading(false);
    };

    //Fetch the consultations of the current subject.
    const fetchAppoint = async () => {
        setLoading(true);
        const res = await myFetch("/api/student/appointment/all", "GET");
        detectAlert(res);
        return res.appointments;
    };

    //Updating consultations Information.
    useEffect(() => {
        reloadUser().then((user) => {
            fetchAppoint().then((appointments) =>
                formatData(appointments, currentStatus)
            );
        });
    }, [alert.status, currentStatus]);

    //Cancel an consultation.
    const cancel = async () => {
        setLoading(true);
        const body = {
            id: cancelAppointment,
        };
        const res = await myFetch(
            "/api/student/appointment/delete",
            "DELETE",
            body
        );
        detectAlert(res, "Successfully Deleted.");
        setCancelAppointment("");
    };

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
                setUser,
            }}
        >
            <CancelDialog
                cancelAppointment={cancelAppointment}
                setCancelAppointment={setCancelAppointment}
                classes={classes}
                cancel={cancel}
            />
            <Fade in timeout={500}>
                <div className={classes.paper}>
                    <Grid container justify="space-around">
                        <Grid
                            item
                            xs={largeScreen ? 3 : 12}
                            className={
                                largeScreen ? classes.noStyle : classes.query
                            }
                        >
                            <StudentQuery userInfo={userInfo} />
                        </Grid>
                        <Grid
                            item
                            xs={largeScreen ? 8 : 12}
                            className={
                                largeScreen ? classes.noStyle : classes.table
                            }
                        >
                            <TimetableBar
                                currentStatus={currentStatus}
                                setCurrentStatus={setCurrentStatus}
                                mainResourceName={mainResourceName}
                                setMainResourceName={setMainResourceName}
                                data={data}
                                setData={setData}
                            />
                            <Grid container justify="flex-end">
                                <img
                                    className={classes.legend}
                                    src={legend}
                                    alt="legend"
                                />
                            </Grid>
                            <TimeTable
                                data={data}
                                currentDate={currentDate}
                                setCurrentDate={setCurrentDate}
                                header={Header}
                                content={Content}
                                loading={loading}
                                mainResourceName={mainResourceName}
                                subjects={user.userInfo.subjects}
                                halfScreen={largeScreen ? false : true}
                            />
                        </Grid>
                    </Grid>
                </div>
            </Fade>
        </StudentContext.Provider>
    );
});
