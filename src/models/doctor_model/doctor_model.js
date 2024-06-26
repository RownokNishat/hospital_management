const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const HC_DOCTOR = new mongoose.Schema(
  {
    hc_doctor_banglaName: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 50,
    },
    hc_doctor_englishName: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 30,
    },
    hc_doctor_email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    hc_doctor_phoneno: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    hc_doctor_NID: {
      type: Number,
      unique: true,
      trim: true,
      minLength: 10,
      maxLength: 25,
    },
    hc_doctor_sex: {
      type: String,
      trim: true,
      enum: ["Male", "Female"],
    },
    hc_doctor_nid_pic: {
      type: String,
      trim: true,
    },
    hc_doctor_avatar: {
      type: String,
      trim: true,
    },
    hc_doctor_bloodGroup: {
      type: String,
      trim: true,
    },
    hc_doctor_job_title: {
      type: String,
      trim: true,
    },
    hc_doctor_relegion: {
      type: String,
      trim: true,
    },
    hc_doctor_date_of_birth: {
      type: String,
      required: true,
      trim: true,
    },
    hc_doctor_hashpassword: {
      type: String,
      required: true,
      trim: true,
    },
    hc_doctor_address: {
      upazila: {
        type: String,
      },
      district: {
        type: String,
      },
    },
    hc_doctor_BMDC_reg_no: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    hc_doctor_FELLOW_id: {
      type: String,
      trim: true,
    },
    hc_doctor_serial_no: {
      type: String,
      trim: true,
    },
    hc_doctor_medicale_name: {
      type: String,
      trim: true,
    },
    hc_doctor_specialist: {
      type: String,
      trim: true,
    },
    hc_doctor_education: [
      {
        degree: {
          type: String,
          trim: true,
        },
        title: {
          type: String,
          trim: true,
        },
      },
    ],
    hc_doctor_course_done: [
      {
        degree: {
          type: String,
          trim: true,
        },
        title: {
          type: String,
          trim: true,
        },
      },
    ],
    hc_doctor_consultant: [
      {
        consultant: {
          type: String,
          trim: true,
        },
      },
    ],
    hc_doctor_fees: {
      type: Number,
      trim: true,
    },
    hc_doctor_notifications: [{
      notificationID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HC_P_NOTIFICATION"
      }
    }],
    hc_doctor_of_hospital: [
      {
        hospitalID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "HC_HOSPITAL",
        },
        appointment_duration: {
          type: Number,
          trim: true
        },
        notAvailableDays: [
          {
            offDay: {
              type: Number,
              trim: true,
            },
          },
        ],
        dayTimeSlot: {
          Start: {
            type: String,
            trim: true,
          },
          End: {
            type: String,
            trim: true,
          },
        },
        nightTimeSlot: {
          Start: {
            type: String,
            trim: true,
          },
          End: {
            type: String,
            trim: true,
          },
        },
        update: {
          type: Boolean,
          default: false
        }
      },
    ],
    hc_doctor_write_prescription: [{
      prescriptionID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HC_P_PRESCRIPTION",
      }
    }]
  },
  {
    timestamps: true,
  }
);

HC_DOCTOR.virtual("hc_doctor_password").set(function (hc_doctor_password) {
  this.hc_doctor_hashpassword = bcrypt.hashSync(hc_doctor_password, 12);
});

HC_DOCTOR.methods = {
  authenticate: async function (hc_doctor_password) {
    return await bcrypt.compare(
      hc_doctor_password,
      this.hc_doctor_hashpassword
    );
  },
  changePassword: async function (newPassword) {
      try {
          this.hc_doctor_hashpassword = bcrypt.hashSync(newPassword, 12)
          await this.save()
          return "Password Changed!!!"
      } catch (err) {
          console.log(err);
          return "Something went wrong!!!"
      }
  },
  add_hc_doctor_of_hospital: async function (hc_doctor_of_hospital) {
    this.hc_doctor_of_hospital.push(hc_doctor_of_hospital);
    this.save();
    return 201;
  },
  addNotification: async function (notificationID) {
    this.hc_doctor_notifications.push(notificationID);
    this.save();
    return 201;
  },
  generateToken: async function () {
    const token = jwt.sign(
      {
        _id: this._id,
        role: "Doctor",
        hc_doctor_phoneno: this.hc_doctor_phoneno,
        hc_doctor_fullname: this.hc_doctor_englishName,
      },
      process.env.SECRECT_KEY,
      {
        expiresIn: "2d",
      }
    );
    return token;
  }
};

module.exports = mongoose.model("HC_DOCTOR", HC_DOCTOR);
