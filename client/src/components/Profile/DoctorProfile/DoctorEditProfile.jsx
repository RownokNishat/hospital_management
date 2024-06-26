import React, { useState, useEffect } from "react";
import Styles from "./DoctorProfile.module.css";
import Axios from "axios";
import { useSelector } from 'react-redux';

const DoctorEditProfile = (props) => {
  const [offDate, setOffDate] = useState([]); // has an issue
  const [hospitalInfo, setHospitalInfo] = useState([]);
  const [updateDoctorFees, setupdateDoctorFees] = useState('');
  const auth=useSelector(state=>state.AuthReducer)
  const [state, setState] = useState({
    isLoading: false,

    formData: {
      hc_doctor_fees: "",
      hc_doctor_of_hospital: "",
      hospitalID: "",
      appointment_duration: "",
      notAvailableDays: "",

      day_visit_start_hour: "",
      day_visit_start_min: "",
      day_visit_end_hour: "",
      day_visit_end_min: "",

      night_visit_start_hour: "",
      night_visit_start_min: "",
      night_visit_end_hour: "",
      night_visit_end_min: "",
    },
  });


  const [days,setDays] = useState([
    {id: 0,day: "Sunday",offDay: 0},
    {id: 1,day: "Monday",offDay: 0},
    {id: 2,day: "Tuesday",offDay: 0},
    {id: 3,day: "Wednesday",offDay: 0},
    {id: 4,day: "Thursday",offDay: 0},
    {id: 5,day: "Friday",offDay: 0},
    {id: 6,day: "Saturday",offDay: 0},    
  ]);

  const hours = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ];
  const minutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

  useEffect(() => {
    setOffDate(hospitalInfo[0]?.notAvailableDays);
    setDays([
      {id: 0,day: "Sunday",offDay: 0},
      {id: 1,day: "Monday",offDay: 0},
      {id: 2,day: "Tuesday",offDay: 0},
      {id: 3,day: "Wednesday",offDay: 0},
      {id: 4,day: "Thursday",offDay: 0},
      {id: 5,day: "Friday",offDay: 0},
      {id: 6,day: "Saturday",offDay: 0}
    ])

    setState({
      ...state,
      formData:{
        ...state.formData,
        appointment_duration:hospitalInfo[0]?.appointment_duration,
        day_visit_start_hour: hospitalInfo[0]?.dayTimeSlot?.Start.split(":")[0] || '',
        day_visit_start_min: hospitalInfo[0]?.dayTimeSlot?.Start.split(":")[1] || '',
        day_visit_end_hour: hospitalInfo[0]?.dayTimeSlot?.End.split(":")[0] || '',
        day_visit_end_min: hospitalInfo[0]?.dayTimeSlot?.End.split(":")[1] || '',

        night_visit_start_hour: hospitalInfo[0]?.nightTimeSlot?.Start?.split(":")[0] || '',
        night_visit_start_min: hospitalInfo[0]?.nightTimeSlot?.Start?.split(":")[1] || '',
        night_visit_end_hour: hospitalInfo[0]?.nightTimeSlot?.End?.split(":")[0] || '',
        night_visit_end_min:  hospitalInfo[0]?.nightTimeSlot?.End?.split(":")[1] || '',
      }
    })
    setupdateDoctorFees(props.updateDoctorFees)
  }, [hospitalInfo]);

  useEffect(() => {
    days.map(item=>offDate?.map(offDay=>{
      if(item.id==offDay.offDay){
        const list =[...days]
        list[item.id].offDay=1
        setDays(list);
      }
    }))
  }, [offDate]);


  const doctorUpdateProfile = (hc_doctor_of_hospital,hc_doctor_fees) => {
    setState({
          ...state,
          isLoading: true,
        });
    const data={hc_doctor_of_hospital,hc_doctor_fees}
    const headers={
      "Content-Type":"application/json",
      "authorization": `Bearer ${auth?.token}`
    }
    Axios.post(`/api/doctor/updateDoctorHospitalProfile`, data, { headers })
      .then((res) => {
        setState({
          ...state,
          isLoading: false,
        })
        res.status===203 ? props.handleSuccessDailog() : props.handleErrorDailog() 
      })
      .catch((error) => console.log(error));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const data = state.formData;

    const dayTimeSlot_start = `${data.day_visit_start_hour}:${data.day_visit_start_min}`;
    const dayTimeSlot_end = `${data.day_visit_end_hour}:${data.day_visit_end_min}`;

    const nightTimeSlot_start = `${data.night_visit_start_hour}:${data.night_visit_start_min}`;
    const nightTimeSlot_end = `${data.night_visit_end_hour}:${data.night_visit_end_min}`;

    const day_end = parseInt(data.day_visit_end_hour) * 60 + parseInt(data.day_visit_end_min);
    const day_start = parseInt(data.day_visit_start_hour) * 60 + parseInt(data.day_visit_start_min);

    const night_end = parseInt(data.night_visit_end_hour) * 60 + parseInt(data.night_visit_end_min);
    const night_start =parseInt(data.night_visit_start_hour) * 60 +parseInt(data.night_visit_start_min);

    if (day_start > day_end) {
      alert("Day Start time can't be greater than end time");
    }

    if (night_start > night_end) {
      alert("Night start time can't be greater than end time");
    }
    data.hc_doctor_of_hospital = {
        hospitalID: data.hospitalID,
        notAvailableDays: offDate,
        dayTimeSlot: {
          Start: dayTimeSlot_start,
          End: dayTimeSlot_end,
        },
        nightTimeSlot: {
          Start: nightTimeSlot_start,
          End: nightTimeSlot_end,
        },
        appointment_duration: parseInt(data.appointment_duration),
      }

    delete data.dayTimeSlot_start;
    delete data.dayTimeSlot_end;
    delete data.nightTimeSlot_start;
    delete data.nightTimeSlot_end;
    
    // call any function to update the value
    doctorUpdateProfile(data.hc_doctor_of_hospital,parseInt(updateDoctorFees));
  };

  const onEdit = (e) => {
    const formData = state.formData;
    setState({
      ...state,
      formData: {
        ...formData,
        [e.target.name]: e.target.value,
      },
    });
  }

  const offDateChange = (e) => {
    const  checked  = e.target.checked;
    const  value  = parseInt(e.target.value);
      days.map(item=>{
        if(item.id ==value && !checked){
          const list=[...days]
          list[item.id].offDay=0
          // console.log(list);
          setDays(list)
        }
      })
      offDate.length == 0 ? setOffDate([{offDay:value}]) :  offDate.map(i=>{
        if(i.offDay != value && checked){
          const list=[...offDate]
          list.push({offDay:value})
          setOffDate(list)
        }else{
          setOffDate(offDate.filter((i) =>i.offDay!== value))
        }
      })
  }

  return state.isLoading ? 
    <div className="patientlistpage">
      <i className="fas fa-spinner fa-pulse fa-2x "></i>
    </div> :(
    <div>
      <form onSubmit={handleSubmit}>
        <div className="first_section">
          <select
            name="hospitalID"
            className="form-select btn  dropdown-toggle mt-2 mb-2 text-start"
            aria-haspopup="true"
            aria-expanded="false"
            id="hospitalName"
            onChange={(e) => {
              setHospitalInfo(props?.updateData.filter(fd=>fd.hospitalID?._id ===e.target.value))
              onEdit(e)
            }
            }
            required
          >
            {" "}
            <option hidden>Select Hospital</option>
            {props?.updateData?.map((pd,index) => {
              return (
                <option key={index} value={pd.hospitalID._id} >
                  {pd.hospitalID.hc_hospital_english_name}
                </option>
              );
            })}
          </select>

          {
            hospitalInfo[0] ? <>

          <label className="mt-3">Appointment Duration</label>
          <input
            name="appointment_duration"
            type="number"
            className="form-control form-control-lg"
            id="appointmentDuration"
            placeholder={hospitalInfo[0]?.appointment_duration?
              hospitalInfo[0]?.appointment_duration:"Appoinment Duration in minutes"}
            onChange={(e) => onEdit(e)}
            required
          />

          <label className="mt-3">Doctor Fees</label>
          <input
            name="hc_doctor_fees"
            type="text"
            className="form-control form-control-lg"
            id="doctorFess"
            placeholder={updateDoctorFees? updateDoctorFees: "Fees"}
            onChange={(e) => setupdateDoctorFees(e.target.value)}
            required
          />

          <label className="mt-3">Slot 1 </label>
          <div className="row">
            <div className="col-6">
              <div className="row">
                <div className="col-6">
                  {" "}
                  <select
                    name="day_visit_start_hour"
                    className="form-select btn  dropdown-toggle mt-2 mb-2 text-start"
                    aria-haspopup="true"
                    aria-expanded="false"
                    id="day_visit_start_hour"
                    value={state.formData.day_visit_start_hour}
                    onChange={(e) => onEdit(e)}
                    required
                  >
                    <option hidden>Start Hour</option>
                    {hours.map((hour) => {
                      return <option key={hour}>{hour}</option>;
                    })}
                  </select>
                </div>
                <div className="col-6">
                  <select
                    name="day_visit_start_min"
                    className="form-select btn  dropdown-toggle mt-2 mb-2 text-start"
                    aria-haspopup="true"
                    aria-expanded="false"
                    id="day_visit_"
                    value={state.formData.day_visit_start_min}
                    onChange={(e) => onEdit(e)}
                    required
                  >
                    <option hidden>Start Minute</option>
                    {minutes.map((minute) => {
                      return <option key={minute}>{minute}</option>;
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-6">
                  {" "}
                  <select
                    name="day_visit_end_hour"
                    className="form-select btn  dropdown-toggle mt-2 mb-2 text-start"
                    aria-haspopup="true"
                    aria-expanded="false"
                    id="day_visit_end_hour"
                    value={state.formData.day_visit_end_hour}
                    onChange={(e) => onEdit(e)}
                    required
                  >
                    <option hidden>End Hour</option>
                    {hours.map((hour) => {
                      return <option key={hour}>{hour}</option>;
                    })}
                  </select>
                </div>
                <div className="col-6">
                  {" "}
                  <select
                    name="day_visit_end_min"
                    className="form-select btn  dropdown-toggle mt-2 mb-2 text-start"
                    aria-haspopup="true"
                    aria-expanded="false"
                    id="day_visit_end_min"
                    value={state.formData.day_visit_end_min}
                    onChange={(e) => onEdit(e)}
                    required
                  >
                    <option hidden>End Minute</option>
                    {minutes.map((minute) => {
                      return <option key={minute}>{minute}</option>;
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <label className="mt-3">Slot 2</label>
          <div className="row">
            <div className="col-6">
              <div className="row">
                <div className="col-6">
                  {" "}
                  <select
                    name="night_visit_start_hour"
                    className="form-select btn  dropdown-toggle mt-2 mb-2 text-start"
                    aria-haspopup="true"
                    aria-expanded="false"
                    id="sex"
                    value={state.formData.night_visit_start_hour}
                    onChange={(e) => onEdit(e)}
                    required
                  >
                    <option hidden>Start Hour</option>
                    {hours.map((hour) => {
                      return <option key={hour}>{hour}</option>;
                    })}
                  </select>
                </div>
                <div className="col-6">
                  <select
                    name="night_visit_start_min"
                    className="form-select btn  dropdown-toggle mt-2 mb-2 text-start"
                    aria-haspopup="true"
                    aria-expanded="false"
                    id="day_visit_"
                    value={state.formData.night_visit_start_min}
                    onChange={(e) => onEdit(e)}
                    required
                  >
                    <option hidden>Start Minute</option>
                    {minutes.map((minute) => {
                      return <option key={minute}>{minute}</option>;
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-6">
                  {" "}
                  <select
                    name="night_visit_end_hour"
                    className="form-select btn  dropdown-toggle mt-2 mb-2 text-start"
                    aria-haspopup="true"
                    aria-expanded="false"
                    id="night_visit_end_hour"
                    value={state.formData.night_visit_end_hour}
                    onChange={(e) => onEdit(e)}
                    required
                  >
                    <option hidden>End Hour</option>
                    {hours.map((hour) => {
                      return <option key={hour}>{hour}</option>;
                    })}
                  </select>
                </div>
                <div className="col-6">
                  {" "}
                  <select
                    name="night_visit_end_min"
                    className="form-select btn  dropdown-toggle mt-2 mb-2 text-start"
                    aria-haspopup="true"
                    aria-expanded="false"
                    id="night_visit_end_min"
                    value={state.formData.night_visit_end_min}
                    onChange={(e) => onEdit(e)}
                    required
                  >
                    <option hidden>End Minute</option>
                    {minutes.map((minute) => {
                      return <option key={minute}>{minute}</option>;
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <p>Off Days</p>
          {days?.map((pd) => {
            return (
              <div key={pd.id}>
                <div className="ms-3 d-flex">
                  <input
                    className={Styles.largeCheckboxs}
                    name={pd.day}
                    value={pd.id}
                    type="checkbox"
                    id={pd.id}
                    checked={pd.offDay == 1}
                    onChange={(e) => offDateChange(e)}
                    required
                  ></input>
                  <label htmlFor={pd.day} className="text-left small ms-2">
                    {pd.day}
                  </label>
                </div>
              </div>
            );
          })}
</>:<></>
        }

        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-info mt-2 "
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default DoctorEditProfile;