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

import { myFetch, UserContext } from "../Methods";

const useStyles = makeStyles((theme) => ({
	paper: {
		maxWidth: "100%",
		marginTop: theme.spacing(10),
	},
	fab: {
		position: "fixed",
		bottom: theme.spacing(1) * 10,
		right: theme.spacing(1) * 11,
	},
}));

export default ({ user, setMySubjects, mySubjects }) => {
	//
	const classes = useStyles();
	const { type, userInfo } = user;
	const { firstName, lastName } = userInfo;
	const [open, setOpen] = useState(false);
	const [subjectCode, setSubjectCode] = useState("");

	const {
		setLoadingRoute,
		alert,
		setAlert,
		detectAlert,
		closeAlert,
	} = useContext(UserContext);

	useEffect(() => {
		const fetchMySubject = async () => {
			const res = await myFetch("/api/student/subjects/all", "GET");
			detectAlert(res);
			setMySubjects(res);
		};

		fetchMySubject();
	}, [alert.status]);

	const leave = async (subjectCode) => {
		setLoadingRoute(true);
		const res = await myFetch("/api/student/subjects/leave", "POST", {
			subjectCode: subjectCode,
		});
		detectAlert(res, `You have successfully left subject ${subjectCode}.`);

		setLoadingRoute(false);
	};

	return (
		<div>
			<Tooltip title="Join new subject" aria-label="add">
				<Fab
					color="primary"
					size="large"
					className={classes.fab}
					onClick={() => {
						setOpen(true);
					}}
				>
					<AddIcon />
				</Fab>
			</Tooltip>
			<Add
				open={open}
				handleDialogClose={() => {
					setOpen(false);
				}}
				subjectCode={subjectCode}
				setSubjectCode={setSubjectCode}
				userType="student"
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
