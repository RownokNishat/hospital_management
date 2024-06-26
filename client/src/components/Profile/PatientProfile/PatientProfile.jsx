import React, { useEffect, useState } from "react";
import Styles from "./PatientProfile.module.css";
import { useSelector } from "react-redux";
import Axios from "axios";
import "./PatientProfile.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const PatientProfile = () => {
  const [isLoading, setisLoading] = useState(true);
  const [patientState, setpatientState] = useState(null);
  const [diagnosisTestReport, setDiagnosisTestReport] = useState(null);
  const auth = useSelector((state) => state.AuthReducer);
  const [review, setReview] = useState(null);
  const { patientID } = useParams();

  const headers = {
    "Content-Type": "application/json",
    authorization: `Bearer ${auth.token}`,
  };

  const doctorData = () => {
    const uri = patientID
      ? `/api/getProfileDetails/${patientID}`
      : `../api/getProfileDetails`;
    try {
      Axios.get(uri, { headers }).then((res) => {
        patientDetails(res.data?.patient);
        setDiagnosisTestReport(res.data?.patient?.hc_patient_testReport);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const patientDetails = (data) => {
    const diff = Date.now() - new Date(data.hc_patient_date_of_birth).getTime();
    const age = new Date(diff).getUTCFullYear() - 1970;
    data.age = age;
    data.hc_patient_prescription.reverse();
    setpatientState(data);
    setisLoading(false);
    setReview(data.hc_patient_prescription);
  };

  useEffect(() => {
    doctorData();
  }, []);

  const [search, setSeacrh] = useState(null);

  const searchBoxText = (text) => {
    if (text == "prescription") {
      document.getElementById("searchText").placeholder =
        "Search prescription you want";
    }
    if (text == "diagnostic_report") {
      document.getElementById("searchText").placeholder =
        "Search diagnostic report you want";
    }
  };

  const onEdit = (value, index) => {
    const uri = `/api/patient/updatePatientPrescriptionReview`;
    const reviewData = [...review];
    reviewData[index].prescriptionID.Review = parseInt(value);
    setReview(reviewData);

    const data = {
      prescriptionID: reviewData[index].prescriptionID._id,
      review: parseInt(value),
    };
    Axios.post(uri, data, { headers })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <>
      {isLoading ? (
        <div className="doctorsListpage">
          <i className="fas fa-spinner fa-pulse fa-2x "></i>
        </div>
      ) : (
        <>
          <div className="">
            <div className={Styles.topheader}>
              <ul>
                <li>
                  <i
                    className="fa fa-arrow-circle-o-right fa-2x text-muted"
                    aria-hidden="true"
                  ></i>
                </li>
                <li>
                  <h5>Patient Profile</h5>
                </li>
              </ul>
            </div>
            <hr></hr>
            <div className={Styles.gridContainer}>
              <div className=" border-end">
                <div>
                  {patientState?.hc_patient_avatar ? (
                    <img
                      src={patientState.hc_patient_avatar}
                      alt="Profile"
                      style={{ height: "200px", width: "300px" }}
                    />
                  ) : (
                    <img
                      src={
                        patientState.hc_patient_sex === "Male"
                          ? "https://res.cloudinary.com/dddjw2ios/image/upload/v1667396229/Health%20Care/Patient/maleuser.jgp_ytfank.jpg"
                          : "https://res.cloudinary.com/dddjw2ios/image/upload/v1667396228/Health%20Care/Patient/femaleUser_hbpgnm.jpg"
                      }
                      alt="Profile"
                      style={{ height: "200px", width: "300px" }}
                    />
                  )}
                </div>
                <div className=" mt-2">
                  <h3 className={Styles.ProfileDescription}>
                    {patientState.hc_patient_firstName}{" "}
                    {patientState.hc_patient_lastName}
                  </h3>
                </div>
                <div className="row">
                  {/* <div className="col-5"><p className={Styles.ProfileDescription}>Id</p></div>
                    <div className="col-7"><p className={Styles.ProfileDescription}>: {patientState._id}</p> </div> */}

                  <div className="col-5">
                    <p className={Styles.ProfileDescription}>Gender</p>
                  </div>
                  <div className="col-7">
                    <p className={Styles.ProfileDescription}>
                      : {patientState.hc_patient_sex}
                    </p>
                  </div>

                  <div className="col-5">
                    <p className={Styles.ProfileDescription}>Age</p>
                  </div>
                  <div className="col-7">
                    <p className={Styles.ProfileDescription}>
                      : {patientState.age}
                    </p>
                  </div>

                  {patientState.hc_patient_occupation == "" ? (
                    ""
                  ) : (
                    <>
                      <div className="col-5">
                        <p className={Styles.ProfileDescription}>Occupation</p>
                      </div>
                      <div className="col-7">
                        <p className={Styles.ProfileDescription}>
                          : {patientState?.hc_patient_occupation}
                        </p>
                      </div>
                    </>
                  )}
                  <div className="col-5">
                    <p className={Styles.ProfileDescription}>Blood Group</p>
                  </div>
                  <div className="col-7">
                    <p className={Styles.ProfileDescription}>
                      : {patientState.hc_patient_bloodGroup}
                    </p>
                  </div>
                  {patientState?.hc_patient_address?.upazila == "" ? (
                    ""
                  ) : (
                    <>
                      <div className="col-5">
                        <p className={Styles.ProfileDescription}>Address</p>
                      </div>
                      <div className="col-7">
                        <p className={Styles.ProfileDescription}>
                          :{patientState?.hc_patient_address?.upazila}{" "}
                          {patientState?.hc_patient_address?.district}
                        </p>
                      </div>
                    </>
                  )}
                  <div className="col-5">
                    <p className={Styles.ProfileDescription}>Contact</p>
                  </div>
                  <div className="col-7">
                    <p className={Styles.ProfileDescription}>
                      : {patientState.hc_patient_phoneno}
                    </p>
                  </div>
                  {auth.role === "Patient" ? (
                    <div>
                      <Link to={`editpersondetails/${auth.UID}`}>
                        <button className="btn btn-warning btn-sm">
                          Update Profile
                        </button>
                      </Link>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <hr />
              </div>
              <div className="">
                <div className={Styles.searchDiv}>
                  <div className="">
                    <div className={Styles.search}>
                      <input
                        id="searchText"
                        type="text"
                        className={Styles.searchTerm}
                        placeholder="At first, select option"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                          }
                        }}
                        onChange={(e) => {}}
                      />

                      <button type="submit" className={Styles.searchButton}>
                        <i className="fa fa-search"></i>
                      </button>
                    </div>
                  </div>
                  <div>
                    <select
                      className="form-select bg-info searchSelectOption dropdown-toggle "
                      aria-haspopup="true"
                      aria-expanded="false"
                      onClick={(e) => {
                        searchBoxText(e.target.value);
                        setSeacrh(e.target.value);
                      }}
                      // style={{ width: "190px" }}
                    >
                      <option hidden>Search</option>
                      <option value="prescription">Prescription</option>
                      <option value="diagnostic_report">
                        Diganostic Report
                      </option>
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <h3>Prescription History</h3>
                  <table className="table table-striped mx-auto table-container">
                    <thead className="thead tablehead thead-dark">
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">Doctor Name</th>
                        <th scope="col">Date</th>
                        <th scope="col">Diagnosis</th>
                        <th scope="col">Prescription</th>
                        {auth.role == "Patient" ? (
                          <th scope="col">Review</th>
                        ) : (
                          <></>
                        )}
                        {auth.role == "Doctor" ? (
                          <th scope="col">Edit</th>
                        ) : (
                          <></>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {patientState?.hc_patient_prescription.map(
                        (item, index) => {
                          const date = new Date(item.prescriptionID?.createdAt);
                          return (
                            <tr key={index}>
                              <td data-label="No"> {index + 1}</td>

                              <td
                                data-label="Prescription Link"
                                className="align-middle"
                              >
                                <img
                                  className="image"
                                  alt=""
                                  srcSet={
                                    item.prescriptionID.doctorId
                                      .hc_doctor_avatar
                                  }
                                />{" "}
                                &nbsp;&nbsp;
                                {
                                  item.prescriptionID.doctorId
                                    .hc_doctor_englishName
                                }
                              </td>
                              <td data-label="Date" className="align-middle">
                                {date.getDate()}/{date.getMonth() + 1}/
                                {date.getFullYear()}{" "}
                              </td>

                              <td
                                data-label="Diagnosis"
                                className="align-middle"
                              >
                                {item.prescriptionID?.Diagnosis.map((i, no) => {
                                  return (
                                    <span key={no}>
                                      {i.diagonosis}
                                      {no + 1 <
                                      item.prescriptionID?.Diagnosis?.length
                                        ? ", "
                                        : " "}{" "}
                                    </span>
                                  );
                                })}
                              </td>

                              <td
                                data-label="Prescription Link"
                                className="align-middle"
                              >
                                <Link
                                  style={{ textDecoration: "none" }}
                                  to={`/patientPrescription/${item.prescriptionID?._id}`}
                                >
                                  <b>Prescription</b>
                                </Link>
                              </td>

                              {auth.role == "Patient" ? (
                                <td data-label="Review">
                                  {" "}
                                  <select
                                    className="form-select bg-info dropdown-toggle mb-2"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    value={item.prescriptionID.Review}
                                    onChange={(e) =>
                                      onEdit(e.target.value, index)
                                    }
                                    style={{ width: "150px" }}
                                  >
                                    <option hidden>Review</option>
                                    <option value="3">Cured</option>
                                    <option value="2">Improved</option>
                                    <option value="1">Not improved</option>
                                  </select>
                                </td>
                              ) : (
                                <></>
                              )}
                              {auth.role == "Doctor" &&
                              item.prescriptionID.doctorId._id == auth.UID ? (
                                <td data-label="Edit" className="align-middle">
                                  {" "}
                                  <Link
                                    style={{ textDecoration: "none" }}
                                    to={`/editPrescription/${patientID}/${item.prescriptionID?._id}`}
                                  >
                                    <b>Edit</b>
                                  </Link>
                                </td>
                              ) : (
                                <></>
                              )}
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="mt-5">
                  <h3>Diagnostic Test History</h3>
                  <table className="table table-striped ">
                    <thead className="thead tablehead thead-dark">
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">Hospital Name</th>
                        <th scope="col">Date</th>
                        <th scope="col">Test Name</th>
                        <th scope="col">Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      {diagnosisTestReport?.map((item, index) => {
                        const date = new Date(item.testReport?.createdAt);
                        return (
                          <tr key={index}>
                            <td data-label="No"> {index + 1}</td>
                            <td data-label="Hospital Name">
                              <img
                                className="image"
                                alt=""
                                srcSet={
                                  item.testReport.hospitalID.hc_hospital_logo
                                }
                              />{" "}
                              &nbsp;&nbsp;
                              {
                                item.testReport.hospitalID
                                  .hc_hospital_english_name
                              }
                            </td>
                            <td data-label="Date">
                              {date.getDate()}/{date.getMonth() + 1}/
                              {date.getFullYear()}{" "}
                            </td>
                            <td data-label="Test Name">
                              {" "}
                              {item.testReport.testName}
                            </td>
                            <td
                              data-label="Result"
                              className="pe-auto viewReportButton"

                              // onClick={() =>
                              //   window.open(item?.testReport?.webViewLink)
                              // }
                            >
                              <a
                                href={item?.testReport?.webViewLink}
                                target="_blank"
                              >
                                View Report
                              </a>
                            </td>
                            {/* <td
                              data-label="Result"
                              className="pe-auto"
                              style={{
                                cursor: 'pointer'
                              }}
                              onClick={() =>
                                window.open(item.testReport.webViewLink)
                              }
                            >
                              <b className="pe-auto">View Report</b>
                            </td> */}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PatientProfile;
