const Patient = require('../../models/patient_model/patient_model')
const Prescription = require('../../models/prescription_model/prescription_model')
const Appointment = require('../../models/Appoinment_model/appointment_model')

const getNextDay = (data ) => {
    const date= new Date(data)
    const nextDay = new Date(date.getTime());
    nextDay.setDate(date.getDate() + 1);
    return new Date(nextDay.getFullYear() + '/' + (nextDay.getMonth() + 1) + '/' + nextDay.getDate())
}

const doctorDiagnosis = async (item, index, arr, doctorid) => {
    const data = await Prescription.countDocuments({
        "Diagnosis.diagonosis": item,
        doctorId: doctorid
    })
    return arr[index] = `${item}:${data}`
}
const hospitalDiagnosis = async (item, index, arr, hospitalid) => {
    const data = await Prescription.countDocuments({
        "Diagnosis.diagonosis": item,
        chamber: hospitalid
    })
    return arr[index] = `${item}:${data}`
}

exports.serveyDoctor = async (req, res) => {
    const { date } = req.body
    const doctorid = req.user._id

    const nextDay = getNextDay(date)

    const Today = new Date(date).getFullYear() + '/' + (new Date(date).getMonth() + 1) + '/' + new Date(date).getDate()

    const days = new Date(new Date(date).getFullYear() + '/' + (new Date(date).getMonth() + 1) + '/' + new Date(date).getDate()).toISOString()

    const _patient = await Patient.countDocuments()
    
    const _appointment = await Appointment.countDocuments(
        {
            hc_appoinmentDate: days,
            hc_doctorId: doctorid,
            hasVisit: true
        }
    )
    const _hasVisited = await Prescription.countDocuments(
        {
            doctorId: doctorid,
            updatedAt: {
                $gt: new Date(Today), $lt: nextDay
            }
        }
    )
    const _diagnosis = await Prescription.distinct("Diagnosis.diagonosis", { doctorId: doctorid })

    _diagnosis.map(async (item, index, diagnosisCount) => {
        await doctorDiagnosis(item, index, diagnosisCount, doctorid)
        if (_diagnosis.length == index + 1) {
            return res.status(200).json({ _patient, _hasVisited, _appointment, diagnosisCount });
        }
    })
}

const countUnique = (district, res) => {
    var tempResult = {}

    district.map((item, index, arr) => {
        const district = item.patientId?.hc_patient_address?.district
        tempResult[district] = {
            district,
            count: tempResult[district] ? tempResult[district].count + 1 : 1
        }
        let result = Object.values(tempResult)
        if (arr.length == index + 1) {
            return res.status(200).json(result);
        }
    })
};

exports.location = async (req, res) => {
    const _district = await Prescription.find().select({ patientId: 1, _id: 0 }).populate(
        {
            path: 'patientId',
            select: ['hc_patient_address.district'],
        }
    )
    countUnique(_district, res)
}



exports.serveyHospital = async (req, res) => {
    const { date } = req.body
    const hospitalid = req.user._id

    const nextDay = getNextDay(date)

    const Days = new Date(new Date(date).getFullYear() + '/' + (new Date(date).getMonth() + 1) + '/' + new Date(date).getDate()).toISOString()

    const Today = new Date(date).getFullYear() + '/' + (new Date(date).getMonth() + 1) + '/' + new Date(date).getDate()

    const _patient = await Patient.countDocuments()

    const _appointment = await Appointment.countDocuments(
        {
            hc_appoinmentDate: Days,
            hc_hospitalID: hospitalid,
            hasVisit: true
        }
    )
    const _hasVisited = await Prescription.countDocuments(
        {
            chamber: hospitalid,
            updatedAt: {
                $gt: new Date(Today), $lt: nextDay
            }
        }
    )
    const _diagnosis = await Prescription.distinct("Diagnosis.diagonosis", { chamber: hospitalid })

    _diagnosis.map(async (item, index, diagnosisCount) => {
        await hospitalDiagnosis(item, index, diagnosisCount, hospitalid)
        if (_diagnosis.length == index + 1) {
            return res.status(200).json({ _patient, _hasVisited, _appointment, diagnosisCount });
        }
    })
}