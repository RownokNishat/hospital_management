import React, { useEffect, useState } from "react";
import Styles from "../DoctorProfile/DoctorProfile.module.css";
import "../DoctorProfile/DoctorProfile.css";
import Axios from "axios";
import { useSelector } from "react-redux";
import AlertDialogBox from "../../DailogBoxes/alertdailogbox";
import ErorrDialogBox from "../../DailogBoxes/errordaologbox";
import { Link } from "react-router-dom";
import FormPrompt from "../../DailogBoxes/formprompt";
import StudentProfileUpdate from "./StudentProfileUpdate";

const StudentProfile = () => {
  const [isLoading, setisLoading] = useState(true);
  const [doctorState, setDoctorState] = useState(null);
  const auth = useSelector((state) => state.AuthReducer);
  const [openConfirmDailog, setopenConfirmDailog] = useState(false);
  const [state, setState] = useState({
    isLoading: true,
    isCloseBtnAppear: true,
    openFormDailog: false,
    openAlertDailog: false,
    openErrorDailog: false,
    openConfirmDailog: false,
    openProfileFormDailog: false,
    openCompanyFormDailog: false,
    openCompanyAlertDailog: false,
  });
  const [note, setNote] = useState("");

  const doctorData = () => {
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${auth.token}`,
    };

    try {
      Axios.get(`../api/getProfileDetails`, { headers })
        .then((res) => {
          setDoctorState(res.data?._student);
          console.log(res.data?._student);
          setisLoading(false);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    doctorData();
  }, []);

  const closeAlertDailog = () => {
    setState({
      ...state,
      openAlertDailog: false,
    });
  };
  const closeErrorDailog = () => {
    setState({
      ...state,
      openErrorDailog: false,
    });
  };

  const handleCompanySuccessDailog = () => {
    setState({
      ...state,
      openCompanyFormDailog: false,
      openCompanyAlertDailog: true,
    });
  };

  const handleCompanyErrorDailog = () => {
    setopenConfirmDailog(false);
    setState({
      ...state,
      openCompanyFormDailog: false,
      openConfirmDailog: false,
      openErrorDailog: true,
    });
  };

  const closeCompanyFormDailog = () => {
    setState({
      ...state,
      openCompanyFormDailog: false,
    });
  };

  const closeCompanyAlertDailog = () => {
    setState({
      ...state,
      openCompanyAlertDailog: false,
    });
  };

  const setCloseBtnAppear = () => {
    setState({
      ...state,
      isCloseBtnAppear: false,
    });
  };
  return (
    <>
      {isLoading ? (
        <div className="doctorsListpage">
          <i className="fas fa-spinner fa-pulse fa-2x "></i>
        </div>
      ) : (
        <div>
          <AlertDialogBox
            openDailog={state.openAlertDailog}
            onSetOpenDailog={closeAlertDailog}
            // title="Added"
            des="Update successfully !!!"
          ></AlertDialogBox>
          <ErorrDialogBox
            openDailog={state.openErrorDailog}
            onSetOpenDailog={closeErrorDailog}
            title="Error"
            des="Someting went wrong. Please Try again"
          ></ErorrDialogBox>

          <AlertDialogBox
            openDailog={state.openCompanyAlertDailog}
            onSetOpenDailog={closeCompanyAlertDailog}
            title="Added"
            des="Company has been updated sccessfully"
          ></AlertDialogBox>

          <FormPrompt
            openDailog={state.openCompanyFormDailog}
            title="Student Profile Update"
            onSetOpenDailog={closeCompanyFormDailog}
            isCloseBtnAppear={state.isCloseBtnAppear}
          >
            <StudentProfileUpdate
              doctorState={doctorState}
              setCloseBtnAppear={setCloseBtnAppear}
              handleSuccessDailog={handleCompanySuccessDailog}
              handleErrorDailog={handleCompanyErrorDailog}
              collectionName="Companies"
              id="company_id"
            ></StudentProfileUpdate>
          </FormPrompt>

          <div className={Styles.topheader}>
            <ul>
              <li>
                <i
                  className="fa fa-arrow-circle-o-right fa-2x text-muted"
                  aria-hidden="true"
                ></i>
              </li>
              <li>
                <h5>Student Profile</h5>
              </li>
            </ul>
          </div>
          <hr></hr>
          <div className={Styles.gridContainer}>
            <div className=" border-end">
              <div>
                <img
                  src={doctorState?.hc_student_avatar}
                  alt="Profile"
                  style={{ height: "200px", width: "300px" }}
                ></img>
              </div>
              <div className=" mt-2">
                <h3 className={Styles.ProfileDescription}>
                  {doctorState?.hc_student_englishName}
                </h3>
              </div>
              <div className="row">
                <div className="col-5">
                  <p className={Styles.ProfileDescription}>Reg. No</p>
                </div>
                <div className="col-7">
                  <p className={Styles.ProfileDescription}>
                    : {doctorState?.hc_student_BMDC_reg_no}
                  </p>
                </div>

                <div className="col-5">
                  <p className={Styles.ProfileDescription}>Education</p>
                </div>
                <div className="col-7">
                  <p className={Styles.ProfileDescription}>
                    :
                    {doctorState?.hc_student_education?.map(
                      (item,index) => item.degree + " (" + item.title + ")" + ((index+1)< doctorState?.hc_student_education?.length ? ", ":"")
                    )}
                  </p>
                </div>

                <div className="col-5">
                  <p className={Styles.ProfileDescription}>Address</p>
                </div>
                <div className="col-7">
                  <p className={Styles.ProfileDescription}>
                    {" "}
                    :{doctorState?.hc_student_address?.upazila},{" "}
                    {doctorState?.hc_student_address?.district}
                  </p>
                </div>

                <div className="col-5">
                  <p className={Styles.ProfileDescription}>Contact</p>
                </div>
                <div className="col-7">
                  <p className={Styles.ProfileDescription}>
                    : {doctorState?.hc_student_phoneno}
                  </p>
                </div>

                <div className="col-5">
                  <p
                    style={{ marginTop: "12px" }}
                    className={Styles.ProfileDescription}
                  >
                    Hospital:{" "}
                  </p>
                </div>
                <div className="col-7">
                  <div className={Styles.ProfileDescription}>
                    <div className=" d-flex mb-3">
                      <div style={{ width: "80px", height: "50px" }}>
                        <img
                          className="w-100"
                          src={doctorState?.hc_hospitalID?.hc_hospital_logo}
                        ></img>
                      </div>
                      <h5>
                        {doctorState?.hc_hospitalID?.hc_hospital_english_name}
                      </h5>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-warning border-rounded btn-sm mt-3"
                  onClick={() => {
                    setState({
                      ...state,
                      openCompanyFormDailog: true,
                    });
                  }}
                >
                  Update Profile
                </button>
              </div>
              <hr />
            </div>
            <div className="">
              <div className="d-flex justify-content-end me-5">
                <button className="btn btn-warning btn-sm ">
                  <Link
                    style={{
                      textDecoration: "none",
                    }}
                    to="/studentPrescription"
                  >
                    {" "}
                    <i
                      className="fa fa-prescription"
                      aria-hidden="true"
                    ></i>{" "}
                    &nbsp; Write Prescription
                  </Link>
                </button>
              </div>

              <div className="mt-5">
                <h5>Prescription and Diagnosis</h5>
                <table className="table table-striped ">
                  <thead className="thead tablehead thead-dark">
                    <tr>
                      <th scope="col">No</th>

                      <th scope="col">Diagnosis</th>
                      <th scope="col">Prescription</th>
                    </tr>
                  </thead>
                  {doctorState?.hc_student_write_prescription?.reverse().map(
                    (item, index) => {
                      return (
                        <tbody key={item?.prescriptionID?._id}>
                          <tr>
                            <td data-label="No"> {index + 1}</td>

                            <td
                              data-label="Diagnosis"
                              className="align-middle d-flex"
                            >
                              {item.prescriptionID?.Diagnosis?.map((item) => (
                                <p key={item._id}>{item.diagonosis}</p>
                              ))}
                            </td>
                            <td data-label="Prescription">
                              <Link
                                to={`std_prescription/${item.prescriptionID?._id}`}
                              >
                                <button className="btn btn-warning btn-sm">
                                  Prescription
                                </button>
                              </Link>
                            </td>
                          </tr>
                        </tbody>
                      );
                    }
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentProfile;
