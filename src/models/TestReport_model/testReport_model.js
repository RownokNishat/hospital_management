const mongoose = require('mongoose')

const HC_TESTREPORT = new mongoose.Schema({
    patientID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HC_PATIENTS"
    },
    hospitalID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HC_HOSPITAL"
    },
    testName: {
        type: String,
        trim: true
    },
    Date: {
        type: String,
        trim: true,
    },
    webViewLink: {
        type: String,
        trim: true
    },
    webContentLink: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("HC_TESTREPORT", HC_TESTREPORT)