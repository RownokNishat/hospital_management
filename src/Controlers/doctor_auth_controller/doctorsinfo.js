const Doctor = require("../../models/doctor_model/doctor_model");
const Patient = require("../../models/patient_model/patient_model");

exports.doctorsinfo = async (req, res) => {
  const patientId = req.headers.patientid;
  const array = [];
  const user = req.user;
  const populateQuery = {
    path: "hc_doctor_of_hospital.hospitalID",
    select: [
      "_id",
      "hc_hospital_english_name",
      "hc_hospital_address",
      "hc_hospital_logo",
    ],
  };

  try {
    Patient.findById(patientId)
      .select({
        _id: 1,
        hc_patient_firstName: 1,
        hc_patient_lastName: 1,
        hc_patient_date_of_birth: 1,
        hc_patient_sex: 1,
      })
      .populate({
        path: "hc_patient_prescription.prescriptionID",
        select: [
          "Diagnosis",
          "cheif_complain",
          "teratment",
          "hc_p_general_examination",
          "hc_p_cheif_past_history",
          "hc_p_ex_post_operative_patient",
          "hc_p_ex_others",
          "hc_p_gex_systemic_examination",
        ],
      })
      .exec(function (err, p_result) {
        if (err) return res.status(500).json(err);
        let p = p_result.hc_patient_prescription;
        let treatment = [];
        if (p.length == 1) {
          treatment = p;
        } else if (p.length > 1) {
          treatment.push(p[p.length - 1]);
          treatment.push(p[p.length - 2]);
        }
        p_result.hc_patient_prescription = treatment;
        array.push(p_result);
        Doctor.findById(user._id)
          .select({
            _id: 1,
            hc_doctor_banglaName: 1,
            hc_doctor_englishName: 1,
            hc_doctor_phoneno: 1,
            hc_doctor_email: 1,
            hc_doctor_consultant: 1,
            hc_doctor_serial_no: 1,
            hc_doctor_specialist: 1,
            hc_doctor_course_done: 1,
            hc_doctor_BMDC_reg_no: 1,
            hc_doctor_FELLOW_id: 1,
            hc_doctor_medicale_name: 1,
            hc_doctor_education: 1,
            hc_doctor_job_title: 1,
          })
          .populate(populateQuery)
          .exec(function (err, d_result) {
            if (err) return res.status(500).json(err);
            array.push(d_result);
            return res.status(200).json(array);
          });
      });
  } catch (error) {
    console.log("Error Suja");
    return res.status(500).json(error);
  }
};
