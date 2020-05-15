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
    startDate: new Date("2018-07-27 10:00"),
    endDate: new Date("2018-07-27 11:00"),
    id: 0,
    location: "Room 10",
  },
  {
    title: "COMP10001",
    startDate: new Date("2018-07-18 13:00"),
    endDate: new Date("2018-07-18 14:00"),
    id: 1,
    location: "Room 1",
  },
  {
    title: "COMP10001",
    startDate: new Date("2018-07-25 12:00"),
    endDate: new Date("2018-07-24 15:00"),
    id: 2,
    location: "Room 2",
  },
  {
    title: "COMP10003",
    startDate: new Date("2018-07-24 12:00"),
    endDate: new Date("2018-07-24 18:00"),
    id: 3,
    location: "Room 3",
  },
  {
    title: "COMP10004",
    startDate: new Date("2018-07-24 12:00"),
    endDate: new Date("2018-07-24 18:00"),
    id: 4,
    location: "Room 4",
  },
  {
    title: "COMP10005",
    startDate: new Date("2018-07-24 12:00"),
    endDate: new Date("2018-07-24 18:00"),
    id: 5,
    location: "Room 5",
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
    bottom: theme.spacing(2) * 10,
    right: theme.spacing(2) * 11,
  },
}));

export default () => {
  const classes = useStyles();

  const [data, setData] = useState(appointments);
  const [currentDate, setCurrentDate] = useState("2018-07-21");
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
        </Scheduler>

        <Dialog open={confirmationVisible}>
          <DialogTitle>Delete Appointment</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this appointment?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={toggleConfirmationVisible} variant="outlined">
              Cancel
            </Button>
            <Button
              onClick={commitDeletedAppointment}
              color="primary"
              variant="outlined"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </div>
  );
};
