const Appointment = require("../../models/Appoinment_model/appointment_model");

const getPreviousDay = (date = new Date()) => {
  const previous = new Date(date.getTime());
  previous.setDate(date.getDate() - 1);
  return previous;
}

const doctors_Appointment = async (
  hc_appoinmentdate,
  doctorId,
  hc_hospitalid,
  res
) => {
  if (hc_hospitalid) {
    const _appointment = await Appointment.find({
      hc_appoinmentDate: new Date(hc_appoinmentdate).toISOString(),
      hc_hospitalID: hc_hospitalid,
      hc_doctorId: doctorId,
      hasVisit: false
    })
      .populate(populateDoctor)
      .populate(populatePatient);
    return res.status(200).json(_appointment);
  } else {
    const _appointment = await Appointment.find({
      hc_appoinmentDate: new Date(hc_appoinmentdate).toISOString(),
      hc_doctorId: doctorId,
      hasVisit: false
    })
      .populate(populateDoctor)
      .populate(populatePatient);
    return res.status(200).json(_appointment);
  }
};

const populateDoctor = {
  path: "hc_doctorId",
  select: ["_id", "hc_doctor_englishName"],
};

const populatePatient = {
  path: "hc_appointment_patient",
  select: ["_id", "hc_patient_firstName", "hc_patient_lastName"],
};

const hospitals_Appointment = async (
  hc_appoinmentdate,
  hc_hospitalid,
  hc_doctorID,
  res
) => {

  if (hc_doctorID) {
    const _appointment = await Appointment.find({
      hc_appoinmentDate: hc_appoinmentdate,
      hc_doctorId: hc_doctorID,
      hc_hospitalID: hc_hospitalid,
      hasVisit: false
    })
      .populate(populateDoctor)
      .populate(populatePatient);

    return res.status(200).json(_appointment);
  } else {
    const _appointment = await Appointment.find({
      hc_appoinmentDate: new Date(hc_appoinmentdate).toISOString(),
      hc_hospitalID: hc_hospitalid,
      hasVisit: false
    })
      .populate(populateDoctor)
      .populate(populatePatient);
    return res.status(200).json(_appointment);
  }
};

const Patient_Appointment = async (patientID, res) => {
  const _appointment = await Appointment.find({
    hc_appoinmentDate: { $gte: getPreviousDay(new Date()).toISOString() },
    hc_appointment_patient: patientID,
    hasVisit: false,
  })

  return res.status(200).json(_appointment);
}

exports.find_Appointment = async (req, res) => {
  const { hc_appoinmentdate, hc_hospitalid, hc_doctorID } = req.body;

  try {
    req.user.role == "Doctor"
      ? doctors_Appointment(
        hc_appoinmentdate,
        req.user._id,
        hc_hospitalid,
        res
      )
      : null;
    req.user.role == "Hospital"
      ?
      hospitals_Appointment(
        hc_appoinmentdate,
        req.user._id,
        hc_doctorID,
        res
      )
      : null;
    req.user.role == "Patient"
      ? Patient_Appointment(
        req.user._id,
        res
      )
      : null;
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
