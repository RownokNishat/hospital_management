import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import Styles from "./Prescription.module.css";
import Axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PrescribedMedicine from "../PrescribedMedicine/PrescribedMedicine";
import GeneralExamination from "./GeneralExamination";
import GeneralExBaby from "./GeneralExBaby";
import GeneralOthers from "./GeneralOthers";
import GeneralExFemale from "./GeneralExFemale";
import SystemeticEx from "./SystemeticEx";
import Investigation from "./Investigation";
import PostOperativePtient from "./PostOperativePtient";
import {
  prescriptionData,
  diagnosisNames,
} from "../../redux/reducers/Prescription/prescriptionAction";
import Advice from "./Advice";
import FormPrompt from "../DailogBoxes/formprompt";

const Prescription = () => {
  const [disabled, setDisabled] = useState(true);
  const [selectedHospital, setSelectedHospital] = useState({});
  const [selectHospital, setSelectHospital] = useState(0);
  const [toggleHospital, settoggleHospital] = useState(true);
  const [autoCompleteDrugName, setautoCompleteDrugName] = useState([]);
  const [pastHistory, setPastHistory] = useState([{ history: "", case: "" }]);
  const [oldDrug, setOldDrug] = useState([""]);
  const [generalEx, setGeneralEx] = useState({});
  const [systemeticEx, setSystemicEx] = useState({});
  const [femaleDiagnosis, setFemaleDiagnosis] = useState({});
  const [generalExBaby, setGeneralExBaby] = useState({});
  const [postOperativeEx, setPostOperativeEx] = useState({});
  const [generalExOther, setGeneralExOther] = useState({});

  const [familyHistorys, setFamilyHistorys] = useState([
    { familyHistorys: "" },
  ]);
  const [personalHistorys, setPersonalHistorys] = useState([
    { personalHistorys: "" },
  ]);
  const [dieatryHistorys, setDieatryHistorys] = useState([
    { dieatryHistorys: "" },
  ]);
  const [investigations, setInvestigations] = useState([
    { investigations: "" },
  ]);
  const [medicineList, setMedicineList] = useState([
    {
      med_type: "",
      med_name: "",
      med_important: false,
      med_dose_in_a_day: "",
      med_dose_days: "",
      med_dose_meal: "",
    },
  ]);

  const [followUp, setFollowUp] = useState("");
  const [findInd, setFindInd] = useState(0);
  const { patientid, appointmentid, prescriptionid } = useParams();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.AuthReducer);
  const diagnosisName = useSelector(
    (state) => state.prescriptionData.diagnosisName
  );

  const [today, setToday] = useState("");
  const [patientInfo, setPatientInfo] = useState(null);
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [complains, setComplains] = useState([{ complains: "" }]);
  const [diagonosis, setDiagonosis] = useState([{ diagonosis: "" }]);
  const [diagonosisUID, setDiagonosisUID] = useState([]);
  const [searchDiagonosis, setSearchDiagonosis] = useState(null);
  const history = useHistory();

  const [degreeData1, setDegreeData1] = useState("");
  const [degreeData2, setDegreeData2] = useState("");
  const [degreeData3, setDegreeData3] = useState("");

  const [openConfirmDailog, setopenConfirmDailog] = useState(false);

  const [state, setState] = useState({
    isLoadMoredata: false,
    isCloseBtnAppear: true,
    isDeleting: false,
    isLoading: false,
    openFormDailog: false,
    openAlertDailog: false,
    openErrorDailog: false,
    openConfirmDailog: false,
  });

  //advice
  const [advicelist, setAdviceList] = useState([]);

  const getAdviceDetails = (arr) => {
    const data = { Advice: arr };
    Axios.post(`../../api/prescription/diagnosis_Advices`, data)
      .then((res) => {
        setAdviceList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPrescriptionDataforEdit = (id, uri) => {
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${auth.token}`,
      patientid: id,
    };
    try {
      Axios.get(uri, { headers }).then((res) => {
        setDiagonosis(res.data.Diagnosis);
        setAlladvice(res.data.advice);
        setComplains(res.data.cheif_complain);
        setOldDrug(res.data.hc_p_cheif_drug_history);
        setPastHistory(res.data.hc_p_cheif_past_history);
        setPostOperativeEx(res.data.hc_p_ex_post_operative_patient);
        setGeneralExOther(res.data.hc_p_ex_others);
        setInvestigations(res.data.hc_p_investigation);
        setMedicineList(res.data.teratment);
        setFollowUp(res.data.follow_up);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const arr = [...new Set(diagonosisUID.flat())];
    getAdviceDetails(arr);
  }, [diagonosisUID]);

  useEffect(() => {
    const uri = `../../../api/patient/patient_prescription_Data`;
    if (prescriptionid) {
      getPrescriptionDataforEdit(prescriptionid, uri)
    } else {
    }
  }, [prescriptionid]);

  let ad = [];
  const [allAdvice, setAlladvice] = useState([]);

  const handleAdviceCheckBoxChange = (e) => {
    const { name, checked } = e.target;
    if (name === "selectAll") {
      let tempUser = advicelist.map((pd) => {
        return { ...pd, isChecked: checked };
      });

      setAdviceList(tempUser);
    } else {
      let tempUser = advicelist.map((pd) =>
        pd.Advice === name ? { ...pd, isChecked: checked } : pd
      );

      setAdviceList(tempUser);
    }
  };

  const handleAllFilterdAdvice = () => {
    advicelist.map((pd) => {
      if (pd?.isChecked) {
        ad.push(pd.Advice);
        setAlladvice(ad);
      }
    });

    setState({
      ...state,
      openFormDailog: false,
    });
  };

  // General Examination onChange

  const handleOnChange_G_EX = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    const generalExData = { ...generalEx };
    generalExData[id] = value;
    setGeneralEx(generalExData);
  };

  // In Case of Female handler

  const handleOnChange_EX_Female = (e) => {
    const field = e.target.id;
    const value = e.target.value;
    const femaleData = { ...femaleDiagnosis };
    femaleData[field] = value;
    setFemaleDiagnosis(femaleData);
  };

  // handle on Change Systemic Examination
  const handleOnChange_Systemic_EX = (e) => {
    const field = e.target.id;
    const value = e.target.value;
    const systemicData = { ...systemeticEx };
    systemicData[field] = value;
    setSystemicEx(systemicData);
  };

  const generalExBabyDataOnChange = (e) => {
    const field = e.target.id;
    const value = e.target.value;
    const babyExData = { ...generalExBaby };
    babyExData[field] = value;
    setGeneralExBaby(babyExData);
  };

  // handle Post Operative Patient

  const handlePostOperative = (e) => {
    const field = e.target.id;
    const value = e.target.value;
    const postOperativeData = { ...postOperativeEx };
    postOperativeData[field] = value;
    setPostOperativeEx(postOperativeData);
  };

  //handle Other Examination

  const handleOnChange_EX_Others = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    const generalExOtherData = { ...generalExOther };
    generalExOtherData[id] = value;
    setGeneralExOther(generalExOtherData);
  };

  //handle Family History to Other Examination

  const handleOnChangeFamilyHistory = (e, index) => {
    const { name, value } = e.target;
    const list = [...familyHistorys];
    list[index][name] = value;
    setFamilyHistorys(list);
  };

  const handleRemoveClickFamilyHistory = (index) => {
    const list = [...familyHistorys];
    list.splice(index, 1);
    setFamilyHistorys(list);
  };

  const handleAddClickFamilyHistory = () => {
    setFamilyHistorys([...familyHistorys, { familyHistorys: "" }]);
  };

  // handle Personal History to Other Examination

  const handleInputChangePersonalHistory = (e, index) => {
    const { name, value } = e.target;
    const list = [...personalHistorys];
    list[index][name] = value;
    setPersonalHistorys(list);
  };

  const handleRemoveClickPersonalHistory = (index) => {
    const list = [...personalHistorys];
    list.splice(index, 1);
    setPersonalHistorys(list);
  };

  const handleAddClickPersonalHistory = () => {
    setPersonalHistorys([...personalHistorys, { personalHistorys: "" }]);
  };

  // handle Dietary History to Other Examination

  const handleInputChangeDietaryHistory = (e, index) => {
    const { name, value } = e.target;
    const list = [...dieatryHistorys];
    list[index][name] = value;
    setDieatryHistorys(list);
  };

  const handleRemoveClickDietaryHistory = (index) => {
    const list = [...dieatryHistorys];
    list.splice(index, 1);
    setDieatryHistorys(list);
  };

  const handleAddClickDietaryHistory = () => {
    setDieatryHistorys([...dieatryHistorys, { dieatryHistorys: "" }]);
  };

  useEffect(() => {
    const generalExOtherData = { ...generalExOther };
    generalExOtherData.Family_history = familyHistorys;
    generalExOtherData.Personal_history = personalHistorys;
    generalExOtherData.Dietary_History = dieatryHistorys;
    setGeneralExOther(generalExOtherData);
  }, [familyHistorys, personalHistorys.dieatryHistorys]);

  // Investigation

  const handleSelectInvestigation = (i, value) => {
    const list = [...investigations];
    list[i]["investigations"] = value;
    setInvestigations(list);
  };
  const handleSelectDiagnosis = (i, value, UID) => {
    const list = [...diagonosis];
    const uid = [...diagonosisUID];
    list[i]["diagonosis"] = value;
    uid[i] = UID;
    setDiagonosis(list);
    setDiagonosisUID(uid);
  };

  const handleInputChangeInvestigation = (e, index) => {
    const { name, value } = e.target;
    const list = [...investigations];
    list[index][name] = value;
    setInvestigations(list);
  };

  const handleRemoveClickInvestigation = (index) => {
    const list = [...investigations];
    list.splice(index, 1);
    setInvestigations(list);
  };

  const handleAddClickInvestigation = () => {
    setInvestigations([...investigations, { investigations: "" }]);
  };

  const updatePrescription = (data, patientid, prescriptionid) => {
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${auth.token}`,
      patientid: patientid,
      prescriptionid: prescriptionid,
    };
    Axios.post("../../../api/patient/editPresentation", data, { headers }).then(
      (res) => {
        history.push(`../../../patientPrescription/${prescriptionid}`);
      }
    );
  };

  // handle Save Button
  const handleClick = (e) => {
    e.preventDefault();

    const prescriptionAllData = {
      prescriptionHeader: {
        patientDetail: patientInfo,
        doctorDetail: doctorInfo,
        degreeData1: degreeData1,
        degreeData2: degreeData2,
        degreeData3: degreeData3,
        chamber: selectedHospital,
        today: today,
        appointmentid: appointmentid ? appointmentid : "",
      },

      prescriptionData: {
        Diagnosis: diagonosis,
        hc_doctor_job_title: doctorInfo?.hc_doctor_job_title,
        hc_p_cheif_past_history: pastHistory,
        hc_p_cheif_drug_history: oldDrug,
        hc_p_general_examination: generalEx,
        hc_p_gex_female: femaleDiagnosis,
        hc_p_gex_systemic_examination: systemeticEx,
        hc_p_ex_baby: generalExBaby,
        hc_p_ex_post_operative_patient: postOperativeEx,
        hc_p_ex_others: generalExOther,
        hc_p_investigation: investigations,
        cheif_complain: complains,
        teratment: medicineList,
        chamber: selectedHospital._id,
        follow_up: followUp,
        advice: allAdvice,
      },
    };
    if (patientid && prescriptionid) {
      updatePrescription(
        prescriptionAllData.prescriptionData,
        patientid,
        prescriptionid
      );
    } else {
      dispatch(prescriptionData(prescriptionAllData));
      history.push("/print");
    }
  };

  // Search Drugs
  const searchDrugs = (inputDrug) => {
    const url = `../../api/prescription/search_drug`;
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${auth.token}`,
    };
    const data = {
      hc_drug_name: inputDrug,
    };

    Axios.post(url, data, { headers })
      .then((res) => {
        setautoCompleteDrugName(res.data);
        // dispatch(drugNames(res.data))
      })
      .catch((err) => {
        setautoCompleteDrugName([]);
      });
  };

  //handleSelectDrug
  const handleSelectDrug = (i, value) => {
    const list = [...medicineList];
    list[i]["med_name"] = value;
    searchDrugs("");
    setMedicineList(list);
  };

  // handle input Medicine
  const handleMedicineInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...medicineList];
    list[index][name] = value;
    if (name == "med_important") {
      if (e.target.checked) {
        list[index]["med_important"] = true;
      } else {
        list[index]["med_important"] = false;
      }
    }

    if (name === "med_name") {
      searchDrugs(list[index]["med_name"].toLowerCase());
    }
    setMedicineList(list);
  };

  // handle click event of the Remove button
  const handleMedicineRemove = (index) => {
    const list = [...medicineList];
    list.splice(index, 1);
    setMedicineList(list);
  };

  // handle click event of the Add button
  const handleMedicineAdd = () => {
    setMedicineList([
      ...medicineList,
      {
        med_type: "",
        med_name: "",
        med_important: false,
        med_dose_in_a_day: "",
        med_dose_days: "",
        med_dose_meal: "",
      },
    ]);
  };

  const searchDiagnosis = () => {
    const url = `../../api/prescription/search_diagnosis`;
    const data = {
      diagnosis: searchDiagonosis,
    };
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${auth.token}`,
    };
    Axios.post(url, data, { headers })
      .then((res) => {
        dispatch(diagnosisNames(res.data));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    searchDiagonosis ? searchDiagnosis() : dispatch(diagnosisNames(null));
  }, [searchDiagonosis]);

  // handle input change
  const handleDiagonosisInputChange = (e, index) => {
    const { name, value } = e.target;
    setSearchDiagonosis(value);
    const list = [...diagonosis];
    list[index][name] = value;
    setDiagonosis(list);
  };

  // handle click event of the Remove button
  const handleDiagonosisRemoveClick = (index) => {
    const list = [...diagonosis];
    const uid = [...diagonosisUID];
    list.splice(index, 1);
    uid.splice(index, 1);
    setDiagonosis(list);
    setDiagonosisUID(uid);
  };

  // handle click event of the Add button
  const handleDiagonosisAddClick = () => {
    setDiagonosis([...diagonosis, { diagonosis: "" }]);
  };

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...complains];
    list[index][name] = value;
    setComplains(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...complains];
    list.splice(index, 1);
    setComplains(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setComplains([...complains, { complains: "" }]);
  };

  ///past history ///
  const handlePastHistoryInput = (e, index) => {
    const { name, value } = e.target;
    const list = [...pastHistory];
    list[index][name] = value;
    setPastHistory(list);
  };

  const removePastHistory = (index) => {
    const list = [...pastHistory];
    list.splice(index, 1);
    setPastHistory(list);
  };

  const addPastHistory = () => {
    setPastHistory([...pastHistory, { history: "", case: "" }]);
  };

  ///old drug ///
  const handleOldDrug = (e, index) => {
    const { value } = e.target;
    const list = [...oldDrug];
    list[index] = value;
    setOldDrug(list);
  };

  const removeOldDrug = (index) => {
    const list = [...oldDrug];
    list.splice(index, 1);
    setOldDrug(list);
  };

  const addOldDrug = () => {
    setOldDrug([...oldDrug, ""]);
  };

  const patientDetails = (data) => {
    const diff = Date.now() - new Date(data.hc_patient_date_of_birth).getTime();
    const age = new Date(diff).getUTCFullYear() - 1970;
    data.age = age;
    setPatientInfo(data);
    const drug = [];
    const familyHis = [];
    if (prescriptionid) {
      setGeneralEx(
        data.hc_patient_prescription[0]?.prescriptionID.hc_p_general_examination
      );

      setSystemicEx(
        data.hc_patient_prescription[0]?.prescriptionID
          .hc_p_gex_systemic_examination
      );

      setFemaleDiagnosis(
        data.hc_patient_prescription[0]?.prescriptionID.hc_p_gex_female
      );

      setGeneralExBaby(
        data.hc_patient_prescription[0]?.prescriptionID.hc_p_ex_baby
      );
      setPostOperativeEx(
        data.hc_patient_prescription[0]?.prescriptionID
          .hc_p_ex_post_operative_patient
      );
      setGeneralExOther(
        data.hc_patient_prescription[0]?.prescriptionID.hc_p_ex_others
      );
    }

    if(data.hc_patient_prescription != 0){
      data.hc_patient_prescription.map((item) => {
        item.prescriptionID.teratment.map((item) => {
          if (item.med_important) drug.push(item.med_name);
        });
      });
    }
    setOldDrug(drug);
    setFamilyHistorys(familyHis);
  };

  const doctorDetails = (education) => {
    const d1 = education?.filter(
      (i) => i.degree == "BCS" || i.degree == "MBBS"
    );
    const d2 = education?.filter((i) => i.degree === "FCPS");
    const d3 = education?.filter(
      (i) => i.degree != "BCS" && i.degree != "MBBS" && i.degree != "FCPS"
    );

    setDegreeData1(d1);
    setDegreeData2(d2);
    setDegreeData3(d3);
  };

  const getPrescriptionData = () => {
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${auth.token}`,
      patientid: patientid,
    };
    const d = new Date();
    const date = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
    try {
      Axios.get(`../../api/doctor/doctorsinfo`, { headers })
        .then((res) => {
          patientDetails(res.data[0]);
          doctorDetails(res.data[1].hc_doctor_education);
          setDoctorInfo(res.data[1]);
          setToday(date);
        })
        .catch((err) => {
          console.log(err);
          history.push("/");
        });
    } catch (error) {
      console.log(error);
    }
  };

  //Handle advice form

  const setCloseBtnAppear = () => {
    setState({
      ...state,
      isCloseBtnAppear: false,
    });
  };
  const closeFormDailog = () => {
    setState({
      ...state,
      openFormDailog: false,
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
    setopenConfirmDailog(false);
    setState({
      ...state,
      openFormDailog: false,
      openConfirmDailog: false,
      openErrorDailog: true,
    });
  };

  useEffect(() => {
    getPrescriptionData(patientid);
  }, [patientid]);
  useEffect(() => {
    followUp != "" ? setDisabled(false) : setDisabled(true);
  }, [followUp]);

  return (
    <div
      onClick={() => {
        searchDrugs("");
        setSearchDiagonosis(null);
      }}
    >
      <FormPrompt
        openDailog={state.openFormDailog}
        title="Add Advices"
        onSetOpenDailog={closeFormDailog}
        isCloseBtnAppear={state.isCloseBtnAppear}
      >
        <Advice
          setCloseBtnAppear={setCloseBtnAppear}
          handleSuccessDailog={handleSuccessDailog}
          handleErrorDailog={handleErrorDailog}
          handleAdviceCheckBoxChange={handleAdviceCheckBoxChange}
          advicelist={advicelist}
          allAdvice={allAdvice}
          handleAllFilterdAdvice={handleAllFilterdAdvice}
          collectionName="patients"
          id="patientid"
        ></Advice>
      </FormPrompt>
      <div className={Styles.heading}>
        <h2>{doctorInfo ? doctorInfo.hc_doctor_specialist : ""}</h2>
      </div>
      <div className="row">
        <div className="col-lg-5 col-md-5 col-sm-12">
          <div className={Styles.doctor_details}>
            <h2 className={Styles.doctor_name}>
              {doctorInfo ? doctorInfo.hc_doctor_englishName : ""}
            </h2>

            <div className={Styles.doctorDegreeBCS__style}>
              {degreeData1 &&
                degreeData1?.map((item, index) => {
                  return (
                    <p key={index}>
                      {item.degree} ({item.title}){" "}
                      {index + 1 < degreeData1?.length ? ", " : " "}{" "}
                    </p>
                  );
                })}
            </div>
            {/* <p className={Styles.doctor_degree}>{doctorInfo ? doctorInfo.degree2 : null}</p> */}
            <div className={Styles.doctorDegree__style}>
              {degreeData2 &&
                degreeData2?.map((item, index) => {
                  return (
                    <p key={index}>
                      {item.degree} ({item.title}){" "}
                      {index + 1 < degreeData2?.length ? ", " : " "}{" "}
                    </p>
                  );
                })}
            </div>

            <div className={Styles.doctorDegree__style}>
              {degreeData3 &&
                degreeData3?.map((item, index) => {
                  return (
                    <p key={index}>
                      {item.degree} ({item.title}){" "}
                      {index + 1 < degreeData3?.length ? ", " : " "}{" "}
                    </p>
                  );
                })}
            </div>

            <div className={Styles.doctor_degree2}>
              {doctorInfo?.hc_doctor_course_done[0]?.degree != "" &&
                doctorInfo?.hc_doctor_course_done?.map((item, index) => {
                  return (
                    <p key={index}>
                      {item.degree} ({item.title}){" "}
                      {index + 1 < doctorInfo?.hc_doctor_course_done?.length
                        ? ", "
                        : " "}{" "}
                    </p>
                  );
                })}
            </div>

            <div className={Styles.doctor_designation}>
              {doctorInfo?.hc_doctor_consultant &&
                doctorInfo?.hc_doctor_consultant?.map((item, index) => {
                  return (
                    <p key={index}>
                      Consultant- {item.consultant}{" "}
                      {index + 1 < doctorInfo?.hc_doctor_consultant?.length
                        ? ", "
                        : " "}{" "}
                    </p>
                  );
                })}
            </div>
            <p>{doctorInfo ? doctorInfo?.hc_doctor_job_title : ""}</p>
            <p>{doctorInfo ? doctorInfo?.hc_doctor_medicale_name : ""}</p>

            <p className={Styles.doctor_no}>
              BMDC Reg No : {doctorInfo ? doctorInfo.hc_doctor_BMDC_reg_no : ""}
            </p>
            <p className={Styles.doctor_no}>
              {doctorInfo?.hc_doctor_FELLOW_id ? "Fellow Id :" : ""}{" "}
              {doctorInfo ? doctorInfo.hc_doctor_FELLOW_id : ""}
              {""}
            </p>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-12 mt-4">
          <div className={Styles.doctor_contact_div}>
            <div className="row">
              <div className="col-lg-3 col-md-4 col-sm-5">Mobile</div>
              <div className="col-lg-9 col-md-8 col-sm-7">
                : {doctorInfo ? doctorInfo.hc_doctor_phoneno : ""}
              </div>
              <div className="col-lg-3 col-md-4 col-sm-5">Email</div>
              <div className="col-lg-9 col-md-8 col-sm-7">
                : {doctorInfo ? doctorInfo.hc_doctor_email : ""}
              </div>
              <div className="col-lg-3 col-md-4 col-sm-5">Serial</div>
              <div className="col-lg-9 col-md-8 col-sm-7">
                :{" "}
                {doctorInfo?.hc_doctor_serial_no
                  ? doctorInfo.hc_doctor_serial_no
                  : "017XX XXXXXX"}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-3 col-sm-12">
          <div className={Styles.chamber_details}>
            <p
              className={Styles.chambers}
              onClick={() => settoggleHospital(!toggleHospital)}
            >
              চেম্বার :
            </p>
            {toggleHospital ? (
              <>
                <img
                  className={Styles.specialist_image}
                  src={
                    doctorInfo?.hc_doctor_of_hospital[selectHospital]
                      ?.hospitalID.hc_hospital_logo
                  }
                  alt=""
                  onLoad={() =>
                    setSelectedHospital({
                      _id: doctorInfo?.hc_doctor_of_hospital[selectHospital]
                        ?.hospitalID._id,
                      logo: doctorInfo?.hc_doctor_of_hospital[selectHospital]
                        ?.hospitalID.hc_hospital_logo,
                      hospitalName:
                        doctorInfo?.hc_doctor_of_hospital[selectHospital]
                          ?.hospitalID.hc_hospital_english_name,
                      address:
                        doctorInfo?.hc_doctor_of_hospital[selectHospital]
                          ?.hospitalID.hc_hospital_address.upazila +
                        ", " +
                        doctorInfo?.hc_doctor_of_hospital[selectHospital]
                          ?.hospitalID.hc_hospital_address.district,
                    })
                  }
                ></img>
                <h4>
                  {
                    doctorInfo?.hc_doctor_of_hospital[selectHospital]
                      ?.hospitalID.hc_hospital_english_name
                  }
                </h4>
                <p>
                  {
                    doctorInfo?.hc_doctor_of_hospital[selectHospital]
                      ?.hospitalID.hc_hospital_address?.upazila
                  }
                  ,
                  {
                    doctorInfo?.hc_doctor_of_hospital[selectHospital]
                      ?.hospitalID.hc_hospital_address?.district
                  }
                </p>
              </>
            ) : (
              <>
                {doctorInfo?.hc_doctor_of_hospital?.length > 0 && (
                  <ul>
                    {doctorInfo?.hc_doctor_of_hospital?.map((item, index) => {
                      return (
                        <li
                          className={Styles.chambers}
                          key={index}
                          onClick={() => {
                            setSelectHospital(index);
                            setSelectedHospital({
                              logo: item.hospitalID.hc_hospital_logo,
                              hospitalName:
                                item.hospitalID.hc_hospital_english_name,
                              address:
                                item.hospitalID?.hc_hospital_address?.upazila +
                                " " +
                                item.hospitalID?.hc_hospital_address?.district,
                            });
                            settoggleHospital(!toggleHospital);
                          }}
                        >
                          <img
                            className={Styles.specialist_image1}
                            src={item.hospitalID?.hc_hospital_logo}
                            alt=""
                          ></img>
                          {item.hospitalID?.hc_hospital_english_name}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className={Styles.patient_details_div}>
        <div className={Styles.patient_details}>
          <div className="row">
            <div className="col-lg-5 col-md-6 col-sm-8">
              Name :{" "}
              {patientInfo
                ? patientInfo.hc_patient_firstName +
                " " +
                patientInfo.hc_patient_lastName
                : ""}{" "}
            </div>
            <div className="col-lg-2 col-md-1.5 col-sm-4">
              Age : {patientInfo ? patientInfo.age : ""}
            </div>
            <div className="col-lg-2 col-md-1.5 col-sm-2">
              Sex : {patientInfo ? patientInfo?.hc_patient_sex : ""}
            </div>
            <div className="col-lg-3 col-md-3 col-sm-12">Date : {today}</div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-5 col-12  justify-content-center flex-column">
          <div className={Styles.chief_complains}>
            <h5 className={Styles.leftSideHeader}>Diagnosis</h5>
            <div className={Styles.chief_complain_div}>
              {diagonosis.map((x, i) => {
                return (
                  <div key={i} className="box d-flex">
                    <p className="">{i + 1}</p>
                    <input
                      className={Styles.searchTearm}
                      name="diagonosis"
                      placeholder="Diagnosis"
                      value={x.diagonosis}
                      onChange={(e) => {
                        setFindInd(i);
                        handleDiagonosisInputChange(e, i);
                      }}
                    />
                    {diagnosisName?.length > 0 && (
                      <ul className={Styles.ulComponent}>
                        {diagnosisName?.map((item, index) => {
                          return (
                            <li
                              key={index}
                              className={Styles.liComponent}
                              onClick={() => {
                                handleSelectDiagnosis(
                                  findInd,
                                  item.diagnosis,
                                  item.UID
                                );
                                setSearchDiagonosis(null);
                              }}
                            >
                              {item.diagnosis}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                    <div className="d-flex">
                      {diagonosis.length != 1 && (
                        <button
                          className={Styles.removeButton}
                          onClick={() => handleDiagonosisRemoveClick(i)}
                        >
                          <i className="fa fa-trash" aria-hidden="true"></i>
                        </button>
                      )}
                      {diagonosis.length - 1 === i && (
                        <button
                          className={Styles.addButton}
                          onClick={handleDiagonosisAddClick}
                        >
                          <i className="fa fa-plus" aria-hidden="true"></i>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={Styles.chief_complains}>
            <h5 className={Styles.leftSideHeader}>Chief Complains</h5>
            <div className={Styles.chief_complain_div}>
              {complains.map((x, i) => {
                return (
                  <div key={i} className="box d-flex">
                    <p className="">{i + 1}</p>
                    <input
                      className={Styles.searchTearm}
                      name="complains"
                      placeholder="Complains"
                      value={x.complains}
                      onChange={(e) => handleInputChange(e, i)}
                    />
                    <div className="d-flex">
                      {complains.length !== 1 && (
                        <button
                          className={Styles.removeButton}
                          onClick={() => handleRemoveClick(i)}
                        >
                          <i className="fa fa-trash" aria-hidden="true"></i>
                        </button>
                      )}
                      {complains.length - 1 === i && (
                        <button
                          className={Styles.addButton}
                          onClick={handleAddClick}
                        >
                          <i className="fa fa-plus" aria-hidden="true"></i>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={Styles.past_history_div}>
            <h5 className={Styles.leftSideHeader}>Past History</h5>
            <div className="d-flex ms-3">
              {patientInfo &&
                patientInfo.hc_p_cheif_past_history?.map((item, index) => {
                  return (
                    <p key={index}>
                      {item.history} : {item.case}{" "}
                      {index + 1 < patientInfo.hc_p_cheif_past_history?.length
                        ? `, `
                        : ""}{" "}
                    </p>
                  );
                })}
            </div>

            <div className={Styles.past_history_div}>
              {pastHistory.map((x, i) => {
                return (
                  <div key={i} className="">
                    <div className="d-flex">
                      <p className="mt-2">{i + 1}</p>
                      <input
                        className={Styles.searchTearm}
                        name="history"
                        placeholder="Disease"
                        value={x.history}
                        onChange={(e) => handlePastHistoryInput(e, i)}
                      />
                      <input
                        className={Styles.searchTearm}
                        name="case"
                        placeholder="Complications"
                        value={x.case}
                        onChange={(e) => handlePastHistoryInput(e, i)}
                      />
                      {pastHistory.length !== 1 && (
                        <button
                          className={Styles.pastHisremoveButton}
                          onClick={() => removePastHistory(i)}
                        >
                          <i className="fa fa-trash" aria-hidden="true"></i>
                        </button>
                      )}
                      {pastHistory.length - 1 === i && (
                        <button
                          type="button"
                          // className="btn btn-success"
                          className={Styles.pastHisaddButton}
                          onClick={addPastHistory}
                        >
                          <i className="fa fa-plus" aria-hidden="true"></i>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="">
            <h5 className={Styles.leftSideHeader}>Chief Old Drug</h5>

            <div className={Styles.past_history_div}>
              {oldDrug?.map((x, i) => {
                return (
                  <div key={i} className="">
                    <div className="d-flex">
                      <p className="mt-2">{i + 1}</p>
                      <input
                        className={Styles.searchTearm}
                        name="pastoldDrug"
                        placeholder="Chief Old Drug"
                        value={x}
                        onChange={(e) => handleOldDrug(e, i)}
                      />
                      {oldDrug.length !== 1 && (
                        <button
                          className={Styles.pastHisremoveButton}
                          onClick={() => removeOldDrug(i)}
                        >
                          <i className="fa fa-trash" aria-hidden="true"></i>
                        </button>
                      )}
                      {oldDrug.length - 1 === i && (
                        <button
                          className={Styles.pastHisaddButton}
                          onClick={addOldDrug}
                        >
                          <i className="fa fa-plus" aria-hidden="true"></i>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="">
            <GeneralExamination
              generalEx={generalEx}
              handleOnChange_G_EX={handleOnChange_G_EX}
            />
          </div>

          {patientInfo?.hc_patient_sex === "Female" ? (
            <div>
              <GeneralExFemale
                handleOnChange_EX_Female={handleOnChange_EX_Female}
              />
            </div>
          ) : null}

          <div>
            <SystemeticEx
              systemeticEx={systemeticEx}
              handleOnChange_Systemic_EX={handleOnChange_Systemic_EX}
            />
          </div>

          {patientInfo?.age <= 10 ? (
            <div>
              <GeneralExBaby
                generalExBabyDataOnChange={generalExBabyDataOnChange}
              />
            </div>
          ) : null}

          <div>
            <PostOperativePtient
              postOperativeEx={postOperativeEx}
              handlePostOperative={handlePostOperative}
            />
          </div>

          <div>
            <GeneralOthers
              generalExOther={generalExOther}
              handleOnChange_EX_Others={handleOnChange_EX_Others}
              familyHistorys={familyHistorys}
              handleOnChangeFamilyHistory={handleOnChangeFamilyHistory}
              handleRemoveClickFamilyHistory={handleRemoveClickFamilyHistory}
              handleAddClickFamilyHistory={handleAddClickFamilyHistory}
              personalHistorys={personalHistorys}
              handleInputChangePersonalHistory={
                handleInputChangePersonalHistory
              }
              handleRemoveClickPersonalHistory={
                handleRemoveClickPersonalHistory
              }
              handleAddClickPersonalHistory={handleAddClickPersonalHistory}
              dieatryHistorys={dieatryHistorys}
              handleInputChangeDietaryHistory={handleInputChangeDietaryHistory}
              handleRemoveClickDietaryHistory={handleRemoveClickDietaryHistory}
              handleAddClickDietaryHistory={handleAddClickDietaryHistory}
            />
          </div>

          <div>
            <Investigation
              investigations={investigations}
              handleSelectInvestigation={handleSelectInvestigation}
              handleInputChangeInvestigation={handleInputChangeInvestigation}
              handleRemoveClickInvestigation={handleRemoveClickInvestigation}
              handleAddClickInvestigation={handleAddClickInvestigation}
            />
          </div>
        </div>

        <div id="nonFooter" className="col-lg-8 col-md-7 col-12">
          <div className={Styles.medicine}>
            <h5 className={Styles.medicineListHeader}>Rx</h5>
            <PrescribedMedicine
              medicineList={medicineList}
              autoCompleteDrugName={autoCompleteDrugName}
              handleSelectDrug={handleSelectDrug}
              handleMedicineInputChange={handleMedicineInputChange}
              handleMedicineRemove={handleMedicineRemove}
              handleMedicineAdd={handleMedicineAdd}
            />
          </div>

          <div className={Styles.adviceSection}>
            <button
              type="button"
              className={Styles.addAdviceButton}
              onClick={() => {
                setState({
                  ...state,
                  openFormDailog: true,
                });
              }}
            >
              + Add Advice
            </button>
          </div>

          <div id="footer" className={Styles.suggestions}>
            <h5 className={Styles.MedicineReactionHeader}>উপদেশ-</h5>

            <div className={Styles.suggestionList}>
              {allAdvice.map((adv, index) => {
                return <span key={index}>✔️{adv}</span>;
              })}
            </div>
            <div className="mt-3">
              <input
                className={Styles.searchTearm3}
                type="text"
                value={followUp}
                onChange={(e) => setFollowUp(e.target.value)}
              ></input>
              <span>দিন পর দেখা করবেন</span>
            </div>
            <div className={Styles.saveButtonDiv}>
              <button
                disabled={disabled}
                className={
                  disabled ? Styles.saveButtonDisable : Styles.saveButton
                }
                onClick={handleClick}
              >
                Save & Print
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prescription;
