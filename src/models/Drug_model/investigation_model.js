const mongoose = require('mongoose')

const hc_INVESTIGATION = new mongoose.Schema({
    hc_investigation_name: {
        type: String,
        required: true,
        trim: true
    }
})

module.exports = mongoose.model("hc_INVESTIGATION", hc_INVESTIGATION)