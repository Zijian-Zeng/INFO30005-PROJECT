import React, { useContext, useEffect, useState } from "react";
import {
	Grid,
	CardContent,
	withWidth,
	isWidthUp,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
	Snackbar,
	Backdrop,
	CircularProgress,
} from "@material-ui/core";
import { makeStyles, withStyles, lighten } from "@material-ui/core/styles";
import { myFetch, UserContext } from "../Methods";
import Cookies from "js-cookie";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useHistory } from "react-router-dom";

export default ({
	open,
	subjectCode,
	setSubjectCode,
	handleDialogClose,
	userType,
}) => {
	const { detectAlert, loadingRoute, setLoadingRoute } = useContext(
		UserContext
	);
	const [allSubjects, setAllSubjects] = useState([]);

	useEffect(() => {
		const fetchAllSubject = async () => {
			const res = await myFetch("/api/shared/users/allSubjects", "GET");
			setAllSubjects(res.subjectList);
			detectAlert(res);
			console.log(res.subjectList);
		};
		fetchAllSubject();
	}, []);

	const GetField = () => {
		return (
			<Autocomplete
				id="addSubject"
				options={allSubjects}
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
		);
	};

	const join = async (e) => {
		e.preventDefault();
		let url = "/api/student/subjects/join";
		if (userType === "staff") url = "/api/staff/subjects/join";
		setLoadingRoute(true);
		const res = await myFetch(url, "POST", {
			subjectCode: subjectCode,
		});
		detectAlert(
			res,
			`You have successfully joined subject ${subjectCode}.`
		);

		setLoadingRoute(false);
	};

	return (
		<Dialog
			open={open}
			onClose={handleDialogClose}
			aria-labelledby="form-dialog-title"
			fullWidth
		>
			<DialogTitle id="form-dialog-title">Join a new Subject</DialogTitle>
			<DialogContent>
				<DialogContentText>bla bla bla...</DialogContentText>
				<GetField />
			</DialogContent>

			<DialogActions>
				<Button fullWidth onClick={handleDialogClose}>
					Cancel
				</Button>
				<Button
					fullWidth
					color="primary"
					variant="contained"
					onClick={join}
				>
					Join
				</Button>
			</DialogActions>
		</Dialog>
	);
};
