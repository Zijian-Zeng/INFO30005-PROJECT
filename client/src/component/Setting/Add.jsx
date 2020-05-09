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
} from "@material-ui/core";
import { makeStyles, withStyles, lighten } from "@material-ui/core/styles";
import { useFetch, myFetch } from "../Methods";
import Cookies from "js-cookie";

import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useHistory } from "react-router-dom";

export default ({
	open,
	handleClose,
	subjectCode,
	setSubjectCode,
	handleDialogClose,
	setError,
	setAdded,
}) => {
	const history = useHistory();

	const [allSubjects, loadingAll] = useFetch(
		"/api/shared/users/allSubjects",
		"GET",
		Cookies.get("meetute")
	);

	if (loadingAll) return null;

	const GetField = () => {
		if (loadingAll) return null;
		return (
			<Autocomplete
				id="addSubject"
				options={allSubjects.subjectList}
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

		const msg = await myFetch("/api/student/subjects/join", "POST", {
			subjectCode: subjectCode,
		});
		console.log(msg);
		if (msg.success) {
			setAdded("You have successfully joined the subject.");
			handleDialogClose();
		} else {
			setError(msg.error);
		}
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
				<Button onClick={handleDialogClose}>Cancel</Button>
				<Button color="primary" variant="contained" onClick={join}>
					Join
				</Button>
			</DialogActions>
		</Dialog>
	);
};
