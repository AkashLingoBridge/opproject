const Patient = require("../models/Patient");

// @desc Register new patient
// @route POST /api/patients
// @access Private
const registerPatient = async (req, res) => {
    try {
        const { name, age, contact, assignedDoctor, serialNumber } = req.body;

        if (!name || !age || !contact || !assignedDoctor || !serialNumber) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newPatient = new Patient({ name, age, contact, assignedDoctor, serialNumber });
        await newPatient.save();
        res.status(201).json({ message: "Patient registered successfully", patient: newPatient });
    } catch (error) {
        console.error("Error registering patient:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc Get all patients
// @route GET /api/patients
// @access Private
const getPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (error) {
        console.error("Error fetching patients:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc Get patient by ID
// @route GET /api/patients/:id
// @access Private
const getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        res.status(200).json(patient);
    } catch (error) {
        console.error("Error fetching patient:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc Update patient details
// @route PUT /api/patients/:id
// @access Private
const updatePatient = async (req, res) => {
    try {
        const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPatient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        res.status(200).json({ message: "Patient updated successfully", patient: updatedPatient });
    } catch (error) {
        console.error("Error updating patient:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc Delete patient
// @route DELETE /api/patients/:id
// @access Private
const deletePatient = async (req, res) => {
    try {
        const patient = await Patient.findByIdAndDelete(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        res.status(200).json({ message: "Patient deleted successfully" });
    } catch (error) {
        console.error("Error deleting patient:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { registerPatient, getPatients, getPatientById, updatePatient, deletePatient };
