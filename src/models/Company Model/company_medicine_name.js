const mongoose = require("mongoose");

const HC_COMPANIES_MEDICINE_NAME = new mongoose.Schema(
    {
        drugtype:{
            type:String,
            trim: true,
        },
        drugName:{
            type:String,
            trim: true,
        },
        description:{
            type:String,
            trim: true,
        },
        price:{
            type:Number,
            trim: true,
        },
        companyID:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "HC_COMPANIES"
        }
    }
)

module.exports = mongoose.model("HC_COMPANIES_MEDICINE_NAME", HC_COMPANIES_MEDICINE_NAME);
