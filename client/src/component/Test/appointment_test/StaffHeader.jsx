import React, { useState, useEffect, useContext } from "react";

import { AppointmentTooltip } from "@devexpress/dx-react-scheduler-material-ui";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import { IconButton, Grid, Paper, Fab, Container } from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import Room from "@material-ui/icons/Room";
import MoreIcon from "@material-ui/icons/MoreVert";
import classNames from "clsx";

import { UserContext, StaffContext } from "../Methods";

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
});

export default withStyles(style, { name: "Header" })(
  ({ children, appointmentData, classes, ...restProps }) => {
    const { pendAppointment, setPendAppointment } = useContext(StaffContext);

    return (
      <AppointmentTooltip.Header
        {...restProps}
        appointmentData={appointmentData}
        showCloseButton
        showOpenButton
        onOpenButtonClick={() => setPendAppointment({ id: appointmentData.id })}
      ></AppointmentTooltip.Header>
    );
  }
);
