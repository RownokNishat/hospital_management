const Notification = require('../../models/Notification_model/prescription_notification_model')

exports.showed_Notification = async (req, res) => {
    const _notification = await Notification.updateMany(
        { _id: { $in: req.body } },
        { $set: { isChecked: true } },
        { multi: true }
    )
    return res.status(201).json({ message: _notification })
}