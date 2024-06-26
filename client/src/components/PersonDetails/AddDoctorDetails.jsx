import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import NewDoctorDetailsForm from "./NewDoctorDetailsForm";
import "./addpersonDetails.css";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import AlertDialogBox from "../DailogBoxes/alertdailogbox";
import ErorrDialogBox from "../DailogBoxes/errordaologbox";
import {hospitalDoctors} from '../../redux/reducers/hospital/hospitalAction'

const AddDoctorDetails = (props) => {
  const dispatch= useDispatch()
  const [doctorExistHospital, setdoctorExistHospital] = useState(null);
  const [emailPhone, setEmailPhone] = useState('');
  const [statusCode, setstatusCode] = useState(null);
  const [imageAvaterFile, setimageAvaterFile] = useState(null);
  const [imageNIDFile, setimageNIDFile] = useState(null);
  const auth = useSelector((state) => state.AuthReducer);
  const [hasDoctor, sethasDoctor] = useState(null);
  const [searchButton, setsearchButton] = useState(true);
  const [searchInput, setsearchInput] = useState(false);

  const [education, setEducation] = useState([{ degree: "", title: "" }]);
  const [courseDone, setcourseDone] = useState([{ degree: "", title: "" }]);
  const [consultant, setConsultant] = useState([{consultant: ""}]);

  const [state, setState] = useState({
    imageAvatar: "",
    imageNID:"",
    avatarurl: "",
    date: null,
    // startDate: new Date(),
    isLoading: false,
    openAlertDailog: false,
    openErrorDailog: false,
    htmlelementDoctorAvater: <i className="fa fa-user fa-8x" aria-hidden="true"></i>,
    htmlelementDoctorNID: <i className="fa fa-id-card fa-8x" aria-hidden="true"></i>,

    formData: {
      hc_doctor_banglaName: "",
      hc_doctor_englishName: "",
      hc_doctor_email: "",
      hc_doctor_phoneno: "",
      hc_doctor_NID: "",
      hc_doctor_sex: "",
      hc_doctor_nid_pic: "",
      hc_doctor_avatar: "",
      hc_doctor_specialist: "",
      hc_doctor_relegion: "",
      hc_doctor_date_of_birth: "",
      hc_doctor_password: "123123",
      hc_doctor_address: "",
      hc_doctor_BMDC_reg_no: "",
      hc_doctor_FELLOW_id: "",
      hc_doctor_medicale_name: "",
      hc_doctor_education: "",
      hc_doctor_job_title:"",
      hc_doctor_course_done: "",
      hc_doctor_consultant: "",
      hc_doctor_serial_no: "",
      address_upazila:"",
      address_district:"",
      emailDisable:false,
      phoneDisable:false
    },
  });

  const handleSearchDoctor=()=>{
    const e_pattern= /^[A-Za-z._0-9]{2,}@[A-Za-z]{3,}[.]{1}[A-Za-z]{2,6}$/;
    const p_pattern= /^[0-9]{11}$/;

    if(p_pattern.test(emailPhone.trim())){
      setState({
        ...state,
        formData:{
          ...state.formData,
          hc_doctor_phoneno: emailPhone,
          phoneDisable:true
        }
      })
      setsearchButton(false)
    }else if(e_pattern.test(emailPhone.trim())){
      setState({
        ...state,
        formData:{
          ...state.formData,
          hc_doctor_email: emailPhone,
          emailDisable:true
        }
      })
      setsearchButton(false)
    }else {
      setsearchButton(true)
    }
  }

  useEffect(() => {
    props.openDailog ? handleSearchDoctor() : setstatusCode(null)
  }, [emailPhone,props.openDailog])


  useEffect(() => {
    const data = hasDoctor?.hc_doctor_of_hospital?.filter(i=>i==auth?.UID)
    data?.length==0 ? setdoctorExistHospital(true):setdoctorExistHospital(false)
  }, [hasDoctor]);


  const DoctorRegistration = (drData) => {
    const headers={
      "Content-Type": "application/json",
      "authorization":`Bearer ${auth?.token}`
    }

    const data={
      hc_doctor_phoneno: emailPhone,
      hc_doctor_email: emailPhone
    }
    drData?.hc_doctor_BMDC_reg_no || drData?.hc_doctor_NID ?

    Axios.post(`api/doctor/registration`, drData, { headers })
      .then((res) => {
        dispatch(hospitalDoctors(res.data))
        setstatusCode(null)
        setState({
          ...state,
          isLoading: false,
          openAlertDailog:true
        });
      })
      .catch((error) => 
        console.log(error)
      ):

      Axios.post(`api/doctor/registration`, data, { headers })
      .then((res) => {
        setstatusCode(res.status)
        sethasDoctor(res.data.message[0])
        setsearchInput(true)
        setState({
          ...state,
          isLoading: false,
        });
      })
      .catch((error) => 
        setState({
          ...state,
          isLoading: false,
        })
      )
  };

  const addExistDoctorToHospital=()=>{
    setsearchInput(false)
    const headers={
      "Content-Type": "application/json",
      "authorization":`Bearer ${auth?.token}`
    }
    const data={
      doctorId:hasDoctor._id
    }
    Axios.post(`api/doctor/addDoctorToHospital`,data ,{headers})
      .then(r=>{
        Axios.get(`api/hospital/filterHospitalDoctors`, {headers})
        .then(res => {
          dispatch(hospitalDoctors(res.data))
          props.onSetOpenDailog()
        })
        .catch(error => {
          console.log(error);
        })
      })
      .catch(err=>console.log(err))
  }

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
    const nid = new FormData();
    nid.append("nid", imageNIDFile);

    if (imageAvaterFile) {
      try {
        Axios.post(`api/file/avaterUpload/Doctor`, photo, { headers })
          .then((res) => {
            const data = state.formData;
            data.hc_doctor_avatar = res.data;

            if(imageNIDFile){
              Axios.post(`api/file/avaterUpload/Doctor`, nid, { headers })
              .then((res) =>{
                data.hc_doctor_nid_pic = res.data
                data.hc_doctor_address = {
                  upazila: data.address_upazila ,
                  district: data.address_district
                };
                delete data.address_upazila;
                delete data.address_district;
                DoctorRegistration(data);
              })
              .catch(err=>
                setState({
                ...state,
                isLoading: false,
              })) 
            }else{
              data.hc_doctor_address = {
                upazila: data.address_upazila ,
                district: data.address_district
              };
              delete data.address_upazila;
              delete data.address_district;
              DoctorRegistration(data);
            }
            
          })
          .catch((err) => {
            console.log(err)
            setState({
              ...state,
              isLoading: false,
            })
          });
      } catch (error) {
        console.log("Add Doctor Faild");
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
    props.onSetOpenDailog()
    setState({
      ...state,
      openAlertDailog: false,
    });
  };
  const closeErrorDailog = () => {
    props.onSetOpenDailog()
    setState({
      ...state,
      openErrorDailog: false,
    });
  };

  const handleChange = (date) => {
    const month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    console.log("handle change",date);
    if (date !== null) {
      console.log("If",date);
      setState({
        ...state,
        date: date,
        formData: {
          ...state.formData,
          hc_doctor_date_of_birth: `${
            month[date.getMonth()]
          } ${date.getDate()} ${date.getFullYear()}`,
        },
      });
    } else {
      console.log("else",date);
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
      let reader = new FileReader();
      event.target.id =='hc_doctor_avatar' ? setimageAvaterFile(event.target.files[0]):setimageNIDFile(event.target.files[0])
      event.target.id =='hc_doctor_avatar' ?
      reader.onload = (e) => {
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
        })
      } :
      reader.onload = (e) => {
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
        })
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const onImageRemove = (event) => {
    event.target.id =='hc_doctor_avatar' ?
    setState({
      ...state,
      imageAvaterfile: "",
      imageAvatar: "",
      htmlelementDoctorAvater: (
        <div className="addpersonpage">
          <i className="fa fa-user fa-8x" aria-hidden="true"></i>
        </div>
      ),
    }):
    setState({
      ...state,
      imageNIDfile: "",
      imageNID:"",
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
    setState({
      ...state,
      formData: {
        ...state.formData,
        hc_doctor_education:education,
        hc_doctor_course_done: courseDone,
        hc_doctor_consultant: consultant,
      },
    })
  }, [education, courseDone, consultant])

  // Education
  const handleeducationInput = (e, index) => {
    const { name, value } = e.target;
    const list = [...education];
    list[index][name] = value;
    setEducation(list);
  };

  const removeeducation = (index) => {
    const list = [...education];
    list.splice(index, 1);
    setEducation(list);
  };

  const addeducation = () => {
    setEducation([...education, { degree: "", title: "" }]);
  };

  //Course Done
  const handlecourseDoneInput = (e, index) => {
    const { name, value } = e.target;
    const list = [...courseDone];
    list[index][name] = value;
    setcourseDone(list);
  };

  const removecourseDone = (index) => {
    const list = [...courseDone];
    list.splice(index, 1);
    setcourseDone(list);
  };

  const addcourseDone = () => {
    setcourseDone([...courseDone, { degree: "", title: "" }]);
  };

  // Consultant
  const handleConsultantInput = (e, index) =>{
    const { name, value } = e.target;
    const list = [...consultant];
    list[index][name] = value;
    setConsultant(list);
  }

  const addConsultant = () => {
    setConsultant([...consultant, { consultant: "" }]);
  };

  const removeConsultant = (index) => {
    const list = [...consultant];
    list.splice(index, 1);
    setConsultant(list);
  };

  return state.isLoading ? (
    <div className="addpersonpage">
      <i className="fas fa-spinner fa-pulse fa-2x"></i>
    </div>
  ) : (
    <div className="addpersonpage">
      <div className="container main_section">
        <AlertDialogBox
          openDailog={state.openAlertDailog}
          onSetOpenDailog={closeAlertDailog}
          title="Added"
          des="New doctor has been added successfully"
        ></AlertDialogBox>
        <ErorrDialogBox
          openDailog={state.openErrorDailog}
          onSetOpenDailog={closeErrorDailog}
          title="Error"
          des="Someting went wrong. Try again"
        ></ErorrDialogBox>
        <div className="row">
          <div className="col-sm">
            <div className="form-row">
              <div className="col-md-12 mb-3">
                <label htmlFor="phonenumber">Email Address or Phone no</label>
                <input
                  name="phone_email"
                  type="text"
                  disabled={searchInput}
                  className="form-control"
                  id="phonenumber"
                  value={emailPhone}
                  onChange={(e)=>setEmailPhone(e.target.value)}
                />
              </div>
            </div>
            
            <button 
              className={!searchButton ? "border-0 p-2 w-100 bg-primary rounded text-light":"border-0 p-2 w-100 bg-secondary rounded text-light" }
              disabled={searchButton}
              onClick={statusCode ? ()=>{
                setsearchInput(false)
                setstatusCode(null)
                setState({
                  ...state,
                  formData:{
                    ...state.formData,
                    hc_doctor_email: "",
                    hc_doctor_phoneno: "",
                    phoneDisable:false,
                    emailDisable:false,
                  }})
              } : DoctorRegistration }
            >{statusCode ? "Back": "Search"}</button>
            {
              statusCode===200 && hasDoctor ? 
              <>
                <div style={{
                    width: '500px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop:'10px'
                }}>

                  <img style={{
                      width: '200px',
                      height: '200px'
                  }} src={hasDoctor?.hc_doctor_avatar}></img>
                    <p>{hasDoctor?.hc_doctor_englishName}</p>
                    <p>{hasDoctor?.hc_doctor_phoneno}</p>
                    <p>Specialist: {hasDoctor.hc_doctor_specialist}</p>
                    <p>BMDC No: {hasDoctor.hc_doctor_BMDC_reg_no}</p>
                    <p>{hasDoctor.hc_doctor_medicale_name}</p>
                </div>
                <button 
                className={doctorExistHospital ? 
                  "border-0 p-2 w-100 bg-primary rounded text-light":"border-0 p-2 w-100 bg-secondary rounded text-light" }
                onClick={addExistDoctorToHospital}
                disabled={!doctorExistHospital}
              >
                Add to Hospital</button>
              </> : null
            }
            { 
              statusCode===203 ?
                <NewDoctorDetailsForm
                  handleSubmit={handleSubmit}
                  onEdit={onEdit}
                  // startDate={state.startDate}
                  date={state.date}
                  htmlelementDoctorAvater={state.htmlelementDoctorAvater}
                  htmlelementDoctorNID={state.htmlelementDoctorNID}
                  formData={state.formData}

                  education={education}
                  handleeducationInput={handleeducationInput}
                  removeeducation={removeeducation}
                  addeducation={addeducation}

                  courseDone={courseDone}
                  handlecourseDoneInput={handlecourseDoneInput}
                  removecourseDone={removecourseDone}
                  addcourseDone={addcourseDone}

                  consultant={consultant}
                  handleConsultantInput={handleConsultantInput}
                  addConsultant={addConsultant}
                  removeConsultant={removeConsultant}

                  handleChange={handleChange}
                  onImageRemove={onImageRemove}
                  onImageChange={onImageChange}
                />
                : null
            }
          </div>
        </div>
      </div>
    </div>
  );
  // }
};
export default AddDoctorDetails;
