const fs = require("fs")
const path = require("path")
const drive = require('./service');

const Patient = require('../../models/patient_model/patient_model')
const Hospital = require('../../models/hospital_model/hospital_model')
const TestReport = require('../../models/TestReport_model/testReport_model')
const Notifications = require('../../models/Notification_model/prescription_notification_model')

const removeDir = function () {
    const pathToDir = path.join(__dirname, "../../../tmp")
    if (fs.existsSync(pathToDir)) {
        const files = fs.readdirSync(pathToDir)

        if (files.length > 0) {
            files.forEach(function (filename) {
                if (fs.statSync(pathToDir + "/" + filename).isDirectory()) {
                    removeDir(pathToDir + "/" + filename)
                } else {
                    fs.unlinkSync(pathToDir + "/" + filename)
                }
            })
            fs.rmdirSync(pathToDir)
        } else {
            fs.rmdirSync(pathToDir)
        }
    } else {
        console.log("Directory path not found.")
    }
}

const generatePublicURI = async (id, patientid, testname, hospitalId, res) => {
    await drive({ version: 'v3' }).permissions.create({
        fileId: id,
        requestBody: {
            role: 'reader',
            type: 'anyone'
        }
    })

    const result = await drive({ version: 'v3' }).files.get({
        fileId: id,
        fields: 'webViewLink, webContentLink'
    })

    if (result.data?.webViewLink) {
        removeDir()
        const _testReport = new TestReport({
            patientID: patientid,
            hospitalID: hospitalId,
            testName: testname,
            webViewLink: result.data.webViewLink,
            webContentLink: result.data.webContentLink,
        })
        const testReport = await _testReport.save()

        const _notification = new Notifications({
            patientID: patientid,
            hospitalID: hospitalId,
            testReport: testReport._id,
            type: "DTR"
        })
        const notification = await _notification.save()

        await Patient.updateOne({
            _id: patientid
        }, {
            $push: {
                hc_patient_testReport: { testReport: testReport._id },
                hc_patient_notifications: { notificationID: notification._id }
            }
        })
        await Hospital.updateOne({
            _id: hospitalId
        }, {
            $push: {
                hc_patient_testReport: { testReport: testReport._id }
            }
        })

        return res.status(201).json(result.data)
    } else {
        return res.status(404).json({ message: "Try Again" })
    }
}

const uploadFile = async (fileObject, patientid, testname, hospitalId, res) => {
    const folderId = '1tgdpXe3rx5L9NFKQi8ITp2AKD-wWVAxI';
    const { data: { id, name } = {} } = await drive({ version: 'v3' }).files.create({
        resource: {
            name: fileObject.name,
            parents: [folderId],
        },
        media: {
            mimeType: 'application/pdf',
            body: fs.createReadStream(fileObject.tempFilePath),
        },
        fields: 'id,name',
    });

    generatePublicURI(id, patientid, testname, hospitalId, res)
};

exports.upload_test_report_pdf = async (req, res) => {
    const { patientid, testname } = req.headers
    const { pdf } = req.files
    try {
        req.user.role === 'Hospital' ?
            await uploadFile(pdf, patientid, testname, req.user._id, res) :
            res.status(404).json({ message: "Not a valid user!!!" })

    } catch (err) {
        console.log(err)
        res.send(err.message);
    }
}