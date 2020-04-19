express = require("express");
const router = express.Router();

const {
    viewConsult,
    bookConsult,
    cancelConsult,
} = require("../../../Controllers/student/consultationController");

//View all consultations by subject
router.get("/bySubject", viewConsult);

//Book a consultation
router.post("/book", bookConsult);

//Cancel a consultation booking
router.post("/cancel", cancelConsult);

module.exports = router;
