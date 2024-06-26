const Doctor = require("../../models/doctor_model/doctor_model");
const Hospital = require("../../models/hospital_model/hospital_model");
exports.doctorsSpecialist = async (req, res) => {
  
  try {
    const specailities = await Doctor.distinct("hc_doctor_specialist");
    const hospitalAddress = await Hospital.distinct("hc_hospital_address.district");

    const data = {
      doctorsSpecialist: specailities,
      hospitalAddress: hospitalAddress,
    };
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      meassage: error,
    });
  }
};
