const mongoose = require('mongoose')

const HC_P_NOTIFICATION= new mongoose.Schema({
    doctorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HC_DOCTOR"
    },
    patientID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "HC_PATIENTS"
    },
    hospitalID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "HC_HOSPITAL"
    },
    prescriptionID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "HC_P_PRESCRIPTION"
    },
    appointmentID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "hc_APPOINTMENT"
    },
    testReport:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "HC_TESTREPORT"
    },
    type: {
        type: String,
        trim: true
    },
    isChecked: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("HC_P_NOTIFICATION", HC_P_NOTIFICATION)