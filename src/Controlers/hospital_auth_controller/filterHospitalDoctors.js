const Doctor = require("../../models/doctor_model/doctor_model");
const Hospital = require("../../models/hospital_model/hospital_model");

exports.filterHospitalDoctors = async (req, res) => {
  if (req.user.role === "Hospital") {
    const doctors = await Doctor.find({
      hc_doctor_of_hospital: {
        $all: [{ $elemMatch: { qty: 5, hospitalID: req.user._id } }],
      },
    }).select({
      "hc_doctor_avatar":1,
      "hc_doctor_englishName":1,
      "hc_doctor_sex":1,
      "hc_doctor_phoneno":1,
      "hc_doctor_date_of_birth":1,
      "hc_doctor_education":1,
      "hc_doctor_address":1,
    });
    return res.status(200).json(doctors);
  } else {
    return res.status(500).json("User access denied!!!");
  }
};

exports.hospitalWiseDoctor = async (req, res) => {
  const { hospitalID } = req.body;
  const populateQuery = {
    path: "hc_doctor_of_hospital.hospitalID",
    select: [
      "hc_hospital_english_name",
      "hc_hospital_logo",
      "hc_hospital_address",
    ],
  };
  try {
    const doctors = await Doctor.find({
      hc_doctor_of_hospital: {
        $all: [{ $elemMatch: { qty: 5, hospitalID: hospitalID } }],
      },
    }).populate(populateQuery);
    const hospital = await Hospital.find({ _id: hospitalID });
    const data = [];
    const obj1 = { doctors: doctors };
    const obj2 = { hospital: hospital };
    data.push(obj1, obj2);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json("User access denied!!!");
  }
};

exports.hospitalDiagnosis = async (req, res) => {
  const _hospital = await Hospital.updateOne(
    {
      _id: req.user._id,
    },
    {
      $push: { hc_hospital_diagnosis_test_details: req.body },
    }
  );
  return res.status(202).json(_hospital);
};
