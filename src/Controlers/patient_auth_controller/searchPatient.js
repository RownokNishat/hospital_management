const Patient = require('../../models/patient_model/patient_model')

const findPatient=(patientList,patient_phoneno,patient_name,res)=>{
    let arr=[]
    patientList.map(i=>{
        const data =i.hc_patient_phoneno.match(patient_phoneno)
        const data2=i.hc_patient_firstName.toLowerCase().match(patient_name)
        const data3=i.hc_patient_lastName.toLowerCase().match(patient_name)
        if( data || data2 ||data3 ){
            arr.push(i)
        }
    })
    return res.status(200).json({message:arr})
}

exports.searchPatient = async (req, res) => {
    const { patient_phoneno , patient_name}= req.headers
    try{
        if(req.user.role==="Doctor" || req.user.role==="Hospital"){
            const patientList = await Patient.find({})
            findPatient(patientList,patient_phoneno,patient_name,res)
        }else{
            return res.status(400).json({message:"Not a valid user!!!"})
        }
    }catch(error){
        return res.status(400).json({message:error})
    }
}