import React, { useContext, useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@material-ui/core";
import { myFetch, UserContext } from "../Methods";
import Autocomplete from "@material-ui/lab/Autocomplete";

/***
 * Dialog for joining a subject for both student and staff.
 */
export default ({
    open,
    subjectCode,
    setSubjectCode,
    handleDialogClose,
    userType,
}) => {
    const { detectAlert, setLoadingRoute } = useContext(UserContext);
    const [allSubjects, setAllSubjects] = useState([]);

    useEffect(() => {
        const fetchAllSubject = async () => {
            const res = await myFetch("/api/shared/users/allSubjects", "GET");
            setAllSubjects(res.subjectList);
            detectAlert(res);
            console.log(res.subjectList);
        };
        fetchAllSubject();
    }, []);

    const GetField = () => {
        return (
            <Autocomplete
                id="addSubject"
                options={allSubjects}
                getOptionLabel={(option) => option}
                value={subjectCode}
                onChange={(event, newValue) => {
                    setSubjectCode(newValue);
                }}
                renderInput={(params) => {
                    return (
                        <TextField
                            {...params}
                            label="Please choose a subject"
                            variant="filled"
                            required
                        />
                    );
                }}
            />
        );
    };

    //Join a subject.
    const join = async (e) => {
        e.preventDefault();
        let url = "/api/student/subjects/join";
        if (userType === "staff") url = "/api/staff/subjects/join";
        setLoadingRoute(true);
        const res = await myFetch(url, "POST", {
            subjectCode: subjectCode,
        });
        detectAlert(
            res,
            `You have successfully joined subject ${subjectCode}.`
        );

        setLoadingRoute(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleDialogClose}
            aria-labelledby="form-dialog-title"
            fullWidth
        >
            <DialogTitle id="form-dialog-title">Join a new Subject</DialogTitle>
            <DialogContent>
                <GetField />
            </DialogContent>

            <DialogActions>
                <Button fullWidth onClick={handleDialogClose}>
                    Cancel
                </Button>
                <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    onClick={join}
                >
                    Join
                </Button>
            </DialogActions>
        </Dialog>
    );
};
