import React from "react";
import { Grid, Tabs, AppBar, Tab, Select, MenuItem } from "@material-ui/core";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";

/***
 * The control bar that is above the timetable for appointment feature.
 */
export default withWidth()(
    ({
        currentStatus,
        setCurrentStatus,
        mainResourceName,
        setMainResourceName,
        width,
    }) => {
        const largeScreen = isWidthUp("lg", width);

        return (
            <AppBar position="relative" color="default">
                <Grid container justify="space-between">
                    <Grid item xs={largeScreen ? 10 : 12}>
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
                    {largeScreen ? (
                        <Grid item xs={2}>
                            <Select
                                value={mainResourceName}
                                onChange={(e) =>
                                    setMainResourceName(e.target.value)
                                }
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
                    ) : null}
                </Grid>
            </AppBar>
        );
    }
);
