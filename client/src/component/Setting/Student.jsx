import React, { useContext, useEffect, useState } from "react";
import {
	Grid,
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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SchoolIcon from "@material-ui/icons/School";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import Add from "./Add";
import { myFetch, UserContext } from "../Methods";

const useStyles = makeStyles((theme) => ({
<<<<<<< HEAD
    paper: {
        maxWidth: "100%",
        marginTop: theme.spacing(10),
    },
    fab: {
        [theme.breakpoints.up("lg")]: {
            position: "fixed",
            bottom: theme.spacing(1) * 10,
            right: theme.spacing(1) * 8,
        },
        [theme.breakpoints.down("lg")]: {
            marginTop: theme.spacing(2),
        },
    },
=======
	paper: {
		maxWidth: "100%",
		marginTop: theme.spacing(10),
	},
	fab: {
		[theme.breakpoints.up("lg")]: {
			position: "fixed",
			bottom: theme.spacing(1) * 10,
			right: theme.spacing(1) * 8,
		},
		[theme.breakpoints.down("lg")]: {
			marginTop: theme.spacing(2),
		},
	},
>>>>>>> regina-front-end
}));

/***
 * Setting page for student.
 */
export default ({ user, setMySubjects, mySubjects }) => {
	const classes = useStyles();

	const [open, setOpen] = useState(false);
	const [subjectCode, setSubjectCode] = useState("");

	const {
		setLoadingRoute,
		alert,

		detectAlert,
	} = useContext(UserContext);

	//Loading subjects information.
	useEffect(() => {
		const fetchMySubject = async () => {
			const res = await myFetch("/api/student/subjects/all", "GET");
			detectAlert(res);
			setMySubjects(res);
		};

		fetchMySubject();
	}, [alert.status]);

	//Leave a subject.
	const leave = async (subjectCode) => {
		setLoadingRoute(true);
		const res = await myFetch("/api/student/subjects/leave", "POST", {
			subjectCode: subjectCode,
		});
		detectAlert(res, `You have successfully left subject ${subjectCode}.`);

		setLoadingRoute(false);
	};

	//Loading...
	if (!mySubjects.subjectsInfo) return null;

<<<<<<< HEAD
    if (!mySubjects.subjectsInfo) return null;

    return (
        <div>
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
                    <Typography
                        variant="h5"
                        style={{ fontWeight: 900, color: "#455a64" }}
                    >
                        Your current subject list:
                    </Typography>
                </Grid>
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
            </Grid>
        </div>
    );
=======
	return (
		<div>
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
					<Typography
						variant="h5"
						style={{ fontWeight: 900, color: "#455a64" }}
					>
						Your current subject list:
					</Typography>
				</Grid>
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
			</Grid>
		</div>
	);
>>>>>>> regina-front-end
};
