const Hospital = require('../../models/hospital_model/hospital_model')

exports.landing_page_hospitals = async (req, res) => {
    try{
        const doctors = await Hospital.find({}).select({
            "_id": 1,
                "hc_hospital_bangla_name": 1,
                "hc_hospital_english_name": 1,
                "hc_hospital_email": 1,
                "hc_hospital_phoneno": 1,
                "hc_hospital_address": 1,
                "hc_hospital_logo": 1,
                "hc_hospital_DGHS_reg_no": 1,
                "hc_hospital_contact_no": 1,
                "hc_hospital_ambulance_contact_no": 1
        }
        )
        return res.status(200).json(doctors)
    }catch(error){
        return res.status(500).json("User access denied!!!")
    }
}
