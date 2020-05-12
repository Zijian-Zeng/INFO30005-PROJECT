import React, { useContext, useEffect, useState } from "react";
import {
	Grid,
	CardContent,
	withWidth,
	isWidthUp,
	Button,
	ButtonGroup,
	Paper,
	Typography,
	LinearProgress,
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
} from "@material-ui/core";
import { makeStyles, withStyles, lighten } from "@material-ui/core/styles";
import TimeTable from "../Timetable";

import Header from "./StudentHeader";
import Content from "./StudentContent";

import { myFetch, UserContext, StudentContext } from "../Methods";
import AddIcon from "@material-ui/icons/Add";

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
}));

export default ({ user, setUser }) => {
	const classes = useStyles();

	const { userInfo, setUserInfo } = user;

	const [data, setData] = useState([]);

	//timetable values...
	const [currentDate, setCurrentDate] = useState(new Date());

	const [cancelAppointment, setCancelAppointment] = useState("");

	const [currentSubject, setCurrentSubject] = useState(0);
	const [loading, setLoading] = useState(true);

	const { alert, detectAlert } = useContext(UserContext);

	const reloadUser = async () => {
		//reloading user information.
		const user = await myFetch("/api/shared/users/info", "GET");
		detectAlert(user);
		setUser(user);

		return user;
	};

	//Fetch the consultations of the current subject.
	const fetchConsult = async () => {
		setLoading(true);
		if (currentSubject == 0) {
			const res = await myFetch(
				"/api/student/consult/viewRegistered",
				"GET"
			);
			return res.consultations;
		}
		const body = { subjectCode: userInfo.subjects[currentSubject - 1] };
		const res = await myFetch("/api/student/consult/viewAll", "POST", body);
		return res.consultations;
	};

	//Updating consultations Information.
	useEffect(() => {
		reloadUser().then((user) => {
			fetchConsult().then((consultations) => {
				if (!consultations) return;

				//Formatting data for timetable to render.
				const consults = [];

				consultations.map((consultation) => {
					consults.push({
						title: consultation.subjectCode,
						startDate: new Date(consultation.startDate),
						endDate: new Date(consultation.endDate),
						id: consultation._id,
						location: consultation.location,
						slotsAvailable: consultation.slotsAvailable,
						totalStudent: consultation.studentRegistered.length,
						booked:
							user.userInfo.registeredConsult.filter(
								(each) => each == consultation._id
							).length > 0,
					});
				});
				setData(consults);
				setLoading(false);
			});
		});
	}, [alert.status, currentSubject]);

	//Cancel a booking.
	const cancel = async () => {
		setLoading(true);
		const body = {
			id: cancelAppointment,
		};
		const res = await myFetch("/api/student/consult/cancel", "POST", body);
		detectAlert(res, "Successfully canceled.");
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
			<Dialog
				open={cancelAppointment !== ""}
				onClose={() => setCancelAppointment("")}
				fullWidth
			>
				<DialogTitle>Cancel your booking</DialogTitle>
				<DialogContent>
					Do you want to cancel this booking?
				</DialogContent>
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
							color="primary"
							variant="contained"
							onClick={cancel}
							style={{
								textTransform: "none",
							}}
						>
							Yes, please cancel it.
						</Button>
					</ButtonGroup>
				</DialogActions>
			</Dialog>
			<AppBar position="relative" color="default">
				<Tabs
					value={currentSubject}
					indicatorColor="primary"
					textColor="primary"
					centered
					onChange={(event, newValue) => {
						setCurrentSubject(newValue);
						reloadUser();
					}}
				>
					<Tab label="Registered" />
					{userInfo.subjects.map((subject) => (
						<Tab label={subject} key={subject} />
					))}
				</Tabs>
			</AppBar>

			<Fade in timeout={500}>
				<div className={classes.paper}>
					<TimeTable
						data={data}
						currentDate={currentDate}
						setCurrentDate={setCurrentDate}
						header={Header}
						content={Content}
						loading={loading}
					/>
				</div>
			</Fade>
		</StudentContext.Provider>
	);
};
