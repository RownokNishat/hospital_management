import React from "react";
import "./NewHospitalRegister.css";
import Styles from '../PersonDetails/NewDoctorDetailsForm.module.css'

const NewHospitalRegister = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="first_section">
        <div className="form-row">
          <div className="col-md-6 mb-3">
            <label htmlFor="Banglaname">Hospital Bangla Name</label>
            <input
              name="hc_hospital_bangla_name"
              type="text"
              className="form-control"
              id="HospitalBanglaName"
              onChange={props.onEdit}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="englishName">Hospital English Name</label>
            <input
              name="hc_hospital_english_name"
              type="text"
              className="form-control"
              id="HospitalEnglishName"
              onChange={props.onEdit}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-6 mb-3">
            <label htmlFor="DGHSno">DGHS reg no</label>
            <input
              name="hc_hospital_DGHS_reg_no"
              type="text"
              className="form-control"
              id="DGHSno"
              onChange={props.onEdit}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="ContactNo">Contact No</label>
            <input
              name="hc_hospital_contact_no"
              type="text"
              className="form-control"
              id="contactNo"
              onChange={props.onEdit}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="col-md-12 mb-3">
            <label htmlFor="phonenumber">Mobile No</label>
            <input
              name="hc_hospital_phoneno"
              type="text"
              className="form-control"
              id="phonenumber"
              onChange={props.onEdit}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-12 mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="hc_hospital_email"
              className="form-control"
              id="email"
              onChange={props.onEdit}
            />
          </div>
        </div>

        <label htmlFor="address">Ambulance Contact No</label>
        <div className="form-row">
          {props.ambulance.map((x, i) => {
            return (
              <div key={i} className="">
                <div className="d-flex">
                  <p className="mt-2">{i + 1}</p>

                  <div className="row">
                    <div className="col-9">
                      <input
                        id="ambulanceNo"
                        className="form-control w-100"
                        name="ambulanceNo"
                        placeholder="Ambulance Contact No"
                        value={x.ambulanceNo}
                        onChange={(e) => props.handleAmbulanceNoInput(e, i)}
                      />
                    </div>
                    
                    <div className="col-3 d-flex">
                      {" "}
                      <div className="row">
                        <div className="col-6">
                          {props.ambulance.length !== 1 && (
                            <button
                              className={Styles.pastHisremoveButton}
                              onClick={() =>props.removeAmbulanceNo(i)}
                            >
                              <i className="fa fa-trash" aria-hidden="true"></i>
                            </button>
                          )}
                        </div>

                        <div className="col-6">
                          {props.ambulance.length - 1 === i && (
                            <button
                              type="button"
                              //className="btn btn-success"
                              className={Styles.pastHisaddButton}
                              onClick={props.addAmbulanceNo}
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

        <div className="form-row"></div>
        <label htmlFor="address">Address</label>
        <div className="form-row">
          <div className="col-6 mb-3">
            {/* <label htmlFor="validationDefault05">District</label> */}
            <input
              name="upazila"
              placeholder="upazila"
              type="text"
              className="form-control"
              id="upazila"
              onChange={props.onEdit}
            />
          </div>

          <div className="col-6 mb-3">
            {/* <label htmlFor="validationDefault05">Upazila</label> */}
            <input
              name="district"
              placeholder="district"
              type="text"
              className="form-control"
              id="district"
              onChange={props.onEdit}
            />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row second_section">
          <div className="col-12">
            <div className="profileimage">{props.htmlelement}</div>
          </div>
          <div className="col-12 btn_section">
            <label htmlFor="files" className="selectimage">
              Upload Image
            </label>
            <input
              name="hc_patient_avatar"
              id="files"
              type="file"
              onChange={props.onImageChange}
            />
            <button
              type="button"
              className="removebutton"
              onClick={props.onImageRemove}
            >
              {" "}
              Remove
            </button>
          </div>
        </div>
      </div>
      <button className="btn btn-success savebtn" type="submit" disabled={props.isAvailable}>
        Register
      </button>
    </form>
  );
};

export default NewHospitalRegister;
