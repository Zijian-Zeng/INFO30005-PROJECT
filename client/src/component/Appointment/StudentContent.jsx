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
	ListItemAvatar,
	Avatar,
	Divider,
	Badge,
	Fab,
	Button,
} from "@material-ui/core";

import RoomIcon from "@material-ui/icons/Room";

import AutorenewIcon from "@material-ui/icons/Autorenew";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import CancelIcon from "@material-ui/icons/Cancel";

import { myFetch, UserContext, StudentContext } from "../Methods";
import Staff from "./Staff";

const StatusIcon = ({ status }) => {
	if (status === "APPROVED") return <ThumbUpIcon></ThumbUpIcon>;
	if (status === "DECLINED") return <CancelIcon></CancelIcon>;
	return <AutorenewIcon></AutorenewIcon>;
};

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
		backgroundColor: "#e2d21f",
		"&:hover": {
			backgroundColor: "#e2d21f",
		},
		borderRadius: 30,
	},
});

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
							<Divider />
							<ListItem>
								<ListItemAvatar>
									<Avatar>
										<RoomIcon />
									</Avatar>
								</ListItemAvatar>
								<ListItemText
									primary="Location"
									secondary={appointmentData.location}
								/>
							</ListItem>
							<Divider />
							<ListItem>
								<ListItemAvatar>
									<Avatar />
								</ListItemAvatar>
								<ListItemText
									primary={`${appointmentData.staff.firstName} ${appointmentData.staff.lastName}`}
									secondary={appointmentData.staff.mail}
								/>
							</ListItem>
							<ListItem>
								<Button
									fullWidth
									className={classes.fab}
									disableTouchRipple
									disableRipple
								>
									<StatusIcon
										status={appointmentData.status}
									/>
									{appointmentData.status}
								</Button>
							</ListItem>
						</List>
					</Grid>
				</Grid>
			</AppointmentTooltip.Content>
		);
	}
);
