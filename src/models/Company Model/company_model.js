const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const HC_COMPANIES = new mongoose.Schema(
    {
        hc_company_englishName: {
            type: String,
            required: true,
            trim: true,
            minLength: 3,
            maxLength: 30,
        },
        hc_company_email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        hc_company_phoneno: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        hc_company_avatar: {
            type: String,
            trim: true,
        },
        hc_company_hashpassword: {
            type: String,
            required: true,
            trim: true,
        },
        hc_company_reg_no: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        }
    },
    {
        timestamps: true,
    }
);

HC_COMPANIES.virtual("hc_company_password").set(function (hc_company_password) {
    this.hc_company_hashpassword = bcrypt.hashSync(hc_company_password, 12);
});

HC_COMPANIES.methods = {
    authenticate: async function (hc_company_password) {
        return await bcrypt.compare(
            hc_company_password,
            this.hc_company_hashpassword
        );
    },
    changePassword: async function (newPassword) {
        try {
            this.hc_company_hashpassword = bcrypt.hashSync(newPassword, 12)
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
                role: "Company",
                hc_company_phoneno: this.hc_company_phoneno,
                hc_company_fullname: this.hc_company_englishName,
            },
            process.env.SECRECT_KEY,
            {
                expiresIn: "2d",
            }
        );
        return token;
    }
};

module.exports = mongoose.model("HC_COMPANIES", HC_COMPANIES);
