const express = require("express");
const appointmentControllers = require("../controllers/appointmentControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

console.log("🔍 appointmentRoutes.js: scheduleAppointment =", appointmentControllers.scheduleAppointment);
console.log("🔍 appointmentRoutes.js: protect =", protect);

router.post("/", protect, appointmentControllers.scheduleAppointment);
router.get("/", protect, appointmentControllers.getAppointments);
router.get("/:id", protect, appointmentControllers.getAppointmentById);
router.put("/:id", protect, appointmentControllers.updateAppointment);
router.delete("/:id", protect, appointmentControllers.deleteAppointment);

module.exports = router;
