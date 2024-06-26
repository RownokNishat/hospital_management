const mongoose = require('mongoose')

const hc_ADVICE_LIST = new mongoose.Schema({
    Advice: {
        type: String,
        required: true,
        trim: true
    }
})

module.exports = mongoose.model("hc_ADVICE_LIST", hc_ADVICE_LIST)