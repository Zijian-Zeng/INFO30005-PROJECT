import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";

//Icons
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import FeatureCard from "./featureCard";
import Stepper from "./stepper";

import f1 from "./img/f1.png";
import f2 from "./img/f2.png";
import f3 from "./img/f3.png";
import f4 from "./img/f4.png";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const features = [
    {
        headline: "Consultation Booking System",
        text:
            "MeeTute makes it simple for students and teaching staff to schedule or book consultation appointments.",
        image: f1,
    },
    {
        headline: "Scheduling Assistant",
        text:
            "Cannot make the consultation time? Don’t worry, use our scheduling assistant to book one-on-one sessions.",

        image: f2,
    },
    {
        headline: "Study Group Helper",
        text:
            "Connect with your peers in the same subject and develop better learning experiences.",

        image: f3,
    },
    {
        headline: "User Analytics Tool",
        text:
            "MeeTute delivers beautiful visualisations for past consultation registration statistics, making it easier for teaching staff for future planning",

        image: f4,
    },
];

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.secondary.light,
    },

    headline: {
        color: "#05578e",
    },
}));

export default withWidth()(({ width }) => {
    const classes = useStyles();
    const theme = useTheme();

    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = features.length;

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    return (
        <div className={classes.root}>
            <Typography
                className={classes.headline}
                variant={isWidthUp("sm", width) ? "h3" : "h4"}
                align="center"
            >
                <br />
                See how MeeTute can help you...
                <br />
                <br />
            </Typography>

            {isWidthUp("sm", width) ? (
                <Stepper
                    activeStep={activeStep}
                    setActiveStep={setActiveStep}
                    features={features}
                />
            ) : null}

            <AutoPlaySwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
                className={classes.swipe}
                interval={9000}
            >
                {features.map((element) => (
                    <FeatureCard
                        key={element.headline}
                        headline={element.headline}
                        text={element.text}
                        activeStep={activeStep}
                        setActiveStep={setActiveStep}
                        maxSteps={maxSteps}
                        image={element.image}
                    />
                ))}
            </AutoPlaySwipeableViews>
        </div>
    );
});
