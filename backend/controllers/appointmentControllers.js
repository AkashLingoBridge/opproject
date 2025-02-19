const Appointment = require("../models/Appointment");
const Patient = require("../models/Patient");

// @desc Schedule a new appointment
// @route POST /api/appointments
// @access Private
const scheduleAppointment = async (req, res) => {
    try {
        const { patient, assignedDoctor, date, time, status } = req.body;

        if (!patient || !assignedDoctor || !date || !time) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newAppointment = new Appointment({
            patient,
            assignedDoctor,
            date,
            time,
            status: status || "Scheduled"
        });

        await newAppointment.save();
        res.status(201).json({ message: "Appointment scheduled successfully", appointment: newAppointment });

    } catch (error) {
        console.error("Error scheduling appointment:", error);
        res.status(500).json({ message: "Server error" });
    }
};
console.log("🔍 appointmentControllers.js: scheduleAppointment =", scheduleAppointment);


// @desc Get all appointments
// @route GET /api/appointments
// @access Private
const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().populate("patient assignedDoctor", "name email");
        res.status(200).json(appointments);
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc Get appointment by ID
// @route GET /api/appointments/:id
// @access Private
const getAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id).populate("patient assignedDoctor", "name email");

        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        res.status(200).json(appointment);
    } catch (error) {
        console.error("Error fetching appointment:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc Update appointment details
// @route PUT /api/appointments/:id
// @access Private
const updateAppointment = async (req, res) => {
    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedAppointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        res.status(200).json({ message: "Appointment updated successfully", appointment: updatedAppointment });

    } catch (error) {
        console.error("Error updating appointment:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc Delete an appointment
// @route DELETE /api/appointments/:id
// @access Private
const deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);

        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        res.status(200).json({ message: "Appointment deleted successfully" });

    } catch (error) {
        console.error("Error deleting appointment:", error);
        res.status(500).json({ message: "Server error" });
    }
};
module.exports = {
    scheduleAppointment,
    getAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment,
};

