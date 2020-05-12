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

import { Grid, Paper, LinearProgress } from "@material-ui/core";
import {
	makeStyles,
	withStyles,
	lighten,
	useTheme,
} from "@material-ui/core/styles";

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

const Appointment = ({ children, style, data, ...restProps }) => {
	const theme = useTheme();
	return (
		<Appointments.Appointment
			{...restProps}
			style={
				data.booked
					? {
							...style,
							backgroundColor: "#008bd1",
							borderRadius: "8px",
					  }
					: {
							...style,
							backgroundColor: "#87c022",
							borderRadius: "8px",
					  }
			}
			data={data}
		>
			{children}
		</Appointments.Appointment>
	);
};

export default ({
	data,
	currentDate,
	setCurrentDate,
	header,
	content,
	loading,
}) => {
	return (
		<Paper>
			<Scheduler data={data} height={660}>
				<ViewState
					currentDate={currentDate}
					onCurrentDateChange={setCurrentDate}
				/>
				<WeekView startDayHour={8} endDayHour={24} cellDuration={60} />
				<MonthView />
				<Appointments appointmentComponent={Appointment} />
				<AppointmentTooltip
					headerComponent={header}
					contentComponent={content}
				/>
				<Toolbar
					{...(loading
						? { rootComponent: ToolbarWithLoading }
						: null)}
				/>
				<DateNavigator />
				<TodayButton />
				<ViewSwitcher />
			</Scheduler>
		</Paper>
	);
};
