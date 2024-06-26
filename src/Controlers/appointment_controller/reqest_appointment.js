const Appointment = require('../../models/Appoinment_model/appointment_model')
const Notification = require('../../models/Notification_model/prescription_notification_model')
const Doctor = require('../../models/doctor_model/doctor_model')
const Hospital = require('../../models/hospital_model/hospital_model')

exports.reqest_appointment = async (req, res) => {
    const {
        hc_appoinmentDate, hc_doctorId,
        hc_hospitalID, visitingSlot,
        totalTime, appointmentDuration
    } = req.body

    try {
        const count = await Appointment.find({
            hc_appoinmentDate, hc_doctorId,
            hc_hospitalID, visitingSlot,
            hc_appointment_patient: req.user._id
        }).count()
        if (count === 0) {
            const serial = await Appointment.find({
                hc_appoinmentDate, hc_doctorId,
                hc_hospitalID, visitingSlot,
            }).count()

            if (appointmentDuration * serial < totalTime) {
                const _appointment = new Appointment({
                    hc_appoinmentDate,
                    hc_doctorId,
                    hc_hospitalID,
                    visitingSlot,
                    hc_appointment_patient: req.user._id,
                })
                const appointment = await _appointment.save()

                const _notification = new Notification({
                    appointmentID: appointment._id,
                    doctorID: hc_doctorId,
                    patientID: req.user._id,
                    hospitalID: hc_hospitalID,
                    type: "A"
                })
                const notification = await _notification.save()

                await Doctor.updateOne(
                    { _id: hc_doctorId },
                    { $push: { hc_doctor_notifications: { notificationID: notification._id } } }
                )

                await Hospital.updateOne(
                    { _id: hc_hospitalID },
                    { $push: { hc_hospital_notifications: { notificationID: notification._id } }}
                )

                return res.status(201).json({
                    message: "Appointment Request Sended !!!",
                })
            } else {
                return res.status(404).json({ message: "Doctor isn't available !!!" })
            }
        } else {
            return res.status(500).json({ message: "Already Request for an Appointment!!!" })
        }
    } catch (err) {
        return res.status(500).json(err)
    }
}