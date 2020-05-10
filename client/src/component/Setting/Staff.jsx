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
import CreateIcon from "@material-ui/icons/Create";

import Alert from "@material-ui/lab/Alert";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";

import { myFetch } from "../Methods";
import Add from "./Add";
import Create from "./Create";

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
	const classes = useStyles();
	const [openJoin, setOpenJoin] = useState(false);
	const [openCreate, setOpenCreate] = useState(false);
	const [openSpeed, setOpenSpeed] = useState(false);
	const [subjectCode, setSubjectCode] = useState("");
	const [newName, setNewName] = useState("");
	const [error, setError] = useState("");
	const [added, setAdded] = useState("");

	const { type, userInfo } = user;
	const { firstName, lastName } = userInfo;

	useEffect(() => {
		const fetchSubject = async () => {
			const subjects = await myFetch("/api/staff/subjects/all", "GET");
			setMySubjects(subjects);
		};
		fetchSubject();
	}, [added]);

	const handleAlertClose = () => {
		setError("");
		setAdded("");
		setSubjectCode("");
	};

	const handleJoinOpen = () => {
		handleAlertClose();
		if (mySubjects.subjectsInfo.length > 4) {
			setError("Maximum 5 subjects.");
			return;
		}
		setOpenJoin(true);
	};

	const leave = async (subjectCode) => {
		const msg = await myFetch("/api/staff/subjects/leave", "POST", {
			subjectCode: subjectCode,
		});
		console.log(msg);
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
				onClose={handleAlertClose}
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
				onClose={handleAlertClose}
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
			<SpeedDial
				ariaLabel="SpeedDial example"
				className={classes.fab}
				icon={<SpeedDialIcon />}
				open={openSpeed}
				onClose={() => {
					setOpenSpeed(false);
				}}
				onOpen={() => {
					setOpenSpeed(true);
				}}
				direction="up"
			>
				<SpeedDialAction
					icon={<AddIcon />}
					tooltipTitle="Join new subject"
					onClick={handleJoinOpen}
				/>
				<SpeedDialAction
					icon={<CreateIcon />}
					tooltipTitle="Create new subject"
					onClick={() => {
						handleAlertClose();
						setOpenCreate(true);
					}}
				/>
			</SpeedDial>

			<Add
				open={openJoin}
				handleDialogClose={() => {
					setOpenJoin(false);
				}}
				subjectCode={subjectCode}
				setSubjectCode={setSubjectCode}
				error={error}
				setError={setError}
				setAdded={setAdded}
				userType={"staff"}
			/>
			<Create
				open={openCreate}
				handleDialogClose={() => {
					setOpenCreate(false);
				}}
				subjectCode={subjectCode}
				setSubjectCode={setSubjectCode}
				subjectName={newName}
				setSubjectName={setNewName}
				error={error}
				setError={setError}
				setAdded={setAdded}
			/>

			<Grid container justify="center" alignItems="center">
				<Grid item xs={12}>
					{mySubjects.subjectsInfo.map(
						({ subjectCode, subjectName }, index) => (
							<Grow in timeout={index + 1 * 200} key={index}>
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
