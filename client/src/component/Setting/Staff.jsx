import React, { useContext, useEffect, useState } from "react";
import {
    Grid,
    withWidth,
    isWidthUp,
    Typography,
    Tooltip,
    Fab,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Avatar,
    Grow,
    Divider,
    Snackbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import SchoolIcon from "@material-ui/icons/School";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import CreateIcon from "@material-ui/icons/Create";

import Alert from "@material-ui/lab/Alert";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";

import { myFetch, UserContext } from "../Methods";
import Add from "./Add";
import Create from "./Create";

const useStyles = makeStyles((theme) => ({
    paper: {
        maxWidth: "100%",
        marginTop: theme.spacing(10),
    },
    fab: {
        position: "fixed",
        bottom: theme.spacing(6),
        right: theme.spacing(6),
    },
}));

export default ({ user, setMySubjects, mySubjects, fetchSubject }) => {
    const classes = useStyles();
    const [openJoin, setOpenJoin] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [openSpeed, setOpenSpeed] = useState(false);
    const [subjectCode, setSubjectCode] = useState("");
    const [newName, setNewName] = useState("");

    const { type, userInfo } = user;
    const { firstName, lastName } = userInfo;

    const {
        setLoadingRoute,
        alert,
        setAlert,
        detectAlert,
        closeAlert,
    } = useContext(UserContext);

    useEffect(() => {
        fetchSubject("staff").then(setLoadingRoute(false));
    }, [alert.status]);

    const handleJoinOpen = () => {
        if (mySubjects.subjectsInfo.length > 4) {
            setAlert({
                status: "warning",
                message: "Maximum 5 subjects in your account.",
            });
            return;
        }
        setOpenJoin(true);
    };

    const leave = async (subjectCode) => {
        setLoadingRoute(true);
        const res = await myFetch("/api/staff/subjects/leave", "POST", {
            subjectCode: subjectCode,
        });
        detectAlert(res, `You have successfully left subject ${subjectCode}.`);

        setLoadingRoute(false);
    };

    console.log(mySubjects);
    if (!mySubjects.subjectsInfo) return null;

    return (
        <div>
            <SpeedDial
                ariaLabel="SpeedDial example"
                className={classes.fab}
                icon={<SpeedDialIcon />}
                open={openSpeed}
                onClose={() => {
                    setOpenSpeed(false);
                }}
                onOpen={() => {
                    setOpenSpeed(true);
                }}
                direction="up"
            >
                <SpeedDialAction
                    icon={<AddIcon />}
                    tooltipTitle="Join new subject"
                    onClick={handleJoinOpen}
                />
                <SpeedDialAction
                    icon={<CreateIcon />}
                    tooltipTitle="Create new subject"
                    onClick={() => {
                        closeAlert();
                        setOpenCreate(true);
                    }}
                />
            </SpeedDial>

            <Add
                open={openJoin}
                handleDialogClose={() => {
                    setOpenJoin(false);
                }}
                subjectCode={subjectCode}
                setSubjectCode={setSubjectCode}
                userType="staff"
            />
            <Create
                open={openCreate}
                handleDialogClose={() => {
                    setOpenCreate(false);
                }}
                subjectCode={subjectCode}
                setSubjectCode={setSubjectCode}
                subjectName={newName}
                setSubjectName={setNewName}
            />

            <Grid container justify="center" alignItems="center">
                <Grid item xs={12}>
                    <Typography
                        variant="h5"
                        style={{ fontWeight: 900, color: "#455a64" }}
                    >
                        Your current subject list:
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    {mySubjects.subjectsInfo.map(
                        ({ subjectCode, subjectName }, index) => (
                            <Grow in timeout={index + 1 * 200} key={index}>
                                <List>
                                    <Divider />
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <SchoolIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={subjectCode}
                                            secondary={subjectName}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton
                                                edge="end"
                                                aria-label="delete"
                                                onClick={() => {
                                                    leave(subjectCode);
                                                }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    <Divider />
                                </List>
                            </Grow>
                        )
                    )}
                </Grid>
            </Grid>
        </div>
    );
};
