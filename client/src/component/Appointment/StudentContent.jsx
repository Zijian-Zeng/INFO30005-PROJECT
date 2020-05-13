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
	Button,
	Collapse,
} from "@material-ui/core";

import RoomIcon from "@material-ui/icons/Room";

import AutorenewIcon from "@material-ui/icons/Autorenew";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import CancelIcon from "@material-ui/icons/Cancel";

import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { grey, pink, amber, green, red, lime } from "@material-ui/core/colors";

import { myFetch, UserContext, StudentContext } from "../Methods";
import Staff from "./Staff";

const StatusIcon = ({ status }) => {
	if (status === "APPROVED") return <ThumbUpIcon></ThumbUpIcon>;
	if (status === "DECLINED") return <CancelIcon></CancelIcon>;
	return <AutorenewIcon></AutorenewIcon>;
};

const getCommentTitle = (status) => {
	switch (status) {
		case "PENDING":
			return "Request Reason:";
		case "APPROVED":
			return "Approved Reason:";
		default:
			return "Declined Reason:";
	}
};

const style = ({ palette, spacing }) => ({
	left: {
		marginLeft: spacing(1),
	},
	pending: {
		backgroundColor: amber[400],
		"&:hover": {
			backgroundColor: amber[400],
		},
		borderRadius: 30,
	},
	approved: {
		backgroundColor: lime[400],
		"&:hover": {
			backgroundColor: lime[400],
		},
		borderRadius: 30,
	},
	declined: {
		backgroundColor: red[400],
		"&:hover": {
			backgroundColor: red[400],
		},
		borderRadius: 30,
	},
	scroll: {
		height: spacing(15),
		overflow: "scroll",
	},
});

export default withStyles(style, { name: "Content" })(
	({ children, appointmentData, classes, ...restProps }) => {
		const [openComments, setOpenComments] = useState(false);

		const getStatusStyle = (status) => {
			switch (status) {
				case "APPROVED":
					return classes.approved;
				case "DECLINED":
					return classes.declined;
				default:
					return classes.pending;
			}
		};

		return (
			<AppointmentTooltip.Content
				{...restProps}
				appointmentData={appointmentData}
			>
				<Grid container justify="center">
					<Grid item xs={11}>
						<List dense>
							<ListItem
								button
								onClick={() => setOpenComments(!openComments)}
							>
								<ListItemIcon>
									<DraftsIcon />
								</ListItemIcon>
								<ListItemText
									primary={getCommentTitle(
										appointmentData.status
									)}
								/>
								{openComments ? <ExpandLess /> : <ExpandMore />}
							</ListItem>
							<Collapse
								in={openComments}
								timeout="auto"
								unmountOnExit
							>
								<List component="div" disablePadding>
									<ListItem>
										<ListItemText
											secondary={
												<div className={classes.scroll}>
													{appointmentData.comments}
												</div>
											}
										/>
									</ListItem>
								</List>
							</Collapse>
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
									<AccountCircleIcon />
								</ListItemIcon>
								<ListItemText
									primary={
										appointmentData.staff
											? `${appointmentData.staff.firstName} ${appointmentData.staff.lastName}`
											: `${appointmentData.student.firstName} ${appointmentData.student.lastName}`
									}
									secondary={
										appointmentData.staff
											? appointmentData.staff.mail
											: appointmentData.student.mail
									}
								/>
							</ListItem>
							<ListItem>
								<Button
									fullWidth
									className={getStatusStyle(
										appointmentData.status
									)}
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
