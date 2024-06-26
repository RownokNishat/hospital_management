const Hospital = require('../../models/hospital_model/hospital_model')

exports.registration = async (req, res) => {
    const {
        hc_hospital_bangla_name,
        hc_hospital_english_name,
        hc_hospital_email,
        hc_hospital_phoneno,
        hc_hospital_password,
        hc_hospital_logo,
        hc_hospital_address,
        hc_hospital_DGHS_reg_no,
        hc_hospital_contact_no,
        hc_hospital_ambulance_contact_no
    } = req.body

    try {
        const hospitalExist = await Hospital.findOne({
            $and: [{
                $or: [{
                    hc_hospital_phoneno: hc_hospital_phoneno
                }, {
                    hc_hospital_email: hc_hospital_email
                }]
            }, ]
        })
        if (hospitalExist === null) {
            const _hospital = new Hospital({
                hc_hospital_bangla_name,
                hc_hospital_english_name,
                hc_hospital_email,
                hc_hospital_phoneno,
                hc_hospital_password,
                hc_hospital_logo,
                hc_hospital_address,
                hc_hospital_DGHS_reg_no,
                hc_hospital_contact_no,
                hc_hospital_ambulance_contact_no
            })
            await _hospital.save()
            return res.status(201).json({
                message: "Hospital Registretion Successfull!!!"
            })
        } else {
            return res.status(422).json({
                message: "User Already Exist!!!"
            })
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}


exports.hospital_logo = async (req, res) => {
    const { hc_hospital_logo }=req.body
    const { _id, role}=req.user
    if(role==="Hospital"){
        const _hospital = await Hospital.findById(_id)
        await _hospital.addLogo(hc_hospital_logo)
        return res.status(201).json("Logo added successfully")
    }
}

exports.checkUser = async (req, res) => {
    const { hc_hospital_email, hc_hospital_phoneno } = req.body
 
    const hospitalExist = await Hospital.findOne({
        $and: [{
            $or: [{
                hc_hospital_phoneno: hc_hospital_phoneno
            }, {
                hc_hospital_email: hc_hospital_email
            }]
        }, ]
    })

    if (hospitalExist != null) {
        const error = new Error({ message: "Hospital Already Exist!!!" });
        return res.status(500).json(error)
    } else {
        return res.status(200).json({ message: "Can Register" })
    }
}