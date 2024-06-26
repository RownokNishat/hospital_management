import React, { useState, useEffect } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useSelector } from "react-redux";
import Axios from "axios";

const Appoinment = (props) => {
  const auth = useSelector((state) => state.AuthReducer);
  const [date, setDate] = useState(null);
  const [handleDate, setHandleDate] = useState(null);
  const [visitingHour, setVisitingHour] = useState("");
  const [notAvailableDaye, setnotAvailableDaye] = useState(null);
  const [slots, setslots] = useState(null);
  const [appointmentDuration, setAppointmentDuration] = useState(0);
  const [isChecked, setisChecked] = useState(false);
  const [state, setState] = useState({
    isLoading: false,
    slot1StartHour: "",
    slot1StartMin: "",
    slot1EndHour: "",
    slot1EndMin: "",
    slot2StartHour: "",
    slot2StartMin: "",
    slot2EndHour: "",
    slot2EndMin: "",
    formData: {
      hc_appoinmentDate: "",
      hc_hospitalID: "",
      visitingSlot: "",
    },
  });

  useEffect(() => {
    const formData = state.formData;
    setState({
      ...state,
      formData: {
        ...formData,
        hc_hospitalID: null,
      },
    });
    setslots(null);
  }, [props]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setState({
      ...state,
      isLoading: true,
    });
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${auth.token}`,
    };

    if (appointmentDuration) {
      const data = state.formData;
      data.hc_appoinmentDate = new Date(date).toISOString();
      data.visitingSlot = visitingHour;
      data.hc_doctorId = props.id;
      data.appointmentDuration = appointmentDuration;

      if (visitingHour === "1") {
        const Start = slots.dayTimeSlot.Start.split(":");
        const End = slots.dayTimeSlot.End.split(":");
        data.Start = parseInt(Start[0]) * 60 + parseInt(Start[1]);
        data.totalTime =
          parseInt(End[0]) * 60 +
          parseInt(End[1]) -
          (parseInt(Start[0]) * 60 + parseInt(Start[1]));
      } else {
        const Start = slots.nightTimeSlot.Start.split(":");
        const End = slots.nightTimeSlot.End.split(":");
        data.Start = parseInt(Start[0]) * 60 + parseInt(Start[1]);
        data.totalTime =
          parseInt(End[0]) * 60 +
          parseInt(End[1]) -
          (parseInt(Start[0]) * 60 + parseInt(Start[1]));
      }

      if (!data.hc_appoinmentDate || !data.visitingSlot) {
        props.handleErrorDailog();
      } else {
        Axios.post("../api/appointment/request_appointment", data, { headers })
          .then((res) => {
            if (res.status === 201) {
              setState({
                ...state,
                isLoading: false,
              });

              // res.data.estimatedTime = `${Math.floor((data.Start + res.data.estimatedTime) / 60)}:${(data.Start + res.data.estimatedTime) % 60} to ${Math.floor((data.Start + res.data.estimatedTime + appointmentDuration) / 60)}:${(data.Start + res.data.estimatedTime + appointmentDuration) % 60}`
              props.handleSuccessDailog(state.formData.hospitalName);
              setDate(null);
              setVisitingHour("");
            }
          })
          .catch((error) => {
            alert(error.response.data.message);
          });
      }
    } else {
      alert("Doctor Not Available!!!");
    }
  };

  const handleChange = (date) => {
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1; // Months start at 0!
    let dd = date.getDate();
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    setHandleDate(`${dd}+"/"+${mm}+"/"+${yyyy}`);
    date = `${date}`;
    setDate(date.slice(4, 15));
    setisChecked(true);
  };

  const onEdit = (e) => {
    const formData = state.formData;
    setState({
      ...state,
      formData: {
        ...formData,
        [e.target.name]: props.doctorOfHospital[e.target.value].hospitalID._id,
        hospitalName:
          props.doctorOfHospital[e.target.value].hospitalID
            .hc_hospital_english_name,
      },
    });

    setAppointmentDuration(
      props.doctorOfHospital[e.target.value]?.appointment_duration
    );
    const slot = {
      dayTimeSlot: props.doctorOfHospital[e.target.value].dayTimeSlot,
      nightTimeSlot: props.doctorOfHospital[e.target.value].nightTimeSlot,
    };
    setslots(slot);
    setnotAvailableDaye(
      props.doctorOfHospital[e.target.value].notAvailableDays
    );
    setVisitingHour("");
  };

  const handleVistingHour = (e) => {
    const value = e.target.value;
    setVisitingHour(value);
  };

  const disableWeekends = (date) => {
    let sortedNum = notAvailableDaye.sort((a, b) => a.offDay - b.offDay);
    return (
      sortedNum[0]?.offDay === date.getDay() ||
      sortedNum[1]?.offDay === date.getDay() ||
      sortedNum[2]?.offDay === date.getDay() ||
      sortedNum[3]?.offDay === date.getDay() ||
      sortedNum[4]?.offDay === date.getDay() ||
      sortedNum[5]?.offDay === date.getDay() ||
      sortedNum[6]?.offDay === date.getDay()
    );
  };

  useEffect(() => {
    let a = slots?.dayTimeSlot?.Start.split(":");
    let b = slots?.dayTimeSlot?.End.split(":");
    let c = slots?.nightTimeSlot?.Start.split(":");
    let d = slots?.nightTimeSlot?.End.split(":");
    console.log("a,b,c,d", a,b,c,d);

    setState({
      ...state,
      slot1StartHour: a ? a[0] : "",
      slot1StartMin: a ? (a[1] == 0 ? "00" : a[1] == 5 ? "05" : a[1]) : "",
      slot1EndHour: b ? b[0] : "",
      slot1EndMin: b ? (b[1] == 0 ? "00" : b[1] == 5 ? "05" : b[1]) : "",
      slot2StartHour: c ? c[0] : "",
      slot2StartMin: c ? (c[1] == 0 ? "00" : c[1] == 5 ? "05" : c[1]) : "",
      slot2EndHour: d ? d[0] : "",
      slot2EndMin: d ? (d[1] == 0 ? "00" : d[1] == 5 ? "05" : d[1]) : "",
    });
  }, [slots]);
  console.log(state);
  return (
    <div>
      <select
        name="hc_hospitalID"
        className="form-select btn  dropdown-toggle mt-2 mb-2 text-start"
        aria-haspopup="true"
        aria-expanded="false"
        id="hospitalName"
        onChange={(e) => onEdit(e)}
        required
      >
        <option hidden>Select Hospital</option>
        {props.doctorOfHospital?.map((hospital, index) => {
          return (
            <option
              key={hospital._id}
              value={index}
              disabled={!hospital.update}
            >
              {hospital.hospitalID.hc_hospital_english_name} &nbsp; &nbsp;
              &nbsp;
              {`(${hospital.hospitalID.hc_hospital_address?.upazila}, ${hospital.hospitalID.hc_hospital_address?.district})`}
            </option>
          );
        })}
      </select>

      {slots ? (
        <div>
          <label>Select date</label>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              style={{
                padding: "0px 10px",
                border: "1px solid rgb(197, 197, 197)",
              }}
              id="birthdate"
              name="hc_doctor_date_of_birth"
              className="  form-control mb-3"
              InputProps={{
                disableUnderline: true,
              }}
              minDate={new Date()}
              value={date}
              shouldDisableDate={disableWeekends}
              onChange={handleChange}
              autoComplete="off"
              format="dd/MM/yyyy"
            />
          </MuiPickersUtilsProvider>
          <br />
          {state?.slot1StartHour ? (
            <>
              {" "}
              <input
                type="radio"
                id="visitng_hour"
                name="visiting_hour"
                value="1"
                onChange={handleVistingHour}
              ></input>
              <label className="ms-2">
                <b> Slot 1: </b>
                {state?.slot1StartHour}:{state?.slot1StartMin} to{" "}
                {state?.slot1EndHour}:{state?.slot1EndMin}
              </label>{" "}
            </>
          ) : null}

          <br />
          {state?.slot2StartHour ? (
            <>
              <input
                type="radio"
                id="visitng_hour"
                name="visiting_hour"
                value="2"
                onChange={handleVistingHour}
              ></input>
              <label className="ms-2">
                <b> Slot 2: </b>
                {state?.slot2StartHour}:{state?.slot2StartMin} to{" "}
                {state?.slot2EndHour}:{state?.slot2EndMin}
              </label>
            </>
          ) : null}
        </div>
      ) : (
        <></>
      )}

      <button
        onClick={handleSubmit}
        disabled={!isChecked}
        className="btn btn-success"
      >
        Submit
      </button>
    </div>
  );
};

export default Appoinment;
