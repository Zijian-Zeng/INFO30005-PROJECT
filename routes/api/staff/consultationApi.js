express = require("express");
const router = express.Router();

const {
    createConsult,
    deleteConsult,
    updateConsult,
    viewCreatedConsult,
    viewAllConsult,
} = require("../../../Controllers/staff/consultationController");

//View the consultations created by this account.
router.get("/viewCreated", viewCreatedConsult);

//View all the consultations of a subject.
router.get("/viewAll", viewAllConsult);

//Create a consultation
router.post("/create", createConsult);

//Delete an existing consultation
router.delete("/delete", deleteConsult);

//Update a consultation
router.patch("/patch", updateConsult);

module.exports = router;
