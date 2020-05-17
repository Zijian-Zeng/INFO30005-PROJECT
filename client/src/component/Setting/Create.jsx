import React, { useContext } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@material-ui/core";
import { UserContext, myFetch } from "../Methods";

/***
 * Dialog to create a consultation.
 */
export default ({
    open,
    subjectCode,
    setSubjectCode,
    subjectName,
    setSubjectName,
    handleDialogClose,
    setError,
    setAdded,
}) => {
    const { detectAlert, setAlert, setLoadingRoute } = useContext(UserContext);

    //Create a subject in subject account.
    const create = async () => {
        if (subjectCode.length !== 9) {
            setAlert({
                status: "warning",
                message:
                    "UniMelb subject code must have a length of 9 letters.",
            });
            return;
        }

        if (subjectName.length > 100) {
            setAlert({
                status: "warning",
                message: "Subject name too long.",
            });
            return;
        }

        const verify = /[A-Z]{4}[0-9]{5}/;
        if (!verify.test(subjectCode)) {
            setAlert({
                status: "warning",
                message: "Invalid form of subjectCode.",
            });
            return;
        }
        setLoadingRoute(true);

        const res = await myFetch("/api/staff/subjects/create", "POST", {
            subjectCode: subjectCode,
            subjectName: subjectName,
        });
        detectAlert(
            res,
            `You have successfully created subject ${subjectCode}.`
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
            <DialogTitle id="form-dialog-title">
                Create a new Subject
            </DialogTitle>
            <DialogContent>
                <TextField
                    label="Subject Code"
                    required
                    onChange={(event) => {
                        setSubjectCode(event.target.value);
                    }}
                    fullWidth
                />
                <br />
                <br />

                <TextField
                    label="Subject Name"
                    required
                    onChange={(event) => {
                        setSubjectName(event.target.value);
                    }}
                    fullWidth
                />
            </DialogContent>

            <DialogActions>
                <Button fullWidth onClick={handleDialogClose}>
                    Cancel
                </Button>
                <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    onClick={create}
                >
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};
