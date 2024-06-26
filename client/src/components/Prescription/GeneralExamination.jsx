import React, { useState } from "react";
import Styles from "./Prescription.module.css";

const GeneralExamination = (props) => {
  const [toggle, settoggle] = useState(true);
  const { generalEx } = props;
  return (
    <div>
      <div>
        <div className={Styles.leftSideHeader}>
          <h5>General Examination</h5> &nbsp; &nbsp;
          {toggle ? (
            <i
              className="fas fa-angle-double-right mt-3"
              onClick={() => settoggle(false)}
            ></i>
          ) : (
            <i
              className="fas fa-angle-double-down mt-3"
              onClick={() => settoggle(true)}
            ></i>
          )}
        </div>
        {toggle ? null : (
          <>
            <p className="ms-3 font-weight-bold mb-0">Anemia </p>
            <div className="d-flex">
              <input
                className="ms-3"
                type="radio"
                id="Anemia"
                name="Anemia"
                value="Absent"
                checked={generalEx?.Anemia == "Absent" ? true : false}
                onChange={props.handleOnChange_G_EX}
              />
              <label className="ms-1 mt-1" htmlFor="vehicle1">
                {" "}
                Absent
              </label>
              <br />
              <input
                className="ms-3"
                type="radio"
                id="Anemia"
                name="Anemia"
                value="Mild"
                checked={generalEx?.Anemia == "Mild" ? true : false}
                onChange={props.handleOnChange_G_EX}
              />
              <label className="ms-1 mt-1" htmlFor="vehicle1">
                {" "}
                Mild
              </label>
              <br />
              <input
                className="ms-3"
                type="radio"
                id="Anemia"
                name="Anemia"
                value="moderate"
                checked={generalEx?.Anemia == "moderate" ? true : false}
                onChange={props.handleOnChange_G_EX}
              />
              <label className="ms-1 mt-1" htmlFor="vehicle1">
                {" "}
                Moderate
              </label>
              <br />
              <input
                className="ms-3"
                type="radio"
                id="Anemia"
                name="Anemia"
                value="severe"
                checked={generalEx?.Anemia == "severe" ? true : false}
                onChange={props.handleOnChange_G_EX}
              />
              <label className="ms-1 mt-1" htmlFor="vehicle1">
                {" "}
                Severe
              </label>
            </div>

            <p className="ms-3 font-weight-bold mb-0 mt-1">Jaundice </p>
            <div className="d-flex">
              <input
                className="ms-3"
                type="radio"
                id="Jaundice"
                name="Jaundice"
                value="Absent"
                checked={generalEx?.Jaundice == "Absent" ? true : false}
                onChange={props.handleOnChange_G_EX}
              />
              <label className="ms-1 mt-1" htmlFor="vehicle1">
                {" "}
                Absent
              </label>
              <br />
              <input
                className="ms-3"
                type="radio"
                id="Jaundice"
                name="Jaundice"
                value="Mild"
                checked={generalEx?.Jaundice == "Mild" ? true : false}
                onChange={props.handleOnChange_G_EX}
              />
              <label className="ms-1 mt-1" htmlFor="vehicle1">
                {" "}
                Mild
              </label>
              <br />
              <input
                className="ms-3"
                type="radio"
                id="Jaundice"
                name="Jaundice"
                value="moderate"
                checked={generalEx?.Jaundice == "moderate" ? true : false}
                onChange={props.handleOnChange_G_EX}
              />
              <label className="ms-1 mt-1" htmlFor="vehicle1">
                {" "}
                Moderate
              </label>
              <br />
              <input
                className="ms-3"
                type="radio"
                id="Jaundice"
                name="Jaundice"
                value="severe"
                checked={generalEx?.Jaundice == "severe" ? true : false}
                onChange={props.handleOnChange_G_EX}
              />
              <label className="ms-1 mt-1" htmlFor="vehicle1">
                {" "}
                Severe
              </label>
            </div>

            <p className="ms-3 font-weight-bold mb-0 mt-1">Oedema </p>
            <div className="d-flex">
              <input
                className="ms-3"
                type="radio"
                id="Oedema"
                name="Oedema"
                value="Present"
                checked={generalEx?.Oedema == "Present" ? true : false}
                onChange={props.handleOnChange_G_EX}
              />
              <label className="ms-1 mt-1" htmlFor="vehicle1">
                {" "}
                Present
              </label>
              <br />
              <input
                className="ms-3"
                type="radio"
                id="Oedema"
                name="Oedema"
                value="Absent"
                checked={generalEx?.Oedema == "Absent" ? true : false}
                onChange={props.handleOnChange_G_EX}
              />
              <label className="ms-1 mt-1" htmlFor="vehicle1">
                {" "}
                Absent
              </label>
            </div>

            <p className="ms-3 font-weight-bold mt-1 mb-0">Lymph node </p>
            <input
              className={Styles.searchTearm2}
              id="Lymph_node"
              value={generalEx?.Lymph_node ? generalEx?.Lymph_node : ""}
              onChange={props.handleOnChange_G_EX}
            ></input>

            <p className="ms-3 font-weight-bold mt-1 mb-0">Thyroid gland </p>
            <div className="d-flex ">
              <input
                className="ms-3"
                type="radio"
                id="Thyroid_gland"
                value="Normal"
                name="Thyroid gland"
                checked={generalEx?.Thyroid_gland == "Normal" ? true : false}
                onChange={props.handleOnChange_G_EX}
              />
              <label className="ms-1 mt-1" htmlFor="vehicle1">
                {" "}
                Normal
              </label>
              <br />
              <input
                className="ms-3"
                type="radio"
                id="Thyroid_gland"
                value="Enlarged"
                name="Thyroid gland"
                checked={generalEx?.Thyroid_gland == "Enlarged" ? true : false}
                onChange={props.handleOnChange_G_EX}
              />
              <label className="ms-1 mt-1" htmlFor="vehicle1">
                {" "}
                Enlarged
              </label>
            </div>

            <p className="ms-3 font-weight-bold mt-1 mb-0">Pulse </p>
            <input
              className={Styles.searchTearm2}
              id="Pulse"
              value={generalEx?.Pulse ? generalEx?.Pulse : ""}
              onChange={props.handleOnChange_G_EX}
            ></input>

            <p className="ms-3 font-weight-bold mt-1 mb-0">Blood Pressure </p>
            <input
              className={Styles.searchTearm2}
              id="Blood_pressure"
              value={
                generalEx?.Blood_pressure ? generalEx?.Blood_pressure : ""
              }
              onChange={props.handleOnChange_G_EX}
            ></input>

            <p className="ms-3 font-weight-bold mt-1 mb-0">Respiration </p>
            <input
              className={Styles.searchTearm2}
              id="Respiration"
              value={generalEx?.Respiration ? generalEx?.Respiration : ""}
              onChange={props.handleOnChange_G_EX}
            ></input>

            <p className="ms-3 font-weight-bold mt-1 mb-0">Body Temperature </p>
            <input
              className={Styles.searchTearm2}
              id="Body_temperature"
              value={
                generalEx?.Body_temperature ? generalEx?.Body_temperature : ""
              }
              onChange={props.handleOnChange_G_EX}
            ></input>
          </>
        )}
      </div>
    </div>
  );
};

export default GeneralExamination;
