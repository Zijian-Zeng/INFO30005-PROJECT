import React, { useContext, useEffect, useState } from "react";
import {
	Grid,
	withWidth,
	isWidthUp,
	Typography,
	Tooltip,
	Fab,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemSecondaryAction,
	ListItemText,
	Avatar,
	Grow,
	Divider,
	Snackbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import SchoolIcon from "@material-ui/icons/School";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import Add from "./Add";
import Alert from "@material-ui/lab/Alert";

import { myFetch } from "../Methods";

const useStyles = makeStyles((theme) => ({
	paper: {
		maxWidth: "100%",
		marginTop: theme.spacing(10),
	},
	fab: {
		position: "absolute",
		bottom: theme.spacing(10),
		right: theme.spacing(10),
	},
}));

export default ({ user, setMySubjects, mySubjects }) => {
	//
	const classes = useStyles();
	const { type, userInfo } = user;
	const { firstName, lastName } = userInfo;
	const [open, setOpen] = useState(false);
	const [subjectCode, setSubjectCode] = useState("");
	const [error, setError] = useState("");
	const [added, setAdded] = useState("");

	useEffect(() => {
		const fetchSubject = async () => {
			const subjects = await myFetch("/api/student/subjects/all", "GET");
			setMySubjects(subjects);
		};
		fetchSubject();
	}, [added]);

	const handleDialogOpen = () => {
		setAdded("");
		if (mySubjects.subjectsInfo.length > 4) {
			setError("Maximum 5 subjects.");
			return;
		}
		setOpen(true);
	};

	const handleDialogClose = () => {
		setOpen(false);
	};

	const handleClose = () => {
		setError("");
		setAdded("");
	};

	const leave = async (subjectCode) => {
		const msg = await myFetch("/api/student/subjects/leave", "POST", {
			subjectCode: subjectCode,
		});
		if (msg.success) {
			setAdded("You have successfully left the subject.");
		} else {
			setError(msg.error);
		}
	};

	return (
		<div>
			<Snackbar
				open={error !== ""}
				autoHideDuration={3000}
				onClose={handleClose}
			>
				<Alert
					elevation={6}
					variant="filled"
					onClose={() => {
						setError("");
					}}
					severity="error"
				>
					{error}
				</Alert>
			</Snackbar>
			<Snackbar
				open={added !== ""}
				autoHideDuration={3000}
				onClose={handleClose}
			>
				<Alert
					elevation={6}
					variant="filled"
					onClose={() => {
						setAdded("");
					}}
					severity="success"
				>
					{added}
				</Alert>
			</Snackbar>

			<Tooltip title="Join new subject" aria-label="add">
				<Fab
					color="primary"
					size="large"
					className={classes.fab}
					onClick={handleDialogOpen}
				>
					<AddIcon />
				</Fab>
			</Tooltip>
			<Add
				open={open}
				handleDialogClose={handleDialogClose}
				handleClose={handleClose}
				subjectCode={subjectCode}
				setSubjectCode={setSubjectCode}
				error={error}
				setError={setError}
				setAdded={setAdded}
			/>
			<Grid container justify="center" alignItems="center">
				<Grid item xs={12}>
					{mySubjects.subjectsInfo.map(
						({ subjectCode, subjectName }, index) => (
							<Grow in timeout={index + 1 * 500} key={index}>
								<List>
									<Divider />
									<ListItem>
										<ListItemAvatar>
											<Avatar>
												<SchoolIcon />
											</Avatar>
										</ListItemAvatar>
										<ListItemText
											primary={subjectCode}
											secondary={subjectName}
										/>
										<ListItemSecondaryAction>
											<IconButton
												edge="end"
												aria-label="delete"
												onClick={() => {
													leave(subjectCode);
												}}
											>
												<DeleteIcon />
											</IconButton>
										</ListItemSecondaryAction>
									</ListItem>
									<Divider />
								</List>
							</Grow>
						)
					)}
				</Grid>
			</Grid>
		</div>
	);
};
