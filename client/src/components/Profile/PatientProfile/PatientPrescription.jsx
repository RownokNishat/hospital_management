import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Styles from "./PatientPrescription.module.css";
import { useSelector } from "react-redux";
import Axios from "axios";

import { forwardRef, useRef } from "react";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";

const Prescription = forwardRef((props, ref) => {
  // const pdfExportComponent = React.useRef(null);
  const [loading, setLoading] = useState(true);
  const [doctorInfo, setDoctorInfo] = useState({});
  const [patientInfo, setPatientInfo] = useState({});
  const [chamber, setChamber] = useState({});
  const [degreeData1, setDegreeData1] = useState("");
  const [degreeData2, setDegreeData2] = useState("");
  const [degreeData3, setDegreeData3] = useState("");
  const [today, setToday] = useState("");
  const [prescriptionTreatmentData, setPrescriptionTreatmentData] = useState(
    {}
  );

  const options = {
    orientation: "potrait",
    unit: "in",
    format: "a3",
  };
  //const container = React.useRef(null);

  const prescription = props?.prescription;
  const prescriptionId = props?.prescriptionId;
  const role = props?.auth.role;

  useEffect(() => {
    const education =
      prescription?.doctorId?.hc_doctor_education ||
      prescription?.studentId?.hc_student_education;
    if (prescription) {
      chamber.logo =
        prescription?.chamber?.hc_hospital_logo ||
        prescription?.studentId.hc_hospitalID.hc_hospital_logo;
      chamber.hospitalName =
        prescription?.chamber?.hc_hospital_english_name ||
        prescription?.studentId.hc_hospitalID.hc_hospital_english_name;
      chamber.address =
        prescription?.chamber?.hc_hospital_address ||
        prescription?.studentId.hc_hospitalID.hc_hospital_address;

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

      const date1 = new Date(prescription?.updatedAt);
      setToday(
        date1.getDate() +
          "/" +
          (date1.getMonth() + 1) +
          "/" +
          date1.getFullYear()
      );
      setDoctorInfo(prescription?.doctorId || prescription?.studentId);
      setPatientInfo(prescription?.patientId || "");
      setChamber(chamber);
      setPrescriptionTreatmentData(prescription);
      setLoading(false);
    }
  }, [prescription]);

  return (
    <div>
      {loading ? (
        <div className="doctorsListpage">
          <i className="fas fa-spinner fa-pulse fa-2x "></i>
        </div>
      ) : (
        <div ref={ref}>
          {prescriptionId && role == "Student" ? (
            ""
          ) : (
            <>
              <div className={Styles.pdf_heading}>
                <p>{doctorInfo ? doctorInfo.hc_doctor_specialist : ""}</p>
              </div>
              <div className="row">
                <div className="col-lg-5 col-md-5 col-sm-12">
                  <div className={Styles.pdf_Doctor_details}>
                    <h2 className={Styles.doctor_name}>
                      {doctorInfo
                        ? doctorInfo.hc_doctor_englishName ||
                          doctorInfo.hc_student_englishName
                        : ""}
                    </h2>

                    <div className={Styles.pdfdoctorDegreeBCS__style}>
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

                    <div className={Styles.pdfdoctorDegree__style}>
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

                    <div className={Styles.pdfdoctorDegree__style}>
                      {degreeData3 &&
                        degreeData3.map((item, index) => {
                          return (
                            <p key={index}>
                              {item.degree} ({item.title}){" "}
                              {index + 1 < degreeData3?.length ? ", " : " "}{" "}
                            </p>
                          );
                        })}
                    </div>

                    <div className={Styles.pdf_doctor_degree2}>
                      {doctorInfo.hc_doctor_course_done &&
                        doctorInfo?.hc_doctor_course_done[0]?.degree != "" &&
                        doctorInfo?.hc_doctor_course_done?.map(
                          (item, index) => {
                            return (
                              <p key={index}>
                                {item.degree} ({item.title}){" "}
                                {index + 1 <
                                doctorInfo?.hc_doctor_course_done?.length
                                  ? ", "
                                  : " "}{" "}
                              </p>
                            );
                          }
                        )}
                    </div>

                    <div className={Styles.doctor_designation}>
                      {doctorInfo?.hc_doctor_consultant &&
                        doctorInfo?.hc_doctor_consultant?.map((item, index) => {
                          return (
                            <p key={index}>
                              Consultant- {item.consultant}{" "}
                              {index + 1 <
                              doctorInfo?.hc_doctor_consultant?.length
                                ? ", "
                                : " "}{" "}
                            </p>
                          );
                        })}
                    </div>

                    <p>{doctorInfo ? doctorInfo.hc_doctor_job_title : ""}</p>
                    <p>
                      {doctorInfo ? doctorInfo.hc_doctor_medicale_name : ""}
                    </p>
                    <div className="d-flex">
                      <p className={Styles.pdf_doctor_no}>
                        BMDC Reg No :{" "}
                        {doctorInfo
                          ? doctorInfo.hc_doctor_BMDC_reg_no ||
                            doctorInfo.hc_student_BMDC_reg_no
                          : ""}
                      </p>

                      <p className={Styles.pdf_fellow_id}>
                        {doctorInfo?.hc_doctor_FELLOW_id ? "Fellow Id :" : ""}{" "}
                        {doctorInfo ? doctorInfo.hc_doctor_FELLOW_id : ""}
                        {""}
                      </p>
                    </div>
                    <p className={Styles.pdf_doctor_no}>
                      {doctorInfo && doctorInfo.hc_student_session
                        ? "Session : "
                        : ""}
                      {doctorInfo ? doctorInfo.hc_student_session : ""}
                    </p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-12 mt-4">
                  <div className={Styles.doctor_contact_div}>
                    <div className="row">
                      <div className="col-lg-3 col-md-4 col-sm-5">Mobile</div>
                      <div className="col-lg-9 col-md-8 col-sm-7">
                        {doctorInfo.hc_doctor_phoneno ? ":" : ""}
                        {doctorInfo
                          ? doctorInfo.hc_doctor_phoneno ||
                            doctorInfo.hc_student_phoneno
                          : ""}
                      </div>
                      <div className="col-lg-3 col-md-4 col-sm-5">
                        {doctorInfo.hc_doctor_email ? "Email" : ""}
                      </div>
                      <div className="col-lg-9 col-md-8 col-sm-7">
                        {doctorInfo.hc_doctor_email ? ":" : ""}
                        {doctorInfo ? doctorInfo.hc_doctor_email : ""}
                      </div>
                      <div className="col-lg-3 col-md-4 col-sm-5">
                        {doctorInfo.hc_doctor_serial_no ? "Serial :" : ""}
                      </div>
                      <div className="col-lg-9 col-md-8 col-sm-7">
                        {doctorInfo.hc_doctor_serial_no ? ":" : ""}
                        {doctorInfo?.hc_doctor_serial_no
                          ? doctorInfo.hc_doctor_serial_no
                          : ""}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-3 col-sm-12">
                  <div className={Styles.chamber_details}>
                    <p>চেম্বার : </p>
                    <img
                      className={Styles.specialist_image}
                      src={chamber.logo}
                      alt=""
                    ></img>
                    <h4>{chamber.hospitalName}</h4>
                    <p>
                      {chamber.address?.upazila} , {chamber.address?.district}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className={Styles.pdf_patient_details_div}>
            <div className={Styles.pdf_patient_details}>
              <div className="row">
                <div className="col-lg-5 col-md-6 col-sm-8">
                  Name :{" "}
                  {props.auth.role == "Student"
                    ? ""
                    : patientInfo
                    ? patientInfo.hc_patient_firstName +
                      " " +
                      patientInfo.hc_patient_lastName
                    : ""}{" "}
                </div>
                <div className="col-lg-2 col-md-1.5 col-sm-4">
                  Age :{" "}
                  {patientInfo
                    ? new Date(
                        Date.now() -
                          new Date(
                            prescription?.patientId.hc_patient_date_of_birth
                          ).getTime()
                      ).getUTCFullYear() - 1970
                    : ""}
                </div>
                <div className="col-lg-2 col-md-1.5 col-sm-2">
                  Sex : {patientInfo ? patientInfo?.hc_patient_sex : ""}
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12">
                  Date : {today}
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-4 col-md-5 col-12 justify-content-center flex-column relative-top">
              {!prescriptionTreatmentData?.Diagnosis ? null : (
                <div className={Styles.chief_complains}>
                  <p className={Styles.pdf_leftSideHeader}>Diagnosis</p>
                  <div className={Styles.chief_complain_div}>
                    {prescriptionTreatmentData?.Diagnosis.map((pd, i) => {
                      return (
                        <p key={i} className="ms-5 mt-0 mb-0">
                          {pd.diagonosis}
                        </p>
                      );
                    })}
                  </div>
                </div>
              )}

              {!prescriptionTreatmentData?.cheif_complain ? null : (
                <div className={Styles.chief_complains}>
                  <p className={Styles.pdf_leftSideHeader}>Chief Complains</p>
                  <div className={Styles.chief_complain_div}>
                    {prescriptionTreatmentData?.cheif_complain.map((pd, i) => {
                      return (
                        <p key={i} className="ms-5 mt-0 mb-0">
                          {pd.complains}
                        </p>
                      );
                    })}
                  </div>
                </div>
              )}
              {prescriptionTreatmentData?.hc_p_cheif_past_history[0]?.history ==
              "" ? null : (
                <div className={Styles.pdf_pdf_past_history_div}>
                  <p className={Styles.pdf_leftSideHeader}>Past History</p>
                  <div className="d-flex ms-3">
                    {prescriptionTreatmentData &&
                      prescriptionTreatmentData.hc_p_cheif_past_history?.map(
                        (item, index) => {
                          return (
                            <p className="ms-5" key={index}>
                              {item.history} : {item.case}{" "}
                              {index + 1 <
                              prescriptionTreatmentData.hc_p_cheif_past_history
                                ?.length
                                ? `, `
                                : ""}{" "}
                            </p>
                          );
                        }
                      )}
                  </div>
                </div>
              )}

              {!prescriptionTreatmentData?.hc_p_cheif_drug_history[0] ? null : (
                <div className={Styles.pdf_pdf_past_history_div}>
                  <p className={Styles.pdf_leftSideHeader}>Chief Old Drug</p>

                  {/* <div className={Styles.pdf_past_history_div}> */}
                  {prescriptionTreatmentData.hc_p_cheif_drug_history.map(
                    (pd, i) => {
                      return (
                        <div key={i} className="ms-5">
                          <span>{pd}</span>
                        </div>
                      );
                    }
                  )}
                  {/* </div> */}
                </div>
              )}

              {!prescriptionTreatmentData?.hc_p_general_examination?.Anemia &&
              !prescriptionTreatmentData?.hc_p_general_examination?.Jaundice &&
              !prescriptionTreatmentData?.hc_p_general_examination?.Oedema &&
              !prescriptionTreatmentData?.hc_p_general_examination
                ?.Lymph_node &&
              !prescriptionTreatmentData?.hc_p_general_examination
                ?.Thyroid_gland &&
              !prescriptionTreatmentData?.hc_p_general_examination?.Pulse &&
              !prescriptionTreatmentData?.hc_p_general_examination
                ?.Blood_pressure &&
              !prescriptionTreatmentData?.hc_p_general_examination
                ?.Respiration &&
              !prescriptionTreatmentData?.hc_p_general_examination
                ?.Body_temperature ? null : (
                <div className="">
                  <p className={Styles.pdf_leftSideHeader}>
                    General Examination
                  </p>
                  {prescriptionTreatmentData.hc_p_general_examination.Anemia ? (
                    <p className="ms-5 mb-0">
                      Anemia :{" "}
                      <span>
                        {
                          prescriptionTreatmentData.hc_p_general_examination
                            .Anemia
                        }
                      </span>
                    </p>
                  ) : (
                    <></>
                  )}

                  {prescriptionTreatmentData.hc_p_general_examination
                    .Jaundice ? (
                    <p className="ms-5 mb-0">
                      Jaundice :{" "}
                      <span>
                        {
                          prescriptionTreatmentData.hc_p_general_examination
                            .Jaundice
                        }
                      </span>
                    </p>
                  ) : (
                    <></>
                  )}

                  {prescriptionTreatmentData.hc_p_general_examination.Oedema ? (
                    <p className="ms-5 mb-0">
                      Oedema :{" "}
                      <span>
                        {
                          prescriptionTreatmentData.hc_p_general_examination
                            .Oedema
                        }
                      </span>
                    </p>
                  ) : (
                    <></>
                  )}

                  {prescriptionTreatmentData.hc_p_general_examination
                    .Lymph_node ? (
                    <p className="ms-5 mb-0">
                      Lymph node :{" "}
                      <span>
                        {
                          prescriptionTreatmentData.hc_p_general_examination
                            .Lymph_node
                        }
                      </span>
                    </p>
                  ) : (
                    <></>
                  )}

                  {prescriptionTreatmentData.hc_p_general_examination
                    .Thyroid_gland ? (
                    <p className="ms-5 mb-0">
                      Thyroid gland :{" "}
                      <span>
                        {
                          prescriptionTreatmentData.hc_p_general_examination
                            .Thyroid_gland
                        }
                      </span>
                    </p>
                  ) : (
                    <></>
                  )}

                  {prescriptionTreatmentData.hc_p_general_examination.Pulse ? (
                    <p className="ms-5 mb-0">
                      Pulse :{" "}
                      <span>
                        {
                          prescriptionTreatmentData.hc_p_general_examination
                            .Pulse
                        }
                      </span>
                    </p>
                  ) : (
                    <></>
                  )}

                  {prescriptionTreatmentData.hc_p_general_examination
                    ?.Blood_pressure ? (
                    <p className="ms-5 mb-0">
                      Blood Pressure :{" "}
                      <span>
                        {
                          prescriptionTreatmentData.hc_p_general_examination
                            ?.Blood_pressure
                        }
                      </span>
                    </p>
                  ) : (
                    <></>
                  )}

                  {prescriptionTreatmentData.hc_p_general_examination
                    ?.Respiration ? (
                    <p className="ms-5 mb-0">
                      Respiration :{" "}
                      <span>
                        {
                          prescriptionTreatmentData.hc_p_general_examination
                            ?.Respiration
                        }
                      </span>
                    </p>
                  ) : (
                    <></>
                  )}

                  {prescriptionTreatmentData.hc_p_general_examination
                    ?.Body_temperature ? (
                    <p className="ms-5 mb-0">
                      Body Temperature :{" "}
                      <span>
                        {
                          prescriptionTreatmentData.hc_p_general_examination
                            ?.Body_temperature
                        }
                      </span>
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
              )}

              {!prescriptionTreatmentData?.hc_p_gex_female
                ?.Menstrual_obstetric_History &&
              !prescriptionTreatmentData?.hc_p_gex_female?.LMP &&
              !prescriptionTreatmentData?.hc_p_gex_female?.Marrid_for &&
              !prescriptionTreatmentData?.hc_p_gex_female?.ALC &&
              !prescriptionTreatmentData?.hc_p_gex_female?.Gravida &&
              !prescriptionTreatmentData?.hc_p_gex_female?.EDD &&
              !prescriptionTreatmentData?.hc_p_gex_female?.Age_of_Menarche &&
              !prescriptionTreatmentData?.hc_p_gex_female?.Breast &&
              !prescriptionTreatmentData?.hc_p_gex_female?.Per_Vagainal &&
              !prescriptionTreatmentData?.hc_p_gex_female?.Last_Use &&
              !prescriptionTreatmentData?.hc_p_gex_female?.Practiced &&
              !prescriptionTreatmentData?.hc_p_gex_female?.M_Flow &&
              !prescriptionTreatmentData?.hc_p_gex_female?.M_Cycle &&
              !prescriptionTreatmentData?.hc_p_gex_female?.M_Period &&
              !prescriptionTreatmentData?.hc_p_gex_female?.Para ? null : (
                <div>
                  <p className={Styles.pdf_leftSideHeader}>In Case Female</p>

                  {prescriptionTreatmentData?.hc_p_gex_female
                    ?.Menstrual_obstetric_History ? (
                    <p className="ms-5  mt-1 mb-0">
                      Menstrual & ostetric History:{" "}
                      {
                        prescriptionTreatmentData?.hc_p_gex_female
                          ?.Menstrual_obstetric_History
                      }
                    </p>
                  ) : (
                    <></>
                  )}
                  {prescriptionTreatmentData?.hc_p_gex_female?.Marrid_for ? (
                    <p className="ms-5  mt-1 mb-0">
                      Marrid for:{" "}
                      {prescriptionTreatmentData.hc_p_gex_female?.Marrid_for}
                    </p>
                  ) : (
                    <></>
                  )}
                  {prescriptionTreatmentData.hc_p_gex_female?.Gravida ? (
                    <p className="ms-5  mt-1 mb-0">
                      Gravida:{" "}
                      {prescriptionTreatmentData.hc_p_gex_female?.Gravida}
                    </p>
                  ) : (
                    <></>
                  )}
                  {prescriptionTreatmentData.hc_p_gex_female?.ALC ? (
                    <p className="ms-5  mt-1 mb-0">
                      ALC: {prescriptionTreatmentData.hc_p_gex_female?.ALC}
                    </p>
                  ) : (
                    <></>
                  )}
                  {prescriptionTreatmentData.hc_p_gex_female?.LMP ? (
                    <p className="ms-5  mt-1 mb-0">
                      LMP: {prescriptionTreatmentData.hc_p_gex_female?.LMP}
                    </p>
                  ) : (
                    <></>
                  )}
                  {prescriptionTreatmentData.hc_p_gex_female?.EDD ? (
                    <p className="ms-5  mt-1 mb-0">
                      EDD: {prescriptionTreatmentData.hc_p_gex_female?.EDD}
                    </p>
                  ) : (
                    <></>
                  )}
                  {prescriptionTreatmentData.hc_p_gex_female
                    ?.Age_of_Menarche ? (
                    <p className="ms-5  mt-1 mb-0">
                      Age of Menarche:{" "}
                      {
                        prescriptionTreatmentData.hc_p_gex_female
                          ?.Age_of_Menarche
                      }
                    </p>
                  ) : (
                    <></>
                  )}
                  {prescriptionTreatmentData.hc_p_gex_female?.M_Period ? (
                    <p className="ms-5  mt-1 mb-0">
                      M. Period:{" "}
                      {prescriptionTreatmentData.hc_p_gex_female?.M_Period}
                    </p>
                  ) : (
                    <></>
                  )}
                  {prescriptionTreatmentData.hc_p_gex_female?.M_Cycle ? (
                    <p className="ms-5  mt-1 mb-0">
                      M. Cycle:{" "}
                      {prescriptionTreatmentData.hc_p_gex_female?.M_Cycle}
                    </p>
                  ) : (
                    <></>
                  )}
                  {prescriptionTreatmentData.hc_p_gex_female?.M_Flow ? (
                    <p className="ms-5  mt-1 mb-0">
                      M. Flow:{" "}
                      {prescriptionTreatmentData.hc_p_gex_female?.M_Flow}
                    </p>
                  ) : (
                    <></>
                  )}
                  {prescriptionTreatmentData.hc_p_gex_female?.Practiced ? (
                    <p className="ms-5  mt-1 mb-0">
                      Practiced:{" "}
                      {prescriptionTreatmentData.hc_p_gex_female?.Practiced}
                    </p>
                  ) : (
                    <></>
                  )}
                  {prescriptionTreatmentData.hc_p_gex_female?.Last_Use ? (
                    <p className="ms-5  mt-1 mb-0">
                      Last Use:{" "}
                      {prescriptionTreatmentData.hc_p_gex_female?.Last_Use}
                    </p>
                  ) : (
                    <></>
                  )}
                  {prescriptionTreatmentData.hc_p_gex_female?.Per_Vagainal ? (
                    <p className="ms-5  mt-1 mb-0">
                      Per Vagainal:{" "}
                      {prescriptionTreatmentData.hc_p_gex_female?.Per_Vagainal}
                    </p>
                  ) : (
                    <></>
                  )}
                  {prescriptionTreatmentData.hc_p_gex_female?.Breast ? (
                    <p className="ms-5  mt-1 mb-0">
                      Breast:{" "}
                      {prescriptionTreatmentData.hc_p_gex_female?.Breast}
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
              )}

              {!prescriptionTreatmentData?.hc_p_ex_baby
                ?.Mothers_disease_during_pregnancy &&
              !prescriptionTreatmentData?.hc_p_ex_baby
                ?.Vaccine_History_Of_Mother &&
              !prescriptionTreatmentData?.hc_p_ex_baby?.Labor_duration &&
              !prescriptionTreatmentData?.hc_p_ex_baby?.Cry &&
              !prescriptionTreatmentData?.hc_p_ex_baby?.Movement &&
              !prescriptionTreatmentData?.hc_p_ex_baby?.Breathing ? null : (
                <div>
                  <p className={Styles.pdf_leftSideHeader}>
                    General Examination of Baby
                  </p>
                  {prescriptionTreatmentData?.hc_p_ex_baby
                    ?.Mothers_disease_during_pregnancy ? (
                    <p className="ms-5  mt-1 mb-0">
                      Mothers disease during pregnancy:{" "}
                      {
                        prescriptionTreatmentData?.hc_p_ex_baby
                          ?.Mothers_disease_during_pregnancy
                      }
                    </p>
                  ) : (
                    <></>
                  )}

                  {prescriptionTreatmentData?.hc_p_ex_baby
                    ?.Vaccine_History_Of_Mother ? (
                    <p className="ms-5  mt-1 mb-0">
                      Vaccine History Of Mother:{" "}
                      {
                        prescriptionTreatmentData?.hc_p_ex_baby
                          ?.Vaccine_History_Of_Mother
                      }
                    </p>
                  ) : (
                    <></>
                  )}

                  {prescriptionTreatmentData?.hc_p_ex_baby.Labor_duration ? (
                    <p className="ms-5  mt-1 mb-0">
                      Labour Duration:{" "}
                      {prescriptionTreatmentData?.hc_p_ex_baby?.Labor_duration}
                    </p>
                  ) : (
                    <></>
                  )}

                  {prescriptionTreatmentData?.hc_p_ex_baby?.Cry ? (
                    <p className="ms-5  mt-1 mb-0">
                      Cry: {prescriptionTreatmentData?.hc_p_ex_baby?.Cry}
                    </p>
                  ) : (
                    <></>
                  )}

                  {prescriptionTreatmentData?.hc_p_ex_baby?.Movement ? (
                    <p className="ms-5  mt-1 mb-0">
                      Movement:{" "}
                      {prescriptionTreatmentData?.hc_p_ex_baby?.Movement}
                    </p>
                  ) : (
                    <></>
                  )}

                  {prescriptionTreatmentData?.hc_p_ex_baby?.Breathing ? (
                    <p className="ms-5  mt-1 mb-0">
                      Breathing:{" "}
                      {prescriptionTreatmentData?.hc_p_ex_baby?.Breathing}
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
              )}

              {!prescriptionTreatmentData?.hc_p_gex_systemic_examination
                ?.Heart &&
              !prescriptionTreatmentData?.hc_p_gex_systemic_examination?.Lung &&
              !prescriptionTreatmentData?.hc_p_gex_systemic_examination
                ?.Abdomen &&
              !prescriptionTreatmentData?.hc_p_gex_systemic_examination
                ?.Neurological &&
              !prescriptionTreatmentData?.hc_p_gex_systemic_examination?.MSK &&
              !prescriptionTreatmentData?.hc_p_gex_systemic_examination?.Eye &&
              !prescriptionTreatmentData?.hc_p_gex_systemic_examination?.Ear &&
              !prescriptionTreatmentData?.hc_p_gex_systemic_examination?.Nose &&
              !prescriptionTreatmentData?.hc_p_gex_systemic_examination?.PNS &&
              !prescriptionTreatmentData?.hc_p_gex_systemic_examination
                ?.Bones_Joints &&
              !prescriptionTreatmentData?.hc_p_gex_systemic_examination
                ?.Genitourinary_System &&
              !prescriptionTreatmentData?.hc_p_gex_systemic_examination?.GIT &&
              !prescriptionTreatmentData?.hc_p_gex_systemic_examination
                ?.Mouth_Pharynx &&
              !prescriptionTreatmentData?.hc_p_gex_systemic_examination
                ?.Larynx &&
              !prescriptionTreatmentData?.hc_p_gex_systemic_examination
                ?.Oral_cavity ? null : (
                <div>
                  <p className={Styles.pdf_leftSideHeader}>
                    Systemic Examination
                  </p>

                  {prescriptionTreatmentData?.hc_p_gex_systemic_examination
                    ?.Heart ? (
                    <p className="ms-5  mt-1 mb-0">
                      Heart:{" "}
                      {
                        prescriptionTreatmentData?.hc_p_gex_systemic_examination
                          ?.Heart
                      }
                    </p>
                  ) : (
                    <></>
                  )}

                  {prescriptionTreatmentData?.hc_p_gex_systemic_examination
                    ?.Lung ? (
                    <p className="ms-5  mt-1 mb-0">
                      Lung:{" "}
                      {
                        prescriptionTreatmentData?.hc_p_gex_systemic_examination
                          ?.Lung
                      }
                    </p>
                  ) : (
                    <></>
                  )}

                  {prescriptionTreatmentData?.hc_p_gex_systemic_examination
                    ?.Abdomen ? (
                    <p className="ms-5  mt-1 mb-0">
                      Abdomen:{" "}
                      {
                        prescriptionTreatmentData?.hc_p_gex_systemic_examination
                          ?.Abdomen
                      }
                    </p>
                  ) : (
                    <></>
                  )}

                  {prescriptionTreatmentData?.hc_p_gex_systemic_examination
                    ?.Neurological ? (
                    <p className="ms-5  mt-1 mb-0">
                      Neurological:{" "}
                      {
                        prescriptionTreatmentData?.hc_p_gex_systemic_examination
                          ?.Neurological
                      }
                    </p>
                  ) : (
                    <></>
                  )}

                  {prescriptionTreatmentData?.hc_p_gex_systemic_examination
                    ?.MSK ? (
                    <p className="ms-5  mt-1 mb-0">
                      MSK:{" "}
                      {
                        prescriptionTreatmentData?.hc_p_gex_systemic_examination
                          ?.MSK
                      }
                    </p>
                  ) : (
                    <></>
                  )}

                  {prescriptionTreatmentData?.hc_p_gex_systemic_examination
                    ?.Oral_cavity ? (
                    <p className="ms-5  mt-1 mb-0">
                      Oral cavity:{" "}
                      {
                        prescriptionTreatmentData?.hc_p_gex_systemic_examination
                          ?.Oral_cavity
                      }
                    </p>
                  ) : (
                    <></>
                  )}
                  {prescriptionTreatmentData?.hc_p_gex_systemic_examination
                    .Eye ? (
                    <p className="ms-5  mt-1 mb-0">
                      Eye:{" "}
                      {
                        prescriptionTreatmentData?.hc_p_gex_systemic_examination
                          ?.Eye
                      }
                    </p>
                  ) : (
                    <></>
                  )}
                  {prescriptionTreatmentData?.hc_p_gex_systemic_examination
                    ?.Ear ? (
                    <p className="ms-5  mt-1 mb-0">
                      Ear:{" "}
                      {
                        prescriptionTreatmentData?.hc_p_gex_systemic_examination
                          ?.Ear
                      }
                    </p>
                  ) : (
                    <></>
                  )}
                  {prescriptionTreatmentData?.hc_p_gex_systemic_examination
                    ?.Nose ? (
                    <p className="ms-5  mt-1 mb-0">
                      Nose:{" "}
                      {
                        prescriptionTreatmentData?.hc_p_gex_systemic_examination
                          ?.Nose
                      }
                    </p>
                  ) : (
                    <></>
                  )}
                  {prescriptionTreatmentData?.hc_p_gex_systemic_examination
                    ?.PNS ? (
                    <p className="ms-5  mt-1 mb-0">
                      PNS:{" "}
                      {
                        prescriptionTreatmentData?.hc_p_gex_systemic_examination
                          ?.PNS
                      }
                    </p>
                  ) : (
                    <></>
                  )}
                  {prescriptionTreatmentData?.hc_p_gex_systemic_examination
                    ?.Larynx ? (
                    <p className="ms-5  mt-1 mb-0">
                      Larynx:{" "}
                      {
                        prescriptionTreatmentData?.hc_p_gex_systemic_examination
                          ?.Larynx
                      }
                    </p>
                  ) : (
                    <></>
                  )}
                  {prescriptionTreatmentData?.hc_p_gex_systemic_examination
                    ?.Mouth_Pharynx ? (
                    <p className="ms-5  mt-1 mb-0">
                      Mouth & Pharynx:{" "}
                      {
                        prescriptionTreatmentData?.hc_p_gex_systemic_examination
                          ?.Mouth_Pharynx
                      }
                    </p>
                  ) : (
                    <></>
                  )}
                  {prescriptionTreatmentData?.hc_p_gex_systemic_examination
                    ?.GIT ? (
                    <p className="ms-5  mt-1 mb-0">
                      GIT:{" "}
                      {
                        prescriptionTreatmentData?.hc_p_gex_systemic_examination
                          ?.GIT
                      }
                    </p>
                  ) : (
                    <></>
                  )}
                  {prescriptionTreatmentData?.hc_p_gex_systemic_examination
                    ?.Genitourinary_System ? (
                    <p className="ms-5  mt-1 mb-0">
                      Genitourinary System:{" "}
                      {
                        prescriptionTreatmentData?.hc_p_gex_systemic_examination
                          ?.Genitourinary_System
                      }
                    </p>
                  ) : (
                    <></>
                  )}
                  {prescriptionTreatmentData?.hc_p_gex_systemic_examination
                    ?.Bones_Joints ? (
                    <p className="ms-5  mt-1 mb-0">
                      Bones & Joints:{" "}
                      {
                        prescriptionTreatmentData?.hc_p_gex_systemic_examination
                          ?.Bones_Joints
                      }
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
              )}

              {!prescriptionTreatmentData?.hc_p_ex_post_operative_patient[0]
                ?.OT_procedure ||
              !prescriptionTreatmentData?.hc_p_ex_post_operative_patient[0]
                ?.Infection ? null : (
                <div>
                  <p className={Styles.pdf_leftSideHeader}>
                    In case of Post Operative Patient
                  </p>

                  {!prescriptionTreatmentData?.hc_p_ex_post_operative_patient
                    .OT_procedure ? (
                    <p className="ms-5  mt-1 mb-0">
                      OT procedure:{" "}
                      {
                        prescriptionTreatmentData
                          ?.hc_p_ex_post_operative_patient[0]?.OT_procedure
                      }
                    </p>
                  ) : (
                    <></>
                  )}

                  {!prescriptionTreatmentData?.hc_p_ex_post_operative_patient
                    ?.Infection ? (
                    <p className="ms-5  mt-1 mb-0">
                      Infection:{" "}
                      {
                        prescriptionTreatmentData
                          ?.hc_p_ex_post_operative_patient[0]?.Infection
                      }
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
              )}
              {!prescriptionTreatmentData?.hc_p_ex_others?.Appearance &&
              !prescriptionTreatmentData?.hc_p_ex_others?.body_built &&
              !prescriptionTreatmentData?.hc_p_ex_others?.Nutrition &&
              !prescriptionTreatmentData?.hc_p_ex_others?.Decubitus &&
              !prescriptionTreatmentData?.hc_p_ex_others?.Cyanosis &&
              !prescriptionTreatmentData?.hc_p_ex_others?.Clubbing &&
              !prescriptionTreatmentData?.hc_p_ex_others?.Dehydration &&
              !prescriptionTreatmentData?.hc_p_ex_others?.Koilonychia &&
              !prescriptionTreatmentData?.hc_p_ex_others?.Leukonychia &&
              !prescriptionTreatmentData?.hc_p_ex_others?.Neck_vein &&
              !prescriptionTreatmentData?.hc_p_ex_others?.Gynaecomastia &&
              !prescriptionTreatmentData?.hc_p_ex_others?.Pigmentation &&
              !prescriptionTreatmentData?.hc_p_ex_others?.Bony_Tenderness &&
              !prescriptionTreatmentData?.hc_p_ex_others?.Spider_naevi &&
              !prescriptionTreatmentData?.hc_p_ex_others?.Palmer_erythemia &&
              !prescriptionTreatmentData?.hc_p_ex_others
                ?.Distribution_of_body_hair &&
              !prescriptionTreatmentData?.hc_p_ex_others?.Skin_condition &&
              !prescriptionTreatmentData?.hc_p_ex_others?.Family_history[0]
                ?.dieatryHistorys &&
              !prescriptionTreatmentData?.hc_p_ex_others?.Personal_history[0]
                ?.personalHistorys &&
              !prescriptionTreatmentData?.hc_p_ex_others?.Dietary_History[0]
                ?.dieatryHistorys &&
              !prescriptionTreatmentData?.hc_p_ex_others?.Salient_feature &&
              !prescriptionTreatmentData?.hc_p_ex_others
                ?.Provisional_diagnosis &&
              !prescriptionTreatmentData?.hc_p_ex_others
                ?.Differential_diagnosis ? null : (
                <div className="">
                  <p className={Styles.pdf_leftSideHeader}>Others</p>

                  {prescriptionTreatmentData.hc_p_ex_others.Appearance ? (
                    <p className="ms-5  mt-1 mb-0">
                      Appearance:{" "}
                      {prescriptionTreatmentData.hc_p_ex_others.Appearance}
                    </p>
                  ) : (
                    <></>
                  )}

                  {prescriptionTreatmentData.hc_p_ex_others.body_built ? (
                    <p className="ms-5  mt-1 mb-0">
                      Body Built:{" "}
                      {prescriptionTreatmentData.hc_p_ex_others.body_built}
                    </p>
                  ) : (
                    <></>
                  )}

                  {prescriptionTreatmentData.hc_p_ex_others.Nutrition ? (
                    <p className="ms-5  mt-1 mb-0">
                      Nutrition:{" "}
                      {prescriptionTreatmentData.hc_p_ex_others.Nutrition}
                    </p>
                  ) : (
                    <></>
                  )}

                  {prescriptionTreatmentData.hc_p_ex_others.Decubitus ? (
                    <p className="ms-5  mt-1 mb-0">
                      Decubitus:{" "}
                      {prescriptionTreatmentData.hc_p_ex_others.Decubitus}
                    </p>
                  ) : (
                    <></>
                  )}

                  {prescriptionTreatmentData.hc_p_ex_others.Cyanosis ? (
                    <p className="ms-5  mt-1 mb-0">
                      Cyanosis:{" "}
                      {prescriptionTreatmentData.hc_p_ex_others.Cyanosis}
                    </p>
                  ) : (
                    <></>
                  )}

                  {prescriptionTreatmentData.hc_p_ex_others.Clubbing ? (
                    <p className="ms-5  mt-1 mb-0">
                      Clubbing:{" "}
                      {prescriptionTreatmentData.hc_p_ex_others.Clubbing}
                    </p>
                  ) : (
                    <></>
                  )}

                  {prescriptionTreatmentData.hc_p_ex_others.Dehydration ? (
                    <p className="ms-5  mt-1 mb-0">
                      Dehydration:{" "}
                      {prescriptionTreatmentData.hc_p_ex_others.Dehydration}
                    </p>
                  ) : (
                    <></>
                  )}

                  {prescriptionTreatmentData.hc_p_ex_others.Koilonychia ? (
                    <p className="ms-5  mt-1 mb-0">
                      Koilonychia:{" "}
                      {prescriptionTreatmentData.hc_p_ex_others.Koilonychia}
                    </p>
                  ) : (
                    <></>
                  )}

                  {prescriptionTreatmentData.hc_p_ex_others.Leukonychia ? (
                    <p className="ms-5  mt-1 mb-0">
                      Leukonychia:{" "}
                      {prescriptionTreatmentData.hc_p_ex_others.Leukonychia}
                    </p>
                  ) : (
                    <></>
                  )}

                  {prescriptionTreatmentData.hc_p_ex_others.Neck_vein ? (
                    <p className="ms-5  mt-1 mb-0">
                      Neck vein:{" "}
                      {prescriptionTreatmentData.hc_p_ex_others.Neck_vein}
                    </p>
                  ) : (
                    <></>
                  )}

                  {prescriptionTreatmentData.hc_p_ex_others.Gynaecomastia ? (
                    <p className="ms-5  mt-1 mb-0">
                      Gynaecomastia:{" "}
                      {prescriptionTreatmentData.hc_p_ex_others.Gynaecomastia}
                    </p>
                  ) : (
                    <></>
                  )}

                  {prescriptionTreatmentData.hc_p_ex_others.Pigmentation ? (
                    <p className="ms-5  mt-1 mb-0">
                      Pigmentation:{" "}
                      {prescriptionTreatmentData.hc_p_ex_others.Pigmentation}
                    </p>
                  ) : (
                    <></>
                  )}

                  {prescriptionTreatmentData.hc_p_ex_others.Bony_Tenderness ? (
                    <p className="ms-5  mt-1 mb-0">
                      Bony Tenderness:{" "}
                      {prescriptionTreatmentData.hc_p_ex_others.Bony_Tenderness}
                    </p>
                  ) : (
                    <></>
                  )}

                  {prescriptionTreatmentData.hc_p_ex_others.Spider_naevi ? (
                    <p className="ms-5  mt-1 mb-0">
                      Spider naevi:{" "}
                      {prescriptionTreatmentData.hc_p_ex_others.Spider_naevi}
                    </p>
                  ) : (
                    <></>
                  )}

                  {prescriptionTreatmentData.hc_p_ex_others.Palmer_erythemia ? (
                    <p className="ms-5  mt-1 mb-0">
                      Palmer erythemia:{" "}
                      {
                        prescriptionTreatmentData.hc_p_ex_others
                          .Palmer_erythemia
                      }
                    </p>
                  ) : (
                    <></>
                  )}

                  {prescriptionTreatmentData.hc_p_ex_others
                    .Distribution_of_body_hair ? (
                    <p className="ms-5  mt-1 mb-0">
                      Distribution of body hair:{" "}
                      {
                        prescriptionTreatmentData.hc_p_ex_others
                          .Distribution_of_body_hair
                      }
                    </p>
                  ) : (
                    <></>
                  )}

                  {prescriptionTreatmentData.hc_p_ex_others.Skin_condition ? (
                    <p className="ms-5  mt-1 mb-0">
                      Skin condition:{" "}
                      {prescriptionTreatmentData.hc_p_ex_others.Skin_condition}
                    </p>
                  ) : (
                    <></>
                  )}
                  {!prescriptionTreatmentData.hc_p_ex_others.Family_history
                    .familyHistorys ? null : (
                    <div>
                      <p className="ms-5 mt-1 mb-0">Family history : </p>
                      {prescriptionTreatmentData.hc_p_ex_others.Family_history.map(
                        (pd, i) => {
                          return (
                            <p key={i} className="ms-5 mb-0 mt-0">
                              {pd.familyHistorys}
                              <></>
                            </p>
                          );
                        }
                      )}
                    </div>
                  )}

                  {!prescriptionTreatmentData.hc_p_ex_others.Personal_history
                    .personalHistorys ? null : (
                    <div>
                      <p className="ms-5 mt-1 mb-0">Personal History : </p>

                      {prescriptionTreatmentData.hc_p_ex_others.Personal_history.map(
                        (pd, i) => {
                          return (
                            <div key={i} className="ms-5 d-flex">
                              <span>{pd.personalHistorys}</span>
                            </div>
                          );
                        }
                      )}
                    </div>
                  )}
                  {!prescriptionTreatmentData.hc_p_ex_others.Dietary_History
                    .dieatryHistorys ? null : (
                    <div>
                      <p className="ms-5 mt-1 mb-0">Dietary History :</p>

                      {prescriptionTreatmentData.hc_p_ex_others.Dietary_History.map(
                        (pd, i) => {
                          return (
                            <div key={i} className="ms-5 d-flex">
                              <span>{pd.dieatryHistorys}</span>
                            </div>
                          );
                        }
                      )}
                    </div>
                  )}

                  {prescriptionTreatmentData.hc_p_ex_others.Salient_feature ? (
                    <p className="ms-5  mt-1 mb-0">
                      Salient feature:{" "}
                      {prescriptionTreatmentData.hc_p_ex_others.Salient_feature}
                    </p>
                  ) : (
                    <></>
                  )}

                  {prescriptionTreatmentData.hc_p_ex_others
                    .Provisional_diagnosis ? (
                    <p className="ms-5  mt-1 mb-0">
                      Provisional diagnosis:{" "}
                      {
                        prescriptionTreatmentData.hc_p_ex_others
                          .Provisional_diagnosis
                      }
                    </p>
                  ) : (
                    <></>
                  )}

                  {prescriptionTreatmentData.hc_p_ex_others
                    .Differential_diagnosis ? (
                    <p className="ms-5  mt-1 mb-0">
                      Differential diagnosis:{" "}
                      {
                        prescriptionTreatmentData.hc_p_ex_others
                          .Differential_diagnosis
                      }
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
              )}
              {!prescriptionTreatmentData?.hc_p_investigation ? null : (
                <div className="">
                  <p className={Styles.pdf_leftSideHeader}>Investigetions</p>
                  {prescriptionTreatmentData?.hc_p_investigation.map(
                    (pd, i) => {
                      return (
                        <p key={i} className="ms-5 mt-0 mb-0">
                          {pd.investigations}
                        </p>
                      );
                    }
                  )}
                </div>
              )}
            </div>

            {/* Treatment Section */}

            <div id="nonFooter" className="col-lg-8 col-md-7 col-12">
              <div className={Styles.medicine}>
                <h5 className={Styles.medicineListHeader}>Rx</h5>
                {prescriptionTreatmentData?.teratment?.map((pd, i) => {
                  return (
                    <div key={i}>
                      <div className="row">
                        <div className="col-1">
                          <div className="row">
                            <div className="col-5">
                              <p className="pl-2 ms-5">{i + 1}</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-11 d-flex">
                          <p
                            style={{
                              fontFamily: "Gentium Book Plus",
                            }}
                            className="ms-5 me-2 medType"
                          >
                            {" "}
                            {pd.med_type}
                          </p>
                          <p
                            style={{
                              fontFamily: "Gentium Book Plus",
                              fontWeight: "700",
                            }}
                            className="fs-5 ms-1"
                          >
                            {pd.med_name}
                          </p>
                        </div>
                      </div>

                      <div className={Styles.pdf_secondRow}>
                        <div className="row">
                          <div className="col-1"></div>
                          <div className="col-9 d-flex">
                            <p className="ms-1">{pd.med_dose_in_a_day}</p>{" "}
                            <p className="ms-3">{pd.med_dose_meal} </p>
                          </div>
                          <div className="col-2">
                            <p className="ms-2">{pd.med_dose_days}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div id="footer" className={Styles.pdf_suggestions}>
                <h5 className={Styles.MedicineReactionHeader}>উপদেশ-</h5>

                <div className={Styles.suggestionList}>
                  {prescriptionTreatmentData.advice?.map((adv, index) => {
                    return <span key={index}>✔️{adv}</span>;
                  })}
                </div>
                <div className="mt-3 ms-4">
                  <p>
                    <span className="fw-bold">
                      {prescriptionTreatmentData?.follow_up}
                    </span>{" "}
                    দিন পর দেখা করবেন{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

// export default ;

export default function PatientPrescription() {
  const ref = useRef();
  const [prescription, setPrescription] = useState(null);
  const auth = useSelector((state) => state.AuthReducer);

  const [isLoading, setIsLoading] = useState(true);

  const { prescriptionId, studentprescriptionid } = useParams();

  const getPrescriptionData = (id, uri) => {
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${auth.token}`,
      patientid: id,
      studentprescriptionid: id,
    };
    try {
      Axios.get(uri, { headers }).then((res) => {
        setPrescription(res.data);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (prescriptionId) {
      const uri = `../api/patient/patient_prescription_Data`;
      getPrescriptionData(prescriptionId, uri);
    }
    if (studentprescriptionid) {
      const uri = `../api/student/student_prescription_Data`;
      getPrescriptionData(studentprescriptionid, uri);
    }
  }, [prescriptionId, studentprescriptionid, isLoading]);

  return (
    <div>
      {prescription && (
        <div>
          <ReactToPrint
            trigger={() => <button>Print this out!</button>}
            content={() => ref.current}
          />

          <Prescription
            auth={auth}
            prescription={prescription}
            prescriptionId={prescriptionId}
            ref={ref}
          />
        </div>
      )}
    </div>
  );
}
