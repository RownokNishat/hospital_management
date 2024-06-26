const Appointment = require('../../models/Appoinment_model/appointment_model')

const populateDoctor = {
    path: "hc_doctorId",
    select: ["hc_doctor_englishName", "hc_doctor_avatar"],
    populate: {
        path: 'hc_doctor_of_hospital',
        select: ["appointment_duration", "dayTimeSlot", "nightTimeSlot" ],
        populate: {
            path: 'hospitalID',
            select: ['hc_hospital_english_name', 'hc_hospital_logo'],
        }
    }
};

exports.estimated_time = async (req, res) => {
    const { appointmentid } = req.headers;
    try {
        const _appointment = await Appointment.findById(appointmentid)
            .populate(populateDoctor)
            // .populate(populateHospital)

        return res.status(200).json(_appointment)
    } catch (error) {
        return res.status(500).json(error)
    }
}