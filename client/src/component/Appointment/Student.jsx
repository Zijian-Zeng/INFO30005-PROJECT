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
	Select,
	MenuItem,
} from "@material-ui/core";
import {
	makeStyles,
	withStyles,
	lighten,
	useTheme,
} from "@material-ui/core/styles";
import TimeTable from "../Timetable";

import Header from "./StudentHeader";
import Content from "./StudentContent";
import StudentQuery from "./StudentQuery";
import TimetableBar from "./TimetableBar";

import { myFetch, UserContext, StudentContext } from "../Methods";
import AddIcon from "@material-ui/icons/Add";
import { grey } from "@material-ui/core/colors";

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
}));

const CancelDialog = ({
	cancelAppointment,
	setCancelAppointment,
	classes,
	cancel,
}) => (
	<Dialog
		open={cancelAppointment !== ""}
		onClose={() => setCancelAppointment("")}
		fullWidth
	>
		<DialogTitle>Delete your Appointment?</DialogTitle>
		<DialogContent>Do you want to delete this Appointment?</DialogContent>
		<DialogActions>
			<ButtonGroup fullWidth>
				<Button
					fullWidth
					onClick={() => setCancelAppointment("")}
					style={{
						textTransform: "none",
					}}
				>
					No, thanks.
				</Button>
				<Button
					fullWidth
					variant="contained"
					onClick={cancel}
					className={classes.delete}
				>
					Yes, please delete it.
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
	const [cancelAppointment, setCancelAppointment] = useState("");
	const [loading, setLoading] = useState(true);

	//Timetable bar....
	const [currentStatus, setCurrentStatus] = useState(0);
	const [mainResourceName, setMainResourceName] = useState("status");

	const { alert, detectAlert, user, setUser } = useContext(UserContext);
	const { userInfo } = user;

	//Reloading user information.
	const reloadUser = async () => {
		const res = await myFetch("/api/shared/users/info", "GET");
		detectAlert(res);
		setUser(res);
		return res;
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
				staff: appointment.staff,
				comments: appointment.comment,
			});
		});
		setData(appoints);
		setLoading(false);
	};

	//Fetch the appointments of the current subject.
	const fetchAppoint = async () => {
		setLoading(true);
		const res = await myFetch("/api/student/appointment/all", "GET");
		detectAlert(res);
		return res.appointments;
	};

	//Updating appointments Information.
	useEffect(() => {
		reloadUser().then((user) => {
			fetchAppoint().then((appointments) =>
				formatData(appointments, currentStatus)
			);
		});
	}, [alert.status, currentStatus]);

	//Cancel an appointment.
	const cancel = async () => {
		setLoading(true);
		const body = {
			id: cancelAppointment,
		};
		const res = await myFetch(
			"/api/student/appointment/delete",
			"DELETE",
			body
		);
		detectAlert(res, "Successfully Deleted.");
		setCancelAppointment("");
	};

	return (
		<StudentContext.Provider
			value={{
				currentDate,
				setCurrentDate,
				cancelAppointment,
				setCancelAppointment,
				data,
				setData,
				userInfo,
				loading,
				setLoading,
				setUser,
			}}
		>
			<CancelDialog
				cancelAppointment={cancelAppointment}
				setCancelAppointment={setCancelAppointment}
				classes={classes}
				cancel={cancel}
			/>
			<Fade in timeout={500}>
				<div className={classes.paper}>
					<Grid container justify="space-around">
						<Grid item xs={3}>
							<StudentQuery userInfo={userInfo} />
						</Grid>
						<Grid item xs={8}>
							<TimetableBar
								currentStatus={currentStatus}
								setCurrentStatus={setCurrentStatus}
								mainResourceName={mainResourceName}
								setMainResourceName={setMainResourceName}
								data={data}
								setData={setData}
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
		</StudentContext.Provider>
	);
};
