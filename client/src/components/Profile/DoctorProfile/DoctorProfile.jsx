import React, { useEffect, useState } from "react";
import Styles from "./DoctorProfile.module.css";
import "./DoctorProfile.css";
import Axios from "axios";
import { useSelector } from "react-redux";
import FormPrompt from "../../DailogBoxes/formprompt";
import DoctorEditProfile from "./DoctorEditProfile";
import AlertDialogBox from "../../DailogBoxes/alertdailogbox";
import ErorrDialogBox from "../../DailogBoxes/errordaologbox";
import { Link } from "react-router-dom";
import DoctorProfileUpdate from "./DoctorProfileUpdate";

const DoctorProfile = () => {
  const [isLoading, setisLoading] = useState(true);
  const [doctorPrescription, setDoctorPrescription] = useState([]);
  const [doctorState, setDoctorState] = useState(null);
  const auth = useSelector((state) => state.AuthReducer);
  const [state, setState] = useState({
    isLoading: true,
    isCloseBtnAppear: true,
    openFormDailog: false,
    openAlertDailog: false,
    openErrorDailog: false,
    openConfirmDailog: false,
    openProfileFormDailog: false,
  });

  const headers = {
    "Content-Type": "application/json",
    authorization: `Bearer ${auth.token}`,
  };

  const doctorData = () => {
    try {
      Axios.get(`api/getProfileDetails`, { headers })
        .then((res) => {
          doctorDetails(res.data?.doctor);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };
  const doctorDetails = (data) => {
    const diff = Date.now() - new Date(data.hc_doctor_date_of_birth).getTime();
    const age = new Date(diff).getUTCFullYear() - 1970;
    data.age = age;
    setDoctorState(data);
    setisLoading(false);
    setDoctorPrescription(data.hc_doctor_write_prescription.reverse());
  };

  useEffect(() => {
    doctorData();
  }, []);

  const handleSuccessDailog = () => {
    setState({
      ...state,
      openFormDailog: false,
      openProfileFormDailog: false,
      openAlertDailog: true,
    });
  };
  const handleErrorDailog = () => {
    // setopenConfirmDailog(false);
    setState({
      ...state,
      openFormDailog: false,
      openProfileFormDailog: false,
      // openConfirmDailog: false,
      openErrorDailog: true,
    });
  };
  const closeFormDailog = () => {
    setState({
      ...state,
      openFormDailog: false,
      openProfileFormDailog: false,
    });
  };
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
  const setCloseBtnAppear = () => {
    setState({
      ...state,
      isCloseBtnAppear: false,
    });
  };

  const onEdit = (value, index) => {
    const noteData = [...doctorPrescription];
    noteData[index].prescriptionID.Note = value;
    setDoctorPrescription(noteData);

    const data = {
      prescriptionID: noteData[index].prescriptionID._id,
      note: doctorPrescription[index].prescriptionID.Note,
    };
    Axios.post(`../api/doctor/prescriptionNote`, data, { headers })
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

          {/* Doctor hospital log update form */}
          <FormPrompt
            openDailog={state.openFormDailog}
            title="Update Hospital Log"
            onSetOpenDailog={closeFormDailog}
            isCloseBtnAppear={state.isCloseBtnAppear}
          >
            <DoctorEditProfile
              openDailog={state.openFormDailog}
              updateData={doctorState?.hc_doctor_of_hospital}
              updateDoctorFees={doctorState?.hc_doctor_fees}
              setCloseBtnAppear={setCloseBtnAppear}
              handleSuccessDailog={handleSuccessDailog}
              handleErrorDailog={handleErrorDailog}
              onSetOpenDailog={closeFormDailog}
              collectionName="doctors"
              id="doctorid"
            ></DoctorEditProfile>
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
                <h5>Doctor Profile</h5>
              </li>
            </ul>
          </div>
          <hr></hr>
          <div className={Styles.gridContainer}>
            <div className=" border-end">
              <div>
                <img
                  src={doctorState.hc_doctor_avatar}
                  alt="Profile"
                  style={{ height: "200px", width: "300px" }}
                ></img>
              </div>
              <div className=" mt-2">
                <h5 className={Styles.ProfileDescription}>
                  {doctorState.hc_doctor_englishName}
                </h5>
              </div>
              <div className="row">
                <div className="col-5">
                  <p className={Styles.ProfileDescription}>BMDC reg No</p>
                </div>
                <div className="col-7">
                  <p className={Styles.ProfileDescription}>
                    : {doctorState.hc_doctor_BMDC_reg_no}
                  </p>
                </div>

                <div className="col-5">
                  <p className={Styles.ProfileDescription}>Age</p>
                </div>
                <div className="col-7">
                  <p className={Styles.ProfileDescription}>
                    : {doctorState.age}
                  </p>
                </div>

                <div className="col-5">
                  <p className={Styles.ProfileDescription}>Education</p>
                </div>
                <div className="col-7">
                  <p className={Styles.ProfileDescription}>
                    :
                    {doctorState.hc_doctor_education.map(
                      (i) => i.degree + " (" + i.title + ") "
                    )}
                  </p>
                </div>

                {doctorState?.hc_doctor_consultant ? (
                  <>
                    <div className="col-5">
                      <p className={Styles.ProfileDescription}>Consultant</p>
                    </div>
                    <div className="col-7">
                      <p className={Styles.ProfileDescription}>
                        :
                        {doctorState?.hc_doctor_consultant.map((i, index) => (
                          <p>
                            {i?.consultant}
                            {index + 1 <
                            doctorState?.hc_doctor_consultant?.length
                              ? ","
                              : ""}
                          </p>
                        ))}
                      </p>
                    </div>
                  </>
                ) : null}

                <div className="col-5">
                  <p className={Styles.ProfileDescription}>Address</p>
                </div>
                <div className="col-7">
                  <p className={Styles.ProfileDescription}>
                    {" "}
                    :{doctorState?.hc_doctor_address?.upazila}
                    {doctorState?.hc_doctor_address?.upazila ? "," : ""}
                    {doctorState?.hc_doctor_address?.district}
                  </p>
                </div>

                <div className="col-5">
                  <p className={Styles.ProfileDescription}>Contact</p>
                </div>
                <div className="col-7">
                  <p className={Styles.ProfileDescription}>
                    : {doctorState.hc_doctor_phoneno}
                  </p>
                </div>

                <div className="d-flex">
                  <button
                    className="btn btn-warning btn-sm me-5"
                    onClick={() => {
                      setState({
                        ...state,
                        openFormDailog: true,
                      });
                    }}
                  >
                    Update Hospital Log
                  </button>

                  <Link to={`/editDoctorProfile`}>
                    <button className="btn btn-warning btn-sm">
                      Update Profile
                    </button>
                  </Link>
                </div>
              </div>
              <hr />
            </div>
            <div className="">
              {/* <div className={Styles.searchDiv}>
                <div className="">
                  <div className={Styles.search}>
                    <input
                      id="searchText"
                      type="text"
                      className={Styles.searchTerm}
                      placeholder="At first select option"
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
              </div> */}

              <div className="mt-5">
                <h5>Prescription and Diagnosis</h5>
                <table className="table table-striped ">
                  <thead className="thead tablehead thead-dark">
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Patient Name</th>
                      <th scope="col">Diagnosis</th>
                      <th scope="col">Date</th>
                      <th scope="col">Prescription</th>
                      <th scope="col">Note</th>
                    </tr>
                  </thead>
                  {doctorPrescription.map((item, index) => {
                    const date= new Date(item.prescriptionID?.createdAt)
                    return (
                      <tbody key={item.prescriptionID._id}>
                        <tr>
                          <td data-label="No"> {index + 1}</td>
                          <td data-label="Patient Name">
                            {
                              item.prescriptionID.patientId
                                ?.hc_patient_firstName
                            }
                            &nbsp;
                            {item.prescriptionID.patientId?.hc_patient_lastName}
                          </td>
                          <td data-label="Date">
                            {`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`}
                          </td>
                          <td data-label="Diagnosis">
                            {item.prescriptionID?.Diagnosis.map((it, index) => (
                              <span key={it?._id}>
                                {it?.diagonosis}{" "}
                                {index + 1 <
                                item?.prescriptionID?.Diagnosis?.length
                                  ? ","
                                  : ""}
                              </span>
                            ))}
                          </td>

                          <td data-label="Prescription">
                            <Link
                              to={`patientPrescription/${item.prescriptionID._id}`}
                            >
                              <button className="btn btn-warning btn-sm">
                                Prescription
                              </button>
                            </Link>
                          </td>
                          <td data-label="Note">
                            <textarea
                              className="ms-3 noteInput"
                              // className="form-control form-control-sm mb-3"
                              name="note"
                              value={item.prescriptionID?.Note}
                              onChange={(e) => onEdit(e.target.value, index)}
                              rows="2"
                              cols="40"
                            ></textarea>
                            {/* <input
                              className="ms-3 noteInput"
                             type="text"
                              min="100"
                              max="500"
                              step="10"
                              name="note"
                              value={item.prescriptionID?.Note}
                              onChange={(e) => onEdit(e.target.value, index)}
                            /> */}
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DoctorProfile;
