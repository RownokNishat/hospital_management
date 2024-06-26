const Notification = require('../../models/Notification_model/prescription_notification_model')


exports.Patient_notification_Data = async (req, res) => {
    const populateDoctor = {
        path:'doctorID', 
        select:["hc_doctor_banglaName","hc_doctor_specialist","hc_doctor_medicale_name"]
    }
    const populateHospital = {
        path:'hospitalID', 
        select:["hc_hospital_english_name","hc_hospital_logo"]
    }
    const { patientid } = req.headers
    try{
        const _notification = await Notification.findById(patientid) 
        .populate(populateDoctor)
        .populate(populateHospital)
        return res.status(200).json(_notification);
    }catch(error){
        return res.status(500).json(error)
    }
}