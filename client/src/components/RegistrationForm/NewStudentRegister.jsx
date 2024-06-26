import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";

import "../PersonDetails/addpersonDetails.css";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import AlertDialogBox from "../DailogBoxes/alertdailogbox";
import ErorrDialogBox from "../DailogBoxes/errordaologbox";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Styles from "../PersonDetails/NewDoctorDetailsForm.module.css";

const NewStudentRegister = (props) => {
  const [imageAvaterFile, setimageAvaterFile] = useState(null);
  const [imageNIDFile, setimageNIDFile] = useState(null);
  const auth = useSelector((state) => state.AuthReducer);
  const [isAvailable, setIsAvailable] = useState(true);
  const [education, setEducation] = useState([{ degree: "", title: "" }]);

  const [state, setState] = useState({
    imageAvatar: "",
    imageNID: "",
    avatarurl: "",
    date: null,
    // startDate: new Date(),
    isLoading: false,
    openAlertDailog: false,
    openErrorDailog: false,
    htmlelementDoctorAvater: (
      <i className="fa fa-user fa-8x" aria-hidden="true"></i>
    ),
    htmlelementDoctorNID: (
      <i className="fa fa-id-card fa-8x" aria-hidden="true"></i>
    ),

    formData: {
      hc_student_englishName: "",
      hc_student_email: "",
      hc_student_phoneno: "",
      hc_student_NID: "",
      hc_student_sex: "",
      hc_student_nid_pic: "",
      hc_student_avatar: "",
      hc_student_education: "",
      hc_student_relegion: "",
      hc_student_date_of_birth: "",
      hc_student_password: "123123",
      hc_student_address: "",
      hc_student_BMDC_reg_no: "",
      hc_student_session: "",
      hc_student_write_prescription: "",
      hc_student_write_prescription: [],
      address_upazila: "",
      address_district: "",
    }
  });

  const StudentRegistration = (drData) => {
    setState({
      ...state,
      isLoading: true
    });
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${auth?.token}`,
    };
    Axios.post(`/api/student/registration`, drData, { headers })
      .then((res) => {
        props.handleSuccessDailog()
        setState({
          ...state,
          isLoading: false,
          openAlertDailog: true,
        });
      })
      .catch((error) => console.log(error));
  };

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

    const photo = new FormData();
    photo.append("photo", imageAvaterFile);
    const nid = new FormData();
    nid.append("nid", imageNIDFile);

    const data = state.formData;
    data.hc_student_address = {
      upazila: data.address_upazila,
      district: data.address_district,
    };
    delete data.address_upazila;
    delete data.address_district;

    if (imageAvaterFile) {
      try {
        Axios.post(`api/file/avaterUpload/Student`, photo, { headers })
          .then((res) => {
            data.hc_student_avatar = res.data;
            if (imageNIDFile) {
              Axios.post(`api/file/avaterUpload/Doctor`, nid, { headers })
                .then((res) => {
                  data.hc_student_nid_pic = res.data
                  StudentRegistration(data);
                })
                .catch(err =>
                  setState({
                    ...state,
                    isLoading: false,
                  }))
            } else {
              StudentRegistration(data);
            }
          })
          .catch((err) => {
            console.log(err);
            setState({
              ...state,
              isLoading: false,
            });
          });
      } catch (error) {
        console.log("Add Student Faild");
        setState({
          ...state,
          isLoading: false,
        });
      }
    } else {
      StudentRegistration(data);
    }
  };

  const closeAlertDailog = () => {
    props.onSetOpenDailog();
    setState({
      ...state,
      openAlertDailog: false,
    });
  };
  const closeErrorDailog = () => {
    props.onSetOpenDailog();
    setState({
      ...state,
      openErrorDailog: false,
    });
  };

  const handleChange = (date) => {
    const month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    if (date !== null) {
      setState({
        ...state,
        date: date,
        formData: {
          ...state.formData,
          hc_student_date_of_birth: `${month[date.getMonth()]
            } ${date.getDate()} ${date.getFullYear()}`,
        },
      });
    } else {
      setState({
        ...state,
        date: date,
        formData: {
          ...state.formData,
          birthdate: date,
        },

        startDate: date,
      });
    }
  };
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      event.target.id == "hc_student_avatar"
        ? setimageAvaterFile(event.target.files[0])
        : setimageNIDFile(event.target.files[0]);
      event.target.id == "hc_student_avatar"
        ? (reader.onload = (e) => {
          setState({
            ...state,
            imageAvatar: e.target.result,
            htmlelementDoctorAvater: (
              <div className="addpersonpage">
                <img
                  className="netimage"
                  srcSet={e.target.result}
                  alt="profileImage"
                />
              </div>
            ),
          });
        })
        : (reader.onload = (e) => {
          setState({
            ...state,
            imageNID: e.target.result,
            htmlelementDoctorNID: (
              <div className="addpersonpage">
                <img
                  className="netimage"
                  srcSet={e.target.result}
                  alt="profileImage"
                />
              </div>
            ),
          });
        });
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const onImageRemove = (event) => {
    event.target.id == "hc_student_avatar"
      ? setState({
        ...state,
        imageAvaterfile: "",
        imageAvatar: "",
        htmlelementDoctorAvater: (
          <div className="addpersonpage">
            <i className="fa fa-user fa-8x" aria-hidden="true"></i>
          </div>
        ),
      })
      : setState({
        ...state,
        imageNIDfile: "",
        imageNID: "",
        htmlelementDoctorNID: (
          <div className="addpersonpage">
            <i className="fa fa-user fa-8x" aria-hidden="true"></i>
          </div>
        ),
      });
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

  useEffect(() => {
    setState({
      ...state,
      formData: {
        ...state.formData,
        hc_student_education: education,
      },
    });
  }, [education]);

  useEffect(() => {
    const data = {
      hc_student_email: state.formData.hc_student_email,
      hc_student_phoneno: state.formData.hc_student_phoneno
    }
    Axios.post(`../api/student/checkUser`, data)
      .then(res => setIsAvailable(false))
      .catch(err => setIsAvailable(true))
  }, [state.formData.hc_student_phoneno, state.formData.hc_student_email]);

  // Education
  const handleeducationInput = (e, index) => {
    const { name, value } = e.target;
    const list = [...education];
    list[index][name] = value;
    setEducation(list);
  };

  const removeeducation = (index) => {
    const list = [...education];
    list.splice(index, 1);
    setEducation(list);
  };

  const addeducation = () => {
    setEducation([...education, { degree: "", title: "" }]);
  };

  return (
    <div>
      {
        state.isLoading ? <div className="patientlistpage">
          <i className="fas fa-spinner fa-pulse fa-2x "></i>
        </div> : <>
          <h2>New Student</h2>
          <form onSubmit={handleSubmit}>
            <div className="first_section">
              <div className="form-row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="banglaname">Bangla name</label>
                  <input
                    name="hc_student_banglaName"
                    type="text"
                    className="form-control"
                    id="banglaName"
                    // value={props.formData.hc_doctor_banglaName}
                    onChange={onEdit}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="englishname">English name</label>
                  <input
                    name="hc_student_englishName"
                    type="text"
                    className="form-control"
                    //   value={props.formData.hc_doctor_englishName}
                    id="englishName"
                    onChange={onEdit}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="NIDno">NID No</label>
                  <input
                    name="hc_student_NID"
                    type="number"
                    className="form-control"
                    id="nidnumber"
                    //   value={props.formData.hc_doctor_NID}
                    onChange={onEdit}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="sex">Sex</label>
                  <select
                    name="hc_student_sex"
                    className="custom-select"
                    id="sex"
                    //   value={props.formData.hc_doctor_sex}
                    onChange={onEdit}
                    required
                  >
                    <option hidden>Select</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="birthdate">Birth Date</label>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                      style={{
                        padding: "0px 10px",
                        border: "1px solid rgb(197, 197, 197)",
                      }}
                      id="birthdate"
                      name="hc_student_date_of_birth"
                      className="  form-control"
                      InputProps={{
                        disableUnderline: true,
                      }}
                      placeholder={state.date}
                      value={state.date}
                      onChange={handleChange}
                      autoComplete="off"
                      format="dd/MM/yyyy"
                    />
                  </MuiPickersUtilsProvider>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="bloodgroup">Blood Group</label>
                  <select
                    name="hc_student_bloodGroup"
                    type="text"
                    className="form-control"
                    id="bloodgroup"
                    onChange={onEdit}
                  >
                    <option hidden>Select</option>
                    <option>A+</option>
                    <option>A-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>O+</option>
                    <option>O-</option>
                  </select>

                </div>
              </div>

              <div className="form-row">
                <div className="col-md-12 mb-3">
                  <label htmlFor="phonenumber">Mobile</label>
                  <input
                    name="hc_student_phoneno"
                    type="text"
                    className="form-control"
                    id="phonenumber"
                    //   value={props.formData.hc_doctor_phoneno}
                    //   disabled={props.formData.phoneDisable}
                    onChange={onEdit}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="col-6 mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="hc_student_email"
                    className="form-control"
                    id="email"
                    //   disabled={props.formData.emailDisable}
                    //   value={props.formData.hc_doctor_email}
                    onChange={onEdit}
                  />
                </div>
                <div className="col-6 mb-3">
                  <label htmlFor="relegion">Relegion</label>
                  <select
                    name="hc_student_relegion"
                    type="text"
                    className="form-control"
                    id="relegion"
                    onChange={onEdit}
                  >
                    <option hidden>Select</option>
                    <option>Islam</option>
                    <option>Hindu</option>
                    <option>Christian</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="col-6 mb-3">
                  <label htmlFor="bmdcRegNo">BMDC Reg No</label>
                  <input
                    type="number"
                    name="hc_student_BMDC_reg_no"
                    className="form-control"
                    id="bmdcRegNo"
                    onChange={onEdit}
                  />
                </div>
                <div className="col-6 mb-3">
                  <label htmlFor="email">Session</label>
                  <input
                    type="text"
                    name="hc_student_session"
                    className="form-control"
                    id="email"
                    //   disabled={props.formData.emailDisable}
                    //   value={props.formData.hc_doctor_email}
                    onChange={onEdit}
                  />
                </div>
              </div>

              <label htmlFor="address">Address</label>
              <div className="form-row">
                <div className="col-6 mb-3">
                  {/* <label htmlFor="validationDefault05">Upazila</label> */}
                  <input
                    name="address_upazila"
                    placeholder="Upazila"
                    type="text"
                    className="form-control"
                    id="upazila"
                    onChange={onEdit}
                  />
                </div>
                <div className="col-6 mb-3">
                  {/* <label htmlFor="validationDefault05">District</label> */}
                  <input
                    name="address_district"
                    placeholder="District"
                    type="text"
                    className="form-control"
                    id="district"
                    //   value={props.formData.address_district}
                    onChange={onEdit}
                  />
                </div>
              </div>

              <label htmlFor="address">Education</label>
              <div className="form-row">
                {education.map((x, i) => {
                  return (
                    <div key={i} className="">
                      <div className="d-flex">
                        <p className="mt-2">{i + 1}</p>

                        <div className="row">
                          <div className="col-5">
                            <input
                              id="address"
                              className="form-control w-100"
                              name="degree"
                              placeholder="Degree"
                              value={x.degree}
                              onChange={(e) => handleeducationInput(e, i)}
                            />
                          </div>
                          <div className="col-5">
                            <input
                              className="form-control w-100"
                              name="title"
                              placeholder="Title"
                              value={x.title}
                              onChange={(e) => handleeducationInput(e, i)}
                            />
                          </div>
                          <div className="col-2 d-flex">
                            {" "}
                            <div className="row">
                              <div className="col-6">
                                {education.length !== 1 && (
                                  <button
                                    className={Styles.pastHisremoveButton}
                                    onClick={() => removeeducation(i)}
                                  >
                                    <i
                                      className="fa fa-trash"
                                      aria-hidden="true"
                                    ></i>
                                  </button>
                                )}
                              </div>

                              <div className="col-6">
                                {education.length - 1 === i && (
                                  <button
                                    type="button"
                                    //className="btn btn-success"
                                    className={Styles.pastHisaddButton}
                                    onClick={addeducation}
                                  >
                                    <i
                                      className="fa fa-plus"
                                      aria-hidden="true"
                                    ></i>
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="container">
              <div>
                <div className="row second_section">
                  <div className="col-6">
                    <div className="row">
                      <div className="clo-12">
                        <div className="profileimage">
                          {state.htmlelementDoctorAvater}
                        </div>
                      </div>
                      <div className="col-12 btn_section">
                        <label htmlFor="hc_student_avatar" className="selectimage">
                          Upload Student Avatar
                        </label>
                        <input
                          id="hc_student_avatar"
                          type="file"
                          onChange={onImageChange}
                        />
                        <button
                          type="button"
                          id="hc_student_avatar"
                          className="removebutton"
                          onClick={onImageRemove}
                        >
                          {" "}
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="row">
                      <div className="clo-12">
                        <div className="profileimage ">
                          {state.htmlelementDoctorNID}
                        </div>
                      </div>
                      <div className="col-12 btn_section">
                        <label htmlFor="hc_student_nid_pic" className="selectimage">
                          Upload NID Image
                        </label>
                        <input
                          id="hc_student_nid_pic"
                          type="file"
                          onChange={onImageChange}
                        />
                        <button
                          type="button"
                          id="hc_student_nid_pic"
                          className="removebutton"
                          onClick={onImageRemove}
                        >
                          {" "}
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button className="btn btn-success savebtn" type="submit" disabled={isAvailable}>
              Register
            </button>
          </form>
        </>
      }
    </div>
  );
};

export default NewStudentRegister;
