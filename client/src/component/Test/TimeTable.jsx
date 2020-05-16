import React, { useState, useEffect, useContext } from "react";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
  AppointmentForm,
} from "@devexpress/dx-react-scheduler";
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
  WeekView,
} from "@devexpress/dx-react-scheduler-material-ui";

import {
  Grid,
  Paper,
  LinearProgress,
  Select,
  MenuItem,
} from "@material-ui/core";
import {
  makeStyles,
  withStyles,
  lighten,
  useTheme,
} from "@material-ui/core/styles";

import {
  lime,
  lightBlue,
  red,
  green,
  yellow,
  cyan,
  blue,
  amber,
  teal,
} from "@material-ui/core/colors";

const styles = (theme) => ({
  container: {
    display: "flex",
    marginBottom: theme.spacing(2),
    justifyContent: "flex-end",
  },
  text: {
    ...theme.typography.h6,
    marginRight: theme.spacing(2),
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
});

const ToolbarWithLoading = withStyles(
  {
    toolbarRoot: {
      position: "relative",
    },
    progress: {
      position: "absolute",
      width: "100%",
      bottom: 0,
      left: 0,
    },
  },
  { name: "Toolbar" }
)(({ children, classes, ...restProps }) => (
  <div className={classes.toolbarRoot}>
    <Toolbar.Root {...restProps}>{children}</Toolbar.Root>
    <LinearProgress className={classes.progress} />
  </div>
));

const getStyle = (data, style) => {
  if (data.booked) {
    return {
      ...style,
      backgroundColor: "#88c122",
      borderRadius: "8px",
    };
  }
  if (data.status) {
    switch (data.status) {
      case "PENDING":
        return {
          ...style,
          backgroundColor: "#e2d21f",
          borderRadius: "8px",
        };

      case "APPROVED":
        return {
          ...style,
          backgroundColor: "#88c122",
          borderRadius: "8px",
        };
      case "DECLINED":
        return {
          ...style,
          backgroundColor: "#f41f58",
          borderRadius: "8px",
        };
    }
  }
  return {
    ...style,
  };
};

const Appointment = ({ children, style, data, ...restProps }) => {
  const theme = useTheme();
  return (
    <Appointments.Appointment
      {...restProps}
      style={getStyle(data, style)}
      data={data}
    >
      {children}
    </Appointments.Appointment>
  );
};

const resources = [
  {
    fieldName: "booking",
    title: "booking",
    instances: [
      { id: "BOOKED", text: "Already booked", color: green[400] },
      { id: "AVAILABLE", text: "Available to Book", color: blue[400] },
      { id: "FULL", text: "It has been fully booked", color: red[200] },
    ],
  },
  {
    fieldName: "status",
    title: "status",
    instances: [
      { id: "PENDING", text: "PENDING", color: amber[400] },
      { id: "APPROVED", text: "APPROVED", color: green[400] },
      { id: "DECLINED", text: "DECLINED", color: red[400] },
    ],
  },
];

const loadSubjectResources = (subjects) => {
  if (resources.filter((each) => each.fieldName === "title").length > 0) return;
  const instances = [];
  subjects.map((subjectCode) => {
    instances.push({ id: subjectCode, text: subjectCode });
  });

  resources.push({
    fieldName: "title",
    title: "title",
    instances: instances,
  });
};

export default ({
  data,
  currentDate,
  setCurrentDate,
  header,
  content,
  loading,
  mainResourceName,
  subjects,
  viewChange,
}) => {
  if (subjects) loadSubjectResources(subjects);

  return (
    <Paper>
      <Scheduler data={data} height={660}>
        <ViewState
          currentDate={currentDate}
          onCurrentDateChange={setCurrentDate}
        />
        <WeekView
          excludedDays={[0, 6]}
          startDayHour={8}
          endDayHour={24}
          cellDuration={60}
        />
        <MonthView />
        <Appointments />

        <AppointmentTooltip
          headerComponent={header}
          contentComponent={content}
        />
        <Resources
          mainResourceName={mainResourceName}
          data={resources}
          palette={[blue, cyan, teal, lime, amber]}
        />
        <Toolbar
          {...(loading ? { rootComponent: ToolbarWithLoading } : null)}
        />
        <DateNavigator />
        <TodayButton />
        <ViewSwitcher />
      </Scheduler>
    </Paper>
  );
};
