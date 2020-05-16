import React, { useState, useEffect, useContext } from "react";
import {
	AppointmentTooltip,
	WeekView,
} from "@devexpress/dx-react-scheduler-material-ui";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
	Grid,
	Paper,
	Typography,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Divider,
	Badge,
} from "@material-ui/core";

import FolderIcon from "@material-ui/icons/Folder";
import DataUsageIcon from "@material-ui/icons/DataUsage";
import RoomIcon from "@material-ui/icons/Room";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

import { myFetch, UserContext, StaffContext } from "../Methods";
import Staff from "./Staff";
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
	},icon: {
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
	},icon: {
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
	},icon: {
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
	},icon: {
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
	},icon: {
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
	},icon: {
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
	},icon: {
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
	},icon: {
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
	},icon: {
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
	},icon: {
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
	},icon: {
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

export default withStyles(style, { name: "Content" })(
	({ children, appointmentData, classes, ...restProps }) => {
		//const {} = useContext(StaffContext);
		console.log(appointmentData);
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
