import React, { useState } from "react";
import {
	Grid,
	Button,
	Dialog,
	DialogTitle,
	DialogActions,
	DialogContent,
	Slider,
	TextField,
	DialogContentText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { myFetch } from "../Methods";
import {
	KeyboardTimePicker,
	MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import Autocomplete from "@material-ui/lab/Autocomplete";

import RoomIcon from "@material-ui/icons/Room";
import SchoolIcon from "@material-ui/icons/School";
import ScheduleIcon from "@material-ui/icons/Schedule";
import GroupIcon from "@material-ui/icons/GroupAddTwoTone";

const useStyles = makeStyles((theme) => ({
	paper: {
		maxWidth: "100%",
		marginTop: theme.spacing(10),
	},
	hub: {
		marginTop: theme.spacing(5),
	},
	fab: {
		position: "fixed",
		bottom: theme.spacing(1) * 10,
		right: theme.spacing(1) * 8,
	},
	icon: {
		margin: "auto",
	},
}));

/***
 * Marks for duration slider.
 */
const marks = [
	{
		value: 0,
		label: "0 Minutes",
	},
	{
		value: 60,
		label: "1 hour",
	},
	{
		value: 120,
		label: "2 hours",
	},
	{
		value: 240,
		label: "4 hours",
	},
];

/***
 * Dialog for creating a study hub.
 */
export default ({
	open,
	setOpen,
	setLoading,
	subjects,
	fetchHubs,
	userInfo,
	setAlert,
	detectAlert,
	setHubs,
	currentSubject,
}) => {
	const classes = useStyles();

	//Study hub details.
	const [subjectCode, setSubjectCode] = useState(subjects[0]);
	const [startDate, setStartDate] = useState(new Date());
	const [location, setLocation] = useState("");
	const [duration, setDuration] = useState(15);
	const [summary, setSummary] = useState("");
	const [day, setDay] = useState("Monday");

	//fetch create API.
	const create = async () => {
		setLoading(true);
		setOpen(false);
		if (!subjectCode || !startDate || !subjectCode || location === "") {
			setAlert({ status: "warning", message: "Insufficient Input." });
			return;
		}
		const body = {
			subjectCode: subjectCode,
			startDate: startDate,
			duration: duration,
			location: location,
			day: day,
			summary: summary,
		};
		const res = await myFetch("/api/student/hub/create", "POST", body);
		detectAlert(res, "Successfully created.");
		const subjectHubs = await await fetchHubs(
			currentSubject,
			detectAlert,
			setLoading,
			userInfo
		);
		if (!subjectHubs) return;
		setHubs(subjectHubs);
		setLoading(false);
	};

	return (
		<Dialog
			open={open}
			onClose={() => {
				setOpen(false);
			}}
			aria-labelledby="form-dialog-title"
			fullWidth
		>
			<DialogTitle id="form-dialog-title">Create a study hub</DialogTitle>
			<DialogContent dividers>
				<Grid container>
					<Grid container>
						<Grid item xs={1}>
							<GroupIcon className={classes.icon} />
						</Grid>
						<Grid item xs={11}>
							<TextField
								label="Name of your hub"
								multiline
								fullWidth
								rowsMax={2}
								value={summary}
								onChange={(e) => {
									setSummary(e.target.value);
								}}
								variant="outlined"
							/>
							<br />
							<br />
						</Grid>
						<Grid item xs={1}>
							<SchoolIcon className={classes.icon} />
						</Grid>
						<Grid item xs={11}>
							<Autocomplete
								id="addSubject"
								options={subjects}
								getOptionLabel={(option) => option}
								value={subjectCode}
								onChange={(event, newValue) => {
									setSubjectCode(newValue);
								}}
								renderInput={(params) => {
									return (
										<TextField
											{...params}
											label="Please choose a subject"
											variant="filled"
											required
										/>
									);
								}}
							/>
							<br />
						</Grid>
					</Grid>
					<Grid item xs={1}>
						<ScheduleIcon className={classes.icon} />
					</Grid>
					<Grid item xs={11}>
						<Autocomplete
							options={[
								"Monday",
								"Tuesday",
								"Wednesday",
								"Thursday",
								"Friday",
								"Saturday",
								"Sunday",
							]}
							getOptionLabel={(option) => option}
							value={day}
							onChange={(event, newValue) => {
								setDay(day);
							}}
							renderInput={(params) => {
								return (
									<TextField
										{...params}
										label="Please choose a day"
										variant="filled"
										required
									/>
								);
							}}
						/>
						<br />
					</Grid>
					<Grid item xs={1}>
						<ScheduleIcon className={classes.icon} />
					</Grid>
					<Grid item xs={11}>
						<MuiPickersUtilsProvider utils={MomentUtils}>
							<KeyboardTimePicker
								label="Time"
								value={startDate}
								onChange={(date) => {
									setStartDate(date);
								}}
								fullWidth
								required
							/>
						</MuiPickersUtilsProvider>
						<br />
						<br />
					</Grid>
					<Grid item xs={1}>
						<br />
						<ScheduleIcon className={classes.icon} />
					</Grid>
					<Grid item xs={11}>
						<DialogContentText>
							{"Duration: "}
							{duration}
							{" Minutes"}
						</DialogContentText>
						<br />
						<Slider
							valueLabelDisplay="auto"
							marks={marks}
							aria-labelledby="discrete-slider"
							getAriaValueText={(value) => `${value} Minutes`}
							value={duration}
							onChange={(e, newValue) => {
								setDuration(newValue);
							}}
							step={15}
							max={300}
						/>
						<br />
						<br />
					</Grid>
					<Grid item xs={1}>
						<RoomIcon className={classes.icon} />
					</Grid>
					<Grid item xs={11}>
						<TextField
							label="Location"
							variant="filled"
							required
							value={location}
							onChange={(e) => {
								setLocation(e.target.value);
							}}
							fullWidth
						/>
						<DialogContentText></DialogContentText>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button
					fullWidth
					onClick={() => {
						setOpen(false);
					}}
				>
					Cancel
				</Button>
				<Button
					fullWidth
					color="primary"
					variant="contained"
					onClick={create}
				>
					Create
				</Button>
			</DialogActions>
		</Dialog>
	);
};
