const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Patient name is required"],
        trim: true
    },
    age: {
        type: Number,
        required: [true, "Age is required"],
        min: [0, "Age cannot be negative"]
    },
    contact: {
        type: String,
        required: [true, "Contact number is required"],
        unique: true,
        match: [/^\d{10}$/, "Invalid phone number"]
    },
    assignedDoctor: {
        type: String,
        required: [true, "Assigned doctor is required"],
        trim: true
    },
    serialNumber: {
        type: String,
        unique: true,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Patient = mongoose.model("Patient", PatientSchema);
module.exports = Patient;
