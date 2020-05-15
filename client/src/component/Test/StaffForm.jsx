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

import Autocomplete from "@material-ui/lab/Autocomplete";

const containerStyles = (theme) => ({
  container: {
    width: "100%",
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  content: {
    padding: theme.spacing(2),
  },
  header: {
    width: "100%",
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  closeButton: {
    width: "100%",
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    float: "right",
    justifyContent: "flex-end",
  },
  buttonGroup: {
    width: "100%",
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    width: "50%",
    paddingTop: theme.spacing(11),
  },
  picker: {
    "&:last-child": {
      marginRight: 0,
    },
    width: "50%",
  },
  wrapper: {
    width: "100%",
    paddingBottom: theme.spacing(2),
    display: "flex",
    justifyContent: "flex-end",
    padding: theme.spacing(1, 0),
  },
  icon: {
    margin: theme.spacing(2, 0),
  },
  textField: {
    display: "flex",
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
      <div className={classes.container}>
        <div className={classes.header}>
          <IconButton className={classes.closeButton} onClick={cancelChanges}>
            <Close color="action" />
          </IconButton>
        </div>
        <div className={classes.content}>
          <div className={classes.wrapper}>
            <Create className={classes.icon} color="action" />
            <Autocomplete
              id="addSubject"
              options={["COMP10001", "COMP10002"]}
              getOptionLabel={(option) => option}
              value={displayAppointmentData["title"]}
              onChange={(event, newValue) => {
                changeAppointment({
                  field: ["title"],
                  changes: newValue,
                });
              }}
              className={classes.textField}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    label="Please choose a subject"
                    variant="filled"
                    required
                    className={classes.textField}
                  />
                );
              }}
            />
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
          <div className={classes.wrapper}>
            <LocationOn className={classes.icon} color="action" />
            <TextField {...textEditorProps("location")} />
          </div>
        </div>
        <div className={classes.buttonGroup}>
          {!isNewAppointment && (
            <Button
              variant="contained"
              className={classes.button}
              onClick={() => {
                visibleChange();
                commitAppointment("deleted");
              }}
              fullWidth
            >
              Delete
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => {
              visibleChange();
              applyChanges();
            }}
            fullWidth
          >
            {isNewAppointment ? "Create" : "Save"}
          </Button>
        </div>
      </div>
    </AppointmentForm.Overlay>
  );
};

export default withStyles(containerStyles, {
  name: "AppointmentFormContainer",
})(AppointmentFormContainerBasic);
