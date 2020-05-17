import React, { useContext, useEffect, useState } from "react";
import {
    Grid,
    Grow,
    ListItem,
    List,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Select,
    MenuItem,
    Button,
    ButtonGroup,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Slider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { myFetch, UserContext } from "../Methods";
import ScheduleIcon from "@material-ui/icons/Schedule";
import RoomIcon from "@material-ui/icons/Room";
import CloseIcon from "@material-ui/icons/Close";

import MomentUtils from "@date-io/moment";
import {
    KeyboardDateTimePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import Skeleton from "@material-ui/lab/Skeleton";
import { Send } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    icon: {
        margin: "auto",
    },
    delete: {
        backgroundColor:
            "linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)",
        "&:hover": {
            backgroundColor: "#52af77",
        },
    },
    select: {
        marginTop: theme.spacing(10),
    },
    skeleton: {
        width: "20WH",
    },
}));

/***
 * marks for slider.
 */
const marks = [
    {
        value: 0,
        label: "0 Minutes",
    },
    {
        value: 60,
        label: "1 hour",
    },
    {
        value: 120,
        label: "2 hours",
    },
    {
        value: 240,
        label: "4 hours",
    },
];

const getDuration = (startDate, endDate) => {
    const duration = (endDate - startDate) / 60000;
    if (duration < 15) return 15;
    if (duration > 300) return 300;
    return duration;
};

const getEndDate = (start, duration) => {
    const end = new Date(start);
    return end.setMinutes(end.getMinutes() + duration);
};

/***
 * Dialog for students to create an appointment.
 */
const CreateDialog = ({
    staffInfo,
    classes,
    startDate,
    endDate,
    location,
    comments,
    toggle,
    createAppointment,
    setStartDate,
    setEndDate,
    setLocation,
    setComments,
    open,
    setLoading,
}) => {
    return (
        <Dialog
            open={open}
            onClose={toggle}
            aria-labelledby="form-dialog-title"
            fullWidth
        >
            <DialogTitle id="form-dialog-title">
                {`Creating an appointment for ${staffInfo.firstName} ${staffInfo.lastName}`}
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={toggle}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Grid container>
                    <Grid item xs={1}>
                        <ScheduleIcon className={classes.icon} />
                    </Grid>
                    <Grid item xs={11}>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <KeyboardDateTimePicker
                                label="Start Date"
                                value={startDate}
                                onChange={(date) => {
                                    setStartDate(date);
                                }}
                                fullWidth
                                required
                            />
                        </MuiPickersUtilsProvider>
                        <br />
                        <br />
                    </Grid>
                    <Grid item xs={1}>
                        <br />
                        <ScheduleIcon className={classes.icon} />
                    </Grid>
                    <Grid item xs={11}>
                        <DialogContentText>
                            {"Duration: "}
                            {getDuration(startDate, endDate)}
                            {" Minutes"}
                        </DialogContentText>
                        <br />
                        <Slider
                            valueLabelDisplay="auto"
                            marks={marks}
                            aria-labelledby="discrete-slider"
                            getAriaValueText={(value) => `${value} Minutes`}
                            value={getDuration(startDate, endDate)}
                            onChange={(e, newValue) => {
                                setEndDate(getEndDate(startDate, newValue));
                            }}
                            step={15}
                            max={300}
                        />
                        <br />
                        <br />
                    </Grid>
                    <Grid item xs={1}>
                        <RoomIcon className={classes.icon} />
                    </Grid>
                    <Grid item xs={11}>
                        <TextField
                            label="Location"
                            variant="filled"
                            required
                            value={location}
                            onChange={(e) => {
                                setLocation(e.target.value);
                            }}
                            fullWidth
                        />
                        <DialogContentText>
                            <br />
                        </DialogContentText>
                    </Grid>
                    <Grid item xs={1}>
                        <Send className={classes.icon} />
                    </Grid>
                    <Grid item xs={11}>
                        <TextField
                            label="Request Reason"
                            multiline
                            fullWidth
                            rowsMax={4}
                            value={comments}
                            onChange={(e) => {
                                setComments(e.target.value);
                            }}
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions>
                <ButtonGroup fullWidth>
                    <Button fullWidth onClick={toggle}>
                        Cancel
                    </Button>
                    <Button
                        fullWidth
                        color="primary"
                        variant="contained"
                        onClick={() => {
                            createAppointment().then((res) => {
                                setLoading(false);
                            });
                        }}
                    >
                        Create
                    </Button>
                </ButtonGroup>
            </DialogActions>
        </Dialog>
    );
};

/***
 * The student query component for booking appointments.
 */
export default ({ userInfo }) => {
    const classes = useStyles();

    //For select bar
    const [currentSubject, setCurrentSubject] = useState(userInfo.subjects[0]);
    const [loading, setLoading] = useState(true);

    //Appointment data...
    const [staffs, setStaffs] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [location, setLocation] = useState("");
    const [comments, setComments] = useState("");
    const [staffInfo, setStaffInfo] = useState({});

    const [open, setOpen] = useState(false);
    const { detectAlert, setAlert } = useContext(UserContext);

    //Fetch the appointments of the current subject.
    const fetchStaffs = async () => {
        setLoading(true);

        const res = await myFetch("/api/student/subjects/allStaff", "POST", {
            subjectCode: currentSubject,
        });
        setStaffs(res.staffsInfo);

        if (!res) return;
        setLoading(false);
    };

    //Create a valid appointment with back end.
    const createAppointment = async () => {
        setLoading(true);
        if (!startDate || !endDate || location === "") {
            setAlert({ status: "warning", message: "Insufficient Input." });
            return;
        }
        const body = {
            subjectCode: currentSubject,
            startDate: startDate,
            endDate: getEndDate(startDate, getDuration(startDate, endDate)),
            location: location,
            staffId: staffInfo._id,
            comment: comments,
        };
        const res = await myFetch(
            "/api/student/appointment/request",
            "POST",
            body
        );
        detectAlert(res, "Successfully created.");
        toggle();
        return res;
    };

    const toggle = () => setOpen(!open);

    //Updating appointments Information.
    useEffect(() => {
        fetchStaffs();
    }, [currentSubject]);

    //Loading...
    if (loading)
        return (
            <div>
                <Select
                    value={currentSubject}
                    onChange={(event) => {
                        setCurrentSubject(event.target.value);
                    }}
                    fullWidth
                    variant="outlined"
                >
                    {userInfo.subjects.map((subject) => (
                        <MenuItem value={subject} key={subject}>
                            {subject}
                        </MenuItem>
                    ))}
                </Select>
                <List>
                    {[1, 2, 3].map((index) => (
                        <Grow in key={index} timeout={index * 500}>
                            <ListItem button>
                                <ListItemAvatar>
                                    <Skeleton
                                        animation="wave"
                                        variant="circle"
                                        width={40}
                                        height={40}
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={<Skeleton animation="wave" />}
                                    secondary={<Skeleton animation="wave" />}
                                ></ListItemText>
                            </ListItem>
                        </Grow>
                    ))}
                </List>
            </div>
        );

    return (
        <div>
            <Select
                value={currentSubject}
                onChange={(event) => {
                    setCurrentSubject(event.target.value);
                }}
                fullWidth
                variant="outlined"
            >
                {userInfo.subjects.map((subject) => (
                    <MenuItem value={subject} key={subject}>
                        {subject}
                    </MenuItem>
                ))}
            </Select>
            <CreateDialog
                staffInfo={staffInfo}
                classes={classes}
                startDate={startDate}
                endDate={endDate}
                location={location}
                comments={comments}
                toggle={toggle}
                createAppointment={createAppointment}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                setLocation={setLocation}
                setComments={setComments}
                open={open}
                setLoading={setLoading}
            />
            <List>
                {staffs.map((staff, index) => (
                    <Grow in timeout={index * 200} key={index}>
                        <ListItem
                            button
                            onClick={() => {
                                setOpen(true);
                                setStaffInfo(staff);
                            }}
                        >
                            <ListItemAvatar>
                                <Avatar />
                            </ListItemAvatar>
                            <ListItemText
                                primary={`${staff.firstName} ${staff.lastName}`}
                                secondary={staff.email}
                            />
                        </ListItem>
                    </Grow>
                ))}
            </List>
        </div>
    );
};
