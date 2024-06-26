const express = require('express')
const app = express()
const cors = require('cors')
const compression = require("compression")
const fileUpload = require('express-fileupload')
// const cluster = require('cluster');
// const numCPUs = require('os').cpus().length;



const company_auth = require('./src/routers/users_routers/company_router')
const student_auth = require('./src/routers/users_routers/student_router')
const hospital_auth = require('./src/routers/users_routers/hospital_routers')
const doctor_auth = require('./src/routers/users_routers/doctor_routers')
const patient_auth = require('./src/routers/users_routers/patient_routers')
// const med_std_auth = require('./src/routers/users_routers/medical_student_router')
const checkToken = require('./src/routers/checkToken')
const getProfileDetails = require('./src/routers/users_routers/profileDetails_router')
const avaterUpload = require('./src/routers/fileUpload/avaterUpload')
const dashboard = require('./src/routers/dashboard/dashboard')
const prescription_route = require('./src/routers/prescription_route/prescription_route')
const test = require('./src/routers/test_router')
const appointment_auth = require('./src/routers/appointment/appointment_router')
const notification_router = require('./src/routers/notification_router/notification_router')
const service= require('./src/routers/Servey/servey')

require('dotenv').config()

//mongodb Database
require('./src/db/connectMongoose')


//middleware
app.use(fileUpload({
    useTempFiles:true
}))

app.use(cors())
app.use(express.json())
app.use(compression())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// API
app.use('/api/auth',checkToken )
app.use('/api/hospital',hospital_auth )
app.use('/api/student',student_auth )
app.use('/api/doctor',doctor_auth )
app.use('/api/patient',patient_auth )
// app.use('/api/med_std',med_std_auth )
app.use('/api/company',company_auth )
app.use('/api/getProfileDetails',getProfileDetails )
app.use('/api/file',avaterUpload )
app.use('/api/dashboard', dashboard )
app.use('/api/prescription', prescription_route )
app.use('/api/appointment', appointment_auth )
app.use('/api/notification', notification_router )
app.use('/api/service', service )
app.use('/api', test)

//TODO: For deployment

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    const path = require('path')
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(process.env.PORT, () => {
    console.log(`Listening to the port : ${process.env.PORT} : ${process.pid} `)
})
