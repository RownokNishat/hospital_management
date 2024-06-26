const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const HC_HOSPITAL = new mongoose.Schema({
    hc_hospital_bangla_name: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 50
    },
    hc_hospital_english_name: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 50
    },
    hc_hospital_email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    hc_hospital_phoneno: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    hc_hospital_hashpassword: {
        type: String,
        required: true,
        trim: true,
    },
    hc_hospital_address: {
        upazila: {
            type: String,
        },
        district: {
            type: String,
        }
    },
    hc_hospital_logo: {
        type: String,
        trim: true,
    },
    hc_hospital_DGHS_reg_no: {
        type: String,
        trim: true,
        unique: true,
    },
    hc_hospital_contact_no: {
        type: Number,
        trim: true,
    },
    hc_hospital_notifications: [{
        notificationID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "HC_P_NOTIFICATION"
        }
    }],
    hc_hospital_diagnosis_test_details: [{
        diagnosis_name: {
            type: String,
            trim: true,
        },
        diagnosis_price: {
            type: Number,
            trim: true,
        },
    }],
    hc_patient_testReport: [{
        testReport: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "HC_TESTREPORT"
        }
    }],
    hc_hospital_ambulance_contact_no: [{
        ambulanceNo: {
            type: Number,
            trim: true,
        }
    }],
    hc_med_student: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "HC_STUDENT"
    }]
}, {
    timestamps: true
})

HC_HOSPITAL.virtual("hc_hospital_password")
    .set(function (hc_hospital_password) {
        this.hc_hospital_hashpassword = bcrypt.hashSync(hc_hospital_password, 12)
    })


HC_HOSPITAL.methods = {
    authenticate: async function (hc_hospital_password) {
        return await bcrypt.compare(hc_hospital_password, this.hc_hospital_hashpassword)
    },
    addLogo: async function (logo) {
        this.hc_hospital_logo = logo
        this.save()
        return 201
    },
    changePassword: async function (newPassword) {
        try {
            this.hc_hospital_hashpassword = bcrypt.hashSync(newPassword, 12)
            await this.save()
            return "Password Changed!!!"
        } catch (err) {
            console.log(err);
            return "Something went wrong!!!"
        }
    },
    generateToken: async function () {
        const token = jwt.sign({
            _id: this._id,
            role: "Hospital",
            hc_hospital_english_name: this.hc_hospital_english_name
        }, process.env.SECRECT_KEY, {
            expiresIn: "2d"
        })
        return token
    }
}


module.exports = mongoose.model("HC_HOSPITAL", HC_HOSPITAL)