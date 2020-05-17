import React from "react";
import { AppointmentTooltip } from "@devexpress/dx-react-scheduler-material-ui";
import { withStyles } from "@material-ui/core/styles";
import {
	Grid,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Badge,
} from "@material-ui/core";
import RoomIcon from "@material-ui/icons/Room";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

const style = ({ palette, spacing }) => ({
	icon: {
		color: palette.action.active,
		marginLeft: spacing(1),
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
	left: {
		marginLeft: spacing(1),
	},
});

/***
 * Customized timetable content for consultation feature (staff)
 */
export default withStyles(style, { name: "Content" })(
	({ children, appointmentData, classes, ...restProps }) => {
		return (
			<AppointmentTooltip.Content
				{...restProps}
				appointmentData={appointmentData}
			>
				<Grid container justify="center">
					<Grid item xs={11}>
						<List>
							<ListItem>
								<ListItemIcon>
									<RoomIcon />
								</ListItemIcon>
								<ListItemText
									primary="Location"
									secondary={appointmentData.location}
								/>
							</ListItem>
							<ListItem>
								<ListItemIcon>
									<SupervisorAccountIcon />
								</ListItemIcon>{" "}
								<ListItemText
									primary="Slots Available"
									secondary=" "
								/>
								<ListItemIcon>
									<Badge
										badgeContent={
											appointmentData.slotsAvailable
										}
										color="primary"
										showZero
									>
										<EqualizerIcon />
									</Badge>
								</ListItemIcon>
							</ListItem>
							<ListItem>
								<ListItemIcon>
									<LibraryAddIcon />
								</ListItemIcon>

								<ListItemText
									primary="Student Registered"
									secondary=" "
								/>

								<ListItemIcon>
									<Badge
										badgeContent={
											appointmentData.totalStudent
										}
										color="primary"
										showZero
									>
										<EqualizerIcon />
									</Badge>
								</ListItemIcon>
							</ListItem>
						</List>
					</Grid>
				</Grid>
			</AppointmentTooltip.Content>
		);
	}
);
