import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import "../Login/login.css";
import "react-datepicker/dist/react-datepicker.css";

const NewPatientRegister = ({ newPatient, setNewPatient }) => {
  const [newUser, setNewUser] = useState({});
  const auth = useSelector((state) => state.AuthReducer);

  const [date, setDate] = useState(null);

  const [state, setState] = useState({
    imageAvatar: "",
    avatarurl: "",
    date: null,
    //startDate: new Date(),
    isLoading: false,
    htmlelement: <i className="fa fa-user fa-8x" aria-hidden="true"></i>,

    formData: {
      hc_patient_firstName: "",
      hc_patient_lastName: "",
      hc_patient_bloodGroup: "",
      hc_patient_email: "",
      hc_patient_occupation: "",
      hc_patient_phoneno: "",
      hc_patient_sex: "",
      hc_patient_relegion: "",
      hc_patient_date_of_birth: "",
      hc_patient_password: "",
      hc_patient_marital_status: "",
    },
  });

  // console.log("date", date);
  console.log("state date", state.formData);

  const patientRegistration = (data) => {
    Axios.post(`api/patient/registration`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setState({
          ...state,
          isLoading: false,
          // imageAvatar:"",
        });
        window.location.reload(true);
        //props.handleSuccessDailog()
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = state.formData;
    data.hc_patient_occupation = "none";
    data.hc_patient_avatar = "n";
    data.hc_patient_date_of_birth = state.date1;
    data.hc_patient_password = "123123";
    data.hc_patient_address = {
      upazila: "",
      district: "",
    };
    data.hc_patient_prescription = [];
    setState({
      ...state,

      isLoading: true,
    });

    patientRegistration(data);

    console.log(data);
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
  };

  // const handleChange = (date) => {
  //   const month = [
  //     "Jan",
  //     "Feb",
  //     "Mar",
  //     "Apr",
  //     "May",
  //     "Jun",
  //     "Jul",
  //     "Aug",
  //     "Sep",
  //     "Oct",
  //     "Nov",
  //     "Dec",
  //   ];
  //   console.log("handle date");
  //   if (date !== null) {
  //     console.log("If");
  //     setState({
  //       ...state,
  //       date: date,
  //       formData: {
  //         ...state.formData,
  //         hc_patient_date_of_birth: `${
  //           month[date.getMonth()]
  //         } ${date.getDate()} ${date.getFullYear()}`,
  //       },
  //     });
  //   } else {
  //     console.log("else");
  //     setState({
  //       ...state,
  //       date: date,
  //       formData: {
  //         ...state.formData,
  //         birthdate: date,
  //       },

  //       startDate: date,
  //     });
  //   }
  // };

  // const today = (date) => {
  //   console.log("today", date);
  //   const yyyy = date.getFullYear();
  //   let mm = date.getMonth() + 1; // Months start at 0!
  //   let dd = date.getDate();

  //   if (dd < 10) dd = "0" + dd;
  //   if (mm < 10) mm = "0" + mm;

  //   setDate(dd + "/" + mm + "/" + yyyy);
  // };

  // useEffect(() => {
  //   today(new Date());
  // }, [setDate]);



  return state.isLoading ? (
    <div className="addpersonpage">
      <i className="fas fa-spinner fa-pulse fa-2x"></i>
    </div>
  ) : (
    <div>
      <div className="login_page">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-4 p-0 first_section">
              <div className="box">
                <div className="from_section">
                  <i className="fa fa-hospital-o" aria-hidden="true"></i>
                  <ul>
                    <li>
                      <i className="fa fa-user-md mt-2" aria-hidden="true"></i>
                    </li>
                    <h3 style={{ color: "white" }}>Health Book</h3>
                    <li></li>
                  </ul>

                  <form onSubmit={handleSubmit}>
                    <div className="first_section">
                      <input
                        name="hc_patient_firstName"
                        type="text"
                        className="form-control form-control-lg"
                        id="firstname"
                        placeholder="First Name"
                        onChange={(e) => onEdit(e)}
                        required
                      />

                      <input
                        name="hc_patient_lastName"
                        type="text"
                        className="form-control form-control-lg"
                        id="lastname"
                        placeholder="Last Name"
                        onChange={(e) => onEdit(e)}
                        required
                      />

                      <input
                        name="hc_patient_phoneno"
                        type="text"
                        className="form-control form-control-lg"
                        id="phonenumber"
                        placeholder="Phone Number"
                        onChange={(e) => onEdit(e)}
                      />

                      <input
                        type="email"
                        name="hc_patient_email"
                        className="form-control form-control form-control-lg"
                        id="email"
                        placeholder="Email"
                        onChange={(e) => onEdit(e)}
                      />
                      <input
                        type="password"
                        name="hc_patient_password"
                        className="form-control form-control form-control-lg"
                        id="email"
                        placeholder="Password"
                        onChange={(e) => onEdit(e)}
                      />
                      <input
                        type="password"
                        name="hc_patient_password"
                        className="form-control form-control form-control-lg"
                        id="email"
                        placeholder="Re-type password"
                        onChange={(e) => onEdit(e)}
                      />

                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                          style={{
                            padding: "0px 10px",
                            border: "1px solid rgb(197, 197, 197)",
                            color: "white",
                            backgroundColor: "#11283f",
                          }}
                          id="birthdate"
                          name="hc_patient_date_of_birth"
                          className="form-control text-white"
                          InputProps={{
                            disableUnderline: true,
                          }}
                          placeholder={date}
                          value={date}
                          onChange={()=>{}}
                          autoComplete="off"
                          format="dd/MM/yyyy"
                        />
                      </MuiPickersUtilsProvider>

                      <select
                        name="hc_patient_sex"
                        className="form-select btn text-light dropdown-toggle mt-2 mb-2 text-start"
                        style={{
                          backgroundColor: "#11283f",
                        }}
                        aria-haspopup="true"
                        aria-expanded="false"
                        id="sex"
                        onChange={(e) => onEdit(e)}
                        required
                      >
                        <option hidden>Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>

                      <select
                        name="hc_patient_bloodGroup"
                        type="text"
                        className="form-select btn dropdown-toggle mb-2 text-light text-start"
                        style={{
                          backgroundColor: "#11283f",
                        }}
                        aria-haspopup="true"
                        aria-expanded="false"
                        id="bloodgroup"
                        onChange={(e) => onEdit(e)}
                      >
                        <option hidden>Blood Group</option>
                        <option>A+</option>
                        <option>A-</option>
                        <option>AB+</option>
                        <option>AB-</option>
                        <option>B+</option>
                        <option>B-</option>
                        <option>O+</option>
                        <option>O-</option>
                      </select>

                      <select
                        name="hc_patient_relegion"
                        type="text"
                        style={{
                          backgroundColor: "#11283f",
                        }}
                        className="form-select btn text-light dropdown-toggle mb-2 text-start"
                        aria-haspopup="true"
                        aria-expanded="false"
                        id="relegion"
                        onChange={(e) => onEdit(e)}
                      >
                        <option hidden>Religion</option>
                        <option>Islam</option>
                        <option>Hindu</option>
                        <option>Christian</option>
                      </select>

                      <select
                        name="hc_patient_marital_status"
                        className="form-select btn  text-light dropdown-toggle mb-2 text-start"
                        style={{
                          backgroundColor: "#11283f",
                        }}
                        aria-haspopup="true"
                        aria-expanded="false"
                        id="marital_status"
                        onChange={(e) => onEdit(e)}
                      >
                        <option hidden>Marital Status</option>
                        <option>Married</option>
                        <option>Unmarried</option>
                      </select>
                    </div>

                    <button type="submit" className="btn btn-info mt-2 ">
                      Register
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-8 p-0 second_section">
              <div className="box">
                <img alt="" srcSet={require("../../Images/doctorbg.jpg")} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPatientRegister;
