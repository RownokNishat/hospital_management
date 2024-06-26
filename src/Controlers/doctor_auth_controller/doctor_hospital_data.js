const Doctor = require('../../models/doctor_model/doctor_model')

exports.doctor_hospital_controler=async(req,res)=>{
    const {doctorID} = req.body;
    const populateQuery = {
        path: 'hc_doctor_of_hospital.hospitalID',
        select: ['hc_hospital_english_name']
    }
    try{
        const doctors = await Doctor.find({_id: doctorID}).select({
            "hc_doctor_englishName": 1,
        }).populate(populateQuery)
        return res.status(200).json(doctors);
    }catch(error){
        console.log(error);
    }
}