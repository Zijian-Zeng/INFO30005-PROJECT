import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {
    MuiThemeProvider,
    createMuiTheme,
    responsiveFontSizes,
} from "@material-ui/core";
import { cyan, lightGreen } from "@material-ui/core/colors";

let theme = createMuiTheme({
    palette: {
        primary: {
            main: cyan[800],
            light: cyan[50],
            dark: cyan[900],
        },
        secondary: {
            main: lightGreen.A200,
            light: lightGreen[100],
            dark: lightGreen[400],
        },
    },
    typography: {
        fontFamily: "sans-serif",
        h1: {
            fontWeight: 900,
        },
        h2: {
            fontWeight: 700,
        },
        h3: {
            fontWeight: 900,
        },
        h4: {
            fontWeight: 900,
            fontSize: 30,
        },
        h5: {
            fontWeight: 500,
        },

        subtitle1: {
            fontSize: 12,
        },
        button: {
            fontWeight: 900,
            fontSize: "20px",
        },
    },
    shape: {},
    background: "linear-gradient(to right,#ffffff 0%, #b9e2fa 100%)",
});

theme = responsiveFontSizes(theme);

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <App />
    </MuiThemeProvider>,
    document.getElementById("root")
);
