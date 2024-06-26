import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import NewPersonDetailsForm from "./newpersondetailsform";
import "./addpersonDetails.css";
import Axios from 'axios'
import { useSelector } from "react-redux";
import { firebase } from '../../firebase'
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { data } from './districtName.js'

const AddPersonDetails = (props) => {
  const [imageFile, setimageFile] = useState(null);
  const [OTPsend, setOTPsend] = useState(false);
  const [OTP, setOTP] = useState('');
  const [selectDivision, setSelectDivision] = useState(null);
  const authToken = useSelector(state => state.AuthReducer)
  const auth = getAuth(firebase)
  const [hasPhoneNo, sethasPhoneNo] = useState(200);
  const [checkpass, setCheckpass] = useState(false);

  const [state, setState] = useState({
    imageAvatar: "",
    avatarurl: "",
    date: null,
    isLoading: false,
    htmlelement: <i className="fa fa-user fa-8x" aria-hidden="true"></i>,

    formData: {
      hc_patient_firstName: "",
      hc_patient_lastName: "",
      hc_patient_sex: "",
      hc_patient_bloodGroup: "",
      hc_patient_phoneno: "",
      hc_patient_occupation: "",
      address_upazila: "",
      address_district: "",
      address_city: "",
      hc_patient_date_of_birth: "",
      hc_patient_relegion: "",
      hc_patient_password: "",
      hc_patient_retypePassword: ""
    }
  });


  const patientRegistration = (data) => {
    Axios.post(`api/patient/registration`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        setState({
          ...state,
          isLoading: false,
          imageAvatar: "",
          date: null,
        })
        window.location.reload(true);
        props.handleSuccessDailog()

      })
      .catch(error => console.log(error))
  }

  const errorHandle = (statement) => {
    setState({
      ...state,
      isLoading: false,
    });
    alert(statement)
  }

  const makeRecaphtcha = async () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        console.log("Captcha Resolved");
      }
    }, auth);
  }

  const submitOTP = (e) => {
    e.preventDefault();
    try {
      window.confirmationResult.confirm(OTP).then((result) => {
        setOTP('')
        handleSubmit()
      })
    } catch (error) {
      console.log(error)
    }
  }

  const sendOTP = async (e) => {
    e.preventDefault();
    if (state.formData.hc_patient_password == state.formData.hc_patient_retypePassword) {
      const phoneNumber = '+88' + state.formData.hc_patient_phoneno
      makeRecaphtcha()
      const appVerifier = window.recaptchaVerifier
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          setOTPsend(true)
          window.confirmationResult = confirmationResult;
        })
        .catch((error) => {
          console.log(error);
          alert("Please Try Again !!!")
        })
    }
  }

  useEffect(() => {
    state.formData.hc_patient_password == state.formData.hc_patient_retypePassword ?
    setCheckpass(true) : setCheckpass(false)
  }, [state.formData.hc_patient_password, state.formData.hc_patient_retypePassword]);

  useEffect(() => {
    const data = { hc_patient_phoneno: state.formData.hc_patient_phoneno }
    Axios.post('../api/patient/checkUser', data)
      .then(res => sethasPhoneNo(res.status))
      .catch(err => sethasPhoneNo(err.response.status))
  }, [state.formData.hc_patient_phoneno]);

  const handleSubmit = (e) => {
    props.setCloseBtnAppear()
    setState({
      ...state,
      isLoading: true,
    })

    const headers = {
      'Content-Type': 'application/json',
      "authorization": `Bearer ${authToken.token}`
    }
    const file = new FormData();
    file.append('photo', imageFile);

    const data = state.formData
    data.hc_patient_address = {
      upazila: data.address_upazila,
      district: data.address_district
    }
    delete data.address_upazila;
    delete data.address_district;
    delete data.address_city;

    if (imageFile) {
      try {
        Axios.post(`api/file/avaterUpload/Patient`, file, { headers })
          .then(res => {
            data.hc_patient_avatar = res.data
            data.hc_patient_password = "123123"
            patientRegistration(data)
          })
      } catch (error) {
        setState({
          ...state,
          isLoading: false,
        });
      }
    } else if (authToken.role == 'Doctor' || authToken.role == 'Hospital') {
      data.hc_patient_password = "123123"
      patientRegistration(data)
    } else {
      data.hc_patient_phoneno == "" || data.hc_patient_password == "" ?
        errorHandle("Please provide a phone number & password...") :
        data.hc_patient_password === data.hc_patient_retypePassword ?
          patientRegistration(data) : errorHandle("Password did not match!!!")
    }
  };

  const handleChange = (date) => {
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    if (date !== null) {
      setState({
        ...state,
        date: date,
        formData: {
          ...state.formData,
          hc_patient_date_of_birth: `${month[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`,
        }
      })
    } else {
      setState({
        ...state,
        date: date,
        formData: {
          ...state.formData,
          birthdate: date,
        },

        startDate: date,
      });
    }
  };
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setimageFile(event.target.files[0])
      let reader = new FileReader();
      reader.onload = (e) => {
        setState({
          ...state,
          imageAvatar: e.target.result,
          htmlelement: (
            <div className="addpersonpage">
              <img
                className="netimage"
                srcSet={e.target.result}
                alt="profileImage"
              />
            </div>
          ),
        });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  const setCloseBtnAppear = () => {
    setState({
      ...state,
      isCloseBtnAppear: false,
    });
  };
  const onImageRemove = () => {
    setState({
      ...state,
      imagefile: "",
      imageAvatar: "",
      htmlelement: (
        <div className="addpersonpage">
          <i className="fa fa-user fa-8x" aria-hidden="true"></i>
        </div>
      ),
    });
  };
  const onEdit = (e) => {
    const formData = state.formData;
    setState({
      ...state,
      formData: {
        ...formData,
        [e.target.name]: e.target.value,
      },
    });
  };
  useEffect(() => {
    const district = data.filter(item => item.Division === state.formData.address_city)
    setSelectDivision(district);
  }, [state.formData.address_city]);

  return state.isLoading ? (
    <div className="addpersonpage">
      <i className="fas fa-spinner fa-pulse fa-2x"></i>
    </div>
  ) : (
    <div className="addpersonpage">
      <div id="recaptcha-container"></div>
      {
        OTPsend ?
          <>
            <form onSubmit={submitOTP}>
              <div className="first_section">
                <div className="form-row">
                  <div className="col-md-6 mb-3">
                    <b><label htmlFor="firstname">OTP</label></b>
                    <input
                      name="otp"
                      type="number"
                      className="form-control"
                      id="firstname"
                      value={OTP}
                      onChange={(e) => setOTP(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <button className="btn btn-warning btn-sm" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </> :
          <div className="container main_section">
            <div className="row">
              <div className="col-sm">
                <NewPersonDetailsForm
                  handleSubmit={authToken.role==="Doctor" && authToken.token ? 
                    handleSubmit: sendOTP}
                  onEdit={onEdit}
                  data={data}
                  hasPhoneNo={hasPhoneNo}
                  checkpass={checkpass}
                  selectDivision={selectDivision}
                  setCloseBtnAppear={setCloseBtnAppear}
                  date={state.date}
                  htmlelement={state.htmlelement}
                  handleChange={handleChange}
                  onImageRemove={onImageRemove}
                  onImageChange={onImageChange}
                ></NewPersonDetailsForm>
              </div>
            </div>
          </div>
      }

    </div>
  );
  // }
}
export default AddPersonDetails;
