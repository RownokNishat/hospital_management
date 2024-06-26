const Investigation = require('../../models/Drug_model/investigation_model')
const csvtojson = require('csvtojson')
const path = require("path")
const pathToDir = path.join(__dirname, "./Investigation_list_of_Bangladesh.csv")


exports.investigation_control_with_csv = async (req, res) => {
    if(req.user.role==="Hospital" || req.user.role==="Doctor"){
        csvtojson()
        .fromFile(pathToDir)
        .then((json) => {
            try {
                json.map(async (i,index) => {
                    const _drug = new Investigation(i);
                    await _drug.save()
                    console.log(`Investigation Added ${index} - ${i.hc_investigation_name}`);
                })
                return res.status(201).json({
                    message: "Drugs Added Successfully !!!"
                })
            } catch (error) {
                return res.status(201).json({
                    message: "Invalid Action"
                })
            }
        })
    }else{
        return res.status(201).json({
            message: "Invalid Action"
        })
    }
}


exports.search_investigation = async (req, res) => {
    const {hc_investigation_name} = req.body
    if (req.user.role === "Doctor"|| req.user.role === "Student") {
        try {
            const agg = [{
                $search: {
                    autocomplete: {
                        query: hc_investigation_name,
                        path: "hc_investigation_name",
                    }
                }
            }, {
                $limit: 20
            }, {
                $project: {
                    _id: 0,
                    hc_investigation_name: 1
                }
            }]
            const response = await Investigation.aggregate(agg)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(404).json({
                message: "Invalid Action"
            })
        }
    } else {
        return res.status(404).json({
            message: "Invalid Action"
        })
    }
}