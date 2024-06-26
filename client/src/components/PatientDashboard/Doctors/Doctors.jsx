import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import Styles from "./Doctors.module.css";
import FormPrompt from "../../DailogBoxes/formprompt";
import Appoinment from "../Appoinment/Appoinment";
import AlertDialogBox from "../../DailogBoxes/alertdailogbox";
import ErorrDialogBox from "../../DailogBoxes/errordaologbox";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import LoginPage from "../../Login/login";

const Doctors = () => {
  const auth = useSelector((state) => state.AuthReducer);
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
  });
  const [selectDoctorID, setSelectDoctorID] = useState(null);
  const [selectDoctorName, setSelectDoctorName] = useState(null);

  const history = useHistory();
  const getDoctors = () => {
    Axios.get(`../api/doctor/landingPageDoctor`)
      .then((res) => {
        setState({
          ...state,
          isLoading: false,
          doctorsList: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getDoctors();
  }, []);

  const showMore = () => {
    if (state.limit <= state.totalNumOfDoctors) {
      const limit = state.limit + 10;
      console.log(state.totalNumOfDoctors);
      setState({
        ...state,
        limit: limit,
      });
      // onFetchData(limit);
    } else {
      setState({
        ...state,
        noMoredataText: "No More Doctors",
      });
    }
  };

  const handleSuccessDailog = (data) => {
    setState({
      ...state,
      openFormDailog: false,
      openAlertDailog: true,
      message: `An appointment request has been sent to ${selectDoctorName} in ${data}`,
    });
  };
  const handleErrorDailog = () => {
    // setopenConfirmDailog(false);
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

  return (
    <div>
      {state.isSearching ? (
        <i className="fas fa-spinner fa-pulse fa-2x "></i>
      ) : state.doctorsList.length === 0 ? (
        <div>
          <h3>No Doctors Found</h3>
        </div>
      ) : (
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
          <div className="row">
            <div className="col-lg-10 col-md-8 col-12">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button className={Styles.heading} disabled={true}>
                  Our Available Doctors
                </button>
              </div>
            </div>

            <div className="col-lg-2 col-md-4 col-12">
              <button className={Styles.searchDoctorButton}>
                <Link
                  style={{
                    textDecoration: "none",
                  }}
                  to="/searchDocotrs"
                >
                  <b>Search Doctors</b>
                </Link>
              </button>
            </div>
          </div>
          <div className="doctorDiv">
            <div className="row ">
              {state.doctorsList &&
                state.doctorsList.map((p) => {
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
                                  `${item} ${
                                    index + 1 < education.length ? ", " : ""
                                  }`
                              )}
                            </p>
                          )}

                          {p.hc_doctor_course_done[0]?.degree != "" &&
                            p.hc_doctor_course_done?.map((item, index) => {
                              return (
                                <p
                                  className="mt-0 mb-0 text-center small"
                                  key={index}
                                >
                                  {item.degree} ({item.title}){" "}
                                  {index + 1 < p.hc_doctor_course_done?.length
                                    ? ", "
                                    : ""}
                                </p>
                              );
                            })}
                          <p className="mt-0 mb-0 text-center small">
                            <span className="">{p?.hc_doctor_job_title}</span>
                          </p>
                          <p className="mt-0 mb-0 text-center small">
                            <span className="">
                              {p.hc_doctor_medicale_name}
                            </span>
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
                          <p className="mt-0 mb-0 text-center font-weight-bold">
                            {" "}
                            <span> Fees: </span>
                            {p.hc_doctor_fees}
                          </p>
                        </div>
                        <div className={Styles.doctorAppoinment}>
                          <button
                            className="btn btn-success border-round mb-3"
                            onClick={() => {
                              if (auth.role == "Patient" && auth.token) {
                                setState({
                                  ...state,
                                  openFormDailog: true,
                                  doctorOfHospital: p.hc_doctor_of_hospital,
                                });
                                setSelectDoctorID(p._id);
                                setSelectDoctorName(p.hc_doctor_englishName);
                              } else {
                                alert("Please Login as a Patient");
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
        </div>
      )}

      <div>
        <Switch>
          <Route path="/login" exact>
            <LoginPage></LoginPage>
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Doctors;
