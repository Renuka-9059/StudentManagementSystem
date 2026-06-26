const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    phone: {
        type: String,
        required: true
    },

    gender: {
        type: String
    },

    course: {
        type: String
    },

    attendance: {
        type: Number,
        default: 0
    },

    marks: {
        type: Number,
        default: 0
    }

}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);