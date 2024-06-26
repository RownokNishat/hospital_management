const Diagnosis_Advice = require('../../models/Advice_model/Diagnosis_Advice_UID')
const Advice_List = require('../../models/Advice_model/advice_list_model')

exports.search_diagnosis = async (req, res) => {
    const {
        diagnosis
    } = req.body
    if (req.user.role === "Doctor" ||req.user.role === "Student") {
        try {
            const agg = [{
                $search: {
                    autocomplete: {
                        query: diagnosis,
                        path: "diagnosis"
                    }
                }
            }, {
                $limit: 100
            }]
            const response = await Diagnosis_Advice.aggregate(agg)
            res.status(200).json(response)
        } catch (error) {
            return res.status(404).json({
                message: "Invalid Action"
            })
        }
    } else {
        res.status(404).json({
            message: "Invalid Action"
        })
    }
}


exports.diagnosis_Advices = async (req, res) => {
    const {
        Advice
    } = req.body
    try {
        if (Advice) {
            const data = await Advice_List.find({
                    _id: {
                        $in: Advice
                    }
                })
                .select({
                    "_id": 1,
                    "Advice": 1,
                })
            res.status(200).json(data);
        }

    } catch (err) {
        console.log(err);
    }
}