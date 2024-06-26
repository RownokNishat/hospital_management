const Patient = require('../../models/patient_model/patient_model')
const Prescription = require('../../models/prescription_model/prescription_model')

exports.updatePatientDetails=async(req,res)=>{
    try{
        const _patient= await Patient.findById(req.body._id)
        const response=await _patient.updatePatientDetails(req.body)
        return res.status(response).json("Patient Details Updated !!!")
    }catch(error){
        return res.status(500).json(error)
    }
}
exports.updatePatientPrescriptionReview=async(req,res)=>{
    const { prescriptionID, review } = req.body
    try{
        const _prescription= await Prescription.updateOne(
            {
                _id: prescriptionID
            },
            {
                $set: {
                    'Review': review,
                }
            }
        )
        if (_prescription.acknowledged) {
            res.status(203).json({ message: "Update Successfull!!!" })
        } else {
            res.status(500).json({ message: "Please Try Again" })
        }
    }catch(error){
        return res.status(500).json(error)
    }
}

