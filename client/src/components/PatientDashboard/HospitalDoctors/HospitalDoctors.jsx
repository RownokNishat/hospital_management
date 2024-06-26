import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { useSelector } from "react-redux";
import Doctors from "../Doctors/Doctors";
import FormPrompt from "../../DailogBoxes/formprompt";
import Appoinment from "../Appoinment/Appoinment";
import AlertDialogBox from "../../DailogBoxes/alertdailogbox";
import ErorrDialogBox from "../../DailogBoxes/errordaologbox";
import Styles from "../HospitalDoctors/HospitalDoctor.module.css";

const HospitalDoctors = () => {
  const { hospitalID } = useParams();
  const auth = useSelector((state) => state.AuthReducer);
  const [openConfirmDailog, setopenConfirmDailog] = useState(false);
  const [selectDoctorID, setSelectDoctorID] = useState(null);
  const [selectDoctorName, setSelectDoctorName] = useState(null);
  const [state, setState] = useState({
    serachText: "",
    isLoading: true,
    limit: 10,
    isLoadMoredata: false,
    totalNumOfDoctors: null,
    noMoredataText: "",
    doctorsList: [],
    isCloseBtnAppear: true,
    openFormDailog: false,
    openAlertDailog: false,
    openErrorDailog: false,
    openConfirmDailog: false,
    doctorOfHospital: [],
    hospital: [],
  });
  const [selectDoctor, setSelectDoctor] = useState(null);

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${auth.token}`,
    };

    const body = {
      hospitalID: hospitalID,
    };
    Axios.post("/api/hospital/hospitalWiseDoctor", body, { headers })
      .then((data) => {
        setState({
          ...state,
          isLoading: false,
          doctorsList: data.data[0].doctors,
          hospital: data.data[1].hospital[0],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [hospitalID]);

  const handleSuccessDailog = (data) => {
    setState({
      ...state,
      openFormDailog: false,
      openAlertDailog: true,
      message: `An appointment request has been sent to ${selectDoctorName} in ${data}`,
    });
  };
  const handleErrorDailog = () => {
    setopenConfirmDailog(false);
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

  // /hospitalWiseDoctor/:hospitalID
  return (
    <div>
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
        title="Appoinment"
        onSetOpenDailog={closeFormDailog}
        isCloseBtnAppear={state.isCloseBtnAppear}
      >
        <Appoinment
          openDailog={state.openFormDailog}
          setCloseBtnAppear={setCloseBtnAppear}
          handleSuccessDailog={handleSuccessDailog}
          handleErrorDailog={handleErrorDailog}
          onSetOpenDailog={closeFormDailog}
          collectionName="doctors"
          doctorOfHospital={state.doctorOfHospital}
          id={selectDoctorID}
        ></Appoinment>
      </FormPrompt>
      {/* <div className={Styles.hospitalDiv}> */}
      <div className="row">
        <div className="col-lg-2 col-md-1 col-0"></div>
        <div className="col-lg-4 col-md-4 col-12 d-flex justify-content-center">
          <img
            className={Styles.hospitalLogo}
            src={state.hospital?.hc_hospital_logo}
            alt=""
          ></img>
        </div>
        <div className="col-lg-4 col-md-6 col-12 ms-3 mt-3">
          <div className="mt-5">
            <h2 className="font-weight-bold">
              {state.hospital?.hc_hospital_english_name}
            </h2>
            <h4 className="mt-2 mb-2 ">
              {" "}
              <span className="font-weight-bold"> Address: </span>
              {state.hospital?.hc_hospital_address?.upazila},{" "}
              {state.hospital?.hc_hospital_address?.district}
            </h4>

            <h4 className="mt-2 mb-2 ">
              {" "}
              <span className="font-weight-bold"> Phone No: </span>
              {state.hospital?.hc_hospital_phoneno}
            </h4>

            <h4 className="mt-2 mb-2 ">
              {" "}
              <span className="font-weight-bold"> Email: </span>
              {state.hospital?.hc_hospital_email}
            </h4>
          </div>
        </div>
        <div className="col-lg-2 col-md-1 col-0"></div>
      </div>

      {/* </div> */}
      <div className="row ">
        {state.doctorsList &&
          state.doctorsList?.map((p) => {
            const education = p.hc_doctor_education
              ?.filter((i) => i.degree != "BCS")
              .map(
                (item, index) => item.degree + " (" + item.title + ")"
              );

            return (
              <div key={p._id} className="col-lg-3 col-md-6 col-12">
                      <div className={Styles.doctorCard}>
                        <div className={Styles.doctorImage}>
                          {p.hc_doctor_avatar === "" ? (
                            <div className="userbg">
                              <i className="fa fa-user fa-2x"></i>
                            </div>
                          ) : (
                            <img
                              className={Styles.dashboardDoctorImage}
                              alt=""
                              srcSet={p.hc_doctor_avatar}
                            />
                          )}
                        </div>

                        <div className={Styles.doctorDetails}>
                          <p className="mt-1 mb-0">
                            <span className="font-weight-bold">
                              {p.hc_doctor_englishName}
                            </span>
                          </p>
                          <p className="mt-0 mb-0 text-center small">
                            <span className="">{ p?.hc_doctor_job_title}</span>
                          </p>
                          <p className="mt-1 mb-0">
                            <span className="font-weight-bold">
                              {p.hc_doctor_specialist}
                            </span>
                          </p>
                          {education.length === 0 ? (
                            " "
                          ) : (
                            <p className="mt-0 mb-0 text-center small ">
                              {education?.map(
                                (item, index) =>
                                  `${item} ${index + 1 < education.length ? ", " : ""
                                  }`
                              )}
                            </p>
                          )}

                          {p.hc_doctor_course_done[0]?.degree != "" &&
                            p.hc_doctor_course_done?.map((item, index) => {
                              return (
                                <p className='mt-0 mb-0 text-center small' key={index}>
                                  {item.degree} ({item.title}){" "}
                                  {index + 1 < p.hc_doctor_course_done?.length
                                    ? ", "
                                    : ""}
                                </p>
                              );
                            })}
                          <p className="mt-0 mb-0 text-center small">
                            <span className="">{p.hc_doctor_medicale_name}</span>
                          </p>
                          {p.hc_doctor_consultant[0]?.consultant != "" &&
                            p.hc_doctor_consultant?.map((item, index) => {
                              return (
                                <p key={index}>
                                  Consultant- {item.consultant}{" "}
                                  {index + 1 < p.hc_doctor_consultant?.length
                                    ? ", "
                                    : ""}
                                </p>
                              );
                            })}
                          <p className="mt-0 mb-0 text-center small">
                            <span>BMDC Registration No: </span>
                            {p.hc_doctor_BMDC_reg_no}
                          </p>
                          <p  className="mt-0 mb-0 text-center font-weight-bold">
                            {" "}
                            <span> Fees: </span>{p.hc_doctor_fees}
                          </p>
                        </div>
                        <div className={Styles.doctorAppoinment}>
                          <button
                            className="btn btn-success border-round"
                            onClick={() => {
                              if(auth.role && auth.token){
                                setState({
                                  ...state,
                                  openFormDailog: true,
                                  doctorOfHospital: p.hc_doctor_of_hospital,
                                });
                                setSelectDoctorID(p._id);
                                setSelectDoctorName(p.hc_doctor_englishName);
                              }else{
                                alert("Please Login First")
                              }
                            }}
                          >
                            Take Appoinment
                          </button>
                        </div>
                      </div>
                    </div>
            );
          })}
      </div>
    </div>
  );
};

export default HospitalDoctors;
