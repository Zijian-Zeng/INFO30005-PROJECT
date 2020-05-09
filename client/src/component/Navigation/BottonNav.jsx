import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import TodayIcon from "@material-ui/icons/Today";
import AlarmIcon from "@material-ui/icons/Alarm";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import SettingsIcon from "@material-ui/icons/Settings";
import { UserContext } from "../Methods";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
	root: {
		width: "100%",
		boxShadow: 10,
		height: "15%",
	},
});

export default () => {
	const classes = useStyles();
	const { selectedRoute } = useContext(UserContext);
	const history = useHistory();
	const handleChange = (event, newValue) => {
		history.push("/" + newValue);
	};

	return (
		<BottomNavigation
			value={selectedRoute}
			onChange={handleChange}
			className={classes.root}
		>
			<BottomNavigationAction
				label="Consultations"
				value="consultations"
				icon={<TodayIcon />}
			/>
			<BottomNavigationAction
				label="1v1 Appointments"
				value="appointments"
				icon={<AlarmIcon />}
			/>
			<BottomNavigationAction
				label="Study Hubs"
				value="hubs"
				icon={<GroupAddIcon />}
			/>
			<BottomNavigationAction
				label="Settings"
				value="settings"
				icon={<SettingsIcon />}
			/>
		</BottomNavigation>
	);
};
