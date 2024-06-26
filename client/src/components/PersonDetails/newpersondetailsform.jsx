import React, { useState, useEffect } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import "./newpersondetailsform.css";
import { useSelector } from "react-redux";

const NewPersonDetailsForm = (props) => {
  const role = useSelector((state) => state?.AuthReducer?.role);
  const [date, setDate] = useState(null);
  const today = (date) => {
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1; // Months start at 0!
    let dd = date.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    setDate(dd + '/' + mm + '/' + yyyy)
  }

  useEffect(() => {
    today(new Date())
  }, []);

  return (
    <form onSubmit={props.handleSubmit}>
      <div className="first_section">
        <div className="form-row">
          <div className="col-md-6 mb-3">
            <label htmlFor="firstname">First name <span style={{ color: "red" }}>*</span></label>
            <input
              name="hc_patient_firstName"
              type="text"
              className="form-control"
              id="firstname"
              onChange={props.onEdit}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="lastname">Last name <span style={{ color: "red" }}>*</span></label>
            <input
              name="hc_patient_lastName"
              type="text"
              className="form-control"
              id="lastname"
              onChange={props.onEdit}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-6 mb-3">
            <label htmlFor="sex">Sex <span style={{ color: "red" }}>*</span></label>
            <select
              name="hc_patient_sex"
              className="custom-select"
              id="sex"
              onChange={props.onEdit}
              required
            >
              <option hidden>Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div className="col-md-6 mb-3">
            {
              role == "Doctor" || role == "Hospital" ?
                <>
                  <label htmlFor="occupation">Occupation</label>
                  <input
                    name="hc_patient_occupation"
                    type="text"
                    className="form-control"
                    id="occupation"
                    onChange={props.onEdit}
                  />
                </> : <>
                  <label htmlFor="relegion">Relegion <span style={{ color: "red" }}>*</span></label>
                  <select
                    name="hc_patient_relegion"
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
                </>
            }

          </div>
        </div>

        <div className="form-row">
          <div className="col-md-6 mb-3">
            <label htmlFor="birthdate">Birth Date <span style={{ color: "red" }}>*</span></label>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                style={{
                  padding: "0px 10px",
                  border: "1px solid rgb(197, 197, 197)",
                }}
                id="birthdate"
                name="hc_patient_date_of_birth"
                className="  form-control"
                InputProps={{
                  disableUnderline: true,
                }}
                maxDate={new Date()}
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
              name="hc_patient_bloodGroup"
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
          </div>
        </div>

        {
          role == "Doctor" || role == "Hospital" ?
            <>
              <div className="form-row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="relegion">Relegion<span style={{ color: "red" }}>*</span></label>
                  <select
                    name="hc_patient_relegion"
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
                <div className="col-md-6 mb-3">
                  <label htmlFor="marital_status">Marital Status</label>
                  <select
                    name="hc_patient_marital_status"
                    className="custom-select"
                    id="marital_status"
                    onChange={props.onEdit}
                  >
                    <option hidden>Select</option>
                    <option>Married</option>
                    <option>Unmarried</option>
                  </select>
                </div>
              </div>
            </> : <></>
        }

        <label htmlFor="address">Address<span style={{ color: "red" }}>*</span></label>
        <div className="form-row">
          <div className="col-md-4 mb-3">
            <select
              name="address_city"
              className="custom-select"
              id="city"
              onChange={props.onEdit}
            >
              <option hidden>Division</option>
              {props.data.map(item => {
                return (<option key={item.Division} value={item.Division}>{item.Division}</option>);
              })}
            </select>
          </div>
          <div className="col-md-4 mb-3">

            <select
              name="address_district"
              className="custom-select"
              id="city"
              onChange={props.onEdit}
            >
              <option hidden>District</option>
              {
                props.selectDivision?.length == 1 ? props.selectDivision[0].District.map(item => {
                  return <option key={item} value={item}>{item}</option>
                }) : null
              }

            </select>
          </div>

          <div className="col-md-4 mb-3">
            {/* <label htmlFor="validationDefault05">Upazila</label> */}
            <input
              name="address_upazila"
              placeholder='Upazila'
              type="text"
              className="form-control"
              id="upazila"
              onChange={props.onEdit}
            />
          </div>
        </div>

        {
          role == "Doctor" || role == "Hospital" ?
            <>
              <div className="form-row">
                <div className="col-md-12 mb-3">
                  <label htmlFor="phonenumber">Mobile</label>
                  <input
                    name="hc_patient_phoneno"
                    type="text"
                    className="form-control"
                    id="phonenumber"
                    onChange={props.onEdit}
                    required
                  />
                </div>
              </div>
            </> : <>
              <div className="form-row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="phonenumber">Mobile</label>
                  <input
                    name="hc_patient_phoneno"
                    type="text"
                    className="form-control"
                    id="phonenumber"
                    onChange={props.onEdit}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="marital_status">Marital Status</label>
                  <select
                    name="hc_patient_marital_status"
                    className="custom-select"
                    id="marital_status"
                    onChange={props.onEdit}
                  >
                    <option hidden>Select</option>
                    <option>Married</option>
                    <option>Unmarried</option>
                  </select>
                </div>
              </div>
            </>
        }

        {
          role == "Doctor" || role == "Hospital" ?
            <></> : <>
              <div className="form-row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="password">Password <span style={{ color: "red" }}>*</span></label>
                  <input
                    name="hc_patient_password"
                    type="password"
                    className="form-control"
                    id="password"
                    onChange={props.onEdit}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="RetypePassword">Re-type password <span style={{ color: "red" }}>*</span></label>
                  <input
                    name="hc_patient_retypePassword"
                    type="password"
                    className="form-control"
                    id="RetypePassword"
                    onChange={props.onEdit}
                  />
                </div>
              </div>
            </>
        }

      </div>
      {
        role == "Doctor" || role == "Hospital" ?
          <>
            <div className="container">
              <div className="row second_section">
                <div className="clo-sm-6">
                  <div className="profileimage">{props.htmlelement}</div>
                </div>
                <div className="col-sm-6 btn_section">
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
          </> : <></>
      }
      <button
        className="btn btn-success savebtn"
        type="submit"
        disabled={props.hasPhoneNo == 200 && props.checkpass ? false : true} >
        {role == "Doctor" || role == "Hospital" ? "Save" : "Register"}
      </button>
    </form>
  );
}

export default NewPersonDetailsForm;
