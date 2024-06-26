import React, { useState, useEffect } from "react";
import "../../PersonDetails/addpersonDetails.css";
import Axios from "axios";
import { useSelector } from "react-redux";
import Styles from "../../PersonDetails/NewDoctorDetailsForm.module.css";
import ErorrDialogBox from "../../DailogBoxes/errordaologbox";
import AlertDialogBox from "../../DailogBoxes/alertdailogbox";

const StudentProfileUpdate = (props) => {
  const [isAvailable, setIsAvailable] = useState(true);
  const auth = useSelector((state) => state.AuthReducer);

  const [state, setState] = useState({
    isLoading: false,
    openAlertDailog: false,
    openErrorDailog: false,
    formData: {
      hc_student_education: [{ degree: "", title: "" }]
    },
  });

  useEffect(() => {
    setState({
      ...state,
      formData: props.doctorState
    })
  }, [props]);

  const onEditAddress = (e) => {
    setIsAvailable(false)
    const { name, value } = e.target
    const data = state.formData
    setState({
      ...state,
      formData: {
        ...data,
        hc_student_address: {
          ...state.formData.hc_student_address,
          [name]: value
        }
      }
    })
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    setState({
      ...state,
      isLoading: true,
    });

    Axios.post(`/api/student/updateStudentProfile`, state.formData, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${auth.token}`,
      },
    })
      .then((res) => {
        window.location.reload(true)
        setState({
          ...state,
          isLoading: false,
          openAlertDailog: true,
        });
      })
      .catch((error) =>
        setState({
          ...state,
          isLoading: false,
          openAlertDailog: true,
        })
      );
  };

  const onEdit = (e) => {
    setIsAvailable(false)
    const formData = state.formData;
    setState({
      ...state,
      formData: {
        ...formData,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleeducationInput = (e, index) => {
    setIsAvailable(false)
    const { name, value } = e.target;
    const list = [...state.formData?.hc_student_education];
    list[index][name] = value;
    setState({
      ...state,
      formData: {
        ...state.formData,
        hc_student_education: list
      },
    });
  };

  const removeeducation = (index) => {
    setIsAvailable(false)
    const list = [...state.formData?.hc_student_education];
    list.splice(index, 1);
    setState({
      ...state,
      formData: {
        ...state.formData,
        hc_student_education: list
      },
    });
  };

  const addeducation = () => {
    setIsAvailable(false)
    const list = [...state.formData?.hc_student_education, { degree: "", title: "" }];
    setState({
      ...state,
      formData: {
        ...state.formData,
        hc_student_education: list
      },
    });
    // setEducation([...state.formData?.hc_student_education, { degree: "", title: "" }]);
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
      {state.isLoading ? (
        <div className="patientlistpage">
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
          <form onSubmit={handleSubmit}>
            <div className="first_section">
              <div className="form-row">
                <div className="col-md-12 mb-3">
                  <label htmlFor="englishname">English name</label>
                  <input
                    name="hc_student_englishName"
                    type="text"
                    className="form-control"
                    value={state.formData.hc_student_englishName}
                    id="englishName"
                    onChange={onEdit}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="sex">Sex</label>
                  <select
                    name="hc_student_sex"
                    className="custom-select"
                    id="sex"
                    value={state.formData.hc_student_sex}
                    onChange={onEdit}
                    required
                  >
                    <option hidden>Select</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="phonenumber">Mobile</label>
                  <input
                    name="hc_student_phoneno"
                    type="text"
                    className="form-control"
                    id="phonenumber"
                    value={state.formData.hc_student_phoneno}
                    disabled={true}
                    onChange={onEdit}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="col-6 mb-3">
                  <label htmlFor="bmdcRegNo">BMDC Reg No</label>
                  <input
                    type="number"
                    name="hc_student_BMDC_reg_no"
                    className="form-control"
                    id="bmdcRegNo"
                    value={state.formData.hc_student_BMDC_reg_no}
                    disabled={true}
                    onChange={onEdit}
                  />
                </div>
                <div className="col-6 mb-3">
                  <label htmlFor="email">Session</label>
                  <input
                    type="text"
                    name="hc_student_session"
                    className="form-control"
                    id="email"
                    disabled={true}
                    value={state.formData.hc_student_session}
                    onChange={onEdit}
                  />
                </div>
              </div>

              <label htmlFor="address">Address</label>
              <div className="form-row">
                <div className="col-6 mb-3">
                  <input
                    name="upazila"
                    type="text"
                    className="form-control"
                    id="upazila"
                    placeholder='Upazila'
                    value={state.formData.hc_student_address?.upazila}
                    onChange={onEditAddress}
                  />
                </div>
                <div className="col-6 mb-3">
                  <input
                    name="district"
                    type="text"
                    className="form-control"
                    id="district"
                    value={state.formData.hc_student_address?.district}
                    placeholder='District'
                    onChange={onEditAddress}
                  />
                </div>
              </div>

              <label htmlFor="address">Education</label>
              <div className="form-row">
                {state.formData?.hc_student_education.map((x, i) => {
                  return (
                    <div key={i} className="">
                      <div className="d-flex">
                        <p className="mt-2">{i + 1}</p>

                        <div className="row">
                          <div className="col-5">
                            <input
                              id="address"
                              className="form-control w-100"
                              name="degree"
                              placeholder="Degree"
                              value={x.degree}
                              onChange={(e) => handleeducationInput(e, i)}
                            />
                          </div>
                          <div className="col-5">
                            <input
                              className="form-control w-100"
                              name="title"
                              placeholder="Title"
                              value={x.title}
                              onChange={(e) => handleeducationInput(e, i)}
                            />
                          </div>
                          <div className="col-2 d-flex">
                            {" "}
                            <div className="row">
                              <div className="col-6">
                                {state.formData?.hc_student_education.length !== 1 && (
                                  <button
                                    className={Styles.pastHisremoveButton}
                                    onClick={() => removeeducation(i)}
                                  >
                                    <i
                                      className="fa fa-trash"
                                      aria-hidden="true"
                                    ></i>
                                  </button>
                                )}
                              </div>

                              <div className="col-6">
                                {state.formData?.hc_student_education.length - 1 === i && (
                                  <button
                                    type="button"
                                    //className="btn btn-success"
                                    className={Styles.pastHisaddButton}
                                    onClick={addeducation}
                                  >
                                    <i
                                      className="fa fa-plus"
                                      aria-hidden="true"
                                    ></i>
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}


              </div>
            </div>

            <button className="btn btn-success savebtn" disabled={isAvailable} type="submit">
              Update
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default StudentProfileUpdate;
