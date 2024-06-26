import React, { useState, useEffect } from "react";
import "./patientlist.css";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Axios from "axios";
import FormPrompt from "../DailogBoxes/formprompt";
import AddPersonDetails from "../PersonDetails/addpersondetails";
import AlertDialogBox from "../DailogBoxes/alertdailogbox";
import ConfirmDialogBox from "../DailogBoxes/confirmdailogbox";
import ErorrDialogBox from "../DailogBoxes/errordaologbox";
import { firebase } from '../../firebase'
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";

const PatienList = () => {
  const auth = useSelector((state) => state.AuthReducer);
  const authFirebase = getAuth(firebase)
  const [skip, setskip] = useState(0);
  const history = useHistory()
  const [openConfirmDailog, setopenConfirmDailog] = useState(false);
  const [state, setState] = useState({
    serachText: "",
    isLoading: false,
    limit: 10,

    isLoadMoredata: false,
    isCloseBtnAppear: true,
    isDeleting: false,

    totalNumOfPatient: null,
    noMoreDataText: "",

    openFormDailog: false,
    openAlertDailog: false,
    openErrorDailog: false,
    openConfirmDailog: false,

    patientlist: [],
    isSearching: false,
    isSearchDataShow: false,

    selectedPatientName: "",
    selectedPatientId: "",
  });

  const getPatient = () => {
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${auth.token}`,
      skip: skip,
    };
    try {
      Axios.get(`api/hospital/fetchAllPatient`, { headers })
        .then((res) => {
          setState({
            ...state,
            patientlist: res.data,
            isLoadMoredata: false,
          });
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    getPatient();
  }, [skip]);

  const previousPatient = () => {
    setState({
      ...state,
      isLoadMoredata: true,
      noMoreDataText: "",
    });
    setskip(skip - 10);
  };

  const showMore = () => {
    if (state.patientlist.length == 10) {
      setskip(skip + 10);
      setState({ ...state, isLoadMoredata: true });
    } else {
      setState({
        ...state,
        noMoreDataText: "No More Patients",
      });
    }
  };
  const onSetTotalNumOfPatient = async () => {
    setState({ ...state, isLoading: true });
  };

  const handleOnDelete = (patientname, id) => {
    setopenConfirmDailog(true);
    setState({
      ...state,
      selectedPatientName: patientname,
      selectedPatientId: id,
      // openConfirmDailog: true,
    });
  };
  const deleteData = async () => {
    setState({ ...state, isDeleting: true });
    setopenConfirmDailog(false);
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${auth.token}`,
      patientid: state.selectedPatientId,
    };
    try {
      Axios.get(`api/hospital/deletePatient`, { headers })
        .then((res) => {
          getPatient();
          setState({
            ...state,
            isDeleting: false,
            selectedPatientName: "",
            selectedPatientId: "",
          });
        })
        .catch((error) => console.log(error));
    } catch (error) {
      setState({
        ...state,
        isDeleting: false,
      });
      handleErrorDailog();
    }
  };

  const findPatient = () => {
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${auth.token}`,
      patient_phoneno: state.serachText,
      patient_name: state.serachText.toLowerCase(),
    };
    Axios.get(`api/patient/searchPatient`, { headers })
      .then((res) => {
        setState({
          ...state,
          patientlist: res.data.message,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSeach = async () => {
    if (state.serachText === "" || null) {
      window.location.reload(false);
    } else {
      findPatient();
      setState({
        ...state,
        isSearching: true,
        isSearchDataShow: true,
      });
    }
  };

  const handleSuccessDailog = () => {
    setState({
      ...state,
      openFormDailog: false,
      openAlertDailog: true,
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
  const closeAlertDailog = () => {
    setState({
      ...state,
      openAlertDailog: false,
    });
    window.location.reload(false);
  };
  const closeErrorDailog = () => {
    setState({
      ...state,
      openErrorDailog: false,
    });
  };
  const closeConfirmDailog = () => {
    setopenConfirmDailog(false);
  };
  const setCloseBtnAppear = () => {
    setState({
      ...state,
      isCloseBtnAppear: false,
    });
  };

  const makeRecaphtcha = async () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        console.log("Captcha Resolved");
      }
    }, authFirebase);
  }

  const submitOTP = (patientID) => {
    let OTP = prompt("Please enter your patient OTP:", "");
    if (OTP == null || OTP == "") {
      console.log("OTP not entered!!!");
    } else {
      window.confirmationResult.confirm(OTP)
        .then((result) => {
          history.push(`../PatientProfile/${patientID}`)
        })
        .catch(err => {
          console.log(err);
        })
    }

  }

  const sendOTP = async (e, hc_patient_phoneno, patientID) => {
    e.preventDefault();
    const phoneNumber = '+88' + hc_patient_phoneno
    makeRecaphtcha()
    const appVerifier = window.recaptchaVerifier
    signInWithPhoneNumber(authFirebase, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        submitOTP(patientID)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  // render() {
  let count = 0;
  return state.isLoading ? (
    <div className="patientlistpage">
      <i className="fas fa-spinner fa-pulse fa-2x "></i>
    </div>
  ) : (
    <div className="patientlistpage">
      <div id="recaptcha-container"></div>
      <div className="main_section">
        <ConfirmDialogBox
          openDailog={openConfirmDailog}
          onSetOpenDailog={closeConfirmDailog}
          handleConfirmOkBtn={deleteData}
          isLoading={state.isDeleting}
          title="Delete"
          des={
            "Are you sure to delete " +
            state.selectedPatientName +
            " " +
            "details"
          }
        ></ConfirmDialogBox>
        <AlertDialogBox
          openDailog={state.openAlertDailog}
          onSetOpenDailog={closeAlertDailog}
          title="Added"
          des="New Patient has been added sccessfully"
        ></AlertDialogBox>
        <ErorrDialogBox
          openDailog={state.openErrorDailog}
          onSetOpenDailog={closeErrorDailog}
          title="Error"
          des="Someting went wrong. Try again"
        ></ErorrDialogBox>

        <FormPrompt
          openDailog={state.openFormDailog}
          title="Add New Patient"
          onSetOpenDailog={closeFormDailog}
          isCloseBtnAppear={state.isCloseBtnAppear}
        >
          <AddPersonDetails
            setCloseBtnAppear={setCloseBtnAppear}
            handleSuccessDailog={handleSuccessDailog}
            handleErrorDailog={handleErrorDailog}
            collectionName="patients"
            id="patientid"
          ></AddPersonDetails>
        </FormPrompt>
        <div className="topheader">
          <ul>
            <li>
              <i
                className="fa fa-arrow-circle-o-right fa-2x"
                aria-hidden="true"
              ></i>
            </li>
            <li>
              <h5>Patient</h5>
            </li>
          </ul>
        </div>
        <hr />
        <div className="top_section">
          <div className="wrap">
            <ul>
              <li>
                <div className="search">
                  <input
                    type="text"
                    className="searchTerm"
                    placeholder="Search patient by full name"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSeach();
                      }
                    }}
                    onChange={(e) => {
                      setState({
                        ...state,
                        serachText: e.target.value,
                      });
                    }}
                  />

                  <button
                    onClick={handleSeach}
                    type="submit"
                    className="searchButton"
                  >
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </li>
              <li style={{ fontSize: "12px" }}> #</li>
              <li tyle={{ fontSize: "12px" }}>{state.patientlist.length} </li>
            </ul>
          </div>

          <button
            type="button"
            className="btn btn-warning"
            onClick={() => {
              setState({
                ...state,
                openFormDailog: true,
              });
            }}
          >
            + Add Patient
          </button>
        </div>
        <table className="table table-striped">
          <thead className="thead tablehead">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Profile</th>
              <th scope="col">Name</th>
              <th scope="col">Sex</th>
              <th scope="col">Age</th>
              <th scope="col">Blood Group</th>
              <th scope="col">Mobile</th>
              <th scope="col">Occupation</th>
              <th scope="col">Address</th>
              {auth.role == "Hospital" ? (
                <th scope="col">Report</th>
              ) : null}

              {auth.role == "Doctor" ? (
                <th scope="col">Prescription</th>
              ) : null}
              {auth.role == "Doctor" ? (
                null
              ) : <th scope="col">Option</th>}

            </tr>
          </thead>
          {state.isSearching ? (
            <i className="fas fa-spinner fa-pulse fa-2x "></i>
          ) : state.patientlist.length === 0 ? (
            <tbody>
              <tr>
                <td>No Patient Found</td>
              </tr>
            </tbody>
          ) : (
            <tbody className="tablebody">
              {state.patientlist &&
                state.patientlist.map((p) => {
                  count++;
                  const diff =
                    Date.now() - new Date(p.hc_patient_date_of_birth).getTime();
                  const age = new Date(diff).getUTCFullYear() - 1970;

                  return (
                    <tr key={p._id}>
                      <td data-label="No" className="align-middle">
                        {count}
                      </td>
                      <td data-label="Profile" className="align-middle" onClick={(e) => sendOTP(e, p.hc_patient_phoneno, p._id)}>
                        <img
                          className="image cursor-pointer"
                          alt=""
                          srcSet={p.hc_patient_avatar ?
                            p.hc_patient_avatar : p.hc_patient_sex == "Male" ?
                              'https://res.cloudinary.com/dddjw2ios/image/upload/v1667396229/Health%20Care/Patient/maleuser.jgp_ytfank.jpg' : 'https://res.cloudinary.com/dddjw2ios/image/upload/v1667396228/Health%20Care/Patient/femaleUser_hbpgnm.jpg'}
                        />
                      </td>
                      <td data-label="Name" className="align-middle">
                        {p.hc_patient_firstName + " " + p.hc_patient_lastName}
                      </td>
                      <td data-label="Sex" className="align-middle">
                        {p.hc_patient_sex}
                      </td>
                      <td data-label="Age" className="align-middle">
                        {age === "" ? "N/A" : age + "y"}
                      </td>
                      <td data-label="Blood Group" className="align-middle">
                        {p.hc_patient_bloodGroup}
                      </td>
                      <td data-label="Mobile" className="align-middle">
                        {" "}
                        {p.hc_patient_phoneno === ""
                          ? "N/A"
                          : p.hc_patient_phoneno}
                      </td>
                      <td data-label="Occupation" className="align-middle">
                        {p?.hc_patient_occupation}
                      </td>
                      <td data-label="Address" className="align-middle">
                        {p.hc_patient_address?.upazila} &nbsp; {p.hc_patient_address?.district}
                      </td>
                      {auth.role == "Hospital" ? (
                        <td data-label="Report" className="align-middle">
                          <Link
                            style={{ textDecoration: "none" }}
                            to={`/addLabReport/${p._id}`}
                          >
                            <b>Upload</b>
                          </Link>
                        </td>
                      ) : null}

                      {auth.role == "Doctor" ? (
                        <td
                          data-label="Prescription Link"
                          className="align-middle"
                        >
                          <Link
                            style={{ textDecoration: "none" }}
                            to={`/prescription/${p._id}`}
                          >
                            <b>Prescription</b>
                          </Link>
                        </td>
                      ) : null}
                      {auth.role == "Doctor" ? (null) :
                        <td data-label="Options" className="align-middle">
                          <Link to={`editpersondetails/${p._id}`}>
                            <button
                              type="button"
                              className="btn btn-success"
                            >
                              <i className="fa fa-edit" aria-hidden="true"></i>
                            </button>
                          </Link>
                          {
                            auth.UID == '6288cb73f6316b2b30359db0' || auth.UID == '632b4b5fe3cddc60f7988656' ? <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => {
                                handleOnDelete(
                                  p.hc_patient_firstName +
                                  " " +
                                  p.hc_patient_lastName,
                                  p._id
                                );
                              }}
                            >
                              <i className="fa fa-trash" aria-hidden="true"></i>
                            </button> : <></>
                          }

                        </td>
                      }

                    </tr>
                  );
                })}
            </tbody>
          )}
        </table>

        <div className="loadmoredatasection">
          {state.isLoadMoredata ? (
            <i className="fas fa-spinner fa-pulse fa-2x loadmoredataspinner"></i>
          ) : (
            <div className="nomoredatatext">{state.noMoreDataText}</div>
          )}
          {state.patientlist.length ===
            0 ? null : state.isSearchDataShow ? null : (
              <>
                <button
                  type="button"
                  disabled={skip == 0 ? true : false}
                  className="btn btn-warning"
                  onClick={() => previousPatient()}
                >
                  Previous
                </button>
                <button
                  type="button"
                  disabled={state.patientlist.length == 10 ? false : true}
                  className="btn btn-warning"
                  onClick={() => showMore()}
                >
                  Next
                </button>
              </>
            )}
        </div>
      </div>
    </div>
  );
};

export default PatienList;
