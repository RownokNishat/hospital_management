import React, { useState, useEffect } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import "./editpersondetailsform.css";
import Reports from "./reports";

const EditPersonDetailsForm = (props) => {
  return (
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
              <h5>{props.collectionName}</h5>
            </li>
          </ul>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-8 first_section">
            <form onSubmit={props.handleSubmit}>
              <div className="form-row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="hc_patient_firstName">First name</label>
                  <input
                    name="hc_patient_firstName"
                    type="text"
                    className="form-control"
                    id="hc_patient_firstName"
                    required
                    value={props.personDetails?.hc_patient_firstName}
                    onChange={props.onEdit}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="hc_patient_lastName">Last name</label>
                  <input
                    name="hc_patient_lastName"
                    type="text"
                    className="form-control"
                    id="hc_patient_lastName"
                    value={props.personDetails?.hc_patient_lastName}
                    onChange={props.onEdit}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="hc_patient_sex">Sex</label>
                  <select
                    name="hc_patient_sex"
                    className="custom-select"
                    id="hc_patient_sex"
                    value={props.personDetails?.hc_patient_sex}
                    onChange={props.onEdit}
                    required
                  >
                    <option hidden>Select</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>other</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="hc_patient_occupation">Occupation</label>
                  <input
                    name="hc_patient_occupation"
                    type="text"
                    className="form-control"
                    id="hc_patient_occupation"
                    value={props.personDetails?.hc_patient_occupation}
                    onChange={props.onEdit}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="hc_patient_date_of_birth">Birth Date</label>

                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                      style={{
                        padding: "0px 10px",
                        border: "1px solid rgb(197, 197, 197)",
                      }}
                      id="hc_patient_date_of_birth"
                      name="hc_patient_date_of_birth"
                      className="  form-control"
                      selected={props.personDetails?.hc_patient_date_of_birth}
                      InputProps={{
                        disableUnderline: true,
                      }}
                      value={props.personDetails?.hc_patient_date_of_birth}
                      onChange={props.handleChange}
                      autoComplete="off"
                      format="dd/MM/yyyy"
                    />
                  </MuiPickersUtilsProvider>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="hc_patient_bloodGroup">Blood Group</label>
                  <select
                    name="hc_patient_bloodGroup"
                    type="text"
                    className="form-control"
                    id="hc_patient_bloodGroup"
                    value={props.personDetails?.hc_patient_bloodGroup}
                    onChange={props.onEdit}
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
                  <label htmlFor="hc_patient_phoneno">Mobile</label>
                  <input
                    disabled
                    name="hc_patient_phoneno"
                    type="number"
                    className="form-control"
                    id="hc_patient_phoneno"
                    value={props.personDetails?.hc_patient_phoneno}
                    onChange={props.onEdit}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="hc_patient_marital_status">Marital Status</label>
                  <select
                    name="hc_patient_marital_status"
                    className="custom-select"
                    id="hc_patient_marital_status"
                    value={props.personDetails?.hc_patient_marital_status}
                    onChange={props.onEdit}
                  >
                    <option hidden>Select</option>
                    <option>Married</option>
                    <option>Unmarried</option>
                  </select>
                </div>
              </div>
              {/* <label htmlFor="address">Address</label>
              <div className="form-row">
                <div className="col-md-4 mb-3">
                  <select
                    name="address_city"
                    className="custom-select"
                    id="city"
                    onChange={(e) => setdiviion(e.target.value)}
                  >
                    <option hidden>Division</option>
                    {data.map(item => {
                      return (<option key={item.Division} value={item.Division}>{item.Division}</option>);
                    })}
                  </select>
                </div> 
                <div className="col-md-4 mb-3">

                  <select
                    name="address_district"
                    className="custom-select"
                    id="address_district"
                    value={props.personDetails.hc_patient_address?.district}
                    onChange={props.onEditAddress}
                  >
                    <option hidden>District</option>
                    {
                      district?.length == 1 ? district[0].District.map(item => {
                        return <option key={item} value={item}>{item}</option>
                      }) : null
                    }

                  </select>
                </div>

                <div className="col-md-4 mb-3">
                  <input
                    name="address_upazila"
                    placeholder='Upazila'
                    type="text"
                    className="form-control"
                    id="upazila"
                    value={props.personDetails.hc_patient_address?.upazila}
                    onChange={props.onEditAddress}
                  />
                </div>
              </div> */}
              <button className="btn btn-success update_btn" type="submit">
                Update
              </button>

            </form>
          </div>
          <div className="col-sm-4 second_section">
            <div className="profileimage">
              <div className="addpersonpage">
                <img
                  className="netimage"
                  srcSet={props.personDetails?.hc_patient_avatar}
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
            <input id="files" type="file" onChange={props.onImageChange} />
          </div>
        </div>
        {props?.collectionName === "patient" ? (
          <div className="thrid_section">
            <Reports personDetails={props.personDetails}></Reports>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default EditPersonDetailsForm;
