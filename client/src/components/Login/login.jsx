import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./login.css";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import {
  loginSuccess,
  loginFailed,
} from "../../redux/reducers/Auth/authAction";
import AddPersonDetails from "../PersonDetails/addpersondetails";
import AlertDialogBox from "../DailogBoxes/alertdailogbox";
import FormPrompt from "../DailogBoxes/formprompt";
import ErorrDialogBox from "../DailogBoxes/errordaologbox";
import { firebase } from "../../firebase";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import logo from "../../assest/images/HB_logo.png";
import OTP from "./OTP";

const LoginPage = () => {
  const [state, setState] = useState({
    isLoading: false,
    openAlertDailog: false,
    openErrorDailog: false,
    openFormDailog: false,
    isCloseBtnAppear: true,
    openOTPFormDailog: false,
    openOTPAlertDailog: false,
  });
  const [recovery, setrecovery] = useState("");
  const [user, setUser] = useState(null);
  const [hc_user_email, setHc_user_email] = useState(null);
  const [hc_user_password, setHc_user_password] = useState(null);
  const [openConfirmDailog, setopenConfirmDailog] = useState(false);
  const [invaild, setinvaild] = useState("invaild");
  const [newPatient, setNewPatient] = useState(false);
  const [forgetPassForm, setForgetPassForm] = useState(0);
  const [objectID, setobjectID] = useState("");
  const [newPassword1, setNewPassword1] = useState(null);
  const [newPassword2, setNewPassword2] = useState(null);
  const [receivedOTP, setReceivedOTP] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const auth_token = useSelector((state) => state?.AuthReducer?.token);
  const auth = getAuth(firebase);

  const makeRecaphtcha = async () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          console.log("Captcha Resolved");
        },
      },
      auth
    );
  };

  const submitOTP = () => {
    let OTP = receivedOTP;

    setState({
      ...state,
      isLoading: true
    })
    if (OTP == null || OTP == "") {
    } else {
      window.confirmationResult
        .confirm(OTP)
        .then((result) => {
          setState({
            ...state,
            openOTPFormDailog: false,
          });
          setForgetPassForm(2);
          setNewPassword1("");
          setNewPassword2("");
        })
        .catch((err) => {
          alert("Wrong otp");
        });
    }
  };

  const sendOTP = async () => {
    const phoneNumber = "+88" + recovery;
    makeRecaphtcha();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setState({
          ...state,
          isLoading: false,
          openOTPFormDailog: true
        });
        // submitOTP();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const login = (e) => {
    e.preventDefault();
    if (user == null) {
      alert("Select Account type First!!!");
    } else {
      setinvaild("invaild");
      setState({
        ...state,
        isLoading: true,
      });

      const phoneNo = `hc_${user}_phoneno`;
      const email = `hc_${user}_email`;
      const password = `hc_${user}_password`;

      const data = {
        [phoneNo]: hc_user_email,
        [email]: hc_user_email,
        [password]: hc_user_password,
      };
      const headers = {
        "Content-Type": "application/json",
      };

      if (forgetPassForm == 1) {
        const data = {
          [phoneNo]: recovery,
          [email]: recovery,
        };

        Axios.post(`api/${user}/recoverAccount`, data)
          .then((res) => {
            console.log(res);
            if (res.status == 200) {
              if (res.data?._id) {
                setState({
                  ...state,
                  isLoading: false,
                  openOTPFormDailog: true,
                });
                sendOTP();
                setobjectID(res.data._id);
                setHc_user_email("");
                setHc_user_password("");
              } else {
                setState({
                  ...state,
                  isLoading: false,
                  openOTPFormDailog: false,
                });
                alert("Access denied");
              }
            }
          })
          .catch((err) => {
            // setState({
            //   ...state,
            //   isLoading: false,
            // });
            setState({
              ...state,
              openOTPFormDailog: false,
            });
            alert("Couldnt recover account");
            console.log(err);
          });
      } else if (forgetPassForm == 2 && newPassword1 == newPassword2) {
        const data = {
          newPassword: newPassword1,
          id: objectID,
        };
        Axios.post(`../api/${user}/changePassword`, data)
          .then((res) => {
            setState({
              ...state,
              isLoading: false,
            });
            setNewPassword1("");
            setNewPassword2("");
            setHc_user_email("");
            setHc_user_password("");
            alert("Password Changed!!!");
            setForgetPassForm(0);
          })
          .catch((err) => {
            alert("Couldn't change the password");
          });
      } else {
        Axios.post(`api/${user}/signin`, data, { headers })
          .then((res) => {
            if (res.status === 200) {
              setState({
                ...state,
                isLoading: false,
              });
              const response = {
                token: res.data.token,
                role: user[0].toUpperCase() + user.substring(1),
              };
              setHc_user_email("");
              setHc_user_password("");
              dispatch(loginSuccess(response));
            }
          })
          .catch((error) => {
            setState({
              ...state,
              isLoading: false,
            });
            alert("Couldnt sign in");
            dispatch(loginFailed());
          });
      }
    }
  };
  const closeAlertDailog = () => {
    setState({
      ...state,
      openAlertDailog: false,
    });
    window.location.reload(false);
  };
  const closeFormDailog = () => {
    setState({
      ...state,
      openFormDailog: false,
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
      isCloseBtnAppear: true,
    });
  };
  const handleSuccessDailog = () => {
    setState({
      ...state,
      openFormDailog: false,
      openAlertDailog: true,
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

  // OTP
  const handleOTPSuccessDailog = () => {
    setState({
      ...state,
      openOTPFormDailog: false,
      openOTPAlertDailog: true,
    });
  };

  const handleOTPErrorDailog = () => {
    setopenConfirmDailog(false);
    setState({
      ...state,
      openOTPFormDailog: false,
      openConfirmDailog: false,
      openErrorDailog: true,
    });
  };

  const closeOTPFormDailog = () => {
    setState({
      ...state,
      openOTPFormDailog: false,
    });
  };

  const closeOTPAlertDailog = () => {
    setState({
      ...state,
      openOTPAlertDailog: false,
    });
  };

  useEffect(() => {
    if (
      (auth_token && user == "hospital") ||
      (auth_token && user == "doctor")
    ) {
      history.push("/adminDashboard");
    }
    if (auth_token && user == "patient") {
      history.push("/dashboard");
    }
    if (auth_token && user == "student") {
      history.push("/studentProfile");
    }
    if (auth_token && user == "company") {
      history.push("/companyProfile");
    }
  }, [auth_token]);

  return (
    <div>
      {state.isLoading ? (
        <div className="d-flex justify-content-center align-items-center w-100 h-100 dashboardpage">
          <i className="fas fa-spinner fa-pulse fa-2x loadmoredataspinner"></i>
        </div>
      ) : (
        <div>
          {/* New patient */}
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
            title="Patient Registration"
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

          {/* SEND OTP */}
          {/* Student registration modal */}
          <AlertDialogBox
            openDailog={state.openOTPAlertDailog}
            onSetOpenDailog={closeOTPAlertDailog}
            title="Added"
            des="New Student has been added sccessfully"
          ></AlertDialogBox>
          <ErorrDialogBox
            openDailog={state.openErrorDailog}
            onSetOpenDailog={closeErrorDailog}
            title="Error"
            des="Someting went wrong. Try again"
          ></ErorrDialogBox>

          <FormPrompt
            openDailog={state.openOTPFormDailog}
            title="Submit OTP"
            onSetOpenDailog={closeOTPFormDailog}
            isCloseBtnAppear={state.isCloseBtnAppear}
          >
            <OTP
              setCloseBtnAppear={setCloseBtnAppear}
              handleSuccessDailog={handleOTPSuccessDailog}
              handleErrorDailog={handleOTPErrorDailog}
              collectionName="otp"
              setReceivedOTP={setReceivedOTP}
              submitOTP={submitOTP}
              id="otp"
            ></OTP>
          </FormPrompt>
          {
            <div className="login_page">
              <div id="recaptcha-container"></div>
              <div className="container-fluid p-0">
                <div className="row login_div">
                  <div className="col-lg-4"></div>
                  <div className="col-lg-4 p-0 first_section">
                    <div className="box">
                      <div className="from_section">
                        <img
                          style={{
                            width: "80px",
                            height: "80px",
                            marginTop: "16px",
                            marginLeft: "15px",
                            borderRadius: "10px",
                            cursor: "pointer",
                          }}
                          onClick={() => history.push("/")}
                          src={logo}
                          alt="logo"
                        ></img>
                        <ul onClick={() => history.push("/")}>
                          <h3 style={{ color: "black" }}>Health Book</h3>
                          <li></li>
                        </ul>

                        <form onSubmit={login}>
                          {forgetPassForm == 2 ? (
                            <></>
                          ) : (
                            <select
                              className="form-select btn btn-info dropdown-toggle mb-2"
                              aria-haspopup="true"
                              aria-expanded="false"
                              onChange={(e) => setUser(e.target.value)}
                            >
                              <option value="" hidden>
                                Select Account Type
                              </option>
                              <option value="patient">Patient</option>
                              <option value="doctor">Doctor</option>
                              <option value="hospital">Hospital</option>
                              <option value="student">Student</option>
                              <option value="company">Company</option>
                            </select>
                          )}

                          {forgetPassForm == 1 ? (
                            <>
                              <input
                                name="recovery"
                                className="form-control form-control-lg"
                                type="text"
                                placeholder="Email or Phone No"
                                onChange={(e) => setrecovery(e.target.value)}
                                autoComplete="off"
                              />
                            </>
                          ) : (
                            <>
                              <input
                                name={
                                  forgetPassForm == 2 ? "new_password" : "email"
                                }
                                className="form-control form-control-lg"
                                type={forgetPassForm == 2 ? "password" : "text"}
                                placeholder={
                                  forgetPassForm == 2
                                    ? "New Password"
                                    : "Email or Phone No"
                                }
                                onChange={(e) => {
                                  forgetPassForm == 2
                                    ? setNewPassword1(e.target.value)
                                    : setHc_user_email(e.target.value);
                                }}
                                autoComplete="off"
                              />
                              <input
                                className="form-control form-control-lg"
                                type="password"
                                placeholder={
                                  forgetPassForm == 2
                                    ? "Retype New Password"
                                    : "Password"
                                }
                                name={
                                  forgetPassForm == 2
                                    ? "retype_new_password"
                                    : "password"
                                }
                                onChange={(e) => {
                                  forgetPassForm == 2
                                    ? setNewPassword2(e.target.value)
                                    : setHc_user_password(e.target.value);
                                }}
                              />
                              <p className={invaild}>Password doesn't match</p>
                            </>
                          )}

                          <button
                            type="submit"
                            className="btn btn-info mt-2 "
                            style={{ color: "black" }}
                          >
                            {forgetPassForm ==1
                              ? "Search Account"
                              : forgetPassForm == 2 ? "Set New Password" : "Login"}

                            {forgetPassForm == 1 ? (
                              <i className="fa fa-search"></i>
                            ) : (
                              <i
                                className="fa fa-unlock"
                                aria-hidden="true"
                              ></i>
                            )}
                          </button>

                          <div>
                            <div className="row">
                              {forgetPassForm == 2 ? (
                                <div className="col-6"></div>
                              ) : (
                                <div className="col-6">
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setState({
                                        ...state,
                                        openFormDailog: true,
                                      });
                                    }}
                                    className="btn text-left border-0 forgetPass"
                                    style={{ color: "black" }}
                                  >
                                    Register as Patient
                                  </button>
                                </div>
                              )}

                              <div className="col-6">
                                <button
                                  className="btn text-right border-0 forgetPass"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    forgetPassForm == 0
                                      ? setForgetPassForm(1)
                                      : setForgetPassForm(0);
                                  }}
                                  style={{ color: "black" }}
                                >
                                  {forgetPassForm == 0
                                    ? "Forget Password"
                                    : forgetPassForm == 1
                                    ? "Back to login"
                                    : "Change number"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4"></div>
                </div>
              </div>
            </div>
          }
        </div>
      )}
    </div>
  );
};

export default LoginPage;
