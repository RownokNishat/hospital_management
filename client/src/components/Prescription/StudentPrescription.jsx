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
// import Footer from "./Footer";

const StudentPrescription = () => {
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
  const { patientid, appointmentid } = useParams();
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

  useEffect(() => {
    const arr = [...new Set(diagonosisUID.flat())];
    getAdviceDetails(arr);
  }, [diagonosisUID]);

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

  // handle Save Button
  const handleClick = (e) => {
    e.preventDefault();

    const prescriptionAllData = {
      Diagnosis: diagonosis,
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
      follow_up: followUp,
      advice: allAdvice,
    }

    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${auth.token}`,
    };
    Axios.post(`/api/student/student_prescription`, prescriptionAllData, {
      headers,
    })
      .then((res) => {
        console.log(res.data);
        window.alert(res?.data?.message);
        history.push(`../std_prescription/${res.data._id}`);
      })
      .catch((error) => console.log(error));

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
    };
    const d = new Date();
    const date = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
    try {
      Axios.get(`../../api/getProfileDetails`, { headers })
        .then((res) => {
          // console.log(res);
          //   patientDetails(res.data[0]);
          doctorDetails(res?.data?.hc_student_education);
          setDoctorInfo(res?.data._student);
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

      <div className="row">
        <div className="col-lg-5 col-md-5 col-sm-12">
          <div className={Styles.doctor_details}>
            <h2 className={Styles.doctor_name}>
              {doctorInfo ? doctorInfo?.hc_student_englishName : ""}
            </h2>
            <div className={Styles.doctorDegreeBCS__style}>
              {doctorInfo?.hc_student_education?.map((edu, index) => {
                return (
                  <>
                    <p>
                      {edu?.degree}
                      {edu?.title ? "(" : ""}
                      {edu?.title}
                      {edu?.title ? ")" : ""}
                      {(index + 1) < doctorInfo?.hc_student_education?.length ? "," : " "}
                      &nbsp;
                    </p>

                  </>
                );
              })}
            </div>

            <p className={Styles.doctor_no}>
              BMDC Reg No :{" "}
              {doctorInfo ? doctorInfo?.hc_student_BMDC_reg_no : ""}
            </p>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-12 mt-4">
          <div className={Styles.doctor_contact_div}>
            <div className="row">
              <div className="col-lg-3 col-md-4 col-sm-5">Mobile</div>
              <div className="col-lg-9 col-md-8 col-sm-7">
                : {doctorInfo ? doctorInfo?.hc_student_phoneno : ""}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-3 col-sm-12">
          <div className={Styles.chamber_details}>
            <img
              className={Styles.specialist_image}
              src={doctorInfo?.hc_hospitalID?.hc_hospital_logo}
            ></img>
            <p>{doctorInfo?.hc_hospitalID?.hc_hospital_english_name}</p>
            <p>{doctorInfo?.hc_hospitalID?.hc_hospital_address?.upazila}</p>
            <p>{doctorInfo?.hc_hospitalID?.hc_hospital_address?.district}</p>
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
            <GeneralExamination handleOnChange_G_EX={handleOnChange_G_EX} />
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
            <PostOperativePtient handlePostOperative={handlePostOperative} />
          </div>

          <div>
            <GeneralOthers
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
                onClick={(e) => {
                  handleClick(e);
                  // handleNotificationClick(e)
                }}
              // onClick={(e) => }
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

export default StudentPrescription;
