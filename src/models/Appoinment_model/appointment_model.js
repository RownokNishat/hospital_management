const mongoose = require('mongoose')

const hc_APPOINTMENT = new mongoose.Schema({
    hc_appoinmentDate: {
        type: String,
        trim: true,
        required: true
    },
    hc_doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HC_DOCTOR",
        required: true
    },
    hc_hospitalID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HC_HOSPITAL",
        required: true
    },
    hc_appointment_patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HC_PATIENTS',
        required: true
    },
    visitingSlot:{
        type: Number,
        trim: true,
        enum:[1,2],
        required: true
    },
    approved:{
        type: Number,
        trim: true,
        enum:[0,1,2],
        default: 0
    },
    hasVisit:{
        type:Boolean,
        trim:true,
        default:false 
    },
    serialNo:{
        type:Number,
        trim:true
    }
})

module.exports = mongoose.model("hc_APPOINTMENT", hc_APPOINTMENT)