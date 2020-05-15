import React, { useContext, useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import TodayIcon from "@material-ui/icons/Today";
import AlarmIcon from "@material-ui/icons/Alarm";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import SettingsIcon from "@material-ui/icons/Settings";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import TimelineIcon from "@material-ui/icons/Timeline";
import { Grid, Paper, Grow, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import AppBar from "./AppBar";
import { UserContext, AuthApi } from "../Methods";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

import Loading from "./Loading";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	hide: {
		display: "none",
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: "nowrap",
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: "hidden",
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up("sm")]: {
			width: theme.spacing(9) + 1,
		},
	},
	toolbar: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(10),
		maxWidth: "100%",
	},
	bottom: {
		position: "fixed",
		bottom: 0,
		boxShadow: 20,
	},
	icon: {
		marginLeft: theme.spacing(1),
	},
}));

export default ({ content, type }) => {
	const classes = useStyles();
	const theme = useTheme();

	//Navigation Drawer...
	const history = useHistory();
	const {
		selectedRoute,
		alert,
		closeAlert,
		setLoadingRoute,
		setUser,
	} = useContext(UserContext);
	const { loadingRoute } = useContext(UserContext);
	const [open, setOpen] = useState(true);

	const handleRouting = (newRoute) => {
		if (selectedRoute !== newRoute) {
			setLoadingRoute(true);
			history.push("/" + newRoute);
		}
	};

	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
	};

	//Log out...
	const { setAuth } = useContext(AuthApi);
	const logOut = () => {
		setAuth(false);
		setUser({});
		Cookies.remove("meetute");
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				openDrawer={open}
				handleDrawerOpen={handleDrawerOpen}
				handleDrawerClose={handleDrawerClose}
				logOut={logOut}
			/>

			<Snackbar
				open={alert.status !== ""}
				autoHideDuration={3000}
				onClose={closeAlert}
			>
				{alert.status !== "" ? (
					<Alert
						elevation={6}
						variant="filled"
						severity={alert.status}
						onClose={closeAlert}
					>
						{alert.message}
					</Alert>
				) : null}
			</Snackbar>

			<Drawer
				variant="permanent"
				className={clsx(classes.drawer, {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				})}
				classes={{
					paper: clsx({
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					}),
				}}
			>
				<div className={classes.toolbar}>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === "rtl" ? (
							<ChevronRightIcon />
						) : (
							<ChevronLeftIcon />
						)}
					</IconButton>
				</div>
				{loadingRoute ? null : (
					<div>
						<List>
							<Grow in={!loadingRoute} timeout={500}>
								<ListItem
									button
									onClick={() =>
										handleRouting("consultations")
									}
									selected={selectedRoute === "consultations"}
								>
									<ListItemIcon className={classes.icon}>
										<TodayIcon />
									</ListItemIcon>
									<ListItemText primary="Consultations" />
								</ListItem>
							</Grow>
							<Grow in={!loadingRoute} timeout={700}>
								<ListItem
									button
									onClick={() =>
										handleRouting("appointments")
									}
									selected={selectedRoute === "appointments"}
								>
									<ListItemIcon className={classes.icon}>
										<AlarmIcon />
									</ListItemIcon>
									<ListItemText primary="1v1 Appointments" />
								</ListItem>
							</Grow>

							{type === "student" ? (
								<Grow in={!loadingRoute} timeout={900}>
									<ListItem
										button
										onClick={() => handleRouting("hubs")}
										selected={selectedRoute === "hubs"}
									>
										<ListItemIcon className={classes.icon}>
											<GroupAddIcon />
										</ListItemIcon>
										<ListItemText primary="Study Hubs" />
									</ListItem>
								</Grow>
							) : (
								<Grow in={!loadingRoute} timeout={900}>
									<ListItem
										button
										onClick={() =>
											handleRouting("analytic")
										}
										selected={selectedRoute === "analytic"}
									>
										<ListItemIcon className={classes.icon}>
											<TimelineIcon />
										</ListItemIcon>
										<ListItemText primary="Analytic" />
									</ListItem>
								</Grow>
							)}
						</List>

						<Divider />

						<List>
							<Grow in={!loadingRoute} timeout={1100}>
								<ListItem
									button
									onClick={() => handleRouting("settings")}
									selected={selectedRoute === "settings"}
								>
									<ListItemIcon className={classes.icon}>
										<SettingsIcon />
									</ListItemIcon>
									<ListItemText primary="Settings" />
								</ListItem>
							</Grow>
							<Grow in={!loadingRoute} timeout={1300}>
								<ListItem button onClick={logOut}>
									<ListItemIcon className={classes.icon}>
										<PowerSettingsNewIcon />
									</ListItemIcon>
									<ListItemText primary="Log out" />
								</ListItem>
							</Grow>
						</List>
					</div>
				)}
			</Drawer>

			{loadingRoute ? (
				<Loading />
			) : (
				<main className={classes.content}>{content}</main>
			)}
		</div>
	);
};
