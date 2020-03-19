import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Avatar } from "@material-ui/core";
import Cookies from "js-cookie";

const useStyles = makeStyles((theme) => ({
	menuButton: {
		flexGrow: 0,
		marginRight: theme.spacing(6)
	},
	title: {
		flexGrow: 1,
		align: "center",
		textAlign: "center"
	}
}));

export default ({ title, auth, setAuth, his }) => {
	const classes = useStyles();

	const logOut = () => {
		setAuth(false);
		Cookies.remove("user");
	};

	return (
		<AppBar position="relative" title="Hi" className={classes.background}>
			<Toolbar>
				<IconButton
					edge="start"
					className={classes.menuButton}
					color="inherit"
					aria-label="menu"
				>
					<MenuIcon />
				</IconButton>
				<Avatar src="http://localhost:5000/api/images/unimelb" />
				<Typography variant="h4" className={classes.title}>
					{title}
				</Typography>
				{auth ? (
					<Button color="inherit" size="large" onClick={logOut}>
						Logout
					</Button>
				) : (
					<Button
						color="inherit"
						size="large"
						onClick={() => {
							//his.push("/signup");
							console.log(his);
						}}
					>
						signup
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
};
