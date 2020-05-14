import React, { useContext, useEffect, useState } from "react";
import {
	Grid,
	withWidth,
	isWidthUp,
	Button,
	ButtonGroup,
	Paper,
	Typography,
	Grow,
	Fab,
	Zoom,
	Collapse,
	Fade,
	Tabs,
	AppBar,
	Tab,
	Dialog,
	DialogContent,
	DialogTitle,
	DialogActions,
	IconButton,
	TextField,
} from "@material-ui/core";
import {
	makeStyles,
	withStyles,
	lighten,
	useTheme,
} from "@material-ui/core/styles";
import TimeTable from "../Timetable";

import Header from "./StaffHeader";
import Content from "./StudentContent";
import TimetableBar from "./TimetableBar";

import { myFetch, UserContext, StaffContext } from "../Methods";
import CloseIcon from "@material-ui/icons/Close";
import { grey, red, green, lime } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
	paper: {
		maxHeight: "70VH",
	},
	fab: {
		position: "fixed",
		bottom: theme.spacing(1) * 6,
		right: theme.spacing(1) * 6,
	},
	noDecoration: {
		textDecoration: "none !important",
	},
	delete: {
		textTransform: "none",
		color: theme.palette.getContrastText(grey[700]),
		background: grey[700],
		"&:hover": {
			color: theme.palette.getContrastText(grey[900]),
			background: grey[900],
		},
	},
	closeButton: {
		position: "absolute",
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
	approve: {
		backgroundColor: green[400],
		"&:hover": {
			backgroundColor: green[600],
		},
	},
	decline: {
		backgroundColor: red[500],
		"&:hover": {
			backgroundColor: red[700],
		},
	},
}));

const PendDialog = ({ pendAppointment, setPendAppointment, pend, classes }) => (
	<Dialog
		open={pendAppointment.id !== ""}
		onClose={() => setPendAppointment({ id: "" })}
		fullWidth
	>
		<DialogTitle>
			Pending this appointment{" "}
			<IconButton
				aria-label="close"
				className={classes.closeButton}
				onClick={() => setPendAppointment({ id: "" })}
			>
				<CloseIcon />
			</IconButton>
		</DialogTitle>
		<DialogContent>
			<TextField
				label="Any comment for him/her?"
				multiline
				fullWidth
				rowsMax={4}
				value={pendAppointment.comments}
				onChange={(e) => {
					setPendAppointment({
						id: pendAppointment.id,
						comments: e.target.value,
					});
				}}
				variant="outlined"
			/>
		</DialogContent>
		<DialogActions>
			<ButtonGroup fullWidth>
				<Button
					fullWidth
					variant="contained"
					onClick={() => pend("DECLINED")}
					className={classes.decline}
					color={red[400]}
				>
					Decline it.
				</Button>
				<Button
					fullWidth
					onClick={() => pend("APPROVED")}
					color={green[400]}
					variant="contained"
					className={classes.approve}
				>
					Approve it.
				</Button>
			</ButtonGroup>
		</DialogActions>
	</Dialog>
);

export default () => {
	const classes = useStyles();

	//timetable values...
	const [data, setData] = useState([]);
	const [currentDate, setCurrentDate] = useState(new Date());
	const [pendAppointment, setPendAppointment] = useState({
		id: "",
		comments: "",
	});
	const [loading, setLoading] = useState(true);
	const { alert, detectAlert, user, setUser } = useContext(UserContext);

	//Timetable bar....
	const [currentStatus, setCurrentStatus] = useState(0);
	const [mainResourceName, setMainResourceName] = useState("status");

	const { userInfo } = user;

	//Reloading user information.
	const reloadUser = async () => {
		const res = await myFetch("/api/shared/users/info", "GET");
		detectAlert(res);
		setUser(res);
		return res;
	};

	//Fetch the appointments of the current subject.
	const fetchAppoint = async () => {
		setLoading(true);
		const res = await myFetch("/api/staff/appointment/all", "GET");
		detectAlert(res);
		return res.appointments;
	};

	const formatData = (data, status) => {
		//Formatting data for timetable to render.
		const appoints = [];
		data.map((appointment) => {
			switch (status) {
				case 1:
					if (appointment.status !== "PENDING") return;
					break;
				case 2:
					if (appointment.status !== "APPROVED") return;
					break;
				case 3:
					if (appointment.status !== "DECLINED") return;
					break;
				default:
					break;
			}
			appoints.push({
				title: appointment.subjectCode,
				startDate: new Date(appointment.startDate),
				endDate: new Date(appointment.endDate),
				id: appointment._id,
				location: appointment.location,
				status: appointment.status,
				student: appointment.student,
				comments: appointment.comment,
			});
		});
		setData(appoints);
		setLoading(false);
	};

	//Updating appointments Information.
	useEffect(() => {
		reloadUser().then((user) => {
			fetchAppoint().then((appointments) =>
				formatData(appointments, currentStatus)
			);
		});
	}, [alert.status, currentStatus]);

	//pend an appointment.
	const pend = async (status) => {
		setLoading(true);
		const body = {
			id: pendAppointment.id,
			status: status,
			comment: pendAppointment.comments,
		};
		const res = await myFetch("/api/staff/appointment/pend", "PATCH", body);
		detectAlert(res, "Successfully Deleted.");
		setPendAppointment({ id: "" });
	};

	return (
		<StaffContext.Provider
			value={{
				currentDate,
				setCurrentDate,
				pendAppointment,
				setPendAppointment,
				data,
				setData,
				userInfo,
				loading,
				setLoading,
				setUser,
			}}
		>
			<PendDialog
				pendAppointment={pendAppointment}
				setPendAppointment={setPendAppointment}
				pend={pend}
				classes={classes}
			/>
			<Fade in timeout={500}>
				<div className={classes.paper}>
					<Grid container justify="space-around">
						<Grid item xs={12}>
							<TimetableBar
								currentStatus={currentStatus}
								setCurrentStatus={setCurrentStatus}
								mainResourceName={mainResourceName}
								setMainResourceName={setMainResourceName}
							/>
							<TimeTable
								data={data}
								currentDate={currentDate}
								setCurrentDate={setCurrentDate}
								header={Header}
								content={Content}
								loading={loading}
								mainResourceName={mainResourceName}
								subjects={user.userInfo.subjects}
							/>
						</Grid>
					</Grid>
				</div>
			</Fade>
		</StaffContext.Provider>
	);
};
