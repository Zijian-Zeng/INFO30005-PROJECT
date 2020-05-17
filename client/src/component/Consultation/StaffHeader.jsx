import React, { useContext } from "react";
import { AppointmentTooltip } from "@devexpress/dx-react-scheduler-material-ui";
import { withStyles } from "@material-ui/core/styles";
import { StaffContext } from "../Methods";

const style = ({ palette }) => ({
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
 * Customized timetable header for consultation (staff).
 */
export default withStyles(style, { name: "Header" })(
	({ children, appointmentData, classes, ...restProps }) => {
		const { setEditOpen, setEditingAppointment } = useContext(StaffContext);

		return (
			<AppointmentTooltip.Header
				{...restProps}
				appointmentData={appointmentData}
				showCloseButton
				showOpenButton
				onOpenButtonClick={() => {
					setEditOpen(true);
					setEditingAppointment(appointmentData);
				}}
			></AppointmentTooltip.Header>
		);
	}
);
