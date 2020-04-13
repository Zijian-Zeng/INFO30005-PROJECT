import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	Avatar,
	AppBar,
	Toolbar,
	Typography,
	Button,
	ButtonGroup,
	Popover,
	Box,
	Icon,
	IconButton,
	Dialog,
} from "@material-ui/core";

import { Link } from "react-router-dom";

import { AuthApi } from "./Methods";

import MenuIcon from "@material-ui/icons/Menu";

import Cookies from "js-cookie";

import logoImage from "./logo.png";

const useStyles = makeStyles((theme) => ({
	background: {
		backgroundColor: theme.palette.background.default,
	},
	logo: {
		maxHeight: "3rem",
	},
	link: {
		marginLeft: "auto",
	},
	closeButton: {
		position: "absolute",
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
	noDecoration: {
		textDecoration: "none !important",
	},
}));

export default ({ setOpenLogin }) => {
	const classes = useStyles();

	const logOut = () => {
		setAuth(false);
		Cookies.remove("user");
	};

	const { loginEl, setLoginEl, auth, setAuth } = useContext(AuthApi);

	const handleClick = (event) => {
		setLoginEl(event.currentTarget);
	};

	const handleClose = () => {
		setLoginEl(null);
	};

	const open = Boolean(loginEl);
	const id = open ? "simple-popover" : undefined;

	return (
		<AppBar position="fixed" title="Hi" className={classes.background}>
			<Toolbar>
				<IconButton edge="start" color="default" aria-label="menu">
					<MenuIcon />
				</IconButton>
				<Link to={"/"}>
					<Button>
						<img className={classes.logo} src={logoImage} />
					</Button>
				</Link>

				<div className={classes.link}>
					<Button className={classes.link} onClick={handleClick}>
						<Avatar />
					</Button>
					<Popover
						id={id}
						open={open}
						anchorEl={loginEl}
						onClose={handleClose}
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "center",
						}}
						transformOrigin={{
							vertical: "top",
							horizontal: "center",
						}}
					>
						<ButtonGroup
							orientation="horizontal"
							aria-label="vertical contained primary button group"
							variant="text"
						>
							{auth ? (
								<Button
									onClick={() => {
										logOut();
										handleClose();
									}}
									size="large"
								>
									Logout
								</Button>
							) : (
								<div>
									<Button
										onClick={() => {
											setOpenLogin(true);
										}}
										size="large"
									>
										Login
									</Button>
									<Link
										className={classes.noDecoration}
										to={"/signup"}
										onClick={handleClose}
									>
										<Button size="large">Sign Up</Button>
									</Link>
								</div>
							)}
						</ButtonGroup>
					</Popover>
				</div>
			</Toolbar>
		</AppBar>
	);
};
