const MedicalStudent = require('../../models/Student_Model/student_model')
const Hospital = require('../../models/hospital_model/hospital_model')
const Patient = require('../../models/patient_model/patient_model')
const Doctor = require('../../models/doctor_model/doctor_model')
const Company =require('../../models/Company Model/company_model')

exports.dashboard = async (req, res) => {
    if(req.user.role==="Doctor" || req.user.role==="Hospital" ){
        try{
            const patients = await Patient.countDocuments()
            const doctors = await Doctor.countDocuments()
            const hospitals = await Hospital.countDocuments()
            const medicalStudents = await MedicalStudent.countDocuments()
            return res.status(200).json({
                patients,doctors,hospitals,medicalStudents
            })
        }catch(error){
            console.log(error);
        }
    }
    return res.status(404).json({message: "Access denighed"})


}