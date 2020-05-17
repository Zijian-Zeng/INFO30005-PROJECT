import React, { useContext } from "react";

import { AppointmentTooltip } from "@devexpress/dx-react-scheduler-material-ui";

import { withStyles } from "@material-ui/core/styles";

import { StudentContext } from "../Methods";

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

/***
 * Customized timetable header for appointment feature (student)
 */
export default withStyles(style, { name: "Header" })(
	({ children, appointmentData, classes, ...restProps }) => {
		const { setCancelAppointment } = useContext(StudentContext);

		return (
			<AppointmentTooltip.Header
				{...restProps}
				appointmentData={appointmentData}
				showCloseButton
				showOpenButton
				onOpenButtonClick={() =>
					setCancelAppointment(appointmentData.id)
				}
			></AppointmentTooltip.Header>
		);
	}
);
