import React, { useState, useEffect } from "react";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  Appointments,
  MonthView,
  Toolbar,
  DateNavigator,
  ViewSwitcher,
  TodayButton,
  Resources,
  AppointmentTooltip,
  AppointmentForm,
  WeekView,
  AllDayPanel,
  EditRecurrenceMenu,
  DragDropProvider,
} from "@devexpress/dx-react-scheduler-material-ui";
import { withStyles, createStyles, useTheme } from "@material-ui/styles";
import { indigo, blue, teal } from "@material-ui/core/colors";
import MomentUtils from "@date-io/moment";

import {
  Paper,
  Button,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Fab,
  makeStyles,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import LocationOn from "@material-ui/icons/LocationOn";
import Notes from "@material-ui/icons/Notes";
import Close from "@material-ui/icons/Close";
import CalendarToday from "@material-ui/icons/CalendarToday";
import Create from "@material-ui/icons/Create";
import { connectProps } from "@devexpress/dx-react-core";
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import { fade } from "@material-ui/core/styles/colorManipulator";

import classNames from "clsx";

import AppointmentFormContainer from "./StaffForm";
const appointments = [
  {
    title: "COMP10001",
    startDate: new Date("2018-07-27 9:00"),
    endDate: new Date("2018-07-27 12:00"),
    id: 0,
    location: "Room 1",
  },
  {
    title: "COMP10001",
    startDate: new Date("2018-07-28 13:00"),
    endDate: new Date("2018-07-28 14:00"),
    id: 1,
    location: "Room 1",
  },
  {
    title: "COMP10001",
    startDate: new Date("2018-07-24 12:00"),
    endDate: new Date("2018-07-24 18:00"),
    id: 2,
    location: "Room 2",
  },

  {
    title: "COMP10005",
    startDate: new Date("2018-07-24 12:00"),
    endDate: new Date("2018-07-24 18:00"),
    id: 5,
    location: "Room 5",
  },
  {
    title: "COMP10004",
    startDate: new Date("2018-07-24 12:00"),
    endDate: new Date("2018-07-24 18:00"),
    id: 4,
    location: "Room 4",
  },
  {
    title: "COMP10006",
    startDate: new Date("2018-07-24 12:00"),
    endDate: new Date("2018-07-24 18:00"),
    id: 6,
    location: "Room 2",
  },
  {
    title: "COMP10007",
    startDate: new Date("2018-07-24 12:00"),
    endDate: new Date("2018-07-24 18:00"),
    id: 7,
    location: "Room 7",
  },
];

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(1) * 10,
    right: theme.spacing(1) * 11,
  },
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
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  approve: {
    backgroundColor: green[400],
    "&:hover": {
      backgroundColor: green[600],
    },
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
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  approve: {
    backgroundColor: green[400],
    "&:hover": {
      backgroundColor: green[600],
    },
  },
  decline: {
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[700],
    },
  },
  container: {
    width: theme.spacing(68),
    padding: 0,
    paddingBottom: theme.spacing(2),
  },
  content: {
    width: theme.spacing(68),
    padding: 0,
    paddingBottom: theme.spacing(2),
  },
  header: {
    overflow: "hidden",
    paddingTop: theme.spacing(0.5),
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  approve: {
    backgroundColor: green[400],
    "&:hover": {
      backgroundColor: green[600],
    },
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 2),
  },
  closeButton: {
    float: "right",
  },
  clickButton: {
    marginLeft: theme.spacing(2),
  },
  picker: {
    marginRight: theme.spacing(2),
    "&:last-child": {
      marginRight: 0,
    },
    width: "50%",
  },
  wrapper: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(1, 0),
  },
  textField: {
    width: "100%",
  },
  approve: {
    backgroundColor: green[400],
    "&:hover": {
      backgroundColor: green[600],
    },
  },
  decline: {
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[700],
    },
  },
}));

export default () => {
  const classes = useStyles();

  const [data, setData] = useState(appointments);
  const [currentDate, setCurrentDate] = useState("2018-07-25");
  const [confirmationVisible, SetConfirmationVisible] = useState(false);
  const [editingFormVisible, setEditingFormVisible] = useState(false);
  const [deletedAppointmentId, setDeletedAppointmentId] = useState();
  const [editingAppointment, setEditingAppointment] = useState();
  const [previousAppointment, setPreviousAppointment] = useState();
  const [addedAppointment, setAddedAppointment] = useState({});
  const [startDayHour, setStartDayHour] = useState(9);
  const [endDayHour, setEndDayHour] = useState(19);
  const [isNewAppointment, setIsNewAppointment] = useState(false);

  const toggleEditingFormVisibility = () => {
    setEditingFormVisible(!editingFormVisible);
  };
  const onEditingAppointmentChange = (newEditingAppointment) => {
    setEditingAppointment(newEditingAppointment);
  };
  console.log(data);
  const commitChanges = ({ added, changed, deleted }) => {
    let temp = data;
    if (added) {
      const startingAddedId =
        temp.length > 0 ? temp[temp.length - 1].id + 1 : 0;
      temp = [...temp, { id: startingAddedId, ...added }];
      console.log(added);
    }
    if (changed) {
      temp = temp.map((appointment) =>
        changed[appointment.id]
          ? { ...appointment, ...changed[appointment.id] }
          : appointment
      );
    }
    if (deleted !== undefined) {
      setDeletedAppointmentId(deleted);
      toggleConfirmationVisible();
    }
    setData(temp);
    setAddedAppointment({});
  };

  const onAddedAppointmentChange = (newAddedAppointment) => {
    setAddedAppointment(newAddedAppointment);

    if (editingAppointment !== undefined) {
      setPreviousAppointment(editingAppointment);
    }

    setEditingAppointment(undefined);
    setIsNewAppointment(true);
  };

  const toggleConfirmationVisible = () => {
    SetConfirmationVisible(!confirmationVisible);
  };

  const commitDeletedAppointment = () => {
    const nextData = data.filter(
      (appointment) => appointment.id !== deletedAppointmentId
    );
    setData(nextData);
    setDeletedAppointmentId(null);

    toggleConfirmationVisible();
  };

  const appointmentForm = connectProps(AppointmentFormContainer, () => {
    const currentAppointment =
      data.filter((appointment) => {
        return editingAppointment && appointment.id === editingAppointment.id;
      })[0] || addedAppointment;

    const cancelAppointment = () => {
      if (isNewAppointment) {
        setEditingAppointment(previousAppointment);
        setIsNewAppointment(false);
      }
    };

    return {
      visible: editingFormVisible,
      appointmentData: currentAppointment,
      commitChanges: commitChanges,
      visibleChange: toggleEditingFormVisibility,
      onEditingAppointmentChange: onEditingAppointmentChange,
      cancelAppointment,
    };
  });
  return (
    <div>
      <Paper>
        <Scheduler data={data}>
          <ViewState currentDate={currentDate} />
          <EditingState
            onCommitChanges={commitChanges}
            onEditingAppointmentChange={onEditingAppointmentChange}
            onAddedAppointmentChange={onAddedAppointmentChange}
          />
          <WeekView startDayHour={8} endDayHour={24} cellDuration={60} />

          <Appointments />
          <AppointmentTooltip showOpenButton showCloseButton />
          <Toolbar />
          <DateNavigator />

          <AppointmentForm
            overlayComponent={appointmentForm}
            visible={editingFormVisible}
            onVisibilityChange={toggleEditingFormVisibility}
          />
        </Scheduler>{" "}
        <Scheduler data={data}>
          <ViewState currentDate={currentDate} />
          <EditingState
            onCommitChanges={commitChanges}
            onEditingAppointmentChange={onEditingAppointmentChange}
            onAddedAppointmentChange={onAddedAppointmentChange}
          />
          <WeekView startDayHour={8} endDayHour={24} cellDuration={60} />

          <Appointments />
          <AppointmentTooltip showOpenButton showCloseButton />
          <Toolbar />
          <DateNavigator />

          <AppointmentForm
            overlayComponent={appointmentForm}
            visible={editingFormVisible}
            onVisibilityChange={toggleEditingFormVisibility}
          />
          <AppointmentForm
            overlayComponent={appointmentForm}
            visible={editingFormVisible}
            onVisibilityChange={toggleEditingFormVisibility}
          />
          <AppointmentForm
            overlayComponent={appointmentForm}
            visible={editingFormVisible}
            onVisibilityChange={toggleEditingFormVisibility}
          />
        </Scheduler>{" "}
        <Scheduler data={data}>
          <ViewState currentDate={currentDate} />
          <EditingState
            onCommitChanges={commitChanges}
            onEditingAppointmentChange={onEditingAppointmentChange}
            onAddedAppointmentChange={onAddedAppointmentChange}
          />
          <WeekView startDayHour={8} endDayHour={24} cellDuration={60} />

          <Appointments />
          <AppointmentTooltip showOpenButton showCloseButton />
          <Toolbar />
          <DateNavigator />

          <AppointmentForm
            overlayComponent={appointmentForm}
            visible={editingFormVisible}
            onVisibilityChange={toggleEditingFormVisibility}
          />
        </Scheduler>{" "}
        <Scheduler data={data}>
          <ViewState currentDate={currentDate} />
          <EditingState
            onCommitChanges={commitChanges}
            onEditingAppointmentChange={onEditingAppointmentChange}
            onAddedAppointmentChange={onAddedAppointmentChange}
          />
          <WeekView startDayHour={8} endDayHour={24} cellDuration={60} />

          <Appointments />
          <AppointmentTooltip showOpenButton showCloseButton />
          <Toolbar />
          <DateNavigator />

          <AppointmentForm
            overlayComponent={appointmentForm}
            visible={editingFormVisible}
            onVisibilityChange={toggleEditingFormVisibility}
          />
        </Scheduler>{" "}
        <Scheduler data={data}>
          <ViewState currentDate={currentDate} />
          <EditingState
            onCommitChanges={commitChanges}
            onEditingAppointmentChange={onEditingAppointmentChange}
            onAddedAppointmentChange={onAddedAppointmentChange}
          />
          <WeekView startDayHour={8} endDayHour={24} cellDuration={60} />

          <Appointments />
          <AppointmentTooltip showOpenButton showCloseButton />
          <Toolbar />
          <DateNavigator />

          <AppointmentForm
            overlayComponent={appointmentForm}
            visible={editingFormVisible}
            onVisibilityChange={toggleEditingFormVisibility}
          />
        </Scheduler>{" "}
        <Scheduler data={data}>
          <ViewState currentDate={currentDate} />
          <EditingState
            onCommitChanges={commitChanges}
            onEditingAppointmentChange={onEditingAppointmentChange}
            onAddedAppointmentChange={onAddedAppointmentChange}
          />
          <WeekView startDayHour={8} endDayHour={24} cellDuration={60} />

          <Appointments />
          <AppointmentTooltip showOpenButton showCloseButton />
          <Toolbar />
          <DateNavigator />

          <AppointmentForm
            overlayComponent={appointmentForm}
            visible={editingFormVisible}
            onVisibilityChange={toggleEditingFormVisibility}
          />
        </Scheduler>{" "}
        <Scheduler data={data}>
          <ViewState currentDate={currentDate} />
          <EditingState
            onCommitChanges={commitChanges}
            onEditingAppointmentChange={onEditingAppointmentChange}
            onAddedAppointmentChange={onAddedAppointmentChange}
          />
          <WeekView startDayHour={8} endDayHour={24} cellDuration={60} />

          <Appointments />
          <AppointmentTooltip showOpenButton showCloseButton />
          <Toolbar />
          <DateNavigator />

          <AppointmentForm
            overlayComponent={appointmentForm}
            visible={editingFormVisible}
            onVisibilityChange={toggleEditingFormVisibility}
          />
        </Scheduler>{" "}
        <Scheduler data={data}>
          <ViewState currentDate={currentDate} />
          <EditingState
            onCommitChanges={commitChanges}
            onEditingAppointmentChange={onEditingAppointmentChange}
            onAddedAppointmentChange={onAddedAppointmentChange}
          />
          <WeekView startDayHour={8} endDayHour={24} cellDuration={60} />

          <Appointments />
          <AppointmentTooltip showOpenButton showCloseButton />
          <Toolbar />
          <DateNavigator />

          <AppointmentForm
            overlayComponent={appointmentForm}
            visible={editingFormVisible}
            onVisibilityChange={toggleEditingFormVisibility}
          />
        </Scheduler>{" "}
        <Scheduler data={data}>
          <ViewState currentDate={currentDate} />
          <EditingState
            onCommitChanges={commitChanges}
            onEditingAppointmentChange={onEditingAppointmentChange}
            onAddedAppointmentChange={onAddedAppointmentChange}
          />
          <WeekView startDayHour={8} endDayHour={24} cellDuration={60} />

          <Appointments />
          <AppointmentTooltip showOpenButton showCloseButton />
          <Toolbar />
          <DateNavigator />

          <AppointmentForm
            overlayComponent={appointmentForm}
            visible={editingFormVisible}
            onVisibilityChange={toggleEditingFormVisibility}
          />
        </Scheduler>{" "}
        <Scheduler data={data}>
          <ViewState currentDate={currentDate} />
          <EditingState
            onCommitChanges={commitChanges}
            onEditingAppointmentChange={onEditingAppointmentChange}
            onAddedAppointmentChange={onAddedAppointmentChange}
          />
          <WeekView startDayHour={8} endDayHour={24} cellDuration={60} />

          <Appointments />
          <AppointmentTooltip showOpenButton showCloseButton />
          <Toolbar />
          <DateNavigator />

          <AppointmentForm
            overlayComponent={appointmentForm}
            visible={editingFormVisible}
            onVisibilityChange={toggleEditingFormVisibility}
          />
        </Scheduler>{" "}
        <Scheduler data={data}>
          <ViewState currentDate={currentDate} />
          <EditingState
            onCommitChanges={commitChanges}
            onEditingAppointmentChange={onEditingAppointmentChange}
            onAddedAppointmentChange={onAddedAppointmentChange}
          />
          <WeekView startDayHour={8} endDayHour={24} cellDuration={60} />

          <Appointments />
          <AppointmentTooltip showOpenButton showCloseButton />
          <Toolbar />
          <DateNavigator />

          <AppointmentForm
            overlayComponent={appointmentForm}
            visible={editingFormVisible}
            onVisibilityChange={toggleEditingFormVisibility}
          />
        </Scheduler>{" "}
        <Scheduler data={data}>
          <ViewState currentDate={currentDate} />
          <EditingState
            onCommitChanges={commitChanges}
            onEditingAppointmentChange={onEditingAppointmentChange}
            onAddedAppointmentChange={onAddedAppointmentChange}
          />
          <WeekView startDayHour={8} endDayHour={24} cellDuration={60} />

          <Appointments />
          <AppointmentTooltip showOpenButton showCloseButton />
          <Toolbar />
          <DateNavigator />

          <AppointmentForm
            overlayComponent={appointmentForm}
            visible={editingFormVisible}
            onVisibilityChange={toggleEditingFormVisibility}
          />
        </Scheduler>{" "}
        <Scheduler data={data}>
          <ViewState currentDate={currentDate} />
          <EditingState
            onCommitChanges={commitChanges}
            onEditingAppointmentChange={onEditingAppointmentChange}
            onAddedAppointmentChange={onAddedAppointmentChange}
          />
          <WeekView startDayHour={8} endDayHour={24} cellDuration={60} />

          <Appointments />
          <AppointmentTooltip showOpenButton showCloseButton />
          <Toolbar />
          <DateNavigator />

          <AppointmentForm
            overlayComponent={appointmentForm}
            visible={editingFormVisible}
            onVisibilityChange={toggleEditingFormVisibility}
          />
        </Scheduler>{" "}
        <Scheduler data={data}>
          <ViewState currentDate={currentDate} />
          <EditingState
            onCommitChanges={commitChanges}
            onEditingAppointmentChange={onEditingAppointmentChange}
            onAddedAppointmentChange={onAddedAppointmentChange}
          />
          <WeekView startDayHour={8} endDayHour={24} cellDuration={60} />

          <Appointments />
          <AppointmentTooltip showOpenButton showCloseButton />
          <Toolbar />
          <DateNavigator />

          <AppointmentForm
            overlayComponent={appointmentForm}
            visible={editingFormVisible}
            onVisibilityChange={toggleEditingFormVisibility}
          />
        </Scheduler>{" "}
        <Scheduler data={data}>
          <ViewState currentDate={currentDate} />
          <EditingState
            onCommitChanges={commitChanges}
            onEditingAppointmentChange={onEditingAppointmentChange}
            onAddedAppointmentChange={onAddedAppointmentChange}
          />
          <WeekView startDayHour={8} endDayHour={24} cellDuration={60} />

          <Appointments />
          <AppointmentTooltip showOpenButton showCloseButton />
          <Toolbar />
          <DateNavigator />

          <AppointmentForm
            overlayComponent={appointmentForm}
            visible={editingFormVisible}
            onVisibilityChange={toggleEditingFormVisibility}
          />
        </Scheduler>{" "}
        <Scheduler data={data}>
          <ViewState currentDate={currentDate} />
          <EditingState
            onCommitChanges={commitChanges}
            onEditingAppointmentChange={onEditingAppointmentChange}
            onAddedAppointmentChange={onAddedAppointmentChange}
          />
          <WeekView startDayHour={8} endDayHour={24} cellDuration={60} />

          <Appointments />
          <AppointmentTooltip showOpenButton showCloseButton />
          <Toolbar />
          <DateNavigator />

          <AppointmentForm
            overlayComponent={appointmentForm}
            visible={editingFormVisible}
            onVisibilityChange={toggleEditingFormVisibility}
          />
        </Scheduler>{" "}
        <Scheduler data={data}>
          <ViewState currentDate={currentDate} />
          <EditingState
            onCommitChanges={commitChanges}
            onEditingAppointmentChange={onEditingAppointmentChange}
            onAddedAppointmentChange={onAddedAppointmentChange}
          />
          <WeekView startDayHour={8} endDayHour={24} cellDuration={60} />

          <Appointments />
          <AppointmentTooltip showOpenButton showCloseButton />
          <Toolbar />
          <DateNavigator />

          <AppointmentForm
            overlayComponent={appointmentForm}
            visible={editingFormVisible}
            onVisibilityChange={toggleEditingFormVisibility}
          />
        </Scheduler>{" "}
        <Scheduler data={data}>
          <ViewState currentDate={currentDate} />
          <EditingState
            onCommitChanges={commitChanges}
            onEditingAppointmentChange={onEditingAppointmentChange}
            onAddedAppointmentChange={onAddedAppointmentChange}
          />
          <WeekView startDayHour={8} endDayHour={24} cellDuration={60} />

          <Appointments />
          <AppointmentTooltip showOpenButton showCloseButton />
          <Toolbar />
          <DateNavigator />

          <AppointmentForm
            overlayComponent={appointmentForm}
            visible={editingFormVisible}
            onVisibilityChange={toggleEditingFormVisibility}
          />
        </Scheduler>{" "}
        <Scheduler data={data}>
          <ViewState currentDate={currentDate} />
          <EditingState
            onCommitChanges={commitChanges}
            onEditingAppointmentChange={onEditingAppointmentChange}
            onAddedAppointmentChange={onAddedAppointmentChange}
          />
          <WeekView startDayHour={8} endDayHour={24} cellDuration={60} />

          <Appointments />
          <AppointmentTooltip showOpenButton showCloseButton />
          <Toolbar />
          <DateNavigator />

          <AppointmentForm
            overlayComponent={appointmentForm}
            visible={editingFormVisible}
            onVisibilityChange={toggleEditingFormVisibility}
          />
        </Scheduler>{" "}
        <Scheduler data={data}>
          <ViewState currentDate={currentDate} />
          <EditingState
            onCommitChanges={commitChanges}
            onEditingAppointmentChange={onEditingAppointmentChange}
            onAddedAppointmentChange={onAddedAppointmentChange}
          />
          <WeekView startDayHour={8} endDayHour={24} cellDuration={60} />

          <Appointments />
          <AppointmentTooltip showOpenButton showCloseButton />
          <Toolbar />
          <DateNavigator />

          <AppointmentForm
            overlayComponent={appointmentForm}
            visible={editingFormVisible}
            onVisibilityChange={toggleEditingFormVisibility}
          />
        </Scheduler>{" "}
        <Scheduler data={data}>
          <ViewState currentDate={currentDate} />
          <EditingState
            onCommitChanges={commitChanges}
            onEditingAppointmentChange={onEditingAppointmentChange}
            onAddedAppointmentChange={onAddedAppointmentChange}
          />
          <WeekView startDayHour={8} endDayHour={24} cellDuration={60} />

          <Appointments />
          <AppointmentTooltip showOpenButton showCloseButton />
          <Toolbar />
          <DateNavigator />

          <AppointmentForm
            overlayComponent={appointmentForm}
            visible={editingFormVisible}
            onVisibilityChange={toggleEditingFormVisibility}
          />
        </Scheduler>{" "}
        <Scheduler data={data}>
          <ViewState currentDate={currentDate} />
          <EditingState
            onCommitChanges={commitChanges}
            onEditingAppointmentChange={onEditingAppointmentChange}
            onAddedAppointmentChange={onAddedAppointmentChange}
          />
          <WeekView startDayHour={8} endDayHour={24} cellDuration={60} />

          <Appointments />
          <AppointmentTooltip showOpenButton showCloseButton />
          <Toolbar />
          <DateNavigator />

          <AppointmentForm
            overlayComponent={appointmentForm}
            visible={editingFormVisible}
            onVisibilityChange={toggleEditingFormVisibility}
          />
        </Scheduler>{" "}
        <Scheduler data={data}>
          <ViewState currentDate={currentDate} />
          <EditingState
            onCommitChanges={commitChanges}
            onEditingAppointmentChange={onEditingAppointmentChange}
            onAddedAppointmentChange={onAddedAppointmentChange}
          />
          <WeekView startDayHour={8} endDayHour={24} cellDuration={60} />

          <Appointments />
          <AppointmentTooltip showOpenButton showCloseButton />
          <Toolbar />
          <DateNavigator />

          <AppointmentForm
            overlayComponent={appointmentForm}
            visible={editingFormVisible}
            onVisibilityChange={toggleEditingFormVisibility}
          />
        </Scheduler>{" "}
        <Scheduler data={data}>
          <ViewState currentDate={currentDate} />
          <EditingState
            onCommitChanges={commitChanges}
            onEditingAppointmentChange={onEditingAppointmentChange}
            onAddedAppointmentChange={onAddedAppointmentChange}
          />
          <WeekView startDayHour={8} endDayHour={24} cellDuration={60} />

          <Appointments />
          <AppointmentTooltip showOpenButton showCloseButton />
          <Toolbar />
          <DateNavigator />

          <AppointmentForm
            overlayComponent={appointmentForm}
            visible={editingFormVisible}
            onVisibilityChange={toggleEditingFormVisibility}
          />
        </Scheduler>{" "}
        <Scheduler data={data}>
          <ViewState currentDate={currentDate} />
          <EditingState
            onCommitChanges={commitChanges}
            onEditingAppointmentChange={onEditingAppointmentChange}
            onAddedAppointmentChange={onAddedAppointmentChange}
          />
          <WeekView startDayHour={8} endDayHour={24} cellDuration={60} />

          <Appointments />
          <AppointmentTooltip showOpenButton showCloseButton />
          <Toolbar />
          <DateNavigator />

          <AppointmentForm
            overlayComponent={appointmentForm}
            visible={editingFormVisible}
            onVisibilityChange={toggleEditingFormVisibility}
          />
        </Scheduler>{" "}
        <Scheduler data={data}>
          <ViewState currentDate={currentDate} />
          <EditingState
            onCommitChanges={commitChanges}
            onEditingAppointmentChange={onEditingAppointmentChange}
            onAddedAppointmentChange={onAddedAppointmentChange}
          />
          <WeekView startDayHour={8} endDayHour={24} cellDuration={60} />

          <Appointments />
          <AppointmentTooltip showOpenButton showCloseButton />
          <Toolbar />
          <DateNavigator />

          <AppointmentForm
            overlayComponent={appointmentForm}
            visible={editingFormVisible}
            onVisibilityChange={toggleEditingFormVisibility}
          />
        </Scheduler>{" "}
        <Scheduler data={data}>
          <ViewState currentDate={currentDate} />
          <EditingState
            onCommitChanges={commitChanges}
            onEditingAppointmentChange={onEditingAppointmentChange}
            onAddedAppointmentChange={onAddedAppointmentChange}
          />
          <WeekView startDayHour={8} endDayHour={24} cellDuration={60} />

          <Appointments />
          <AppointmentTooltip showOpenButton showCloseButton />
          <Toolbar />
          <DateNavigator />

          <AppointmentForm
            overlayComponent={appointmentForm}
            visible={editingFormVisible}
            onVisibilityChange={toggleEditingFormVisibility}
          />
        </Scheduler>{" "}
        <Scheduler data={data}>
          <ViewState currentDate={currentDate} />
          <EditingState
            onCommitChanges={commitChanges}
            onEditingAppointmentChange={onEditingAppointmentChange}
            onAddedAppointmentChange={onAddedAppointmentChange}
          />
          <WeekView startDayHour={8} endDayHour={24} cellDuration={60} />

          <Appointments />
          <AppointmentTooltip showOpenButton showCloseButton />
          <Toolbar />
          <DateNavigator />

          <AppointmentForm
            overlayComponent={appointmentForm}
            visible={editingFormVisible}
            onVisibilityChange={toggleEditingFormVisibility}
          />
        </Scheduler>{" "}
        <Scheduler data={data}>
          <ViewState currentDate={currentDate} />
          <EditingState
            onCommitChanges={commitChanges}
            onEditingAppointmentChange={onEditingAppointmentChange}
            onAddedAppointmentChange={onAddedAppointmentChange}
          />
          <WeekView startDayHour={8} endDayHour={24} cellDuration={60} />

          <Appointments />
          <AppointmentTooltip showOpenButton showCloseButton />
          <Toolbar />
          <DateNavigator />

          <AppointmentForm
            overlayComponent={appointmentForm}
            visible={editingFormVisible}
            onVisibilityChange={toggleEditingFormVisibility}
          />
        </Scheduler>{" "}
        <Scheduler data={data}>
          <ViewState currentDate={currentDate} />
          <EditingState
            onCommitChanges={commitChanges}
            onEditingAppointmentChange={onEditingAppointmentChange}
            onAddedAppointmentChange={onAddedAppointmentChange}
          />
          <WeekView startDayHour={8} endDayHour={24} cellDuration={60} />

          <Appointments />
          <AppointmentTooltip showOpenButton showCloseButton />
          <Toolbar />
          <DateNavigator />

          <AppointmentForm
            overlayComponent={appointmentForm}
            visible={editingFormVisible}
            onVisibilityChange={toggleEditingFormVisibility}
          />
        </Scheduler>{" "}
        <Scheduler data={data}>
          <ViewState currentDate={currentDate} />
          <EditingState
            onCommitChanges={commitChanges}
            onEditingAppointmentChange={onEditingAppointmentChange}
            onAddedAppointmentChange={onAddedAppointmentChange}
          />
          <WeekView startDayHour={8} endDayHour={24} cellDuration={60} />

          <Appointments />
          <AppointmentTooltip showOpenButton showCloseButton />
          <Toolbar />
          <DateNavigator />

          <AppointmentForm
            overlayComponent={appointmentForm}
            visible={editingFormVisible}
            onVisibilityChange={toggleEditingFormVisibility}
          />
        </Scheduler>
        <Dialog open={confirmationVisible}>
          <DialogTitle>Delete Appointment</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this appointment?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={commitDeletedAppointment}
              color="primary"
              variant="outlined"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Fab
          color="primary"
          className={classes.fab}
          onClick={() => {
            setEditingFormVisible(true);

            onEditingAppointmentChange(undefined);
            onAddedAppointmentChange({
              startDate: new Date(currentDate).setHours(startDayHour),
              endDate: new Date(currentDate).setHours(startDayHour + 1),
            });
          }}
        >
          <AddIcon />
        </Fab>
        <Fab
          color="primary"
          className={classes.fab}
          onClick={() => {
            setEditingFormVisible(true);

            onEditingAppointmentChange(undefined);
            onAddedAppointmentChange({
              startDate: new Date(currentDate).setHours(startDayHour),
              endDate: new Date(currentDate).setHours(startDayHour + 1),
            });
          }}
        >
          <AddIcon />
        </Fab>
        <Fab
          color="primary"
          className={classes.fab}
          onClick={() => {
            setEditingFormVisible(true);

            onEditingAppointmentChange(undefined);
            onAddedAppointmentChange({
              startDate: new Date(currentDate).setHours(startDayHour),
              endDate: new Date(currentDate).setHours(startDayHour + 1),
            });
          }}
        >
          <AddIcon />
        </Fab>
      </Paper>
    </div>
  );
};