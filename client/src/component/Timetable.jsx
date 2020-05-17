import React from "react";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
	Scheduler,
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

import { Paper, LinearProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import {
	lime,
	red,
	green,
	cyan,
	blue,
	amber,
	teal,
} from "@material-ui/core/colors";

/***
 * timetable loading bar.
 */
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

/***
 * For changing timetable colors
 */
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

/***
 * Loading colors for each subject in this account.
 */
const loadSubjectResources = (subjects) => {
	if (resources.filter((each) => each.fieldName === "title").length > 0)
		return;
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

/***
 * Customized Timetable component.
 */
export default withWidth()(
	({
		data,
		currentDate,
		setCurrentDate,
		header,
		content,
		loading,
		mainResourceName,
		subjects,
		halfScreen,
	}) => {
		//Loading colors for each subject in this account.
		if (subjects) loadSubjectResources(subjects);

		return (
			<Paper>
				<Scheduler data={data} height={halfScreen ? 350 : 600}>
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
	}
);
