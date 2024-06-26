import Axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Styles from "./SearchDoctors.module.css";
import FormPrompt from "../../DailogBoxes/formprompt";
import Appoinment from "../Appoinment/Appoinment";
import AlertDialogBox from "../../DailogBoxes/alertdailogbox";
import ErorrDialogBox from "../../DailogBoxes/errordaologbox";

const SearchDoctors = () => {
  const [selectDoctorID, setSelectDoctorID] = useState(null);
  const [selectDoctorName, setSelectDoctorName] = useState(null);
  const [specialist, setSpecialist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [doctor, setDoctor] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [openConfirmDailog, setopenConfirmDailog] = useState(false);
  const [filter, setFilter] = useState({
    specialist: "",
    district: "",
  });

  const [state, setState] = useState({
    serachText: "",
    isLoading: false,
    isCloseBtnAppear: true,
    openFormDailog: false,
    openAlertDailog: false,
    openErrorDailog: false,
    openConfirmDailog: false,
    doctorOfHospital: [],
  });
  const [selectDoctor, setSelectDoctor] = useState(null);

  const onChange = (event) => {
    const { name, value } = event.target;
    setFilter((prevUser) => {
      return {
        ...prevUser,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${auth.token}`,
    };

    setState({
      ...state,
      isLoading: true,
    });
    Axios.post("/api/hospital/getfilterSpecialist", filter, { headers })
      .then((data) => {
        setDoctor(data);
        setState({
          ...state,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [filter]);


  const auth = useSelector((state) => state.AuthReducer);

  useEffect(() => {
     setState({
       ...state,
       isLoading: true,
     });
     const headers = {
       "Content-Type": "application/json",
       authorization: `Bearer ${auth.token}`,
     };
     Axios.get(`/api/hospital/filterSpecialist`, {
       headers,
     })
       .then((res) => {
         setSpecialist(res.data);
         setState({
           ...state,
           isLoading: false,
         });
       })
       .catch((error) => {
         console.log(error);
       });
  }, [isLoading]);

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
      // openConfirmDailog: false,
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
      <AlertDialogBox
        openDailog={state.openAlertDailog}
        onSetOpenDailog={closeAlertDailog}
        title="Added"
        des="Appointment Request Send Successfully !!!"
      ></AlertDialogBox>
      <ErorrDialogBox
        openDailog={state.openErrorDailog}
        onSetOpenDailog={closeErrorDailog}
        title="Error !!!"
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
      <h3>Search doctors here</h3>
      <div className='form-row'>
        <select
          name="specialist"
          className="form-select btn  dropdown-toggle mt-2 mb-2 text-start col-md-4"
          aria-haspopup="true"
          aria-expanded="false"
          value={filter?.specialist || "Select Specialist"}
          onChange={(e) => onChange(e)}
        >
          <option hidden>Select Specialist</option>
          {specialist?.doctorsSpecialist?.map((special, index) => {
            return (
              <option key={index} value={special}>
                {special}
              </option>
            );
          })}
        </select>

        <select
          name="district"
          className="form-select btn dropdown-toggle mt-2 mb-2 text-start col-md-4"
          aria-haspopup="true"
          aria-expanded="false"
          value={filter?.address?.district || "Select District"}
          onChange={(e) => onChange(e)}
        >
          <option hidden>Select District</option>
          {specialist?.hospitalAddress?.map((special, index) => {
            return (
              <option key={index} value={special}>
                {special}
              </option>
            );
          })}
        </select>
      </div>


      <h5>Available Doctors are:</h5>
      {state.isLoading ? (
        <div className='mt-5'>
          <i className="fas fa-spinner fa-pulse fa-2x "></i>
        </div>
      ) : doctor?.data?.length === 0 ? (
        <h5>No doctor Available</h5>
      ) : (
        <div className="row ">
          {doctor?.data?.map((p) => {
            const education = p.hc_doctor_education
              ?.filter((i) => i.degree != "BCS")
              .map((item, index) => item.degree + " (" + item.title + ")");

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
                    {p.hc_doctor_consultant && p.hc_doctor_consultant[0]?.consultant != "" &&
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
                      <span> Fees: </span>{p.hc_doctor_fees}
                    </p>
                  </div>
                  <div className={Styles.doctorAppoinment}>
                    <button
                      className="btn btn-success border-round"
                      onClick={() => {
                        if (auth.role && auth.token) {
                          setState({
                            ...state,
                            openFormDailog: true,
                            doctorOfHospital: p.hc_doctor_of_hospital,
                          });
                          setSelectDoctorID(p._id);
                          setSelectDoctorName(p.hc_doctor_englishName);
                        } else {
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
      )}
    </div>
  );
};

export default SearchDoctors;
