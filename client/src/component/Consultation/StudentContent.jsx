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
	Fab,
} from "@material-ui/core";

import FolderIcon from "@material-ui/icons/Folder";
import DataUsageIcon from "@material-ui/icons/DataUsage";
import RoomIcon from "@material-ui/icons/Room";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

import { myFetch, UserContext, StudentContext } from "../Methods";
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
	fab: {
		margin: "auto",
		width: "100%",
	},
});

export default withStyles(style, { name: "Content" })(
	({ children, appointmentData, classes, ...restProps }) => {
		//const {} = useContext(StaffContext);
		const { setBookOpen, setLoading, userInfo, setUser } = useContext(
			StudentContext
		);
		const { detectAlert, setLoadingRoute } = useContext(UserContext);

		const book = async () => {
			setLoading(true);
			const body = {
				id: appointmentData.id,
			};
			const res = await myFetch(
				"/api/student/consult/book",
				"POST",
				body
			);
			detectAlert(res, "Successfully booked.");
		};

		const checkBooked = () => {
			console.log(userInfo.registeredConsult);
			console.log(appointmentData.id);
			return (
				userInfo.registeredConsult.filter(
					(each) => each == appointmentData.id
				).length > 0
			);
		};

		return (
			<AppointmentTooltip.Content
				{...restProps}
				appointmentData={appointmentData}
			>
				<Grid container justify="center">
					<Grid item xs={11}>
						<List dense>
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
							<br />
							<ListItem>
								<Fab
									variant="extended"
									className={classes.fab}
									color={
										checkBooked() ? "default" : "primary"
									}
									onClick={book}
									disabled={checkBooked()}
								>
									<PlaylistAddIcon />
									{checkBooked() ? "Booked" : "Book it"}
								</Fab>
							</ListItem>
						</List>
					</Grid>
				</Grid>
			</AppointmentTooltip.Content>
		);
	}
);
