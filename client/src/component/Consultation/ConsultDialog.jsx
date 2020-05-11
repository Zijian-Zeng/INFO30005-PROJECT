import React, { useContext, useEffect, useState } from "react";
import {
	Grid,
	CardContent,
	withWidth,
	isWidthUp,
	Button,
	ButtonGroup,
	IconButton,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
	Paper,
	Snackbar,
	Slider,
	Tooltip,
} from "@material-ui/core";
import { makeStyles, withStyles, lighten } from "@material-ui/core/styles";
import { myFetch, UserContext } from "../Methods";
import Cookies from "js-cookie";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useHistory } from "react-router-dom";
import { ToggleOff } from "@material-ui/icons";
import SchoolIcon from "@material-ui/icons/School";
import ScheduleIcon from "@material-ui/icons/Schedule";
import RoomIcon from "@material-ui/icons/Room";
import GroupIcon from "@material-ui/icons/GroupAddTwoTone";
import CloseIcon from "@material-ui/icons/Close";
import { red, pink } from "@material-ui/core/colors";

import MomentUtils from "@date-io/moment";
import {
	KeyboardDateTimePicker,
	MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import { StaffContext } from "../Methods";

const PrettoSlider = withStyles({
	root: {
		color: "#52af77",
		height: 8,
	},
	thumb: {
		height: 24,
		width: 24,
		backgroundColor: "#fff",
		border: "2px solid currentColor",
		marginTop: -8,
		marginLeft: -12,
		"&:focus, &:hover, &$active": {
			boxShadow: "inherit",
		},
	},
	active: {},
	valueLabel: {
		left: "calc(-50% + 4px)",
	},
	track: {
		height: 8,
		borderRadius: 4,
	},
	rail: {
		height: 8,
		borderRadius: 4,
	},
})(Slider);

const useStyles = makeStyles((theme) => ({
	icon: {
		margin: "auto",
	},
	delete: {
		backgroundColor:
			"linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)",
		"&:hover": {
			backgroundColor: "#52af77",
		},
	},

	closeButton: {
		position: "absolute",
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
}));

const DeleteButton = withStyles((theme) => ({
	root: {
		color: theme.palette.getContrastText(pink[400]),
		backgroundColor: pink[400],
		"&:hover": {
			backgroundColor: pink[600],
		},
	},
}))(Button);

export default ({ edit, open, toggle }) => {
	const classes = useStyles();

	const [subjectCode, setSubjectCode] = useState("");
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [location, setLocation] = useState("");
	const [slot, setSlot] = useState(20);

	const { setStatus, detectAlert, setAlert } = useContext(UserContext);
	const {
		userInfo,
		editingAppointment,
		setEditingAppointment,
		setLoading,
	} = useContext(StaffContext);
	const { subjects } = userInfo;

	const createConsult = async () => {
		setLoading(true);
		if (!subjectCode || !startDate || !endDate) {
			setAlert({ status: "warning", message: "Insufficient Input." });
			return;
		}
		const body = {
			subjectCode: subjectCode,
			startDate: startDate,
			endDate: endDate,
			location: location,
			slotsAvailable: slot,
		};
		const res = await myFetch("/api/staff/consult/create", "POST", body);
		detectAlert(res, "You have successfully created a consultation.");
		toggle();
		return res;
	};

	const editConsult = async () => {
		setLoading(true);
		if (
			!editingAppointment.endDate ||
			!editingAppointment.startDate ||
			!editingAppointment.slotsAvailable ||
			!editingAppointment.location
		) {
			setStatus("Error! insufficient Input.");
			return;
		}

		const res = await myFetch(
			"/api/staff/consult/patch",
			"PATCH",
			editingAppointment
		);
		detectAlert(res, "You have successfully updated a consultation.");
		toggle();
		return res;
	};

	const deleteConsult = async () => {
		setLoading(true);
		const body = {
			id: editingAppointment.id,
		};
		const res = await myFetch("/api/staff/consult/delete", "DELETE", body);
		detectAlert(res, "You have successfully deleted a consultation.");
		toggle();
		return res;
	};

	return (
		<Dialog
			open={open}
			onClose={toggle}
			aria-labelledby="form-dialog-title"
			fullWidth
		>
			<DialogTitle id="form-dialog-title">
				{edit ? "Create a new Consultation" : "Edit a Consultation"}

				<IconButton
					aria-label="close"
					className={classes.closeButton}
					onClick={toggle}
				>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent dividers>
				<Grid container>
					{edit ? null : (
						<Grid container>
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
								<br />
							</Grid>
						</Grid>
					)}
					<Grid item xs={1}>
						<ScheduleIcon className={classes.icon} />
					</Grid>
					<Grid item xs={11}>
						<MuiPickersUtilsProvider utils={MomentUtils}>
							<KeyboardDateTimePicker
								label="Start Date"
								value={
									edit
										? editingAppointment.startDate
										: startDate
								}
								onChange={(date) => {
									if (edit) {
										setEditingAppointment({
											...editingAppointment,
											startDate: date,
										});
										return;
									}
									setStartDate(date);
								}}
								fullWidth
								required
							/>
							<br />
							<br />
							<KeyboardDateTimePicker
								label="End Date"
								value={
									edit ? editingAppointment.endDate : endDate
								}
								onChange={(date) => {
									if (edit) {
										setEditingAppointment({
											...editingAppointment,
											endDate: date,
										});
										return;
									}
									setEndDate(date);
								}}
								fullWidth
								required
							/>
						</MuiPickersUtilsProvider>
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
							value={
								edit ? editingAppointment.location : location
							}
							onChange={(e) => {
								if (edit) {
									setEditingAppointment({
										...editingAppointment,
										location: e.target.value,
									});
									return;
								}
								setLocation(e.target.value);
							}}
							fullWidth
						/>
						<DialogContentText></DialogContentText>
					</Grid>
					<Grid item xs={1}>
						<br />
						<GroupIcon className={classes.icon} />
					</Grid>
					<Grid item xs={11}>
						<DialogContentText>
							Slot Available:{" "}
							{edit ? editingAppointment.slotsAvailable : slot}
						</DialogContentText>
						<br />

						<PrettoSlider
							valueLabelDisplay="auto"
							aria-label="pretto slider"
							value={
								edit ? editingAppointment.slotsAvailable : slot
							}
							onChange={(e, newValue) => {
								if (edit) {
									setEditingAppointment({
										...editingAppointment,
										slotsAvailable: newValue,
									});
								}
								setSlot(newValue);
							}}
						/>
					</Grid>
				</Grid>
			</DialogContent>

			<DialogActions>
				{edit ? (
					<ButtonGroup fullWidth>
						<DeleteButton
							fullWidth
							onClick={() => {
								toggle();
								deleteConsult().then((res) => {
									console.log(res);
									setLoading(false);
								});
							}}
							className={classes.delete}
						>
							Delete
						</DeleteButton>
						<Button
							fullWidth
							color="primary"
							variant="contained"
							onClick={() => {
								editConsult().then((res) => {
									console.log(res);
									setLoading(false);
								});
							}}
						>
							Update
						</Button>
					</ButtonGroup>
				) : (
					<ButtonGroup fullWidth>
						<Button fullWidth onClick={toggle}>
							Cancel
						</Button>
						<Button
							fullWidth
							color="primary"
							variant="contained"
							onClick={() => {
								createConsult().then((res) => {
									console.log(res);
									setLoading(false);
								});
							}}
						>
							Create
						</Button>
					</ButtonGroup>
				)}
			</DialogActions>
		</Dialog>
	);
};
