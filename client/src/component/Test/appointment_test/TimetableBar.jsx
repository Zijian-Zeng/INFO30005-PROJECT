import React, { useContext, useEffect, useState } from "react";
import {
	Grid,
	withWidth,
	isWidthUp,
	Button,
	ButtonGroup,
	Paper,
	Typography,
	Grow,
	Fab,
	Zoom,
	Collapse,
	Fade,
	Tabs,
	AppBar,
	Tab,
	Dialog,
	DialogContent,
	DialogTitle,
	DialogActions,
	Select,
	MenuItem,
} from "@material-ui/core";
import {
	makeStyles,
	withStyles,
	lighten,
	useTheme,
} from "@material-ui/core/styles";
import TimeTable from "../Timetable";

import Header from "./StudentHeader";
import Content from "./StudentContent";
import StudentQuery from "./StudentQuery";

import { myFetch, UserContext, StudentContext } from "../Methods";
import AddIcon from "@material-ui/icons/Add";
import { grey } from "@material-ui/core/colors";

export default ({
	currentStatus,
	setCurrentStatus,
	mainResourceName,
	setMainResourceName,
}) => {
	return (
		<AppBar position="relative" color="default">
			<Grid container justify="space-between">
				<Grid item xs={10}>
					<Tabs
						value={currentStatus}
						indicatorColor="primary"
						textColor="primary"
						onChange={(event, newValue) => {
							setCurrentStatus(newValue);
						}}
						variant="scrollable"
						scrollButtons="auto"
					>
						<Tab label="ALL" />
						<Tab label="PENDING" />
						<Tab label="APPROVED" />
						<Tab label="DECLINED" />
					</Tabs>
				</Grid>
				<Grid item xs={2}>
					<Select
						value={mainResourceName}
						onChange={(e) => setMainResourceName(e.target.value)}
						variant="outlined"
						fullWidth
					>
						<MenuItem key="status" value="status">
							Status
						</MenuItem>
						<MenuItem key="title" value="title">
							Subjects
						</MenuItem>
					</Select>
				</Grid>
			</Grid>
		</AppBar>
	);
};
