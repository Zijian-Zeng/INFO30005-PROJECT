import React, { useContext, useEffect, useState } from "react";
import {
	Grid,
	Button,
	Card,
	CardHeader,
	AppBar,
	Tab,
	Tabs,
	Tooltip,
	Fab,
	Dialog,
	DialogTitle,
	DialogActions,
	DialogContent,
	ButtonGroup,
} from "@material-ui/core";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import { myFetch, UserContext } from "../Methods";
import CreateIcon from "@material-ui/icons/Add";
import Skeleton from "@material-ui/lab/Skeleton";
import HubCard from "./HubCard";
import CreateDialog from "./CreateDialog";
import legend from "./legend.svg";

const useStyles = makeStyles((theme) => ({
	paper: {
		maxWidth: "100%",
		marginTop: theme.spacing(10),
	},
	hub: {
		marginTop: theme.spacing(5),
	},
	fab: {
		[theme.breakpoints.down("lg")]: {
			marginTop: theme.spacing(5),
		},
		[theme.breakpoints.up("lg")]: {
			position: "fixed",
			bottom: theme.spacing(1) * 10,
			right: theme.spacing(1) * 8,
		},
	},
	icon: {
		margin: "auto",
	},
	delete: {
		textTransform: "none",
		color: theme.palette.getContrastText(grey[700]),
		background: grey[700],
		"&:hover": {
			color: theme.palette.getContrastText(grey[900]),
			background: grey[900],
		},
	},

	media: {
		height: "33VH",
	},
	legend: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
		[theme.breakpoints.up("sm")]: {
			minWidth: "25%",
			minHeight: "25%",
		},
		[theme.breakpoints.down("sm")]: {
			minWidth: "100%",
			minHeight: "100%",
		},
	},
}));

//Fetch the appointments of the current subject.
const fetchHubs = async (currentSubject, detectAlert, setLoading, userInfo) => {
	setLoading(true);
	if (currentSubject == 0) {
		const res = await myFetch("/api/student/hub/registered", "GET");
		return res.subjectHubs;
	}
	const body = {
		subjectCode: userInfo.subjects[currentSubject - 1],
	};
	const res = await myFetch("/api/student/hub/all", "POST", body);
	detectAlert(res);
	return res.subjectHubs;
};

/***
 * Dialog for leaving/deleting a study hub.
 */
const DeleteDialog = ({
	leaveHub,
	setDeleteHub,
	classes,
	setLoading,
	setAlert,
	detectAlert,
	setHubs,
	currentSubject,
	userInfo,
}) => {
	const deleteing = async () => {
		setLoading(true);
		const body = {
			id: leaveHub,
		};
		const res = await myFetch("/api/student/hub/leave", "POST", body);
		detectAlert(res, "Successfully left.");
		const subjectHubs = await fetchHubs(
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
			open={leaveHub !== ""}
			onClose={() => setDeleteHub("")}
			fullWidth
		>
			<DialogTitle>Leave the StudyHub?</DialogTitle>
			<DialogContent>Do you want to leave this study hub?</DialogContent>
			<DialogActions>
				<ButtonGroup fullWidth>
					<Button
						fullWidth
						style={{
							textTransform: "none",
						}}
						onClick={() => {
							setDeleteHub("");
						}}
					>
						No, thanks.
					</Button>
					<Button
						fullWidth
						variant="contained"
						className={classes.delete}
						onClick={() => {
							setDeleteHub("");
							deleteing();
						}}
					>
						Yes, I do.
					</Button>
				</ButtonGroup>
			</DialogActions>
		</Dialog>
	);
};

/***
 * Study hub page for student.
 */
export default withWidth()(({ width }) => {
	const classes = useStyles();

	const { user, detectAlert, setAlert } = useContext(UserContext);
	const { userInfo } = user;

	//Study hub details.
	const [currentSubject, setCurrentSubject] = useState(0);
	const [loading, setLoading] = useState(true);
	const [hubs, setHubs] = useState([]);
	const [leaveHub, setDeleteHub] = useState("");
	const [openCreate, setOpenCreate] = useState(false);

	const largeScreen = isWidthUp("lg", width);

	//Updating consultations Information.
	useEffect(() => {
		fetchHubs(currentSubject, detectAlert, setLoading, userInfo).then(
			(subjectHubs) => {
				if (!subjectHubs) return;
				setHubs(subjectHubs);
				setLoading(false);
			}
		);
	}, [alert.status, currentSubject]);

	return (
		<div>
			<CreateDialog
				open={openCreate}
				setOpen={setOpenCreate}
				setLoading={setLoading}
				subjects={userInfo.subjects}
				fetchHubs={fetchHubs}
				setAlert={setAlert}
				detectAlert={detectAlert}
				setHubs={setHubs}
				userInfo={userInfo}
				currentSubject={currentSubject}
			/>
			<DeleteDialog
				setAlert={setAlert}
				detectAlert={detectAlert}
				setHubs={setHubs}
				setLoading={setLoading}
				leaveHub={leaveHub}
				setDeleteHub={setDeleteHub}
				classes={classes}
				currentSubject={currentSubject}
				detectAlert={detectAlert}
				userInfo={userInfo}
			/>

			<AppBar position="relative" color="default">
				<Grid container justify="space-between">
					<Grid item xs={12}>
						<Tabs
							value={currentSubject}
							indicatorColor="primary"
							textColor="primary"
							onChange={(event, newValue) => {
								setCurrentSubject(newValue);
								if (newValue == currentSubject)
									setCurrentSubject(newValue);
							}}
							variant="scrollable"
							scrollButtons="auto"
						>
							<Tab label="Registered" />
							{user.userInfo.subjects.map((subject) => (
								<Tab label={subject} key={subject} />
							))}
						</Tabs>
					</Grid>
				</Grid>
			</AppBar>
			<Grid container justify="flex-end">
				<img className={classes.legend} src={legend} alt="legend" />
			</Grid>

			<Grid container justify="center">
				<Tooltip title="Create a study hub" aria-label="add">
					<Fab
						color="primary"
						size="large"
						className={classes.fab}
						onClick={() => {
							setOpenCreate(true);
						}}
					>
						<CreateIcon />
					</Fab>
				</Tooltip>
			</Grid>

			<Grid container justify="space-around" alignItems="center">
				{!loading
					? hubs.map((hub, index) => (
							//stduy hubs cards...
							<Grid
								key={index}
								item
								xs={largeScreen ? 5 : 12}
								className={classes.hub}
							>
								<HubCard
									hub={hub}
									loading={loading}
									time={(index + 1) * 200}
									setDeleteHub={setDeleteHub}
									setLoading={setLoading}
									setHubs={setHubs}
									fetchHubs={fetchHubs}
									currentSubject={currentSubject}
									detectAlert={detectAlert}
									userInfo={userInfo}
								/>
							</Grid>
					  ))
					: [0, 1, 2, 3].map((index) => (
							//Loading skeletion....
							<Grid
								key={index}
								item
								xs={largeScreen ? 5 : 12}
								className={classes.hub}
							>
								<Card className={classes.card}>
									<CardHeader
										avatar={
											<Skeleton
												animation="wave"
												variant="circle"
												width={40}
												height={40}
											/>
										}
										title={
											<Skeleton
												animation="wave"
												height={10}
												width="80%"
												style={{ marginBottom: 6 }}
											/>
										}
										subheader={
											<Skeleton
												animation="wave"
												height={10}
												width="40%"
											/>
										}
									/>

									<Skeleton
										animation="wave"
										variant="rect"
										className={classes.media}
									/>
								</Card>
							</Grid>
					  ))}
			</Grid>
		</div>
	);
});
