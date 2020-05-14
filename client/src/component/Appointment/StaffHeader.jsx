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
});

export default withStyles(style, { name: "Header" })(
	({ children, appointmentData, classes, ...restProps }) => {
		const { pendAppointment, setPendAppointment } = useContext(
			StaffContext
		);

		return (
			<AppointmentTooltip.Header
				{...restProps}
				appointmentData={appointmentData}
				showCloseButton
				showOpenButton
				onOpenButtonClick={() =>
					setPendAppointment({ id: appointmentData.id })
				}
			></AppointmentTooltip.Header>
		);
	}
);
