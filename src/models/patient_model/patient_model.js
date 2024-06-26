const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const HC_PATIENT = new mongoose.Schema({
    hc_patient_firstName: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 30
    },
    hc_patient_lastName: {
        type: String,
        trim: true,
        minLength: 3,
        maxLength: 30
    },
    hc_patient_bloodGroup: {
        type: String,
        trim: true
    },
    hc_patient_occupation: {
        type: String,
        trim: true,
    },

    hc_patient_phoneno: {
        type: String,
        unique: true,
        trim: true,
    },
    hc_patient_sex: {
        type: String,
        enum: ["Male", "Female"],
    },
    hc_patient_avatar: {
        type: String,
        trim: true,
    },
    hc_patient_relegion: {
        type: String,
        trim: true,
    },
    hc_patient_date_of_birth: {
        type: String,
        trim: true,
    },
    hc_patient_hashpassword: {
        type: String,
        required: true,
        trim: true,
    },
    hc_patient_address: {
        upazila: {
            type: String,
        },
        district: {
            type: String,
        }
    },
    hc_patient_marital_status: {
        type: String,
        enum: ["Married", "Unmarried"],
    },
    hc_patient_prescription: [{
        prescriptionID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "HC_P_PRESCRIPTION"
        }
    }],
    hc_patient_notifications: [{
        notificationID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "HC_P_NOTIFICATION"
        }
    }],
    hc_patient_testReport:[{
        testReport:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "HC_TESTREPORT"
        }   
    }]

}, {
    timestamps: true
})

HC_PATIENT.virtual("hc_patient_password")
    .set(function (hc_patient_password) {
        this.hc_patient_hashpassword = bcrypt.hashSync(hc_patient_password, 12)
    })


HC_PATIENT.methods = {
    authenticate: async function (hc_patient_password) {
        return await bcrypt.compare(hc_patient_password, this.hc_patient_hashpassword)
    },
    changePassword: async function (newPassword) {
        try {
            this.hc_patient_hashpassword = bcrypt.hashSync(newPassword, 12)
            await this.save()
            return "Password Changed!!!"
        } catch (err) {
            console.log(err);
            return "Something went wrong!!!"
        }
    },
    addPrescription: async function (prescriptionID, notificationID) {
        try {
            // const prescription = this.hc_patient_prescription
            prescriptionID ?  this.hc_patient_prescription.push({
                prescriptionID: prescriptionID
            }): null
            // const notification = this.hc_patient_notifications
            notificationID ? this.hc_patient_notifications.push({
                notificationID: notificationID
            }): null
            await this.save()
            return
        } catch (error) {
            console.log(error)
        }
    },

    updatePatientDetails: async function (data) {
        const {
            hc_patient_address,
            hc_patient_bloodGroup,
            hc_patient_date_of_birth,
            hc_patient_email,
            hc_patient_firstName,
            hc_patient_lastName,
            hc_patient_marital_status,
            hc_patient_occupation,
            hc_patient_phoneno,
            hc_patient_relegion,
            hc_patient_sex,
            hc_patient_avatar
        } = data

        try {
            this.hc_patient_address = hc_patient_address
            this.hc_patient_bloodGroup = hc_patient_bloodGroup
            this.hc_patient_date_of_birth = hc_patient_date_of_birth
            this.hc_patient_email = hc_patient_email
            this.hc_patient_firstName = hc_patient_firstName
            this.hc_patient_lastName = hc_patient_lastName
            this.hc_patient_marital_status = hc_patient_marital_status
            this.hc_patient_occupation = hc_patient_occupation
            this.hc_patient_phoneno = hc_patient_phoneno
            this.hc_patient_relegion = hc_patient_relegion
            this.hc_patient_sex = hc_patient_sex
            this.hc_patient_avatar = hc_patient_avatar
            
            await this.save()
            return 201
        } catch (error) {
            console.log(error)
            return 500
        }
    },
    generateToken: async function () {
        const fullName = this.hc_patient_firstName.concat(" " + this.hc_patient_lastName)
        const token = jwt.sign({
            _id: this._id,
            role: "Patient",
            hc_patient_phoneno: this.hc_patient_phoneno,
            hc_patient_fullname: fullName
        }, process.env.SECRECT_KEY, {
            expiresIn: "2d"
        })
        return token
    }
}


module.exports = mongoose.model("HC_PATIENTS", HC_PATIENT)