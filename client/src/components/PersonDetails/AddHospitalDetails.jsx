import React, { useState, useEffect } from "react";
import NewHospitalRegister from "../RegistrationForm/NewHospitalRegister";
import { useSelector } from "react-redux";
import Axios from 'axios'

const AddHospitalDetails = (props) => {
  const [imageFile, setimageFile] = useState(null);
  const [ambulance, setAmbulance] = useState([{ ambulanceNo: "" }]);
  const auth = useSelector(state => state.AuthReducer)
  const [isAvailable, setIsAvailable] = useState(true);
  const [state, setState] = useState({
    imageAvatar: "",
    avatarurl: "",
    isLoading: false,
    htmlelement: <i className="fa fa-user fa-8x" aria-hidden="true"></i>,

    formData: {
      hc_hospital_bangla_name: "",
      hc_hospital_english_name: "",
      hc_hospital_email: "",
      hc_hospital_phoneno: "",
      hc_hospital_password: "123123",
      upazila: "",
      district: "",
      hc_hospital_DGHS_reg_no: "",
      hc_hospital_contact_no: "",
      hc_hospital_logo: "",
      hc_hospital_ambulance_contact_no: "",
    }
  });

  const hospitalRegistration = (data) => {
    Axios.post(`api/hospital/registration`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status === 201) {
          props.handleSuccessDailog()
          setAmbulance([{ ambulanceNo: "" }])
          setState({
            ...state,
            isLoading: false,
            imageAvatar: "",
            avatarurl: "",
            htmlelement: <i className="fa fa-user fa-8x" aria-hidden="true"></i>,
            formData: {
              hc_hospital_bangla_name: "",
              hc_hospital_english_name: "",
              hc_hospital_email: "",
              hc_hospital_phoneno: "",
              hc_hospital_password: "123123",
              upazila: "",
              district: "",
              hc_hospital_DGHS_reg_no: "",
              hc_hospital_contact_no: "",
              hc_hospital_logo: "",
              hc_hospital_ambulance_contact_no: "",
            }
          })
        } else {
          props.handleErrorDailog()
        }
      })
      .catch(error => console.log(error))
  }


  //ambulance Contact No
  const handleAmbulanceNoInput = (e, index) => {
    const { name, value } = e.target;
    const list = [...ambulance];
    list[index][name] = value;
    setAmbulance(list);
  };

  const removeAmbulanceNo = (index) => {
    const list = [...ambulance];
    list.splice(index, 1);
    setAmbulance(list);
  };

  const addAmbulanceNo = () => {
    setAmbulance([...ambulance, { ambulanceNo: "" }]);
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    setState({
      ...state,
      isLoading: true,
    })

    const headers = {
      'Content-Type': 'application/json',
      "authorization": `Bearer ${auth.token}`
    }
    const file = new FormData();
    file.append('photo', imageFile);
    if (imageFile) {
      try {
        Axios.post(`api/file/avaterUpload/Hospital`, file, { headers })
          .then(res => {
            const data = state.formData
            data.hc_hospital_logo = res.data
            data.hc_hospital_address = {
              upazila: data.upazila,
              district: data.district
            }
            delete data.upazila;
            delete data.district;
            setState({
              ...state,
              isLoading: false
            })
            hospitalRegistration(data)
          })
          .catch(err => props.handleErrorDailog(err))
      } catch (error) {
        console.log("Add Hospital Faild");
        setState({
          ...state,
          isLoading: false,
        });
      }
    } else {
      window.alert("Failed to add a Hospital!!!")
      setState({
        ...state,
        isLoading: false,
      })
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
    setState({
      ...state,
      formData: {
        ...state.formData,
        hc_hospital_ambulance_contact_no: ambulance
      },
    })
  }, [ambulance])

  useEffect(() => {
    const data = {
      hc_hospital_email: state.formData.hc_hospital_email,
      hc_hospital_phoneno: state.formData.hc_hospital_phoneno
    }
    Axios.post(`../api/hospital/checkUser`, data)
      .then(res => setIsAvailable(false))
      .catch(err => setIsAvailable(true))
  }, [state.formData.hc_hospital_email, state.formData.hc_hospital_phoneno]);


  return state.isLoading ? (
    <div className="addpersonpage">
      <i className="fas fa-spinner fa-pulse fa-2x"></i>
    </div>
  ) : (
    <div className="addpersonpage">
      <div className="container main_section">
        <div className="row">
          <div className="col-sm">
            <NewHospitalRegister
              handleSubmit={handleSubmit}
              onEdit={onEdit}
              isAvailable={isAvailable}
              ambulance={ambulance}
              handleAmbulanceNoInput={handleAmbulanceNoInput}
              removeAmbulanceNo={removeAmbulanceNo}
              addAmbulanceNo={addAmbulanceNo}
              htmlelement={state.htmlelement}
              onImageRemove={onImageRemove}
              onImageChange={onImageChange}
            ></NewHospitalRegister>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHospitalDetails;
