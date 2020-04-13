import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	Grid,
	Container,
	Hidden,
	withStyles,
	withWidth,
	isWidthUp,
	Typography,
	Grow,
	Button,
} from "@material-ui/core";

import { Link } from "react-router-dom";

import headerImage from "./img/chat.png";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import InfoIcon from "@material-ui/icons/Info";

const useStyles = makeStyles((theme) => ({
	image: {
		maxHeight: "70%",
		maxWidth: "100%",
	},

	root: {
		minHeight: "70%",
		background: theme.background,
	},
	images: {
		minHeight: "70%",
	},
	background: {
		background: theme.background,
	},
	title: {
		background: theme.background,
	},
	body: {
		color: "#595e53",
	},
	about: {
		minHeight: "4rem",
		background:
			"linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)",
		borderRadius: 30,
	},
	getStarted: {
		minHeight: "4rem",
		background: "linear-gradient(to right, #92fe9d 0%, #00c9ff 100%)",
		borderRadius: 30,
	},
	largeIcon: {
		width: 30,
		height: 30,
	},
	noDecoration: {
		textDecoration: "none !important",
		fontSize: "",
		fontWeight: 0,
		minWidth: "100%",
	},
}));

export default () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Container fixed>
				<Grid
					container
					justify="center"
					alignItems="center"
					direction="row"
				>
					<Grid item xs={12} md={6}>
						<Grow in timeout="auto">
							<Grid
								container
								direction="column"
								justify="center"
								alignItems="center"
							>
								<Typography variant="h2">
									<br />
									<br />
								</Typography>
								<Grid item xs={8}>
									<Typography variant="h3" align="center">
										Ask your questions today, for an easier
										life tomorrow.
									</Typography>
								</Grid>

								<Grid item xs={8}>
									<Typography
										className={classes.body}
										variant="h5"
									>
										<br />
										MeeTute wants to make consultation and
										support services more accessible for
										students and more manageable for
										teaching staff.
										<br />
										<br />
									</Typography>
									<Grid
										container
										direction="row"
										justify="center"
										spacing={3}
									>
										<Grid item xs={6}>
											<Grid container justify="center">
												<Link
													to={"/signup"}
													className={
														classes.noDecoration
													}
												>
													<Button
														fullWidth
														size="large"
														className={
															classes.getStarted
														}
														startIcon={
															<ChatBubbleOutlineIcon
																className={
																	classes.largeIcon
																}
															/>
														}
													>
														get started
													</Button>
												</Link>
											</Grid>
										</Grid>

										<Grid item xs={6}>
											<Grid container justify="center">
												<Link
													to={"/signup"}
													className={
														classes.noDecoration
													}
												>
													<Button
														fullWidth
														size="large"
														className={
															classes.about
														}
														startIcon={
															<InfoIcon
																className={
																	classes.largeIcon
																}
															/>
														}
													>
														about us
													</Button>
												</Link>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Grow>
					</Grid>

					<Grid item xs={12} md={6}>
						<Typography variant="h1">
							<br />
						</Typography>
						<Grow in>
							<Grid
								container
								justify="center"
								alignItems="flex-end"
							>
								<img
									src={headerImage}
									className={classes.image}
								/>
							</Grid>
						</Grow>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="h5">
							<br />
						</Typography>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
};
