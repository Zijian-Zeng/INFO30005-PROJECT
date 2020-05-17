import React, { useState } from "react";
import { AppointmentTooltip } from "@devexpress/dx-react-scheduler-material-ui";

import { withStyles } from "@material-ui/core/styles";
import {
	Grid,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Button,
	Collapse,
} from "@material-ui/core";

import RoomIcon from "@material-ui/icons/Room";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import CancelIcon from "@material-ui/icons/Cancel";
import DraftsIcon from "@material-ui/icons/Drafts";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { amber, green, red } from "@material-ui/core/colors";

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
		backgroundColor: green[400],
		"&:hover": {
			backgroundColor: green[400],
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

/***
 * Customized timetable content for appointment feature (student).
 */
export default withStyles(style, { name: "Content" })(
	({ children, appointmentData, classes, ...restProps }) => {
		const [openComments, setOpenComments] = useState(false);

		//Styles for status label.
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
