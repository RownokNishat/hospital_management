const Doctor = require('../../models/doctor_model/doctor_model')

exports.deleteDoctorAC = async (req, res) => {
    try {
        const deleteDoctorAC = await Doctor.findById(req.headers.doctorid)
        if (deleteDoctorAC != "null") {
            if (deleteDoctorAC.hc_doctor_of_hospital.length == '1') {
                const dltAC = await Doctor.deleteOne({
                    _id: req.headers.doctorid
                })
                dltAC.deletedCount == '1' ? res.status(200).json(dltAC) : res.status(400).json(dltAC)
            } else {
                const updateDoctorAC = await Doctor.findOneAndUpdate({
                    _id: req.headers.doctorid
                }, {
                    $pull: {
                        hc_doctor_of_hospital: {
                            hospitalID:req.user._id
                        }
                    }
                })
                updateDoctorAC != 'null' ? res.status(200).json({
                    message: "Hospital Remove Doctor's Access Successfully!!!"
                }) : res.status(400).json({
                    message: "Someting went wrong!!!"
                })

            }
        } else {
            return res.status(400).json({
                message: "Doctor Not Exist!!!"
            })
        }

    } catch (error) {
        return res.status(500).json(error)
    }
}