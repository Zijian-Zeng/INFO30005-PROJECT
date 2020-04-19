express = require("express");
const router = express.Router();

const {
    createConsult,
    deleteConsult,
    updateConsult,
} = require("../../../Controllers/staff/consultationController");

//Create a consultation
router.post("/create", createConsult);

//Delete an existing consultation
router.delete("/delete", deleteConsult);

//Update a consultation
router.patch("/patch", updateConsult);

module.exports = router;
