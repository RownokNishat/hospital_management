const fs = require("fs")
const path = require("path")
const cloudinary = require('cloudinary').v2;

const removeDir = function (path) {
    if (fs.existsSync(path)) {
        const files = fs.readdirSync(path)

        if (files.length > 0) {
            files.forEach(function (filename) {
                if (fs.statSync(path + "/" + filename).isDirectory()) {
                    removeDir(path + "/" + filename)
                } else {
                    fs.unlinkSync(path + "/" + filename)
                }
            })
            fs.rmdirSync(path)
        } else {
            fs.rmdirSync(path)
        }
    } else {
        console.log("Directory path not found.")
    }
}

exports.avaterUpload = async (req, res) => {
    const pathToDir = path.join(__dirname, "../../../tmp")
    const user = req.params.user
        cloudinary.config({
            cloud_name: process.env.cloud_name,
            api_key: process.env.api_key,
            api_secret: process.env.api_secret,
            secure: true
        });
        
        const {photo,nid} = req.files

        if(photo){
            try {
                cloudinary.uploader.upload(photo.tempFilePath, {
                    folder: `Health Care/${user}`
                }, (err, result) => {
                    removeDir(pathToDir)
                    return res.status(201).json(result.secure_url)
                })
            } catch (error) {
                console.log(`${user} avatar upload Faild.`);
            }
        }else if(nid){
            try {
                cloudinary.uploader.upload(nid.tempFilePath, {
                    folder: `Health Care/${user}/nid`
                }, (err, result) => {
                    removeDir(pathToDir)
                    return res.status(201).json(result.secure_url)
                })
            } catch (error) {
                console.log(`${user} nid upload Faild.`);
            }
        }else{
            return res.status(400).json({message:"Please Select an image."})
        }
}