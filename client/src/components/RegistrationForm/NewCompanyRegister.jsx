import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "../PersonDetails/addpersonDetails.css";
import Axios from "axios";
import { useSelector } from "react-redux";

const NewCompanyRegister = (props) => {
  const [imageAvaterFile, setimageAvaterFile] = useState(null);
  const [imageNIDFile, setimageNIDFile] = useState(null);
  const auth = useSelector((state) => state.AuthReducer);
  const [isAvailable, setIsAvailable] = useState(true);

  const [state, setState] = useState({
    imageAvatar: "",
    imageNID: "",
    avatarurl: "",
    date: null,
    // startDate: new Date(),
    isLoading: false,
    openAlertDailog: false,
    openErrorDailog: false,
    htmlelementDoctorAvater: (
      <i className="fa fa-user fa-8x" aria-hidden="true"></i>
    ),
    htmlelementDoctorNID: (
      <i className="fa fa-id-card fa-8x" aria-hidden="true"></i>
    ),

    formData: {
      hc_company_englishName: "",
      hc_company_email: "",
      hc_company_phoneno: "",
      hc_company_avatar: "",
      hc_company_password: "123123",
      hc_company_reg_no: "",
    },
  });

  const CompanyRegistration = (drData) => {
    setState({
      ...state,
      isLoading: true
    });

    Axios.post(`/api/company/registration`, drData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setState({
          ...state,
          isLoading: false,
          openAlertDailog: true,
        });
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setState({
      ...state,
      isLoading: true,
    });

    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${auth.token}`,
    };

    const photo = new FormData();
    photo.append("photo", imageAvaterFile);

    if (imageAvaterFile) {
      try {
        Axios.post(`api/file/avaterUpload/Company`, photo, { headers })
          .then((res) => {
            const data = state.formData;
            data.hc_company_avatar = res.data;

            CompanyRegistration(data);
          })
          .catch((err) => {
            console.log(err);
            setState({
              ...state,
              isLoading: false,
            });
          });
      } catch (error) {
        console.log("Add Company Faild");
        setState({
          ...state,
          isLoading: false,
        });
      }
    } else {
      window.alert("Failed to add a Doctor!!!");
      setState({
        ...state,
        isLoading: false,
      });
    }
  };

  const closeAlertDailog = () => {
    props.onSetOpenDailog();
    setState({
      ...state,
      openAlertDailog: false,
    });
  };
  const closeErrorDailog = () => {
    props.onSetOpenDailog();
    setState({
      ...state,
      openErrorDailog: false,
    });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      event.target.id == "hc_company_avatar"
        ? setimageAvaterFile(event.target.files[0])
        : setimageNIDFile(event.target.files[0]);
      event.target.id == "hc_company_avatar"
        ? (reader.onload = (e) => {
          setState({
            ...state,
            imageAvatar: e.target.result,
            htmlelementDoctorAvater: (
              <div className="addpersonpage">
                <img
                  className="netimage"
                  srcSet={e.target.result}
                  alt="profileImage"
                />
              </div>
            ),
          });
        })
        : (reader.onload = (e) => {
          setState({
            ...state,
            imageNID: e.target.result,
            htmlelementDoctorNID: (
              <div className="addpersonpage">
                <img
                  className="netimage"
                  srcSet={e.target.result}
                  alt="profileImage"
                />
              </div>
            ),
          });
        });
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const onImageRemove = (event) => {
    event.target.id == "hc_company_avatar"
      ? setState({
        ...state,
        imageAvaterfile: "",
        imageAvatar: "",
        htmlelementDoctorAvater: (
          <div className="addpersonpage">
            <i className="fa fa-user fa-8x" aria-hidden="true"></i>
          </div>
        ),
      })
      : setState({
        ...state,
        imageNIDfile: "",
        imageNID: "",
        htmlelementDoctorNID: (
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
    const data = {
      hc_company_phoneno: state.formData.hc_company_phoneno,
      hc_company_email: state.formData.hc_company_email,
    }
    Axios.post(`/api/company/checkUser`, data)
      .then(res => setIsAvailable(false))
      .catch(err => setIsAvailable(true))
  }, [state.formData.hc_company_phoneno, state.formData.hc_company_email]);

  return (
    <div>
      {
        state.isLoading ? <div className="patientlistpage">
          <i className="fas fa-spinner fa-pulse fa-2x "></i>
        </div> : <form onSubmit={handleSubmit}>
          <div className="first_section">
            <div className="form-row">
              <div className="col-md-12 mb-3">
                <label htmlFor="englishname">Company name</label>
                <input
                  name="hc_company_englishName"
                  type="text"
                  className="form-control"
                  id="englishName"
                  onChange={onEdit}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="col-md-12 mb-3">
                <label htmlFor="phonenumber">Mobile</label>
                <input
                  name="hc_company_phoneno"
                  type="text"
                  className="form-control"
                  id="phonenumber"
                  onChange={onEdit}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="col-md-12 mb-3">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="hc_company_email"
                  className="form-control"
                  id="email"
                  onChange={onEdit}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="col-12 mb-3">
                <label htmlFor="bmdcRegNo">Company Reg No</label>
                <input
                  type="number"
                  name="hc_company_reg_no"
                  className="form-control"
                  id="bmdcRegNo"
                  onChange={onEdit}
                />
              </div>
            </div>
          </div>

          <div className="container">
            <div>
              <div className="row second_section">
                <div className="col-6">
                  <div className="row">
                    <div className="clo-12">
                      <div className="profileimage">
                        {state.htmlelementDoctorAvater}
                      </div>
                    </div>
                    <div className="col-12 btn_section">
                      <label htmlFor="hc_company_avatar" className="selectimage">
                        Upload Company Logo
                      </label>
                      <input
                        id="hc_company_avatar"
                        type="file"
                        onChange={onImageChange}
                      />
                      <button
                        type="button"
                        id="hc_company_avatar"
                        className="removebutton"
                        onClick={onImageRemove}
                      >
                        {" "}
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button className="btn btn-success savebtn" type="submit" disabled={isAvailable}>
            Register
          </button>
        </form>
      }

    </div>
  );
};

export default NewCompanyRegister;
