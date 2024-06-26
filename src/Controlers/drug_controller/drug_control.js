const DRUG = require('../../models/Drug_model/drug_model')
const DRUG_TYPE = require('../../models/Drug_model/Drug_type_model')
// const csvtojson = require('csvtojson')
const path = require("path")
// const pathToDir = path.join(__dirname, "./drug_list.csv")


exports.drug_control = async (req, res) => {
    const {
        drug_name
    } = req.body
    if (req.user.role === "Hospital" || req.user.role === "Doctor") {
        try {
            drug_name.map(async (i) => {
                const _drug = new DRUG(i);
                await _drug.save()
                console.log(`Medicine Added ${i.hc_drug_name}`);
            })
            return res.status(201).json({
                message: "Drugs Added Successfully !!!"
            })
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

// exports.drug_control_with_csv = async (req, res) => {
//     if(req.user.role==="Hospital" || req.user.role==="Doctor"){
//         csvtojson()
//         .fromFile(pathToDir)
//         .then((json) => {
//             try {
//                 json.map(async (i,index) => {
//                     const _drug = new DRUG(i);
//                     await _drug.save()
//                     console.log(`Medicine Added ${index} - ${i.hc_drug_name}`);
//                 })
//                 return res.status(201).json({
//                     message: "Drugs Added Successfully !!!"
//                 })
//             } catch (error) {
//                 return res.status(201).json({
//                     message: "Invalid Action"
//                 })
//             }
//         })
//     }else{
//         return res.status(201).json({
//             message: "Invalid Action"
//         })
//     }
// }


// exports.drug_type_controler = async (req, res) => {
//     if(req.user.role==="Hospital" || req.user.role==="Doctor"){
//         csvtojson()
//         .fromFile(pathToDir)
//         .then((json) => {
//             try {
//                 json.map(async (i,index) => {
//                     const _drug = new DRUG_TYPE(i);
//                     await _drug.save()
//                     console.log(`Drug Type Added ${index} - ${i.hc_drug_type}`);
//                 })
//                 return res.status(201).json({
//                     message: "Drugs Types Added Successfully !!!"
//                 })
//             } catch (error) {
//                 return res.status(201).json({message: "Invalid Action"})
//             }
//         })
//     }else{
//         return res.status(201).json({message: "Invalid Action"})
//     }
// }


exports.search_drug = async (req, res) => {
    const {hc_drug_name} = req.body
    if (req.user.role === "Doctor" || req.user.role === "Student") {
        try {
            const agg = [{
                $search: {
                    autocomplete: {
                        query: hc_drug_name,
                        path: "hc_drug_name"
                    }
                }
            }, {
                $limit: 100
            }, {
                $project: {
                    _id: 0,
                    hc_drug_name: 1
                }
            }]
            const response = await DRUG.aggregate(agg)
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

exports.drug_types = async (req, res) => {
    try {
        const drug = await DRUG_TYPE.find({})
        return res.status(200).json(drug)
    } catch (error) {
        return res.status(404).json({
            message: "Invalid Action"
        })
    }
}