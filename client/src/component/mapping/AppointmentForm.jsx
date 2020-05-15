import React, { useState } from "react";

import { AppointmentForm } from "@devexpress/dx-react-scheduler-material-ui";
import { withStyles, Theme, createStyles } from "@material-ui/core";
import { indigo, blue, teal } from "@material-ui/core/colors";
import MomentUtils from "@date-io/moment";

import { Paper, Button, TextField, IconButton } from "@material-ui/core";
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

const containerStyles = (theme) => ({
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

  return (
    <AppointmentForm.Overlay
      visible={visible}
      target={target}
      fullSize
      onHide={onHide}
    >
      <div>
        <div className={classes.header}>
          <IconButton className={classes.closeButton} onClick={cancelChanges}>
            <Close color="action" />
          </IconButton>
        </div>
        <div className={classes.content}>
          <div className={classes.wrapper}>
            <Create className={classes.icon} color="action" />
            <TextField {...textEditorProps("title")} />
          </div>
          <div className={classes.wrapper}>
            <CalendarToday className={classes.icon} color="action" />
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDateTimePicker
                label="Start Date"
                {...pickerEditorProps("startDate")}
              />
              <KeyboardDateTimePicker
                label="End Date"
                {...pickerEditorProps("endDate")}
              />
            </MuiPickersUtilsProvider>
          </div>
        </div>
      </div>
    </AppointmentForm.Overlay>
  );
};

export default withStyles(containerStyles, {
  name: "AppointmentFormContainer",
})(AppointmentFormContainerBasic);
