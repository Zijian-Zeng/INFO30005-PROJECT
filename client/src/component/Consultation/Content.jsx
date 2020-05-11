import React, { useState, useEffect, useContext } from "react";
import {
	AppointmentTooltip,
	WeekView,
} from "@devexpress/dx-react-scheduler-material-ui";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";

import Room from "@material-ui/icons/Room";

import { myFetch, UserContext, StaffContext } from "../Methods";
import Staff from "./Staff";
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
	commandButton: {
		backgroundColor: "rgba(255,255,100,0.65)",
	},
});

export default withStyles(style, { name: "Content" })(
	({ children, appointmentData, classes, ...restProps }) => {
		//const {} = useContext(StaffContext);
		return (
			<AppointmentTooltip.Content
				{...restProps}
				appointmentData={appointmentData}
			>
				<Grid container alignItems="center">
					<Grid item xs={2} className={classes.textCenter}>
						<Room className={classes.icon} />
					</Grid>

					<Grid item xs={10}>
						<span>{appointmentData.location}</span>
					</Grid>
				</Grid>
				<br />
			</AppointmentTooltip.Content>
		);
	}
);
