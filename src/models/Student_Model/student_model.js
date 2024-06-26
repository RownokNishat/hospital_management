const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const HC_STUDENT = new mongoose.Schema(
  {
    hc_student_englishName: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 30,
    },
    hc_student_email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    hc_student_phoneno: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    hc_student_NID: {
      type: Number,
      unique: true,
      trim: true,
      minLength: 10,
      maxLength: 25,
    },
    hc_student_bloodGroup: {
      type: String,
      trim: true
  },
    hc_student_sex: {
      type: String,
      enum: ["Male", "Female"],
    },
    hc_student_nid_pic: {
      type: String,
      trim: true,
    },
    hc_student_avatar: {
      type: String,
      trim: true,
    },
    hc_student_relegion: {
      type: String,
      enum: ["Islam", "Hindu", "Christian"],
    },
    hc_student_date_of_birth: {
      type: String,
      required: true,
      trim: true,
    },
    hc_student_hashpassword: {
      type: String,
      required: true,
      trim: true,
    },
    hc_student_address: {
      upazila: {
        type: String,
      },
      district: {
        type: String,
      },
    },
    hc_student_BMDC_reg_no: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    hc_student_session: {
      type: String,
      trim: true,
    },
    hc_student_education: [
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
    hc_student_write_prescription: [{
      prescriptionID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HC_MED_STD_PRESCRIPTION",
      }
    }],
    hc_hospitalID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HC_HOSPITAL",
    }
  },
  {
    timestamps: true,
  }
);

HC_STUDENT.virtual("hc_student_password").set(function (hc_student_password) {
  this.hc_student_hashpassword = bcrypt.hashSync(hc_student_password, 12);
});

HC_STUDENT.methods = {
  authenticate: async function (hc_student_password) {
    return await bcrypt.compare(
      hc_student_password,
      this.hc_student_hashpassword
    );
  },
  changePassword: async function (newPassword) {
      try {
          this.hc_student_hashpassword = bcrypt.hashSync(newPassword, 12)
          await this.save()
          return "Password Changed!!!"
      } catch (err) {
          console.log(err);
          return "Something went wrong!!!"
      }
  },
  generateToken: async function () {
    const token = jwt.sign(
      {
        _id: this._id,
        role: "Student",
        hc_student_phoneno: this.hc_student_phoneno,
        hc_student_fullname: this.hc_student_englishName,
      },
      process.env.SECRECT_KEY,
      {
        expiresIn: "2d",
      }
    );
    return token;
  }
};

module.exports = mongoose.model("HC_STUDENT", HC_STUDENT);
