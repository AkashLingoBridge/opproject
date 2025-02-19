const express = require("express");
const {
    registerPatient,
    getPatients,
    getPatientById,
    updatePatient,
    deletePatient
} = require("../controllers/patientControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Debugging log to verify functions
console.log({
    registerPatient,
    getPatients,
    getPatientById,
    updatePatient,
    deletePatient
});

// Patient Routes (Protected)
router.post("/", protect, registerPatient);
router.get("/", protect, getPatients);
router.get("/:id", protect, getPatientById);
router.put("/:id", protect, updatePatient);
router.delete("/:id", protect, deletePatient);

module.exports = router;
