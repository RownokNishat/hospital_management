const Prescription = require('../../models/prescription_model/prescription_model')
const Patient = require('../../models/patient_model/patient_model')
const Doctor = require('../../models/doctor_model/doctor_model')
const Notification = require('../../models/Notification_model/prescription_notification_model')
const Appointment = require('../../models/Appoinment_model/appointment_model')

exports.prescription = async (req, res) => {
    const { _id } = req.user
    const { patientid, appointmentid } = req.headers

    const {
        Diagnosis,
        hc_p_cheif_past_history,
        hc_p_cheif_drug_history,
        hc_p_general_examination,
        hc_p_gex_female,
        hc_p_gex_systemic_examination,
        hc_p_ex_baby,
        hc_p_ex_post_operative_patient,
        hc_p_ex_others,
        hc_p_investigation,
        cheif_complain,
        chamber,
        teratment,
        follow_up,
        advice
    } = req.body.prescriptionData

    try {
        const _prescription = new Prescription({
            Diagnosis,
            hc_p_cheif_past_history,
            hc_p_cheif_drug_history,
            hc_p_general_examination,
            hc_p_gex_female,
            hc_p_gex_systemic_examination,
            hc_p_ex_baby,
            hc_p_ex_post_operative_patient,
            hc_p_ex_others,
            hc_p_investigation,
            cheif_complain,
            chamber,
            teratment,
            follow_up,
            advice,
            patientId: patientid,
            doctorId: _id
        })
        const prescription = await _prescription.save()
        await Doctor.updateOne(
            { _id: _id }, { $push: { hc_doctor_write_prescription: { prescriptionID: prescription._id, Note: "" } } }
        )
        appointmentid ? await Appointment.updateOne(
            { _id: appointmentid },
            { $set: { hasVisit: true } }
        ) : null

        const _notification = new Notification({
            prescriptionID: prescription._id,
            doctorID: _id,
            patientID: patientid,
            type: "P"
        })
        const notification = await _notification.save()

        const _patient = await Patient.findById(patientid)
        await _patient.addPrescription(prescription._id, notification._id)
        return res.status(201).json({
            _id: prescription._id,
            message: "Prescription Send Successfully"
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}
exports.editPrescription = async (req, res) => {
    const { _id } = req.user
    const { patientid, prescriptionid } = req.headers

    const {
        Diagnosis,
        hc_p_cheif_past_history,
        hc_p_cheif_drug_history,
        hc_p_general_examination,
        hc_p_gex_female,
        hc_p_gex_systemic_examination,
        hc_p_ex_baby,
        hc_p_ex_post_operative_patient,
        hc_p_ex_others,
        hc_p_investigation,
        cheif_complain,
        teratment,
        follow_up,
        advice
    } = req.body

    try {
        const _prescription = await Prescription.updateOne(
            {
                _id: prescriptionid
            }, {
            $set: {
                "Diagnosis": Diagnosis,
                "hc_p_cheif_past_history": hc_p_cheif_past_history,
                "hc_p_cheif_drug_history": hc_p_cheif_drug_history,
                "hc_p_general_examination": hc_p_general_examination,
                "hc_p_gex_female": hc_p_gex_female,
                "hc_p_gex_systemic_examination": hc_p_gex_systemic_examination,
                "hc_p_ex_baby": hc_p_ex_baby,
                "hc_p_ex_post_operative_patient": hc_p_ex_post_operative_patient,
                "hc_p_ex_others": hc_p_ex_others,
                "hc_p_investigation": hc_p_investigation,
                "hc_p_ex_others": hc_p_ex_others,
                "cheif_complain": cheif_complain,
                "teratment": teratment,
                "follow_up": follow_up,
                "advice": advice,
            }
        })

        if (_prescription.acknowledged) {
            const _notification = new Notification({
                prescriptionID: prescriptionid,
                doctorID: _id,
                patientID: patientid,
                type: "UP"
            })
            const notification = await _notification.save()

            const _patient = await Patient.findById(patientid)
            await _patient.addPrescription(null, notification._id)
        }

        return res.status(201).json({
            message: "Prescription Send Successfully"
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}