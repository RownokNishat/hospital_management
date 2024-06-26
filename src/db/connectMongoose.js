const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE)
    .then(() => {
        console.log("MongoDB Connection successfull");
    })
    .catch(err => {
        console.log(err)
    })