import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";
import Styles from "./Prescription.module.css";
// import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import heart from "../../assest/images/heart.jpg";
// import PrintProvider, { Print } from 'react-easy-print';
import Pdf from "react-to-pdf";
import { forwardRef, useRef } from "react";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import { useReactToPrint } from "react-to-print";

const ref = React.createRef();
const PDF = () => {
  const options = {
    orientation: "potrait",
    unit: "in",
    format: "a4",
  };
  const container = React.useRef(null);
  // const auth = useSelector((state) => state.AuthReducer);
  const prescriptionHeaderData = useSelector(
    (state) => state.prescriptionData?.prescriptionData.prescriptionHeader
  );
  const prescriptionLeftSideData = useSelector(
    (state) => state.prescriptionData?.prescriptionData.prescriptionLeftSide
  );

  const prescriptionRightSideData = useSelector(
    (state) =>
      state.prescriptionData?.prescriptionData.prescriptionRightSideData
  );

  const pdfExportComponent = React.useRef(null);

  const doctorInfo = prescriptionHeaderData.doctorDetail;
  const patientInfo = prescriptionHeaderData.patientDetail;
  const today = prescriptionHeaderData.today;
  const degreeData1 = prescriptionHeaderData.degreeData1;
  const degreeData2 = prescriptionHeaderData.degreeData2;
  const degreeData3 = prescriptionHeaderData.degreeData3;
  // console.log(doctorInfo);

  // console.log("patient", patientInfo);
  // console.log("leftSide", prescriptionLeftSideData);
  // console.log("rightSide", prescriptionRightSideData);

  const exportPDFWithMethod = () => {
    // let element = container.current || document.body;
    // savePDF(element, {
    //   paperSize: "auto",
    //   margin: 40,
    //   fileName: `Report for ${new Date().getFullYear()}`,
    // });
  };

  const exportPDFWithComponent = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };

  return (
    <div>
      <Pdf
        targetRef={ref}
        options={options}
        x={0.2}
        y={0.4}
        filename="code-example.pdf"
        scale={0.58}
      >
        {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
      </Pdf>
      <div ref={ref}>
        {/* <PDFExport
          ref={pdfExportComponent}
          scale={0.42}
          paperSize="A4"
          margin="1.5cm"
          fileName={`Report for ${new Date().getFullYear()}`}
          author="KendoReact Team"
        > */}
        {/* <PrintProvider>
        <Print printOnly name="foo"> */}
        <div className={Styles.pdf_heading}>
          <p>{doctorInfo ? doctorInfo.hc_doctor_specialist : ""}</p>
        </div>
        <div className="row">
          <div className="col-lg-5 col-md-5 col-sm-12">
            <div className={Styles.pdf_Doctor_details}>
              <h2 className={Styles.doctor_name}>
                {doctorInfo ? doctorInfo.hc_doctor_englishName : ""}
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
              {/* <p className={Styles.doctor_degree}>{doctorInfo ? doctorInfo.degree2 : null}</p> */}
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
                  degreeData3?.map((item, index) => {
                    return (
                      <p key={index}>
                        {item.degree} ({item.title}){" "}
                        {index + 1 < degreeData3?.length ? ", " : " "}{" "}
                      </p>
                    );
                  })}
              </div>

              <div className={Styles.pdf_doctor_degree2}>
                {doctorInfo?.hc_doctor_course_done &&
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

              <p>{doctorInfo ? doctorInfo.hc_doctor_medicale_name : ""}</p>
              <div className="d-flex">
                <p className={Styles.pdf_doctor_no}>
                  BMDC Reg No :{" "}
                  {doctorInfo ? doctorInfo.hc_doctor_BMDC_reg_no : ""}
                </p>
                <p className={Styles.pdf_fellow_id}>
                  Fellow Id : {doctorInfo ? doctorInfo.hc_doctor_FELLOW_id : ""}
                </p>
              </div>
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
              <p>চেম্বার : </p>
              <img className={Styles.specialist_image} src={heart} alt=""></img>
              <h3>
                {doctorInfo?.hc_doctor_of_hospital[0].hc_hospital_english_name}
              </h3>
              <p>
                {
                  doctorInfo?.hc_doctor_of_hospital[0].hc_hospital_address
                    .upazila
                }
                ,
                {
                  doctorInfo?.hc_doctor_of_hospital[0].hc_hospital_address
                    .district
                }
              </p>
            </div>
          </div>
        </div>

        <div className={Styles.pdf_patient_details_div}>
          <div className={Styles.pdf_patient_details}>
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
          <div className="col-lg-4 col-md-5 col-12 d-flex justify-content-center flex-column">
            {!prescriptionRightSideData.cheif_complain ? null : (
              <div className={Styles.chief_complains}>
                <p className={Styles.pdf_leftSideHeader}>Chief Complains</p>
                <div className={Styles.chief_complain_div}>
                  {prescriptionRightSideData.cheif_complain.map((pd, i) => {
                    return (
                      <p key={i} className="ms-5 mt-0 mb-0">
                        {pd.complains}
                      </p>
                    );
                  })}
                </div>
              </div>
            )}

            {!prescriptionLeftSideData.hc_p_cheif_past_history ? null : (
              <div className={Styles.pdf_pdf_past_history_div}>
                <p className={Styles.pdf_leftSideHeader}>Past History</p>
                <div className="d-flex ms-3">
                  {prescriptionLeftSideData &&
                    prescriptionLeftSideData.hc_p_cheif_past_history?.map(
                      (item, index) => {
                        return (
                          <p className="ms-5" key={index}>
                            {item.history} : {item.case}{" "}
                            {index + 1 <
                              prescriptionLeftSideData.hc_p_cheif_past_history
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

            {!prescriptionLeftSideData.hc_p_cheif_drug_history ? null : (
              <div className={Styles.pdf_pdf_past_history_div}>
                <p className={Styles.pdf_leftSideHeader}>Chief Old Drug</p>

                {/* <div className={Styles.pdf_past_history_div}> */}
                {prescriptionLeftSideData.hc_p_cheif_drug_history.map(
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

            {!prescriptionLeftSideData.hc_p_general_examination.Anemia &&
              !prescriptionLeftSideData.hc_p_general_examination.Jaundice &&
              !prescriptionLeftSideData.hc_p_general_examination.Oedema &&
              !prescriptionLeftSideData.hc_p_general_examination.Lymph_node &&
              !prescriptionLeftSideData.hc_p_general_examination.Thyroid_gland &&
              !prescriptionLeftSideData.hc_p_general_examination.Pulse &&
              !prescriptionLeftSideData.hc_p_general_examination.Blood_pressure &&
              !prescriptionLeftSideData.hc_p_general_examination.Respiration &&
              !prescriptionLeftSideData.hc_p_general_examination
                .Body_temperature ? null : (
              <div className="">
                <p className={Styles.pdf_leftSideHeader}>General Examination</p>
                {prescriptionLeftSideData.hc_p_general_examination.Anemia ? (
                  <p className="ms-5 mb-0">
                    Anemia :{" "}
                    <span>
                      {prescriptionLeftSideData.hc_p_general_examination.Anemia}
                    </span>
                  </p>
                ) : (
                  <></>
                )}

                {prescriptionLeftSideData.hc_p_general_examination.Jaundice ? (
                  <p className="ms-5 mb-0">
                    Jaundice :{" "}
                    <span>
                      {
                        prescriptionLeftSideData.hc_p_general_examination
                          .Jaundice
                      }
                    </span>
                  </p>
                ) : (
                  <></>
                )}

                {prescriptionLeftSideData.hc_p_general_examination.Oedema ? (
                  <p className="ms-5 mb-0">
                    Oedema :{" "}
                    <span>
                      {prescriptionLeftSideData.hc_p_general_examination.Oedema}
                    </span>
                  </p>
                ) : (
                  <></>
                )}

                {prescriptionLeftSideData.hc_p_general_examination
                  .Lymph_node ? (
                  <p className="ms-5 mb-0">
                    Lymph node :{" "}
                    <span>
                      {
                        prescriptionLeftSideData.hc_p_general_examination
                          .Lymph_node
                      }
                    </span>
                  </p>
                ) : (
                  <></>
                )}

                {prescriptionLeftSideData.hc_p_general_examination
                  .Thyroid_gland ? (
                  <p className="ms-5 mb-0">
                    Thyroid gland :{" "}
                    <span>
                      {
                        prescriptionLeftSideData.hc_p_general_examination
                          .Thyroid_gland
                      }
                    </span>
                  </p>
                ) : (
                  <></>
                )}

                {prescriptionLeftSideData.hc_p_general_examination.Pulse ? (
                  <p className="ms-5 mb-0">
                    Pulse :{" "}
                    <span>
                      {prescriptionLeftSideData.hc_p_general_examination.Pulse}
                    </span>
                  </p>
                ) : (
                  <></>
                )}

                {prescriptionLeftSideData.hc_p_general_examination
                  .Blood_pressure ? (
                  <p className="ms-5 mb-0">
                    Blood Pressure :{" "}
                    <span>
                      {
                        prescriptionLeftSideData.hc_p_general_examination
                          .Blood_pressure
                      }
                    </span>
                  </p>
                ) : (
                  <></>
                )}

                {prescriptionLeftSideData.hc_p_general_examination
                  .Respiration ? (
                  <p className="ms-5 mb-0">
                    Respiration :{" "}
                    <span>
                      {
                        prescriptionLeftSideData.hc_p_general_examination
                          .Respiration
                      }
                    </span>
                  </p>
                ) : (
                  <></>
                )}

                {prescriptionLeftSideData.hc_p_general_examination
                  .Body_temperature ? (
                  <p className="ms-5 mb-0">
                    Body Temperature :{" "}
                    <span>
                      {
                        prescriptionLeftSideData.hc_p_general_examination
                          .Body_temperature
                      }
                    </span>
                  </p>
                ) : (
                  <></>
                )}
              </div>
            )}

            {!prescriptionLeftSideData.hc_p_gex_female
              .Menstrual_obstetric_History &&
              !prescriptionLeftSideData.hc_p_gex_female.LMP &&
              !prescriptionLeftSideData.hc_p_gex_female.Para ? null : (
              <div>
                <p className={Styles.pdf_leftSideHeader}>In Case Female</p>

                {prescriptionLeftSideData.hc_p_gex_female
                  .Menstrual_obstetric_History ? (
                  <p className="ms-5  mt-1 mb-0">
                    Menstrual & ostetric History:{" "}
                    {
                      prescriptionLeftSideData.hc_p_gex_female
                        .Menstrual_obstetric_History
                    }
                  </p>
                ) : (
                  <></>
                )}

                {prescriptionLeftSideData.hc_p_gex_female.LMP ? (
                  <p className="ms-5  mt-1 mb-0">
                    LMP: {prescriptionLeftSideData.hc_p_gex_female.LMP}
                  </p>
                ) : (
                  <></>
                )}
                {prescriptionLeftSideData.hc_p_gex_female.Para ? (
                  <p className="ms-5  mt-1 mb-0">
                    Para: {prescriptionLeftSideData.hc_p_gex_female.Para}
                  </p>
                ) : (
                  <></>
                )}
              </div>
            )}

            {!prescriptionLeftSideData.hc_p_ex_baby
              .Mothers_disease_during_pregnancy &&
              !prescriptionLeftSideData.hc_p_ex_baby.Vaccine_History_Of_Mother &&
              !prescriptionLeftSideData.hc_p_ex_baby.Labor_duration &&
              !prescriptionLeftSideData.hc_p_ex_baby.Cry &&
              !prescriptionLeftSideData.hc_p_ex_baby.Movement &&
              !prescriptionLeftSideData.hc_p_ex_baby.Breathing ? null : (
              <div>
                <p className={Styles.pdf_leftSideHeader}>
                  General Examination of Baby
                </p>
                {prescriptionLeftSideData.hc_p_ex_baby
                  .Mothers_disease_during_pregnancy ? (
                  <p className="ms-5  mt-1 mb-0">
                    Mothers disease during pregnancy:{" "}
                    {
                      prescriptionLeftSideData.hc_p_ex_baby
                        .Mothers_disease_during_pregnancy
                    }
                  </p>
                ) : (
                  <></>
                )}

                {prescriptionLeftSideData.hc_p_ex_baby
                  .Vaccine_History_Of_Mother ? (
                  <p className="ms-5  mt-1 mb-0">
                    Vaccine History Of Mother:{" "}
                    {
                      prescriptionLeftSideData.hc_p_ex_baby
                        .Vaccine_History_Of_Mother
                    }
                  </p>
                ) : (
                  <></>
                )}

                {prescriptionLeftSideData.hc_p_ex_baby.Labor_duration ? (
                  <p className="ms-5  mt-1 mb-0">
                    Labour Duration:{" "}
                    {prescriptionLeftSideData.hc_p_ex_baby.Labor_duration}
                  </p>
                ) : (
                  <></>
                )}

                {prescriptionLeftSideData.hc_p_ex_baby.Cry ? (
                  <p className="ms-5  mt-1 mb-0">
                    Cry: {prescriptionLeftSideData.hc_p_ex_baby.Cry}
                  </p>
                ) : (
                  <></>
                )}

                {prescriptionLeftSideData.hc_p_ex_baby.Movement ? (
                  <p className="ms-5  mt-1 mb-0">
                    Movement: {prescriptionLeftSideData.hc_p_ex_baby.Movement}
                  </p>
                ) : (
                  <></>
                )}

                {prescriptionLeftSideData.hc_p_ex_baby.Breathing ? (
                  <p className="ms-5  mt-1 mb-0">
                    Breathing: {prescriptionLeftSideData.hc_p_ex_baby.Breathing}
                  </p>
                ) : (
                  <></>
                )}
              </div>
            )}

            {!prescriptionLeftSideData.hc_p_gex_systemic_examination.Heart &&
              !prescriptionLeftSideData.hc_p_gex_systemic_examination.Lung &&
              !prescriptionLeftSideData.hc_p_gex_systemic_examination.Abdomen &&
              !prescriptionLeftSideData.hc_p_gex_systemic_examination
                .Neurological &&
              !prescriptionLeftSideData.hc_p_gex_systemic_examination.MSK &&
              !prescriptionLeftSideData.hc_p_gex_systemic_examination
                .Oral_cavity ? null : (
              <div>
                <p className={Styles.pdf_leftSideHeader}>
                  Systemic Examination
                </p>

                {prescriptionLeftSideData.hc_p_gex_systemic_examination
                  .Heart ? (
                  <p className="ms-5  mt-1 mb-0">
                    Heart:{" "}
                    {
                      prescriptionLeftSideData.hc_p_gex_systemic_examination
                        .Heart
                    }
                  </p>
                ) : (
                  <></>
                )}

                {prescriptionLeftSideData.hc_p_gex_systemic_examination.Lung ? (
                  <p className="ms-5  mt-1 mb-0">
                    Lung:{" "}
                    {
                      prescriptionLeftSideData.hc_p_gex_systemic_examination
                        .Lung
                    }
                  </p>
                ) : (
                  <></>
                )}

                {prescriptionLeftSideData.hc_p_gex_systemic_examination
                  .Abdomen ? (
                  <p className="ms-5  mt-1 mb-0">
                    Abdomen:{" "}
                    {
                      prescriptionLeftSideData.hc_p_gex_systemic_examination
                        .Abdomen
                    }
                  </p>
                ) : (
                  <></>
                )}

                {prescriptionLeftSideData.hc_p_gex_systemic_examination
                  .Neurological ? (
                  <p className="ms-5  mt-1 mb-0">
                    Neurological:{" "}
                    {
                      prescriptionLeftSideData.hc_p_gex_systemic_examination
                        .Neurological
                    }
                  </p>
                ) : (
                  <></>
                )}

                {prescriptionLeftSideData.hc_p_gex_systemic_examination.MSK ? (
                  <p className="ms-5  mt-1 mb-0">
                    MSK:{" "}
                    {prescriptionLeftSideData.hc_p_gex_systemic_examination.MSK}
                  </p>
                ) : (
                  <></>
                )}

                {prescriptionLeftSideData.hc_p_gex_systemic_examination
                  .Oral_cavity ? (
                  <p className="ms-5  mt-1 mb-0">
                    Oral cavity:{" "}
                    {
                      prescriptionLeftSideData.hc_p_gex_systemic_examination
                        .Oral_cavity
                    }
                  </p>
                ) : (
                  <></>
                )}
              </div>
            )}

            {!prescriptionLeftSideData.hc_p_ex_post_operative_patient
              .OT_procedure &&
              !prescriptionLeftSideData.hc_p_ex_post_operative_patient
                .Infection ? null : (
              <div>
                <p className={Styles.pdf_leftSideHeader}>
                  In case of Post Operative Patient
                </p>

                {prescriptionLeftSideData.hc_p_ex_post_operative_patient
                  .OT_procedure ? (
                  <p className="ms-5  mt-1 mb-0">
                    OT procedure:{" "}
                    {
                      prescriptionLeftSideData.hc_p_ex_post_operative_patient
                        .OT_procedure
                    }
                  </p>
                ) : (
                  <></>
                )}

                {prescriptionLeftSideData.hc_p_ex_post_operative_patient
                  .Infection ? (
                  <p className="ms-5  mt-1 mb-0">
                    Infection:{" "}
                    {
                      prescriptionLeftSideData.hc_p_ex_post_operative_patient
                        .Infection
                    }
                  </p>
                ) : (
                  <></>
                )}
              </div>
            )}
            {!prescriptionLeftSideData.hc_p_ex_others.Appearance &&
              !prescriptionLeftSideData.hc_p_ex_others.body_built &&
              !prescriptionLeftSideData.hc_p_ex_others.Nutrition &&
              !prescriptionLeftSideData.hc_p_ex_others.Decubitus &&
              !prescriptionLeftSideData.hc_p_ex_others.Cyanosis &&
              !prescriptionLeftSideData.hc_p_ex_others.Clubbing &&
              !prescriptionLeftSideData.hc_p_ex_others.Dehydration &&
              !prescriptionLeftSideData.hc_p_ex_others.Koilonychia &&
              !prescriptionLeftSideData.hc_p_ex_others.Leukonychia &&
              !prescriptionLeftSideData.hc_p_ex_others.Neck_vein &&
              !prescriptionLeftSideData.hc_p_ex_others.Gynaecomastia &&
              !prescriptionLeftSideData.hc_p_ex_others.Pigmentation &&
              !prescriptionLeftSideData.hc_p_ex_others.Bony_Tenderness &&
              !prescriptionLeftSideData.hc_p_ex_others.Spider_naevi &&
              !prescriptionLeftSideData.hc_p_ex_others.Palmer_erythemia &&
              !prescriptionLeftSideData.hc_p_ex_others
                .Distribution_of_body_hair &&
              !prescriptionLeftSideData.hc_p_ex_others.Skin_condition &&
              !prescriptionLeftSideData.hc_p_ex_others.Family_history &&
              !prescriptionLeftSideData.hc_p_ex_others.Personal_history &&
              !prescriptionLeftSideData.hc_p_ex_others.Dietary_History &&
              !prescriptionLeftSideData.hc_p_ex_others.Salient_feature &&
              !prescriptionLeftSideData.hc_p_ex_others.Provisional_diagnosis &&
              !prescriptionLeftSideData.hc_p_ex_others
                .Differential_diagnosis ? null : (
              <div className="">
                <p className={Styles.pdf_leftSideHeader}>Others</p>

                {prescriptionLeftSideData.hc_p_ex_others.Appearance ? (
                  <p className="ms-5  mt-1 mb-0">
                    Appearance:{" "}
                    {prescriptionLeftSideData.hc_p_ex_others.Appearance}
                  </p>
                ) : (
                  <></>
                )}

                {prescriptionLeftSideData.hc_p_ex_others.body_built ? (
                  <p className="ms-5  mt-1 mb-0">
                    Body Built:{" "}
                    {prescriptionLeftSideData.hc_p_ex_others.body_built}
                  </p>
                ) : (
                  <></>
                )}

                {prescriptionLeftSideData.hc_p_ex_others.Nutrition ? (
                  <p className="ms-5  mt-1 mb-0">
                    Nutrition:{" "}
                    {prescriptionLeftSideData.hc_p_ex_others.Nutrition}
                  </p>
                ) : (
                  <></>
                )}

                {prescriptionLeftSideData.hc_p_ex_others.Decubitus ? (
                  <p className="ms-5  mt-1 mb-0">
                    Decubitus:{" "}
                    {prescriptionLeftSideData.hc_p_ex_others.Decubitus}
                  </p>
                ) : (
                  <></>
                )}

                {prescriptionLeftSideData.hc_p_ex_others.Cyanosis ? (
                  <p className="ms-5  mt-1 mb-0">
                    Cyanosis: {prescriptionLeftSideData.hc_p_ex_others.Cyanosis}
                  </p>
                ) : (
                  <></>
                )}

                {prescriptionLeftSideData.hc_p_ex_others.Clubbing ? (
                  <p className="ms-5  mt-1 mb-0">
                    Clubbing: {prescriptionLeftSideData.hc_p_ex_others.Clubbing}
                  </p>
                ) : (
                  <></>
                )}

                {prescriptionLeftSideData.hc_p_ex_others.Dehydration ? (
                  <p className="ms-5  mt-1 mb-0">
                    Dehydration:{" "}
                    {prescriptionLeftSideData.hc_p_ex_others.Dehydration}
                  </p>
                ) : (
                  <></>
                )}

                {prescriptionLeftSideData.hc_p_ex_others.Koilonychia ? (
                  <p className="ms-5  mt-1 mb-0">
                    Koilonychia:{" "}
                    {prescriptionLeftSideData.hc_p_ex_others.Koilonychia}
                  </p>
                ) : (
                  <></>
                )}

                {prescriptionLeftSideData.hc_p_ex_others.Leukonychia ? (
                  <p className="ms-5  mt-1 mb-0">
                    Leukonychia:{" "}
                    {prescriptionLeftSideData.hc_p_ex_others.Leukonychia}
                  </p>
                ) : (
                  <></>
                )}

                {prescriptionLeftSideData.hc_p_ex_others.Neck_vein ? (
                  <p className="ms-5  mt-1 mb-0">
                    Neck vein:{" "}
                    {prescriptionLeftSideData.hc_p_ex_others.Neck_vein}
                  </p>
                ) : (
                  <></>
                )}

                {prescriptionLeftSideData.hc_p_ex_others.Gynaecomastia ? (
                  <p className="ms-5  mt-1 mb-0">
                    Gynaecomastia:{" "}
                    {prescriptionLeftSideData.hc_p_ex_others.Gynaecomastia}
                  </p>
                ) : (
                  <></>
                )}

                {prescriptionLeftSideData.hc_p_ex_others.Pigmentation ? (
                  <p className="ms-5  mt-1 mb-0">
                    Pigmentation:{" "}
                    {prescriptionLeftSideData.hc_p_ex_others.Pigmentation}
                  </p>
                ) : (
                  <></>
                )}

                {prescriptionLeftSideData.hc_p_ex_others.Bony_Tenderness ? (
                  <p className="ms-5  mt-1 mb-0">
                    Bony Tenderness:{" "}
                    {prescriptionLeftSideData.hc_p_ex_others.Bony_Tenderness}
                  </p>
                ) : (
                  <></>
                )}

                {prescriptionLeftSideData.hc_p_ex_others.Spider_naevi ? (
                  <p className="ms-5  mt-1 mb-0">
                    Spider naevi:{" "}
                    {prescriptionLeftSideData.hc_p_ex_others.Spider_naevi}
                  </p>
                ) : (
                  <></>
                )}

                {prescriptionLeftSideData.hc_p_ex_others.Palmer_erythemia ? (
                  <p className="ms-5  mt-1 mb-0">
                    Palmer erythemia:{" "}
                    {prescriptionLeftSideData.hc_p_ex_others.Palmer_erythemia}
                  </p>
                ) : (
                  <></>
                )}

                {prescriptionLeftSideData.hc_p_ex_others
                  .Distribution_of_body_hair ? (
                  <p className="ms-5  mt-1 mb-0">
                    Distribution of body hair:{" "}
                    {
                      prescriptionLeftSideData.hc_p_ex_others
                        .Distribution_of_body_hair
                    }
                  </p>
                ) : (
                  <></>
                )}

                {prescriptionLeftSideData.hc_p_ex_others.Skin_condition ? (
                  <p className="ms-5  mt-1 mb-0">
                    Skin condition:{" "}
                    {prescriptionLeftSideData.hc_p_ex_others.Skin_condition}
                  </p>
                ) : (
                  <></>
                )}
                {!prescriptionLeftSideData.hc_p_ex_others.Family_history
                  .familyHistorys ? null : (
                  <div>
                    <p className="ms-5 mt-1 mb-0">Family history : </p>
                    {prescriptionLeftSideData.hc_p_ex_others.Family_history.map(
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

                {!prescriptionLeftSideData.hc_p_ex_others.Personal_history
                  .personalHistorys ? null : (
                  <div>
                    <p className="ms-5 mt-1 mb-0">Personal History : </p>

                    {prescriptionLeftSideData.hc_p_ex_others.Personal_history.map(
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
                {!prescriptionLeftSideData.hc_p_ex_others.Dietary_History
                  .dieatryHistorys ? null : (
                  <div>
                    <p className="ms-5 mt-1 mb-0">Dietary History :</p>

                    {prescriptionLeftSideData.hc_p_ex_others.Dietary_History.map(
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

                {prescriptionLeftSideData.hc_p_ex_others.Salient_feature ? (
                  <p className="ms-5  mt-1 mb-0">
                    Salient feature:{" "}
                    {prescriptionLeftSideData.hc_p_ex_others.Salient_feature}
                  </p>
                ) : (
                  <></>
                )}

                {prescriptionLeftSideData.hc_p_ex_others
                  .Provisional_diagnosis ? (
                  <p className="ms-5  mt-1 mb-0">
                    Provisional diagnosis:{" "}
                    {
                      prescriptionLeftSideData.hc_p_ex_others
                        .Provisional_diagnosis
                    }
                  </p>
                ) : (
                  <></>
                )}

                {prescriptionLeftSideData.hc_p_ex_others
                  .Differential_diagnosis ? (
                  <p className="ms-5  mt-1 mb-0">
                    Differential diagnosis:{" "}
                    {
                      prescriptionLeftSideData.hc_p_ex_others
                        .Differential_diagnosis
                    }
                  </p>
                ) : (
                  <></>
                )}
              </div>
            )}
            {!prescriptionLeftSideData.hc_p_investigation ? null : (
              <div className="">
                <p className={Styles.pdf_leftSideHeader}>Investigetions</p>
                {prescriptionLeftSideData.hc_p_investigation.map((pd, i) => {
                  return (
                    <p key={i} className="ms-5 mt-0 mb-0">
                      {pd.investigations}
                    </p>
                  );
                })}
              </div>
            )}
          </div>

          {/* Treatment Section */}

          <div id="nonFooter" className="col-lg-8 col-md-7 col-12">
            <div className={Styles.medicine}>
              <h5 className={Styles.medicineListHeader}>Rx</h5>
              {prescriptionRightSideData?.teratment.map((pd, i) => {
                return (
                  <div key={i}>
                    <div className="d-flex">
                      <p className="pl-2">{i + 1}</p>
                      <p className="col-1 ms-3"> {pd.med_type}</p>
                      <p className="ms-3 fs-5">{pd.med_name}</p>
                    </div>

                    <div className={Styles.pdf_secondRow}>
                      <div className="row">
                        <div className="col-4">
                          <p className="ms-5">{pd.med_dose_in_a_day}</p>
                        </div>
                        <div className="col-4">
                          <p className="ms-5">{pd.med_dose_days}</p>
                        </div>
                        <div className="col-4">
                          <p className="ms-5">{pd.med_dose_meal} </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div id="footer" className={Styles.pdf_suggestions}>
              <h5 className={Styles.MedicineReactionHeader}>
                কোন মেডিসিন খাওয়ার পর যদি-
              </h5>

              <div className={Styles.suggestionList}>
                <span className="fw-bold">1.</span>বমি হয় &nbsp;
                <span className="fw-bold">2.</span>পাতলা পায়খানা হয় &nbsp;
                <span className="fw-bold">3.</span>মাথা ঘুরানো &nbsp;
                <span className="fw-bold">4.</span>পা ফুলে যায়&nbsp;
                <span className="fw-bold">5.</span>খিচুনি &nbsp;
                <span className="fw-bold">6.</span>শ্বাসকষ্ট হয় &nbsp;
                <span className="fw-bold">7.</span>শরীরে লাল দাগ-চুলকানি &nbsp;
                <span className="fw-bold">8.</span>শরীরে তীব্র ব্যাথা &nbsp;
                <span className="fw-bold">9.</span>চোখ হলুদ &nbsp;
                <span className="fw-bold">10.</span>প্রসাবের পরিমাণ কমে গেলে ।
                <br />ঐ ঔষধ বন্ধ রাখবেন ও ডাক্তারের সাথে যোগাযোগ করবেন ।
              </div>
              <div className="mt-3 ms-4">
                <p>
                  <span className="fw-bold">
                    {prescriptionRightSideData.follow_up}
                  </span>{" "}
                  দিন পর দেখা করবেন{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* </Print>
          </PrintProvider> */}
        {/* </PDFExport> */}
      </div>

      {/* <div className="d-flex mt-3">
        <button className="" onClick={exportPDFWithComponent}>
          Download1
        </button>
        &nbsp;
        <button className="" onClick={exportPDFWithMethod}>
          Download2
        </button>
      </div> */}
    </div>
  );
};

export default PDF;
