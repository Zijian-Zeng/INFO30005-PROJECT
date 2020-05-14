import React, { useContext, useEffect, useState } from "react";
import {
    Grid,
    CardContent,
    withWidth,
    isWidthUp,
    Button,
    Paper,
    Typography,
    LinearProgress,
    Card,
    CardHeader,
    List,
    ListItem,
    ListItemAvatar,
    Collapse,
    ListItemIcon,
    ListItemText,
    Avatar,
    AppBar,
    Select,
    Tab,
    Tabs,
    MenuItem,
    Tooltip,
    Fab,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    Grow,
    Slider,
    Zoom,
    TextField,
    DialogContentText,
    ButtonGroup,
} from "@material-ui/core";
import { makeStyles, withStyles, lighten } from "@material-ui/core/styles";
import { red, green, grey } from "@material-ui/core/colors";
import { myFetch, UserContext, StudentContext } from "../Methods";
import {
    KeyboardTimePicker,
    MuiPickersUtilsProvider,
    KeyboardDateTimePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import Autocomplete from "@material-ui/lab/Autocomplete";

import RoomIcon from "@material-ui/icons/Room";

import AutorenewIcon from "@material-ui/icons/Autorenew";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import CancelIcon from "@material-ui/icons/Cancel";

import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import SchoolIcon from "@material-ui/icons/School";
import ScheduleIcon from "@material-ui/icons/Schedule";
import GroupIcon from "@material-ui/icons/GroupAddTwoTone";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/PlaylistAdd";
import CreateIcon from "@material-ui/icons/Add";

import HubCard from "./HubCard";
import { Create } from "@material-ui/icons";

import CreateDialog from "./CreateDialog";
const useStyles = makeStyles((theme) => ({
    paper: {
        maxWidth: "100%",
        marginTop: theme.spacing(10),
    },
    hub: {
        marginTop: theme.spacing(5),
    },
    fab: {
        position: "fixed",
        bottom: theme.spacing(1) * 10,
        right: theme.spacing(1) * 8,
    },
    icon: {
        margin: "auto",
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
}));

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

//Fetch the appointments of the current subject.
const fetchHubs = async (currentSubject, detectAlert, setLoading, userInfo) => {
    setLoading(true);
    if (currentSubject == 0) {
        const res = await myFetch("/api/student/hub/registered", "GET");
        return res.subjectHubs;
    }
    const body = {
        subjectCode: userInfo.subjects[currentSubject - 1],
    };
    const res = await myFetch("/api/student/hub/all", "POST", body);
    detectAlert(res);
    return res.subjectHubs;
};

const DeleteDialog = ({
    leaveHub,
    setDeleteHub,
    classes,
    setLoading,
    setAlert,
    detectAlert,
    setHubs,
    currentSubject,
    userInfo,
}) => {
    const deleteing = async () => {
        setLoading(true);
        const body = {
            id: leaveHub,
        };
        const res = await myFetch("/api/student/hub/leave", "POST", body);
        detectAlert(res, "Successfully left.");
        const subjectHubs = await fetchHubs(
            currentSubject,
            detectAlert,
            setLoading,
            userInfo
        );
        if (!subjectHubs) return;
        setHubs(subjectHubs);
        setLoading(false);
    };
    return (
        <Dialog
            open={leaveHub !== ""}
            onClose={() => setDeleteHub("")}
            fullWidth
        >
            <DialogTitle>Leave the StudyHub?</DialogTitle>
            <DialogContent>Do you want to leave this study hub?</DialogContent>
            <DialogActions>
                <ButtonGroup fullWidth>
                    <Button
                        fullWidth
                        style={{
                            textTransform: "none",
                        }}
                        onClick={() => {
                            setDeleteHub("");
                        }}
                    >
                        No, thanks.
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        className={classes.delete}
                        onClick={() => {
                            setDeleteHub("");
                            deleteing();
                        }}
                    >
                        Yes, I do.
                    </Button>
                </ButtonGroup>
            </DialogActions>
        </Dialog>
    );
};

export default () => {
    const classes = useStyles();

    const { user, detectAlert, setAlert } = useContext(UserContext);

    const [date, changeDate] = useState(new Date());

    const { type, userInfo } = user;
    const { firstName, lastName } = userInfo;

    const [currentSubject, setCurrentSubject] = useState(0);
    const [loading, setLoading] = useState(true);
    const [hubs, setHubs] = useState([]);
    const [leaveHub, setDeleteHub] = useState("");
    const [openCreate, setOpenCreate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const [sortBy, setSortBy] = useState("time");

    //Updating consultations Information.
    useEffect(() => {
        fetchHubs(currentSubject, detectAlert, setLoading, userInfo).then(
            (subjectHubs) => {
                if (!subjectHubs) return;
                setHubs(subjectHubs);
                setLoading(false);
            }
        );
    }, [alert.status, currentSubject]);

    return (
        <div>
            <CreateDialog
                open={openCreate}
                setOpen={setOpenCreate}
                setLoading={setLoading}
                subjects={userInfo.subjects}
                fetchHubs={fetchHubs}
                setAlert={setAlert}
                detectAlert={detectAlert}
                setHubs={setHubs}
                userInfo={userInfo}
                currentSubject={currentSubject}
            />
            {loading ? null : (
                <Zoom in={!loading} timeout={700}>
                    <Tooltip title="Create a study hub" aria-label="add">
                        <Fab
                            color="primary"
                            size="large"
                            className={classes.fab}
                            onClick={() => {
                                setOpenCreate(true);
                            }}
                        >
                            <CreateIcon />
                        </Fab>
                    </Tooltip>
                </Zoom>
            )}
            <DeleteDialog
                setAlert={setAlert}
                detectAlert={detectAlert}
                setHubs={setHubs}
                setLoading={setLoading}
                leaveHub={leaveHub}
                setDeleteHub={setDeleteHub}
                classes={classes}
                currentSubject={currentSubject}
                detectAlert={detectAlert}
                userInfo={userInfo}
            />

            <AppBar position="relative" color="default">
                <Grid container justify="space-between">
                    <Grid item xs={10}>
                        <Tabs
                            value={currentSubject}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={(event, newValue) => {
                                setCurrentSubject(newValue);
                                if (newValue == currentSubject)
                                    setCurrentSubject(newValue);
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
                    <Grid item xs={2}>
                        <Select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            variant="outlined"
                            fullWidth
                        >
                            <MenuItem key="time" value="time">
                                time
                            </MenuItem>
                            <MenuItem key="trending" value="trending">
                                trending
                            </MenuItem>
                        </Select>
                    </Grid>
                </Grid>
            </AppBar>

            <Grid container justify="space-around" alignItems="center">
                {hubs.map((hub, index) => (
                    <Grid key={index} item xs={5} className={classes.hub}>
                        <HubCard
                            hub={hub}
                            loading={loading}
                            time={(index + 1) * 200}
                            setDeleteHub={setDeleteHub}
                            setLoading={setLoading}
                            setHubs={setHubs}
                            fetchHubs={fetchHubs}
                            currentSubject={currentSubject}
                            detectAlert={detectAlert}
                            userInfo={userInfo}
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};
