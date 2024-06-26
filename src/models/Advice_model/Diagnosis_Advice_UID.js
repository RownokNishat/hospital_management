const mongoose = require('mongoose')

const hc_DIAGNOSIS_ADVICE_LIST = new mongoose.Schema({
    diagnosis: {
        type: String,
        required: true,
        trim: true
    },
    UID:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "hc_ADVICE_LIST"
    }]
})

module.exports = mongoose.model("hc_DIAGNOSIS_ADVICE_LIST", hc_DIAGNOSIS_ADVICE_LIST)