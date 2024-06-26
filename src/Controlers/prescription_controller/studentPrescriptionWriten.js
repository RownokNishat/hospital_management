const Med_Std_Prescription = require('../../models/prescription_model/med_std_prescription_model')
const Student= require('../../models/Student_Model/student_model')

exports.student_prescription = async (req, res) => {
    const { _id } = req.user
    const {
        Diagnosis,
        cheif_complain,
        teratment,
        follow_up,
        advice,
        hc_p_cheif_past_history,
        hc_p_cheif_drug_history,
        hc_p_general_examination,
        hc_p_gex_female,
        hc_p_gex_systemic_examination,
        hc_p_ex_baby,
        hc_p_ex_post_operative_patient,
        hc_p_ex_others,
        hc_p_investigation
    } = req.body

    try {
        const _prescription = new Med_Std_Prescription({
            Diagnosis,
            cheif_complain,
            teratment,
            follow_up,
            advice,
            hc_p_cheif_past_history,
            hc_p_cheif_drug_history,
            hc_p_general_examination,
            hc_p_gex_female,
            hc_p_gex_systemic_examination,
            hc_p_ex_baby,
            hc_p_ex_post_operative_patient,
            hc_p_ex_others,
            hc_p_investigation,
            studentId: _id
        })
        const prescription = await _prescription.save()
        await Student.updateOne(
            { _id: _id }, { $push: { hc_student_write_prescription: { prescriptionID: prescription._id } } }
        )

        return res.status(201).json({
            _id:prescription._id,
            message: "Prescription Saved"
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}