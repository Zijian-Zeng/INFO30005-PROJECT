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
	Paper,
	Snackbar,
} from "@material-ui/core";
import { makeStyles, withStyles, lighten } from "@material-ui/core/styles";
import { useFetch, myFetch } from "../Methods";
import Cookies from "js-cookie";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useHistory } from "react-router-dom";

export default ({
	open,
	subjectCode,
	setSubjectCode,
	subjectName,
	setSubjectName,
	handleDialogClose,
	setError,
	setAdded,
}) => {
	const create = async () => {
		console.log(subjectCode + subjectName);

		const msg = await myFetch("/api/staff/subjects/create", "POST", {
			subjectCode: subjectCode,
			subjectName: subjectName,
		});
		console.log(msg);
		if (msg.success) {
			setAdded(`You have successfully created subject ${subjectCode}.`);
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
			<DialogTitle id="form-dialog-title">
				Create a new Subject
			</DialogTitle>
			<DialogContent>
				<DialogContentText>bla bla bla...</DialogContentText>

				<TextField
					label="Subject Code"
					required
					onChange={(event) => {
						setSubjectCode(event.target.value);
					}}
					fullWidth
				/>
				<br />
				<br />

				<TextField
					label="Subject Name"
					required
					onChange={(event) => {
						setSubjectName(event.target.value);
					}}
					fullWidth
				/>
			</DialogContent>

			<DialogActions>
				<Button fullWidth onClick={handleDialogClose}>
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
