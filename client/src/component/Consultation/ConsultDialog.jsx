import React, { useContext, useState } from "react";
import {
	Grid,
	Button,
	ButtonGroup,
	IconButton,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
	Slider,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { myFetch, UserContext } from "../Methods";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SchoolIcon from "@material-ui/icons/School";
import GroupIcon from "@material-ui/icons/GroupAddTwoTone";
import CloseIcon from "@material-ui/icons/Close";
import ScheduleIcon from "@material-ui/icons/Schedule";
import RoomIcon from "@material-ui/icons/Room";
import { grey } from "@material-ui/core/colors";
import MomentUtils from "@date-io/moment";
import {
	KeyboardDateTimePicker,
	MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { StaffContext } from "../Methods";

const SlotSlider = withStyles({
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

/***
 * The delete button.
 */
const DeleteButton = withStyles((theme) => ({
	root: {
		color: theme.palette.getContrastText(grey[700]),
		backgroundColor: grey[700],
		"&:hover": {
			backgroundColor: grey[900],
		},
	},
}))(Button);

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

const useStyles = makeStyles((theme) => ({
	icon: {
		margin: "auto",
	},

	closeButton: {
		position: "absolute",
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
}));

/***
 * Dialog for editing/creating an consultation.
 */
export default ({ edit, open, toggle }) => {
	const classes = useStyles();
	const {
		editingAppointment,
		setEditingAppointment,
		setLoading,
		api,
	} = useContext(StaffContext);
	const { detectAlert, setAlert, user } = useContext(UserContext);
	const subjects = user.userInfo.subjects;

	//Consultation data...
	const [subjectCode, setSubjectCode] = useState(subjects[0]);
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [location, setLocation] = useState("");
	const [slot, setSlot] = useState(20);

	const getDuration = (startDate, endDate) => {
		const duration = (endDate - startDate) / 60000;
		if (duration < 15) return 15;
		if (duration > 300) return 300;
		return duration;
	};

	const getEndDate = (start, duration) => {
		const end = new Date(start);
		return end.setMinutes(end.getMinutes() + duration);
	};

	//Create a consultation...
	const createTime = async () => {
		setLoading(true);
		if (!subjectCode || !startDate || !endDate || location === "") {
			setAlert({ status: "warning", message: "Insufficient Input." });
			return;
		}
		const body = {
			subjectCode: subjectCode,
			startDate: startDate,
			endDate: getEndDate(startDate, getDuration(startDate, endDate)),
			location: location,
			slotsAvailable: slot,
		};
		const res = await myFetch(api.create, "POST", body);
		detectAlert(res, "Successfully created.");
		toggle();
		return res;
	};

	//Edit a consultation...
	const editTime = async () => {
		setLoading(true);
		if (
			!editingAppointment.endDate ||
			!editingAppointment.startDate ||
			!editingAppointment.slotsAvailable ||
			editingAppointment.location === ""
		) {
			setAlert({ status: "warning", message: "Insufficient Input." });
			return;
		}

		const res = await myFetch(api.edit, "PATCH", editingAppointment);
		detectAlert(res, "Successfully updated.");
		toggle();
		return res;
	};

	//Delete a consultation...
	const deleteTime = async () => {
		setLoading(true);
		const body = {
			id: editingAppointment.id,
		};
		const res = await myFetch(api.delete, "DELETE", body);
		detectAlert(res, "Successfully deleted.");
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
				{!edit ? "Create a new Consultation" : "Edit a Consultation"}

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
											endDate: getEndDate(
												editingAppointment.startDate,
												getDuration(
													editingAppointment.startDate,
													editingAppointment.endDate
												)
											),
										});
										return;
									}
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
							{edit
								? getDuration(
										editingAppointment.startDate,
										editingAppointment.endDate
								  )
								: getDuration(startDate, endDate)}
							{" Minutes"}
						</DialogContentText>
						<br />
						<Slider
							valueLabelDisplay="auto"
							marks={marks}
							aria-labelledby="discrete-slider"
							getAriaValueText={(value) => `${value} Minutes`}
							value={
								edit
									? getDuration(
											editingAppointment.startDate,
											editingAppointment.endDate
									  )
									: getDuration(startDate, endDate)
							}
							onChange={(e, newValue) => {
								if (edit) {
									setEditingAppointment({
										...editingAppointment,
										endDate: getEndDate(
											editingAppointment.startDate,
											newValue
										),
									});
									return;
								}
								setEndDate(getEndDate(startDate, newValue));
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
						<SlotSlider
							valueLabelDisplay="auto"
							aria-label="pretto slider"
							aria-labelledby="discrete-slider"
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
								deleteTime().then((res) => {
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
								editTime().then((res) => {
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
								createTime().then((res) => {
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
