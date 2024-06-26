const Hospital = require('../../models/hospital_model/hospital_model')

exports.updateHospitalProfileInfo = async (req, res) => {
    const {
        hc_hospital_bangla_name,
        hc_hospital_english_name,
        hc_hospital_address,
        hc_hospital_contact_no,
        hc_hospital_ambulance_contact_no,
        hc_hospital_logo
    } = req.body
    try {
        const _hospital = await Hospital.updateOne(
            {
                _id: req.user._id
            },
            {
                $set: {
                    'hc_hospital_bangla_name': hc_hospital_bangla_name,
                    'hc_hospital_english_name': hc_hospital_english_name,
                    'hc_hospital_address': hc_hospital_address,
                    'hc_hospital_contact_no': hc_hospital_contact_no,
                    'hc_hospital_ambulance_contact_no': hc_hospital_ambulance_contact_no,
                    'hc_hospital_logo':hc_hospital_logo
                }
            }
        )
        if (_hospital.acknowledged) {
            res.status(203).json({ message: "Update Successfull!!!" })
        } else {
            res.status(500).json({ message: "Please Try Again" })
        }
    } catch (error) {
        console.log(error);
    }
}