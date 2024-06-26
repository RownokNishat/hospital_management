import React, { useState, useEffect } from "react";
import Styles from "./Notifications.module.css";
import ShowAppoinmentDetails from "../ShowAppoinmentDetails/ShowAppoinmentDetails";
import FormPrompt from "../../DailogBoxes/formprompt";
import AlertDialogBox from "../../DailogBoxes/alertdailogbox";
import ErorrDialogBox from "../../DailogBoxes/errordaologbox";
import { useHistory } from "react-router-dom";
import Axios from 'axios'
import { useSelector } from "react-redux";

const Notifications = (props) => {
  const auth = useSelector((state) => state.AuthReducer);
  const [Notification, setNotification] = useState([]);
  const [state, setState] = useState({
    serachText: "",
    isLoading: true,
    isCloseBtnAppear: true,
    openFormDailog: false,
    openAlertDailog: false,
    openErrorDailog: false,
    openConfirmDailog: false,
    notificationID: "",
  });

  const headers = {
    "Content-Type": "application/json",
    authorization: `Bearer ${auth.token}`,
  };

  const history = useHistory();

  const handleSuccessDailog = (data) => {
    setState({
      ...state,
      openFormDailog: false,
      openAlertDailog: true,
      message: ``,
    });
  };
  const handleErrorDailog = () => {
    setState({
      ...state,
      openFormDailog: false,
      openConfirmDailog: false,
      openErrorDailog: true,
    });
  };
  const closeFormDailog = () => {
    setState({
      ...state,
      openFormDailog: false,
    });
  };

  const setCloseBtnAppear = () => {
    setState({
      ...state,
      isCloseBtnAppear: false,
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
  const handleClick = (prescriptionID) => {
    history.push(`/patientPrescription/${prescriptionID}`);
    window.location.reload(true);
  };
  const handleApprove = (id, hc_appoinmentDate, hc_doctorId, hc_hospitalID, hc_patientID, visitingSlot) => {
    const data = { id, hc_appoinmentDate, hc_doctorId, hc_hospitalID, hc_patientID, visitingSlot }
    Axios.put('/api/appointment/approve_Appointment', data, { headers })
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  };

  useEffect(() => {
    setNotification(props.notification)
  }, [props.notification]);


  console.log(Notification)

  return (
    <div
      className={Styles.notificationDiv}
      onClick={props.showNotification(Notification)}
    >
      <AlertDialogBox
        openDailog={state.openAlertDailog}
        onSetOpenDailog={closeAlertDailog}
        title="Request Send Successfully"
        des={state.message}
      ></AlertDialogBox>
      <ErorrDialogBox
        openDailog={state.openErrorDailog}
        onSetOpenDailog={closeErrorDailog}
        title="Error"
        des="Someting went wrong. Try again"
      ></ErorrDialogBox>

      <FormPrompt
        openDailog={state.openFormDailog}
        title="Appoinment Details"
        onSetOpenDailog={closeFormDailog}
        isCloseBtnAppear={state.isCloseBtnAppear}
      >
        <ShowAppoinmentDetails
          openDailog={state.openFormDailog}
          setCloseBtnAppear={setCloseBtnAppear}
          handleSuccessDailog={handleSuccessDailog}
          handleErrorDailog={handleErrorDailog}
          onSetOpenDailog={closeFormDailog}
          collectionName="Appoinment"
          appointmentID={state.notificationID}
        ></ShowAppoinmentDetails>
      </FormPrompt>

      {Notification?.map((pd, index) => {
        return (
          <div className={Styles.notification} key={index}>
            {/* Approve Appointment for Patient*/}
            {pd?.notificationID?.type == "AA" ? (
              <>
                <span>
                  Your Appoinment is approved{" "}
                  <button
                    className={Styles.SeeDetails}
                    onClick={() => {
                      setState({
                        ...state,
                        openFormDailog: true,
                        notificationID: pd.notificationID.appointmentID,
                      });
                    }}
                  >
                    See details
                  </button>
                </span>
              </>
            ) : (
              <></>
            )}

            {/* Prescription for Patient*/}

            {pd?.notificationID?.type === "P" ? (
              <>
                <div className="row">
                  <div className="col-3">
                    <img
                      className={Styles.doctorImage}
                      src={pd.notificationID.doctorID.hc_doctor_avatar}
                      alt=""
                    />
                  </div>
                  <div className="col-9">
                    <span className={Styles.notificationText}>
                      {pd.notificationID.doctorID.hc_doctor_englishName} has
                      send a
                      <button
                        className={Styles.SeeDetails}
                        onClick={() =>
                          handleClick(pd.notificationID.prescriptionID)
                        }
                      >
                        Prescription
                      </button>
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
            {/* Update Prescription */}
            {pd.notificationID.type === "UP" ? (
              <>
                <div className="row">
                  <div className="col-3">
                    <img
                      className={Styles.doctorImage}
                      src={pd.notificationID.doctorID.hc_doctor_avatar}
                      alt=""
                    />
                  </div>
                  <div className="col-9">
                    <span className={Styles.notificationText}>
                      {pd.notificationID.doctorID.hc_doctor_englishName} has
                      update your
                      <button
                        className={Styles.SeeDetails}
                        onClick={() =>
                          handleClick(pd.notificationID.prescriptionID)
                        }
                      >
                        Prescription
                      </button>
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
            {/* Appointment for Hospital and Doctor*/}
            {pd?.notificationID?.type === "A" ? (
              <>
                <div className="row">
                  <div className="col-3">
                    <img
                      className={Styles.doctorImage}
                      src={
                        pd.notificationID?.patientID?.hc_patient_avatar ?
                          pd.notificationID?.patientID?.hc_patient_avatar :
                          pd.notificationID?.patientID?.hc_patient_sex == 'Female' ? 'https://res.cloudinary.com/dddjw2ios/image/upload/v1667396228/Health%20Care/Patient/femaleUser_hbpgnm.jpg' : 'https://res.cloudinary.com/dddjw2ios/image/upload/v1667396229/Health%20Care/Patient/maleuser.jgp_ytfank.jpg'
                      }
                      alt=""
                    />
                  </div>
                  <div className="col-9">
                    <span className={Styles.notificationText}>
                      {pd.notificationID?.patientID?.hc_patient_firstName}&nbsp;{pd.notificationID?.patientID?.hc_patient_lastName} &nbsp;requested an appointment on&nbsp;
                      {new Date(pd.notificationID?.appointmentID?.hc_appoinmentDate).getDate()}/
                      {new Date(pd.notificationID?.appointmentID?.hc_appoinmentDate).getMonth() + 1}/
                      {new Date(pd.notificationID?.appointmentID?.hc_appoinmentDate).getFullYear()}&nbsp;
                      at slot&nbsp;{pd.notificationID?.appointmentID?.visitingSlot}
                      <button
                        className={Styles.SeeDetails}
                        onClick={() => {
                          const appointment = [...Notification]
                          appointment[index].notificationID.appointmentID.approved = 1
                          setNotification(appointment);
                          handleApprove(
                            pd.notificationID?.appointmentID?._id,
                            pd.notificationID?.appointmentID?.hc_appoinmentDate,
                            pd.notificationID?.doctorID,
                            pd.notificationID?.hospitalID?._id,
                            pd.notificationID?.patientID?._id,
                            pd.notificationID?.appointmentID?.visitingSlot,
                          )
                        }}
                      >
                        {pd.notificationID?.appointmentID?.approved == 0 ? 'Approve' : ''}
                      </button>
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
            {/* Diagnosis Test Report DTR for Patient */}
            {pd?.notificationID?.type === "DTR" ? (
              <>
                <div className="row">
                  <div className="col-3">
                    <img
                      className={Styles.doctorImage}
                      src={pd.notificationID.hospitalID.hc_hospital_logo}
                      alt=""
                    />
                  </div>
                  <div className="col-9">
                    <span className={Styles.notificationText}>
                      You have received a report of {pd.notificationID.testReport.testName} from {pd.notificationID.hospitalID.hc_hospital_english_name}
                      <button
                        className={Styles.SeeDetails}
                        onClick={() => window.open(pd.notificationID.testReport.webViewLink)}
                      >
                        View Report
                      </button>
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}

            {pd?.notificationID?.doctorID && !pd?.notificationID?.type ? (
              <>
                <div className="row">
                  <div className="col-3">
                    {" "}
                    <img
                      className={Styles.doctorImage}
                      src={pd.notificationID.doctorID.hc_doctor_avatar}
                      alt=""
                    ></img>
                  </div>
                  <div className="col-9">
                    <span className={Styles.notificationText}>
                      {pd.notificationID.patientID?.hc_patient_firstName} has
                      requested an appoinemnt on
                      {pd.notificationID.appointmentID?.hc_appoinmentDate.slice(
                        0,
                        4
                      )}
                      :
                      {pd.notificationID.appointmentID?.hc_appoinmentDate.slice(
                        5,
                        7
                      )}
                      :
                      {`${parseInt(
                        pd.notificationID.appointmentID?.hc_appoinmentDate.slice(
                          8,
                          10
                        )
                      ) + 1
                        }`}{" "}
                      with serial no {pd.notificationID.appointmentID?.serialNo}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
            {/* 
            {pd.notificationID.hospitalID ? (
              <>
                <div className="row">
                  <div className="col-3">
                    {" "}
                    <img
                      className={Styles.doctorImage}
                      src={pd.notificationID.hospitalID.hc_hospital_logo}
                      alt=""
                    ></img>
                  </div>
                  <div className="col-9">
                    <span className={Styles.notificationText}>
                      {pd.notificationID?.patientID?.hc_patient_firstName} has
                      requested an appoinemnt on
                      {pd.notificationID.appointmentID?.hc_appoinmentDate?.slice(
                        0,
                        4
                      )}
                      :
                      {pd.notificationID.appointmentID?.hc_appoinmentDate?.slice(
                        5,
                        7
                      )}
                      :
                      {`${
                        parseInt(
                          pd.notificationID.appointmentID?.hc_appoinmentDate?.slice(
                            8,
                            10
                          )
                        ) + 1
                      }`}
                      , visiting slot{" "}
                      {pd.notificationID.appointmentID?.visitingSlot}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )} */}
          </div>
        );
      })}
    </div>
  );
};

export default Notifications;
