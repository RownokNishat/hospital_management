const Advice = require('../../models/Advice_model/advice_list_model')
// const csvtojson = require('csvtojson')
// const path = require("path")
// const pathToDir = path.join(__dirname, "./Advice_List.csv")

const {adviceList}= require('./advice_List')




exports.advice_control_with_csv = async (req, res) => {

    if(req.user.role==="Hospital" || req.user.role==="Doctor"){
            try {
                adviceList.map(async (i) => {
                    const _advice = new Advice(i);
                    const response =await _advice.save()
                    console.log(response);
                })
                return res.status(201).json({
                    message: "Advice Added Successfully !!!"
                })
            } catch (error) {
                return res.status(201).json({
                    message: "Invalid Action"
                })
            }
    }else{
        return res.status(201).json({
            message: "Invalid Action"
        })
    }
}
