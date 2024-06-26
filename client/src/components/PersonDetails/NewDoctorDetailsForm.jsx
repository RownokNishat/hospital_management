import React, { useState, useEffect } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import "./newpersondetailsform.css";
import Styles from "./NewDoctorDetailsForm.module.css";

const NewDoctorDetailsForm = (props) => {
  const [date, setDate] = useState(null);
  const today = (date) => {
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1; // Months start at 0!
    let dd = date.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    setDate(dd + "/" + mm + "/" + yyyy);
  };

  useEffect(() => {
    today(new Date());
  }, []);

  
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="first_section">
        <div className="form-row">
          <div className="col-md-6 mb-3">
            <label htmlFor="banglaname">Bangla name <span style={{ color: "red" }}>*</span></label>
            <input
              name="hc_doctor_banglaName"
              type="text"
              className="form-control"
              id="banglaName"
              // value={props.formData.hc_doctor_banglaName}
              onChange={props.onEdit}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="englishname">English name<span style={{ color: "red" }}>*</span></label>
            <input
              name="hc_doctor_englishName"
              type="text"
              className="form-control"
              value={props.formData.hc_doctor_englishName}
              id="englishName"
              onChange={props.onEdit}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-6 mb-3">
            <label htmlFor="NIDno">NID No<span style={{ color: "red" }}>*</span></label>
            <input
              name="hc_doctor_NID"
              type="text"
              className="form-control"
              id="nidnumber"
              value={props.formData.hc_doctor_NID}
              onChange={props.onEdit}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="sex">Sex<span style={{ color: "red" }}>*</span></label>
            <select
              name="hc_doctor_sex"
              className="custom-select"
              id="sex"
              value={props.formData.hc_doctor_sex}
              onChange={props.onEdit}
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
            <label htmlFor="birthdate">Birth Date<span style={{ color: "red" }}>*</span></label>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                style={{
                  padding: "0px 10px",
                  border: "1px solid rgb(197, 197, 197)",
                }}
                id="birthdate"
                name="hc_doctor_date_of_birth"
                className="  form-control"
                InputProps={{
                  disableUnderline: true,
                }}
                placeholder={date}
                value={props.date}
                onChange={props.handleChange}
                autoComplete="off"
                format="dd/MM/yyyy"
              />
            </MuiPickersUtilsProvider>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="bloodgroup">Blood Group</label>
            <select
              name="hc_doctor_bloodGroup"
              type="text"
              className="form-control"
              id="bloodgroup"
              onChange={props.onEdit}
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

            {/* <input
              name="bloodgroup"
              type="text"
              className="form-control"
              id="bloodgroup"
              onChange={props.onEdit}
            /> */}
          </div>
        </div>

        <div className="form-row">
          <div className="col-md-12 mb-3">
            <label htmlFor="phonenumber">Mobile<span style={{ color: "red" }}>*</span></label>
            <input
              name="hc_doctor_phoneno"
              type="text"
              className="form-control"
              id="phonenumber"
              value={props.formData.hc_doctor_phoneno}
              disabled={props.formData.phoneDisable}
              onChange={props.onEdit}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-12 mb-3">
            <label htmlFor="email">Email<span style={{ color: "red" }}>*</span></label>
            <input
              type="email"
              name="hc_doctor_email"
              className="form-control"
              id="email"
              disabled={props.formData.emailDisable}
              value={props.formData.hc_doctor_email}
              onChange={props.onEdit}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="col-6 mb-3">
            <label htmlFor="relegion">Relegion<span style={{ color: "red" }}>*</span></label>
            <select
              name="hc_doctor_relegion"
              type="text"
              className="form-control"
              id="relegion"
              onChange={props.onEdit}
            >
              <option hidden>Select</option>
              <option>Islam</option>
              <option>Hindu</option>
              <option>Christian</option>
            </select>
          </div>

          <div className="col-6 mb-3">
            <label htmlFor="serialNo">Serial No</label>
            <input
              type="number"
              name="hc_doctor_serial_no"
              className="form-control"
              id="serialNo"
              value={props.formData.hc_doctor_serial_no}
              onChange={props.onEdit}
            />
          </div>
        </div>

        <label htmlFor="address">Address<span style={{ color: "red" }}>*</span></label>
        <div className="form-row">
          <div className="col-6 mb-3">
            {/* <label htmlFor="validationDefault05">Upazila</label> */}
            <input
              name="address_upazila"
              placeholder="Upazila"
              type="text"
              className="form-control"
              id="upazila"
              value={props.formData.address_upazila}
              onChange={props.onEdit}
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
              value={props.formData.address_district}
              onChange={props.onEdit}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="col-6 mb-3">
            <label htmlFor="medicalname">Work Place</label>
            <input
              type="text"
              name="hc_doctor_medicale_name"
              className="form-control"
              id="medicalName"
              value={props.formData.hc_doctor_medicale_name}
              onChange={props.onEdit}
            />
          </div>

          <div className="col-6 mb-3">
            <label htmlFor="specialist">Specialist</label>
            <input
              type="text"
              name="hc_doctor_specialist"
              className="form-control"
              id="specialist"
              value={props.formData.hc_doctor_specialist}
              onChange={props.onEdit}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="col-6 mb-3">
            <label htmlFor="bmdcRegNo">BMDC Reg No<span style={{ color: "red" }}>*</span></label>
            <input
              type="number"
              name="hc_doctor_BMDC_reg_no"
              className="form-control"
              id="bmdcRegNo"
              value={props.formData.hc_doctor_BMDC_reg_no}
              onChange={props.onEdit}
            />
          </div>

          <div className="col-6 mb-3">
            <label htmlFor="fellowID">Fellow id</label>
            <input
              type="number"
              name="hc_doctor_FELLOW_id"
              className="form-control"
              id="fellowId"
              value={props.formData.hc_doctor_FELLOW_id}
              onChange={props.onEdit}
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
              value={props.formData.hc_doctor_job_title}
              onChange={props.onEdit}
            />
          </div>
        </div>

        <label htmlFor="address">Education</label>
        <div className="form-row">
          {props.education.map((x, i) => {
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
                        onChange={(e) => props.handleeducationInput(e, i)}
                      />
                    </div>
                    <div className="col-5">
                      <input
                        className="form-control w-100"
                        name="title"
                        placeholder="Title"
                        value={x.title}
                        onChange={(e) => props.handleeducationInput(e, i)}
                      />
                    </div>
                    <div className="col-2 d-flex">
                      {" "}
                      <div className="row">
                        <div className="col-6">
                          {props.education.length !== 1 && (
                            <button
                              className={Styles.pastHisremoveButton}
                              onClick={() =>props.removeeducation(i)}
                            >
                              <i className="fa fa-trash" aria-hidden="true"></i>
                            </button>
                          )}
                        </div>

                        <div className="col-6">
                          {props.education.length - 1 === i && (
                            <button
                              type="button"
                              //className="btn btn-success"
                              className={Styles.pastHisaddButton}
                              onClick={props.addeducation}
                            >
                              <i className="fa fa-plus" aria-hidden="true"></i>
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

        <label htmlFor="address">Course Done</label>
        <div className="form-row">
          {props.courseDone.map((x, i) => {
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
                        onChange={(e) =>props.handlecourseDoneInput(e, i)}
                      />
                    </div>
                    <div className="col-5">
                      <input
                        className="form-control w-100"
                        name="title"
                        placeholder="Title"
                        value={x.title}
                        onChange={(e) => props.handlecourseDoneInput(e, i)}
                      />
                    </div>
                    <div className="col-2 d-flex">
                      {" "}
                      <div className="row">
                        <div className="col-6">
                          {props.courseDone.length !== 1 && (
                            <button
                              className={Styles.pastHisremoveButton}
                              onClick={() => props.removecourseDone(i)}
                            >
                              <i className="fa fa-trash" aria-hidden="true"></i>
                            </button>
                          )}
                        </div>

                        <div className="col-6">
                          {props.courseDone.length - 1 === i && (
                            <button
                              type="button"
                              //className="btn btn-success"
                              className={Styles.pastHisaddButton}
                              onClick={props.addcourseDone}
                            >
                              <i className="fa fa-plus" aria-hidden="true"></i>
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

        <label htmlFor="address">Consultant</label>
        <div className="form-row">
          {props.consultant.map((x, i) => {
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
                        onChange={(e) => props.handleConsultantInput(e, i)}
                      />
                    </div>
                    
                    <div className="col-4 d-flex">
                      {" "}
                      <div className="row">
                        <div className="col-6">
                          {props.consultant.length !== 1 && (
                            <button
                              className={Styles.pastHisremoveButton}
                              onClick={() => props.removeConsultant(i)}
                            >
                              <i className="fa fa-trash" aria-hidden="true"></i>
                            </button>
                          )}
                        </div>

                        <div className="col-6">
                          {props.consultant.length - 1 === i && (
                            <button
                              type="button"
                              //className="btn btn-success"
                              className={Styles.pastHisaddButton}
                              onClick={props.addConsultant}
                            >
                              <i className="fa fa-plus" aria-hidden="true"></i>
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
                  <div className="profileimage">{props.htmlelementDoctorAvater}</div>
                </div>
                <div className="col-12 btn_section">
                  <label htmlFor="hc_doctor_avatar" className="selectimage">
                    Upload Doctor Avatar<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    id="hc_doctor_avatar"
                    type="file"
                    onChange={props.onImageChange}
                  />
                  <button
                    type="button"
                    id="hc_doctor_avatar"
                    className="removebutton"
                    onClick={props.onImageRemove}
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
                  <div className="profileimage ">{props.htmlelementDoctorNID}</div>
                </div>
                <div className="col-12 btn_section">
                  <label htmlFor="hc_doctor_nid_pic" className="selectimage">
                    Upload NID Image
                  </label>
                  <input
                    id="hc_doctor_nid_pic"
                    type="file"
                    onChange={props.onImageChange}
                  />
                  <button
                    type="button"
                    id="hc_doctor_nid_pic"
                    className="removebutton"
                    onClick={props.onImageRemove}
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

      <button className="btn btn-success savebtn" type="submit">
        Save
      </button>
    </form>
  );
};

export default NewDoctorDetailsForm;
