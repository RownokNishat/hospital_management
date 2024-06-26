import React ,{ useState,useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import AlertDialogBox from "../DailogBoxes/alertdailogbox";
import ErorrDialogBox from "../DailogBoxes/errordaologbox";
import EditPersonDetailsForm from "./editpersondetailsform";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import Axios from 'axios'

const EditPersonDetails =()=> {
  const { patientid } = useParams()
  const auth = useSelector((state) => state.AuthReducer);
  const headers={
    "Content-Type": "application/json",
    authorization: `Bearer ${auth.token}`,
  }
  const [image, setImage] = useState(null)
  const [imageChanged, setimageChanged] = useState(false);
  const [state, setState] = useState({
    date: "",
    startDate: "",
    image: "",
    profileHtmlelEment: (
      <i className="fa fa-user fa-8x" aria-hidden="true"></i>
    ),
    isLoading: false,
    openAlertDailog: false,
    openErrorDailog: false,
    collectionName: "Patient",

    personDetails: {
      hc_patient_firstName:"",
      hc_patient_lastName:"",
      hc_patient_sex:"",
      hc_patient_occupation:"",
      hc_patient_date_of_birth:"",
      hc_patient_bloodGroup:"",
      hc_patient_phoneno:"",
      hc_patient_marital_status:"",
      hc_patient_email:"",
      hc_patient_avatar:(
        <i className="fa fa-user fa-8x" aria-hidden="true"></i>
      )
    }
  })

  const patientData=()=>{
    Axios.get(`../../api/getProfileDetails/${patientid}`,{headers})
      .then(res=>{
        setState({
          ...state,
          personDetails:res.data.patient
        })
      })
      .catch(error=> console.log(error))
  }
  useEffect(() => {
    patientData()
  }, []);

  const updatePatientDetails=(data)=>{
    Axios.post(`../api/patient/updatePatientDetails`,data,{headers})
      .then(()=>{
        setState({
          ...state,
          isLoading: false
        })
      })
      .catch(error=>console.log(error))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setState({
      ...state,
      isLoading: true
    })
    const data=state.personDetails
    // data.hc_patient_address= {
    //   upazila:state.personDetails.upazila,
    //   district:state.personDetails.district
    // }
    // delete data.district
    // delete data.upazila
    // delete data.hc_patient_diagnosis_test_result
    // delete data.hc_patient_prescription
    const file = new FormData();
    file.append('photo', image);
    if(imageChanged){
      Axios.post(`../api/file/avaterUpload/Patient`, file, { headers })
      .then(res => { 
        data.hc_patient_avatar = res.data
        updatePatientDetails(data)
      })
      .catch(err => console.log(err))
    }else{
      updatePatientDetails(data)
    }
  };
  const handleErrorDailog = () => {
    setState({
      ...state,
      openErrorDailog: true,
    });
  };
  const closeErrorDailog = () => {
    setState({
      ...state,
      openErrorDailog: false,
    });
  };
  const handleChange = (date) => {
    if (date !== null) {
      const birthDate = new Date(date);
      const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      setState({
        ...state,
        personDetails: {
          ...state.personDetails,
          hc_patient_date_of_birth: `${month[birthDate.getMonth()]} ${birthDate.getDate()} ${birthDate.getFullYear()}`,
        },
        date: date,
        startDate: date,
      });
    } else {
      setState({
        ...state,
        personDetails: {
          ...state.personDetails,
          hc_patient_date_of_birth: date,
        },
        date: date,
        startDate: date,
      });
    }
  };
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setimageChanged(true)
      setImage(event.target.files[0])
      let reader = new FileReader();
      reader.onload = (e) => {
        setState({
          ...state,
          personDetails: {
            ...state.personDetails,
            hc_patient_avatar: e.target.result,
          },
        });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  const onImageRemove = () => {
    setState({
      ...state,
      personDetails: {
        ...state.personDetails,
        hc_patient_avatar: "",
      },
      image: "",
    });
  };

  const onEdit = (e) => {
    setState({
      ...state,
      personDetails: {
        ...state.personDetails,
        [e.target.name]: e.target.value,
      },
    });
  };
  // const onEditAddress = (e) => {
  //   setState({
  //     ...state,
  //     personDetails: {
  //       ...state.personDetails,
  //       hc_patient_address:{[e.target.name]: e.target.value}
  //     },
  //   });
  // };

  const handleSetOpenDailog = () => {
    setState({
      ...state,
      setAlertOpenDailog: false,
      openAlertDailog: false,
    });
  };

  // render() {
    if (state?.personDetails?.imgaeurl === "") {
      state.profileHtmlelEment = (
        <div className="editpersondetailspage">
          <i className="fa fa-user fa-8x" aria-hidden="true"></i>
        </div>
      );
    } else {
      state.profileHtmlelEment = (
        <div className="editpersondetailspage">
          <img
            className="netimage"
            srcSet={state.personDetails?.imgaeurl}
            alt=""
          />
        </div>
      );
    }

    return state.isLoading ? (
      <div className="editpersondetailspage">
        <i
          className="fas fa-spinner fa-pulse fa-4x"
          style={{ position: "fixed", top: "50%", left: "50%" }}
        ></i>
      </div>
    ) : (
      <div className="editpersondetailspage">
        <AlertDialogBox
          openDailog={state.openAlertDailog}
          setOpenDailog={state.setOpenAlertDailog}
          onSetOpenDailog={handleSetOpenDailog}
          title="Update"
          des="successfully updated"
        ></AlertDialogBox>
        <ErorrDialogBox
          openDailog={state.openErrorDailog}
          onSetOpenDailog={closeErrorDailog}
          title="Error"
          des="Someting went wrong. Try again"
        ></ErorrDialogBox>
        <EditPersonDetailsForm
          handleSubmit={handleSubmit}
          onEdit={onEdit}
          // onEditAddress={onEditAddress}
          collectionName={state.collectionName}
          handleChange={handleChange}
          personDetails={state.personDetails}
          profileHtmlelEment={state.profileHtmlelEment}
          onImageRemove={onImageRemove}
          onImageChange={onImageChange}
        ></EditPersonDetailsForm>
      </div>
    );
  }
export default EditPersonDetails
