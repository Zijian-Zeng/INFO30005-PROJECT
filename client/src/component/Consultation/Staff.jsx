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
    Grow,
    Snackbar,
    Fab,
    Zoom,
    Collapse,
    Fade,
} from "@material-ui/core";
import { makeStyles, withStyles, lighten } from "@material-ui/core/styles";
import TimeTable from "../Timetable";

import ConsultDialog from "./ConsultDialog";

import Header from "./StaffHeader";
import Content from "./StaffContent";
import legend from "./legend.svg";

import { myFetch, UserContext, StaffContext } from "../Methods";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
    paper: {
        maxWidth: "100%",
        marginTop: theme.spacing(10),
    },
    fab: {
        position: "fixed",
        bottom: theme.spacing(1) * 6,
        right: theme.spacing(1) * 6,
    },
}));

export default () => {
    const classes = useStyles();

    const [data, setData] = useState([]);

    //timetable values...
    const [currentDate, setCurrentDate] = useState("2020-5-11");
    const [createOpen, setCreateOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const [editingAppointment, setEditingAppointment] = useState({
        title: "",
        startDate: new Date(),
        endDate: new Date(),
        slotsAvailable: 0,
        location: "",
    });

    const { alert, user } = useContext(UserContext);
    //Updating consultations Information.
    useEffect(() => {
        setLoading(true);
        //Fetch all created consultations.
        const fetchConsult = async () => {
            const res = await myFetch("/api/staff/consult/viewCreated", "GET");
            return res.consultations;
        };
        fetchConsult().then((consultations) => {
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
                });
            });
            setData(consults);
            setLoading(false);
        });
    }, [alert.status]);

    const api = {
        create: "/api/staff/consult/create",
        edit: "/api/staff/consult/patch",
        delete: "/api/staff/consult/delete",
    };

    return (
        <StaffContext.Provider
            value={{
                currentDate,
                setCurrentDate,
                createOpen,
                setCreateOpen,
                data,
                setData,
                editOpen,
                setEditOpen,
                setEditingAppointment,
                editingAppointment,
                loading,
                setLoading,
                api,
            }}
        >
            <Fade in timeout={500}>
                <div>
                    <TimeTable
                        data={data}
                        currentDate={currentDate}
                        setCurrentDate={setCurrentDate}
                        header={Header}
                        content={Content}
                        loading={loading}
                        mainResourceName="title"
                        subjects={user.userInfo.subjects}
                    />
                    <ConsultDialog
                        open={createOpen}
                        toggle={() => {
                            setCreateOpen(!createOpen);
                        }}
                    />
                    <ConsultDialog
                        open={editOpen}
                        editingAppointment={editingAppointment}
                        toggle={() => {
                            setEditOpen(!editOpen);
                            setEditingAppointment({
                                title: "",
                                startDate: new Date(),
                                endDate: new Date(),
                                slotsAvailable: 0,
                                location: "",
                            });
                        }}
                        edit
                        context={StaffContext}
                    />
                </div>
            </Fade>
            <Zoom in timeout={1000}>
                <Fab
                    color="primary"
                    className={classes.fab}
                    onClick={() => {
                        setCreateOpen(true);
                    }}
                >
                    <AddIcon />
                </Fab>
            </Zoom>
        </StaffContext.Provider>
    );
};
