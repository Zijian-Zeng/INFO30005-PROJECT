import React, { useContext, useEffect, useState } from "react";
import {
    Grid,
    CardContent,
    withWidth,
    isWidthUp,
    Button,
    IconButton,
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
    Grow,
} from "@material-ui/core";
import { makeStyles, withStyles, lighten } from "@material-ui/core/styles";
import { red, green, lightBlue } from "@material-ui/core/colors";
import { myFetch, UserContext, StudentContext } from "../Methods";
import {
    KeyboardTimePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

import RoomIcon from "@material-ui/icons/Room";

import AutorenewIcon from "@material-ui/icons/Autorenew";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import CancelIcon from "@material-ui/icons/Cancel";

import DeleteIcon from "@material-ui/icons/Delete";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PeopleIcon from "@material-ui/icons/People";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import BlockIcon from "@material-ui/icons/Block";
import AddIcon from "@material-ui/icons/PlaylistAdd";

const useStyles = makeStyles((theme) => ({
    paper: {
        maxWidth: "100%",
        marginTop: theme.spacing(10),
    },
    cardHeader: {
        background: theme.palette.primary,
    },
    registered: {
        background: green[100],
    },
    normal: {
        background: lightBlue[100],
    },
}));

const getAction = (hub, user, setDeleteHub, join) => {
    if (hub.creator.email == user.userInfo.email)
        return (
            <IconButton onClick={() => setDeleteHub(hub.id)}>
                <DeleteIcon />
            </IconButton>
        );
    if (hub.registered)
        return (
            <IconButton onClick={() => setDeleteHub(hub.id)}>
                <BlockIcon />
            </IconButton>
        );
    return (
        <IconButton
            onClick={() => {
                join(hub.id);
            }}
        >
            <AddIcon />
        </IconButton>
    );
};

export default ({
    date,
    hub,
    loading,
    time,
    setDeleteHub,
    setLoading,
    setHubs,
    fetchHubs,
    currentSubject,
    detectAlert,
    userInfo,
}) => {
    const classes = useStyles();

    const [openStudent, setOpenStudent] = useState(false);

    const { user } = useContext(UserContext);

    const join = async (id) => {
        setLoading(true);

        const res = await myFetch("/api/student/hub/join", "POST", {
            id: id,
        });
        detectAlert(res, "Successfully joined.");

        const subjectHubs = await await fetchHubs(
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
        <Grow in={!loading} timeout={time}>
            <Card>
                <CardHeader
                    title={hub.summary}
                    subheader={`${hub.creator.firstName} ${hub.creator.lastName}(${hub.creator.email})`}
                    className={
                        hub.registered ? classes.registered : classes.normal
                    }
                    avatar={<Avatar>{hub.creator.lastName.charAt(0)}</Avatar>}
                    action={getAction(hub, user, setDeleteHub, join)}
                />
                <CardContent>
                    <List>
                        <ListItem
                            button
                            onClick={() => setOpenStudent(!openStudent)}
                        >
                            <ListItemIcon>
                                <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Members" />
                            {openStudent ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={openStudent} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <div className={classes.scroll}>
                                    {hub.students.map((student, index) => (
                                        <ListItem key={index}>
                                            <ListItemIcon>
                                                <AccountCircleIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={`${student.firstName} ${student.lastName}`}
                                                secondary={student.email}
                                            />
                                        </ListItem>
                                    ))}
                                </div>
                            </List>
                        </Collapse>
                        <ListItem>
                            <ListItemIcon>
                                <AccessAlarmIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={`Let's meet up every ${hub.day} at:`}
                            />
                        </ListItem>

                        <ListItem>
                            <ListItemIcon>
                                <AutorenewIcon />
                            </ListItemIcon>
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <KeyboardTimePicker
                                    openTo="hours"
                                    value={hub.startDate}
                                    onChange={() => {}}
                                    fullWidth
                                />
                            </MuiPickersUtilsProvider>
                        </ListItem>

                        <ListItem>
                            <ListItemIcon>
                                <RoomIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Location"
                                secondary={hub.location}
                            />
                        </ListItem>
                    </List>
                </CardContent>
            </Card>
        </Grow>
    );
};
