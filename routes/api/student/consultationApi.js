express = require("express");
const router = express.Router();

const {
    viewAllConsult,
    bookConsult,
    cancelConsult,
    viewRegistConsult,
} = require("../../../Controllers/student/consultationController");

//View all consultations by subject
router.get("/viewAll", viewAllConsult);

//View all registered consultations of current account
router.get("/viewRegistered", viewRegistConsult);

//Book a consultation
router.post("/book", bookConsult);

//Cancel a consultation booking
router.post("/cancel", cancelConsult);

module.exports = router;
