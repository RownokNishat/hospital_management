const Doctor = require('../../models/doctor_model/doctor_model')

exports.landing_page_doctor_controler=async(req,res)=>{
    const populateQuery = {
        path: 'hc_doctor_of_hospital.hospitalID',
        select: ['hc_hospital_english_name','hc_hospital_logo','hc_hospital_address']
    }
    try{
        const doctors = await Doctor.find({}).select({
            "hc_doctor_avatar": 1,
            "hc_doctor_englishName": 1,
            "hc_doctor_education": 1,
            "hc_doctor_date_of_birth": 1,
            "hc_doctor_job_title": 1,
            "hc_doctor_of_hospital": 1,
            "hc_doctor_course_done": 1,
            "hc_doctor_fees": 1,
            "hc_doctor_specialist": 1,
            "hc_doctor_BMDC_reg_no": 1,
            "hc_doctor_consultant": 1,
            "hc_doctor_medicale_name": 1,
        }).populate(populateQuery)
        return res.status(200).json(doctors);
    }catch(error){
        console.log(error);
    }
}