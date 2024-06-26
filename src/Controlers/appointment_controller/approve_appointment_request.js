const Appointment = require('../../models/Appoinment_model/appointment_model')
const Patient = require('../../models/patient_model/patient_model')
const Notification = require('../../models/Notification_model/prescription_notification_model')

exports.approve_Appointment = async (req, res) => {
    const { id, hc_appoinmentDate, hc_doctorId, hc_hospitalID, hc_patientID, visitingSlot } = req.body;

    try {
        const count = await Appointment.find({
            hc_appoinmentDate, hc_doctorId,
            hc_hospitalID, visitingSlot,
            approved : 1
        }).count()

        const _appointment = await Appointment.updateOne({
            _id: id
        }, {
            $set: { approved: 1, serialNo: (count + 1) }
        })
        const _notification = new Notification({
            doctorID: hc_doctorId,
            patientID: hc_patientID,
            hospitalID: hc_hospitalID,
            appointmentID: id,
            type: 'AA'
        })
        await _notification.save()

        await Patient.updateOne({
            _id: hc_patientID
        }, {
            $push: { hc_patient_notifications: { notificationID: _notification._id } }
        })

        if (_appointment.acknowledged) {
            return res.status(203).json({ message: "Appointment Approved" })
        } else {
            return res.status(500).json({ message: "Something Went Wrong!!!" })
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}
exports.reject_Appointment = async (req, res) => {
    const { appointmentid } = req.body;
    try {
        const _appointment = await Appointment.updateOne({
            _id: appointmentid
        }, {
            $set: { approved: 2 }
        }
        )
        if (_appointment.acknowledged) {
            return res.status(203).json({ message: "Appointment Rejected" })
        } else {
            return res.status(500).json({ message: "Something Went Wrong!!!" })
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}

exports.delete_Appointment = async (req, res) => {
    const { appointmentid } = req.body;
    try {
        const _appointment = await Appointment.deleteOne({ _id: appointmentid })
        return res.status(202).json({ message: "Appointment Rejected", _appointment })
    } catch (error) {
        return res.status(500).json(error)
    }
}