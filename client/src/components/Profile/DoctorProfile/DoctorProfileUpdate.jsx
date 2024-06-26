import Styles from "../../PersonDetails/NewDoctorDetailsForm.module.css";
import React, { useState, useEffect } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import "../../PersonDetails/newpersondetailsform.css";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { hospitalDoctors } from "../../../redux/reducers/hospital/hospitalAction";
import "react-datepicker/dist/react-datepicker.css";

const DoctorProfileUpdate = (props) => {
  const [doctor, setDoctor] = useState(null);
  const [imageChanged, setimageChanged] = useState(false);
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const auth = useSelector((state) => state.AuthReducer);
  const [isLoading, setisLoading] = useState(false);

  const headers = {
    "Content-Type": "application/json",
    authorization: `Bearer ${auth.token}`,
  };

  useEffect(() => {
    Axios.get(`api/getProfileDetails`, { headers })
      .then((res) => {
        setDoctor(res.data?.doctor);
        setImage(res.data.doctor?.hc_doctor_avatar);
      })
      .catch((error) => console.log(error));
  }, []);

  const updateDoctorProfileInfo = (doctor) => {
    Axios.post(`api/doctor/updateDoctorProfileInfo`, doctor, { headers })
      .then((res) => {
        setisLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setisLoading(true);
    if (imageChanged) {
      const file = new FormData();
      file.append("photo", imageFile);
      const data = { ...doctor };
      Axios.post(`../api/file/avaterUpload/Doctor`, file, { headers })
        .then((res) => {
          data.hc_doctor_avatar = res.data;
          updateDoctorProfileInfo(data);
        })
        .catch((err) => console.log(err));
    } else {
      updateDoctorProfileInfo(doctor);
    }
  };

  const onEdit = (e) => {
    setDoctor({
      ...doctor,
      [e.target.name]: e.target.value,
    });
  };

  // Education
  const handleeducationInput = (e, index) => {
    const { name, value } = e.target;
    const list = [...doctor?.hc_doctor_education];
    list[index][name] = value;
    setDoctor({
      ...doctor,
      hc_doctor_education: list,
    });
  };

  const removeeducation = (index) => {
    const list = [...doctor?.hc_doctor_education];
    list.splice(index, 1);
    setDoctor({
      ...doctor,
      hc_doctor_education: list,
    });
  };

  const addeducation = () => {
    const list = [...doctor?.hc_doctor_education];
    list.push({ degree: "", title: "" });
    setDoctor({
      ...doctor,
      hc_doctor_education: list,
    });
  };

  //Course Done
  const handlecourseDoneInput = (e, index) => {
    const { name, value } = e.target;
    const list = [...doctor?.hc_doctor_course_done];
    list[index][name] = value;
    setDoctor({
      ...doctor,
      hc_doctor_course_done: list,
    });
  };

  const removecourseDone = (index) => {
    const list = [...doctor?.hc_doctor_course_done];
    list.splice(index, 1);
    setDoctor({
      ...doctor,
      hc_doctor_course_done: list,
    });
  };

  const addcourseDone = () => {
    const list = [...doctor?.hc_doctor_course_done];
    list.push({ degree: "", title: "" });
    setDoctor({
      ...doctor,
      hc_doctor_course_done: list,
    });
  };

  // Consultant
  const handleConsultantInput = (e, index) => {
    const { name, value } = e.target;
    const list = [...doctor?.hc_doctor_consultant];
    list[index][name] = value;
    setDoctor({
      ...doctor,
      hc_doctor_consultant: list,
    });
  };

  const addConsultant = () => {
    const list = [...doctor?.hc_doctor_consultant];
    list.push({ consultant: "" });
    setDoctor({
      ...doctor,
      hc_doctor_consultant: list,
    });
  };

  const removeConsultant = (index) => {
    const list = [...doctor?.hc_doctor_consultant];
    list.splice(index, 1);
    setDoctor({
      ...doctor,
      hc_doctor_consultant: list,
    });
  };
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setimageChanged(true);
      setImageFile(event.target.files[0]);
      let reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  const onEditAddress = (e) => {
    setDoctor({
      ...doctor,
      hc_doctor_address: {
        [e.target.name]: e.target.value,
      },
    });
  };
  const handleChange = (date) => {
    const birthDate = new Date(date);
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
    setDoctor({
      ...doctor,
      hc_doctor_date_of_birth: `${month[birthDate.getMonth()]
        } ${birthDate.getDate()} ${birthDate.getFullYear()}`,
    });
  };
  const onImageRemove = (e) => {
    setImage(null);
  };

  return (
    <>
      {isLoading ? (
        <div className="patientlistpage">
          <i className="fas fa-spinner fa-pulse fa-2x "></i>
        </div>
      ) : (
        <>
          <div className="editd_person_details_formpage">
            <div className="container main_section">
              <div className="topheader">
                <ul>
                  <li>
                    <i
                      className="fa fa-arrow-circle-o-right fa-2x"
                      aria-hidden="true"
                    ></i>
                  </li>
                  <li>
                    <h5>Update Doctor Profile</h5>
                  </li>
                </ul>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-8 first_section">
                  <form onSubmit={handleSubmit}>
                    <div className="form-row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="hc_doctor_banglaName">
                          Bangla name <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          name="hc_doctor_banglaName"
                          type="text"
                          className="form-control"
                          id="hc_doctor_banglaName"
                          required
                          value={doctor?.hc_doctor_banglaName}
                          onChange={onEdit}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="hc_doctor_englishName">
                          English name <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          name="hc_doctor_englishName"
                          type="text"
                          className="form-control"
                          id="hc_doctor_englishName"
                          value={doctor?.hc_doctor_englishName}
                          onChange={onEdit}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="col-md-4 mb-3">
                        <label htmlFor="hc_doctor_relegion">Relegion</label>
                        <select
                          name="hc_doctor_relegion"
                          type="text"
                          className="form-control"
                          id="hc_doctor_relegion"
                          value={doctor?.hc_doctor_relegion}
                          onChange={onEdit}
                        >
                          <option hidden> Select</option>
                          <option>Islam</option>
                          <option>Hindu</option>
                          <option>Christian</option>
                        </select>
                      </div>
                      <div className="col-md-4 mb-3">
                        <label htmlFor="hc_doctor_sex">Sex <span style={{ color: "red" }}>*</span></label>
                        <select
                          name="hc_doctor_sex"
                          className="custom-select"
                          id="hc_doctor_sex"
                          value={doctor?.hc_doctor_sex}
                          onChange={onEdit}
                          required
                        >
                          <option hidden>Select</option>
                          <option>Male</option>
                          <option>Female</option>
                          <option>other</option>
                        </select>
                      </div>
                      <div className="col-md-4 mb-3">
                        <label htmlFor="hc_doctor_bloodGroup">
                          Blood Group
                        </label>
                        <select
                          name="hc_doctor_bloodGroup"
                          type="text"
                          className="form-control"
                          id="hc_doctor_bloodGroup"
                          value={doctor?.hc_doctor_bloodGroup}
                          onChange={onEdit}
                        >
                          <option hidden> Select</option>
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
                      <div className="col-md-6 mb-3">
                        <label htmlFor="hc_doctor_phoneno">Mobile <span style={{ color: "red" }}>*</span></label>
                        <input
                          disabled
                          name="hc_doctor_phoneno"
                          type="number"
                          className="form-control"
                          id="hc_doctor_phoneno"
                          value={doctor?.hc_doctor_phoneno}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="hc_doctor_email">Email Address <span style={{ color: "red" }}>*</span></label>
                        <input
                          disabled
                          name="hc_doctor_email"
                          type="text"
                          className="form-control"
                          id="hc_doctor_email"
                          value={doctor?.hc_doctor_email}
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="hc_doctor_date_of_birth">
                          Birth Date
                        </label>

                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <DatePicker
                            style={{
                              padding: "0px 10px",
                              border: "1px solid rgb(197, 197, 197)",
                            }}
                            id="hc_doctor_date_of_birth"
                            name="hc_doctor_date_of_birth"
                            className="  form-control"
                            InputProps={{
                              disableUnderline: true,
                            }}
                            selected={doctor?.hc_doctor_date_of_birth}
                            value={doctor?.hc_doctor_date_of_birth}
                            onChange={handleChange}
                            autoComplete="off"
                            format="dd/MM/yyyy"
                          />
                        </MuiPickersUtilsProvider>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="hc_doctor_serial_no">Serial No </label>
                        <input
                          name="hc_doctor_serial_no"
                          type="text"
                          className="form-control"
                          id="hc_doctor_serial_no"
                          value={doctor?.hc_doctor_serial_no}
                          onChange={onEdit}
                        />
                      </div>
                    </div>
                    <label htmlFor="address">Address</label>
                    <div className="form-row">
                      <div className="col-md-6 mb-3">
                        <input
                          name="upazila"
                          placeholder="Upazila"
                          type="text"
                          className="form-control"
                          id="upazila"
                          value={doctor?.hc_doctor_address?.upazila}
                          onChange={onEditAddress}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <input
                          name="district"
                          placeholder="District"
                          type="text"
                          className="form-control"
                          id="district"
                          value={doctor?.hc_doctor_address?.district}
                          onChange={onEditAddress}
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="hc_doctor_medicale_name">
                          Work Place <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          name="hc_doctor_medicale_name"
                          type="text"
                          className="form-control"
                          id="hc_doctor_medicale_name"
                          value={doctor?.hc_doctor_medicale_name}
                          onChange={onEdit}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="hc_doctor_specialist">Specialist <span style={{ color: "red" }}>*</span></label>
                        <input
                          name="hc_doctor_specialist"
                          type="text"
                          className="form-control"
                          id="hc_doctor_specialist"
                          value={doctor?.hc_doctor_specialist}
                          onChange={onEdit}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="hc_doctor_BMDC_reg_no">
                          BMDC Reg No <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          name="hc_doctor_BMDC_reg_no"
                          type="text"
                          className="form-control"
                          id="hc_doctor_BMDC_reg_no"
                          value={doctor?.hc_doctor_BMDC_reg_no}
                          disabled
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="hc_doctor_FELLOW_id">Fellow id <span style={{ color: "red" }}>*</span></label>
                        <input
                          name="hc_doctor_FELLOW_id"
                          type="text"
                          className="form-control"
                          id="hc_doctor_FELLOW_id"
                          value={doctor?.hc_doctor_FELLOW_id}
                          disabled
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="col mb-3">
                        <label htmlFor="jobtitle">Job Title</label>
                        <input
                          type="text"
                          name="hc_doctor_job_title"
                          className="form-control"
                          id="jobtitle"
                          value={doctor?.hc_doctor_job_title}
                          onChange={onEdit}
                        />
                      </div>
                    </div>
                    {/* Education */}
                    <label htmlFor="Education">Education <span style={{ color: "red" }}>*</span></label>
                    <div className="form-row">
                      {doctor?.hc_doctor_education.map((x, i) => {
                        return (
                          <div key={i} className="">
                            <div className="d-flex">
                              <p className="mt-2">{i + 1}</p>

                              <div className="row">
                                <div className="col-5">
                                  <input
                                    id="Education"
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
                                      {doctor?.hc_doctor_education.length !==
                                        1 && (
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
                                      {doctor?.hc_doctor_education.length -
                                        1 ===
                                        i && (
                                          <button
                                            type="button"
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
                    {/* Course Done */}

                    <label htmlFor="address">Course Done <span style={{ color: "red" }}>*</span></label>
                    <div className="form-row">
                      {doctor?.hc_doctor_course_done.map((x, i) => {
                        return (
                          <div key={i} className="">
                            <div className="d-flex">
                              <p className="mt-2">{i + 1}</p>

                              <div className="row">
                                <div className="col-5">
                                  <input
                                    className="form-control w-100"
                                    name="degree"
                                    placeholder="Degree"
                                    value={x.degree}
                                    onChange={(e) =>
                                      handlecourseDoneInput(e, i)
                                    }
                                  />
                                </div>
                                <div className="col-5">
                                  <input
                                    className="form-control w-100"
                                    name="title"
                                    placeholder="Title"
                                    value={x.title}
                                    onChange={(e) =>
                                      handlecourseDoneInput(e, i)
                                    }
                                  />
                                </div>
                                <div className="col-2 d-flex">
                                  {" "}
                                  <div className="row">
                                    <div className="col-6">
                                      {doctor?.hc_doctor_course_done.length !==
                                        1 && (
                                          <button
                                            className={Styles.pastHisremoveButton}
                                            onClick={(e) => {
                                              e.preventDefault();
                                              removecourseDone(i);
                                            }}
                                          >
                                            <i
                                              className="fa fa-trash"
                                              aria-hidden="true"
                                            ></i>
                                          </button>
                                        )}
                                    </div>

                                    <div className="col-6">
                                      {doctor?.hc_doctor_course_done.length -
                                        1 ===
                                        i && (
                                          <button
                                            type="button"
                                            className={Styles.pastHisaddButton}
                                            onClick={addcourseDone}
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

                    {/* Consultant */}

                    <label htmlFor="address">Consultant <span style={{ color: "red" }}>*</span></label>
                    <div className="form-row">
                      {doctor?.hc_doctor_consultant.map((x, i) => {
                        return (
                          <div key={i} className="">
                            <div className="d-flex">
                              <p className="mt-2">{i + 1}</p>

                              <div className="row">
                                <div className="col-8">
                                  <input
                                    className="form-control w-100"
                                    name="consultant"
                                    placeholder="Consultant"
                                    value={x.consultant}
                                    onChange={(e) =>
                                      handleConsultantInput(e, i)
                                    }
                                  />
                                </div>

                                <div className="col-4 d-flex">
                                  {" "}
                                  <div className="row">
                                    <div className="col-6">
                                      {doctor?.hc_doctor_consultant.length !==
                                        1 && (
                                          <button
                                            className={Styles.pastHisremoveButton}
                                            onClick={(e) => {
                                              e.preventDefault();
                                              removeConsultant(i);
                                            }}
                                          >
                                            <i
                                              className="fa fa-trash"
                                              aria-hidden="true"
                                            ></i>
                                          </button>
                                        )}
                                    </div>

                                    <div className="col-6">
                                      {doctor?.hc_doctor_consultant.length -
                                        1 ===
                                        i && (
                                          <button
                                            type="button"
                                            className={Styles.pastHisaddButton}
                                            onClick={addConsultant}
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

                    <button
                      className="btn btn-success update_btn"
                      type="submit"
                    >
                      Update
                    </button>
                  </form>
                </div>
                <div className="col-sm-4 second_section">
                  <div className="profileimage">
                    <div className="addpersonpage">
                      <img
                        className="netimage"
                        srcSet={image}
                        alt="profileImage"
                      />
                    </div>
                  </div>
                  <div className="btn_section">
                    <label htmlFor="files" className="selectimage">
                      Upload Image
                    </label>
                    <input
                      name="avatarimage"
                      id="files"
                      type="file"
                      onChange={onImageChange}
                    />
                    <button
                      type="button"
                      className="removebutton"
                      onClick={onImageRemove}
                    >
                      {" "}
                      Remove
                    </button>
                  </div>
                  <input id="files" type="file" onChange={onImageChange} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DoctorProfileUpdate;
