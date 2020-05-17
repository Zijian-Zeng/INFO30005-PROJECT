import React, { useContext } from "react";
import { AppointmentTooltip } from "@devexpress/dx-react-scheduler-material-ui";
import { withStyles } from "@material-ui/core/styles";
import { StaffContext } from "../Methods";

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
 * Customized timetable header for appointment feature (staff).
 */
export default withStyles(style, { name: "Header" })(
	({ children, appointmentData, classes, ...restProps }) => {
		const { setPendAppointment } = useContext(StaffContext);

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
