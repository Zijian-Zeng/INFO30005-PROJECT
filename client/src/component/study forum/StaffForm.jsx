import React, { useState, useEffect, useContext } from "react";

import { AppointmentForm } from "@devexpress/dx-react-scheduler-material-ui";
import { withStyles, Theme, createStyles } from "@material-ui/core";
import { indigo, blue, teal } from "@material-ui/core/colors";
import MomentUtils from "@date-io/moment";

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

import {
  AppointmentTooltip,
  WeekView,
} from "@devexpress/dx-react-scheduler-material-ui";

import {
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Badge,
  Button,
  TextField,
  IconButton,
} from "@material-ui/core";

import FolderIcon from "@material-ui/icons/Folder";
import DataUsageIcon from "@material-ui/icons/DataUsage";
import RoomIcon from "@material-ui/icons/Room";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

import { myFetch, UserContext, StaffContext } from "../Methods";

import Autocomplete from "@material-ui/lab/Autocomplete";

const style = ({ palette, spacing }) => ({
  icon: {
    color: palette.action.active,
  },
  textCenter: {
    textAlign: "center",
  },
  header: {
    height: "260px",
    backgroundSize: "cover",
  },
});

const AppointmentFormContainerBasic = ({
  classes,
  visible,
  visibleChange,
  appointmentData,
  cancelAppointment,
  target,
  onHide,
  commitChanges,
}) => {
  const [appointmentChanges, setAppointmentChanges] = useState({});

  const changeAppointment = ({ field, changes }) => {
    const nextChanges = {
      ...appointmentData,
      [field]: changes,
    };
    setAppointmentChanges(nextChanges);
  };

  const commitAppointment = (type) => {
    const appointment = {
      ...appointmentData,
      ...appointmentChanges,
    };
    if (type === "deleted") {
      commitChanges({ [type]: appointment.id });
    } else if (type === "changed") {
      commitChanges({ [type]: { [appointment.id]: appointment } });
    } else {
      commitChanges({ [type]: appointment });
    }
    setAppointmentChanges({});
  };

  const displayAppointmentData = {
    ...appointmentData,
    ...appointmentChanges,
  };
  const isNewAppointment = appointmentData.id === undefined;

  const applyChanges = isNewAppointment
    ? () => commitAppointment("added")
    : () => commitAppointment("changed");

  const textEditorProps = (field) => ({
    variant: "outlined",
    onChange: ({ target: change }) =>
      changeAppointment({
        field: [field],
        changes: change.value,
      }),
    value: displayAppointmentData[field] || "",
    label: field[0].toUpperCase() + field.slice(1),
    className: classes.textField,
  });

  const pickerEditorProps = (field) => ({
    className: classes.picker,
    // keyboard: true,
    ampm: false,
    value: displayAppointmentData[field],
    onChange: (date) =>
      changeAppointment({
        field: [field],
        changes: date ? date.toDate() : new Date(displayAppointmentData[field]),
      }),
    inputVariant: "outlined",
    format: "DD/MM/YYYY HH:mm",
    onError: () => null,
  });

  const cancelChanges = () => {
    setAppointmentChanges({});
    visibleChange();
    cancelAppointment();
  };

  const api = {
    create: "/api/staff/consult/create",
    edit: "/api/staff/consult/patch",
    delete: "/api/staff/consult/delete",
  };

  return (
    <Grid container justify="center">
      <Grid item xs={11}>
        <List>
          <ListItem>
            <ListItemIcon>
              <RoomIcon />
            </ListItemIcon>
            <ListItemText
              primary="Location"
              secondary={appointmentData.location}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <SupervisorAccountIcon />
            </ListItemIcon>{" "}
            <ListItemText primary="Slots Available" secondary=" " />
            <ListItemIcon>
              <Badge
                badgeContent={appointmentData.slotsAvailable}
                color="primary"
                showZero
              >
                <EqualizerIcon />
              </Badge>
            </ListItemIcon>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <LibraryAddIcon />
            </ListItemIcon>

            <ListItemText primary="Student Registered" secondary=" " />

            <ListItemIcon>
              <Badge
                badgeContent={appointmentData.totalStudent}
                color="primary"
                showZero
              >
                <EqualizerIcon />
              </Badge>
            </ListItemIcon>
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
};

export default withStyles({
  name: "AppointmentFormContainer",
})(AppointmentFormContainerBasic);
