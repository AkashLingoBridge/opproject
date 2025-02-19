const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true
    },
    assignedDoctor: {  // Updated field name for consistency
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Scheduled", "Completed", "Cancelled"],
        default: "Scheduled"
    }
}, { timestamps: true });

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;