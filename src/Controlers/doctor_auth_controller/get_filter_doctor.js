const Doctor = require("../../models/doctor_model/doctor_model");
const Hospital = require("../../models/hospital_model/hospital_model");

const getAllDoctors = async (doctors) => {
  const doctorsArr = [];

  doctors.map((doc) => {
    doc.map((d) => {
      let dot = { doctor: d };
      doctorsArr.push(dot);
    });
  });

  return doctorsArr;
};
exports.getSpecialistDoctor = async (req, res) => {
  const populateDoctor = {
    path: "doctorId",
    select: [
      "_id",
      "hc_doctor_banglaName",
      "hc_doctor_englishName",
      "hc_doctor_phoneno",
      "hc_doctor_email",
      "hc_doctor_consultant",
      "hc_doctor_serial_no",
      "hc_doctor_specialist",
      "hc_doctor_course_done",
      "hc_doctor_BMDC_reg_no",
      "hc_doctor_FELLOW_id",
      "hc_doctor_medicale_name",
      "hc_doctor_education",
    ],
  };

  const populateQuery = {
    path: "hc_doctor_of_hospital.hospitalID",
    select: [
      "hc_hospital_english_name",
      "hc_hospital_logo",
      "hc_hospital_address",
    ],
  };
  const { specialist, district } = req.body;

  try {
    if (specialist && !district) {
      const user = await Doctor.find({
        hc_doctor_specialist: specialist,
      })
        .select({
          hc_doctor_avatar: 1,
          hc_doctor_englishName: 1,
          hc_doctor_education: 1,
          hc_doctor_address: 1,
          hc_doctor_date_of_birth: 1,
          hc_doctor_phoneno: 1,
          hc_doctor_of_hospital: 1,
          hc_doctor_course_done: 1,
          hc_doctor_fees: 1,
          hc_doctor_specialist: 1,
          hc_doctor_BMDC_reg_no:1,
          hc_doctor_consultant:1,
        })
        .populate(populateQuery);

      return res.status(201).send(user);
    }

    if (!specialist && district) {
      const hospitals = await Hospital.find({
        "hc_hospital_address.district": district,
      });

      const promises = hospitals.map(async (hospital) => {
        const numFruit = await Doctor.find({
          "hc_doctor_of_hospital.hospitalID": hospital._id,
        })
          .select({
            hc_doctor_avatar: 1,
            hc_doctor_englishName: 1,
            hc_doctor_education: 1,
            hc_doctor_address: 1,
            hc_doctor_date_of_birth: 1,
            hc_doctor_phoneno: 1,
            hc_doctor_of_hospital: 1,
            hc_doctor_course_done: 1,
            hc_doctor_fees: 1,
            hc_doctor_specialist: 1,
            hc_doctor_BMDC_reg_no:1,
            hc_doctor_consultant:1,
          })
          .populate(populateQuery);

        return numFruit;
      });

      const docArr = [];
      const numFruits = await Promise.all(promises);
      numFruits.map((num) => {
        num.map((d) => {
          docArr.push(d);
        });
      });

      return res.status(201).send(docArr);
    }

    if (specialist && district) {
      console.log("district and special");
      const hospitals = await Hospital.find({
        "hc_hospital_address.district": district,
      });

      const promises = hospitals.map(async (hospital) => {
        const numFruit = await Doctor.find({
          "hc_doctor_of_hospital.hospitalID": hospital._id,
          hc_doctor_specialist: specialist,
        })
          .select({
            hc_doctor_avatar: 1,
            hc_doctor_englishName: 1,
            hc_doctor_education: 1,
            hc_doctor_address: 1,
            hc_doctor_date_of_birth: 1,
            hc_doctor_phoneno: 1,
            hc_doctor_of_hospital: 1,
            hc_doctor_course_done: 1,
            hc_doctor_fees: 1,
            hc_doctor_specialist: 1,
            hc_doctor_BMDC_reg_no:1,
            hc_doctor_consultant:1,
          })
          .populate(populateQuery);

        return numFruit;
      });

      const docArr = [];

      const numFruits = await Promise.all(promises);
      numFruits.map((num) => {
        num.map((d) => docArr.push(d));
      });

      var uniqueSet = new Set(docArr); 
      var doctorArr = Array.from(uniqueSet);

      
      return res.status(201).send(docArr);
    }
  } catch (error) {
    return res.status(500).json({
      meassage: error,
    });
  }
};
