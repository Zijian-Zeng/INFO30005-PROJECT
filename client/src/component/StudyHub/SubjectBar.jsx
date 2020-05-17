import React from "react";
import { Grid, AppBar, Select, Tab, Tabs, MenuItem } from "@material-ui/core";

/***
 * The bar for selecting subjects in study hub page.
 */
export default ({
	currentSubject,
	setCurrentSubject,
	user,
	sortBy,
	setSortBy,
}) => {
	return (
		<AppBar position="relative" color="default">
			<Grid container justify="space-between">
				<Grid item xs={10}>
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
				<Grid item xs={2}>
					<Select
						value={sortBy}
						onChange={(e) => setSortBy(e.target.value)}
						variant="outlined"
						fullWidth
					>
						<MenuItem key="time" value="time">
							time
						</MenuItem>
						<MenuItem key="trending" value="trending">
							trending
						</MenuItem>
					</Select>
				</Grid>
			</Grid>
		</AppBar>
	);
};
