import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  AppBar,
  Toolbar,
  Button,
  ButtonGroup,
  Popover,
  IconButton,
  Menu,
  MenuItem,
  Fab,
} from "@material-ui/core";
import clsx from "clsx";
import { useHistory, useLocation } from "react-router-dom";
import withWidth, { isWidthUp, isWidthDown } from "@material-ui/core/withWidth";

import { Link } from "react-router-dom";

import { AuthApi, UserContext } from "../Methods";

import MenuIcon from "@material-ui/icons/Menu";

import logoImage from "./logo.png";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  logo: {
    maxHeight: "3rem",
  },
  link: {
    marginLeft: "auto",
  },

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: theme.palette.background.default,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 10,
  },
  hide: {
    display: "none",
  },
  menuItem: {
    fontWeight: 900,
  },
  noDecoration: {
    textDecoration: "none !important",
    marginLeft: theme.spacing(3),
  },
}));

export default withWidth()(
  ({ openDrawer, handleDrawerOpen, logOut, width, aboutBar }) => {
    const classes = useStyles();

    const { loginEl, setLoginEl, auth, setOpenLogin } = useContext(AuthApi);

    const { setLoadingRoute } = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();

    const handleClick = (event) => {
      if (aboutBar) return history.push("/");
      setLoginEl(event.currentTarget);
    };

    const handleClose = () => {
      setLoginEl(null);
    };

    const open = Boolean(loginEl);
    const id = open ? "simple-popover" : undefined;

    return (
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: openDrawer,
        })}
      >
        <Toolbar>
          {auth && !aboutBar ? (
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: openDrawer,
              })}
            >
              <MenuIcon />
            </IconButton>
          ) : null}

          <Button
            onClick={() => {
              if (
                location.pathname === "/Settings" ||
                location.pathname === "/settings"
              )
                return;
              setLoadingRoute(true);
              history.push("/Settings");
              console.log(location.pathname);
            }}
          >
            <img className={classes.logo} src={logoImage} alt="meetute" />
          </Button>

          <Link className={classes.noDecoration} to={"/about"}>
            <Button
              style={{
                fontSize: "18px",
                color: "#616161",
                fontWeight: 530,
                fontFamily: "Arial",
                textTransform: "none",
              }}
            >
              About {isWidthDown("sm", width) ? "" : " us"}
            </Button>
          </Link>

          <div className={classes.link}>
            <Button className={classes.link} onClick={handleClick}>
              <Avatar />
            </Button>
            <Menu
              id={id}
              open={open}
              anchorEl={loginEl}
              onClose={handleClose}
              keepMounted
            >
              {auth ? (
                <MenuItem
                  onClick={() => {
                    logOut();
                    handleClose();
                  }}
                  className={classes.menuItem}
                >
                  Logout
                </MenuItem>
              ) : (
                <div>
                  <MenuItem
                    onClick={() => {
                      setOpenLogin(true);
                      handleClose();
                    }}
                    className={classes.menuItem}
                  >
                    Login
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      history.push("/signup");
                    }}
                    className={classes.menuItem}
                  >
                    Sign Up
                  </MenuItem>
                </div>
              )}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
);
