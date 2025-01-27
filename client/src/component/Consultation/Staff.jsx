import React, { useContext, useEffect, useState } from "react";
import { Fab, Zoom, Fade } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TimeTable from "../Timetable";
import ConsultDialog from "./ConsultDialog";
import Header from "./StaffHeader";
import Content from "./StaffContent";
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

/***
 * Consultation page for staff
 */
export default () => {
    const classes = useStyles();

    const [data, setData] = useState([]);

    //timetable values...
    const [currentDate, setCurrentDate] = useState("2020-5-11");
    const [createOpen, setCreateOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    //Consultation details for editing.
    const [editingAppointment, setEditingAppointment] = useState({
        title: "",
        startDate: new Date(),
        endDate: new Date(),
        slotsAvailable: 0,
        location: "",
    });

    //Updating consultations Information.
    const { alert, user } = useContext(UserContext);
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

    //Backend APIs.
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
