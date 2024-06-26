import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import Axios from 'axios'

const ShowAppoinmentDetails = (props) => {
    const auth = useSelector((state) => state.AuthReducer);
    const [doctorSchedule, setdoctorSchedule] = useState(null);
    const [hospitalName, sethospitalName] = useState(null);
    const [doctorName, setdoctorName] = useState(null);
    const [serialNo, setSerialNo] = useState(null);

    const timeSlot = (time, appointment_duration, hc_appoinmentDate, serialNo) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const Start = time.Start.split(":")
        const hr = Math.floor((parseInt(Start[0]) * 60 + parseInt(Start[1]) + (appointment_duration * (serialNo-1))) / 60)

        const date = new Date(hc_appoinmentDate)
        setdoctorSchedule(
          ` ${hr > 12 ? hr - 12 : hr} : ${
            (parseInt(Start[0]) * 60 +
              parseInt(Start[1]) +
              appointment_duration * (serialNo - 1)) %
              60 ==
            0
              ? "00"
              : (parseInt(Start[0]) * 60 +
                  parseInt(Start[1]) +
                  appointment_duration * (serialNo - 1)) %
                60
          } ${hr > 12 ? "PM" : "AM"} ${date.getDate()} ${
            monthNames[date.getMonth()]
          }  ${date.getFullYear()} `
        );
        setSerialNo(serialNo)
    }

    const getEstimatedTime = (appointmentID) => {
        const headers = {
            "Content-Type": "application/json",
            authorization: `Bearer ${auth.token}`,
            appointmentid: appointmentID
        };
        Axios.get('../../api/appointment/estimated_time', { headers })
            .then(res => {
                const data = res.data
                setdoctorName(data.hc_doctorId.hc_doctor_englishName)
                data.hc_doctorId.hc_doctor_of_hospital.map(i => {
                    if (i.hospitalID._id == data.hc_hospitalID) {
                        sethospitalName(i.hospitalID.hc_hospital_english_name)
                        data.visitingSlot == 1 ?
                            timeSlot(
                                i.dayTimeSlot,
                                i.appointment_duration,
                                data.hc_appoinmentDate,
                                data.serialNo
                            ) :
                            timeSlot(
                                i.nightTimeSlot,
                                i.appointment_duration,
                                data.hc_appoinmentDate,
                                data.serialNo
                            )
                    }
                })
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if (props.appointmentID) {
            getEstimatedTime(props.appointmentID)
        }
    }, [props?.appointmentID]);

    return (
        <div>
            <h3>
                <b>Serial- {serialNo} : </b>
                Your appoinment in <b>{hospitalName}</b> of <b>{doctorName}</b> at <b>{doctorSchedule}</b>
            </h3>
        </div>
    );
};

export default ShowAppoinmentDetails;