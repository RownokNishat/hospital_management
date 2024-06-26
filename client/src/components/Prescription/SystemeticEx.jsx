import React, { useState } from "react";
import Styles from "./Prescription.module.css";

const SystemeticEx = (props) => {
  const [toggle, settoggle] = useState(true);

  const { systemeticEx } = props;
  return (
    <div>
      <div>
        <div className={Styles.leftSideHeader}>
          <h5>Systemic Examination</h5> &nbsp; &nbsp;
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
            <p className="ms-3 font-weight-bold mt-1 mb-0">Heart </p>
            <input
              className={Styles.searchTearm2}
              onChange={props.handleOnChange_Systemic_EX}
              type="text"
              id="Heart"
              value={systemeticEx?.Heart ? systemeticEx?.Heart : ""}
              placeholder="Heart"
            ></input>
            <p className="ms-3 font-weight-bold mt-1 mb-0">Lung </p>
            <input
              className={Styles.searchTearm2}
              onChange={props.handleOnChange_Systemic_EX}
              type="text"
              id="Lung"
              value={systemeticEx?.Lung ? systemeticEx?.Lung : ""}
              placeholder="Lung"
            ></input>
            <p className="ms-3 font-weight-bold mt-1 mb-0">Abdomen </p>
            <input
              className={Styles.searchTearm2}
              onChange={props.handleOnChange_Systemic_EX}
              type="text"
              id="Abdomen"
              value={systemeticEx?.Abdomen ? systemeticEx?.Abdomen : ""}
              placeholder="Abdomen"
            ></input>

            <p className="ms-3 font-weight-bold mt-1 mb-0">Neurological </p>
            <input
              className={Styles.searchTearm2}
              onChange={props.handleOnChange_Systemic_EX}
              type="text"
              id="Neurological"
              placeholder="Neurological"
              value={
                systemeticEx?.Neurological ? systemeticEx?.Neurological : ""
              }
            ></input>
            <p className="ms-3 font-weight-bold mt-1 mb-0">MSK </p>
            <input
              className={Styles.searchTearm2}
              onChange={props.handleOnChange_Systemic_EX}
              type="text"
              id="MSK"
              placeholder="MSK"
              value={systemeticEx?.MSK ? systemeticEx?.MSK : ""}
            ></input>
            <p className="ms-3 font-weight-bold mt-1 mb-0">Oral Cavity </p>
            <input
              className={Styles.searchTearm2}
              onChange={props.handleOnChange_Systemic_EX}
              type="text"
              id="Oral_cavity"
              placeholder="Oral cavity"
              value={systemeticEx?.Oral_cavity ? systemeticEx?.Oral_cavity : ""}
            ></input>
            <p className="ms-3 font-weight-bold mt-1 mb-0">Eye</p>
            <input
              className={Styles.searchTearm2}
              onChange={props.handleOnChange_Systemic_EX}
              type="text"
              id="Eye"
              placeholder="Eye"
              value={systemeticEx?.Eye ? systemeticEx?.Eye : ""}
            ></input>
            <p className="ms-3 font-weight-bold mt-1 mb-0">Ear</p>
            <input
              className={Styles.searchTearm2}
              onChange={props.handleOnChange_Systemic_EX}
              type="text"
              id="Ear"
              value={systemeticEx?.Ear ? systemeticEx?.Ear : ""}
              placeholder="Ear"
            ></input>
            <p className="ms-3 font-weight-bold mt-1 mb-0">Nose</p>
            <input
              className={Styles.searchTearm2}
              onChange={props.handleOnChange_Systemic_EX}
              type="text"
              id="Nose"
              value={systemeticEx?.Nose ? systemeticEx?.Nose : ""}
              placeholder="Nose"
            ></input>
            <p className="ms-3 font-weight-bold mt-1 mb-0">PNS</p>
            <input
              className={Styles.searchTearm2}
              onChange={props.handleOnChange_Systemic_EX}
              type="text"
              id="PNS"
              placeholder="PNS"
              value={systemeticEx?.PNS ? systemeticEx?.PNS : ""}
            ></input>
            <p className="ms-3 font-weight-bold mt-1 mb-0">Mouth & Pharynx</p>
            <input
              className={Styles.searchTearm2}
              onChange={props.handleOnChange_Systemic_EX}
              type="text"
              id="Mouth_Pharynx"
              value={
                systemeticEx?.Mouth_Pharynx ? systemeticEx?.Mouth_Pharynx : ""
              }
              placeholder="Mouth & Pharynx"
            ></input>
            <p className="ms-3 font-weight-bold mt-1 mb-0">Larynx</p>
            <input
              className={Styles.searchTearm2}
              onChange={props.handleOnChange_Systemic_EX}
              type="text"
              id="Larynx"
              placeholder="Larynx"
              value={systemeticEx?.Larynx ? systemeticEx?.Larynx : ""}
            ></input>
            <p className="ms-3 font-weight-bold mt-1 mb-0">GIT</p>
            <input
              className={Styles.searchTearm2}
              onChange={props.handleOnChange_Systemic_EX}
              type="text"
              id="GIT"
              placeholder="GIT"
              value={systemeticEx?.GIT ? systemeticEx?.GIT : ""}
            ></input>
            <p className="ms-3 font-weight-bold mt-1 mb-0">
              Genitourinary System
            </p>
            <input
              className={Styles.searchTearm2}
              onChange={props.handleOnChange_Systemic_EX}
              type="text"
              id="Genitourinary_System"
              placeholder="Genitourinary System"
              value={
                systemeticEx?.Genitourinary_System
                  ? systemeticEx?.Genitourinary_System
                  : ""
              }
            ></input>
            <p className="ms-3 font-weight-bold mt-1 mb-0">Bones & Joints</p>
            <input
              className={Styles.searchTearm2}
              onChange={props.handleOnChange_Systemic_EX}
              type="text"
              id="Bones_Joints"
              placeholder="Bones & Joints"
              value={
                systemeticEx?.Bones_Joints ? systemeticEx?.Bones_Joints : ""
              }
            ></input>
          </>
        )}
      </div>
    </div>
  );
};

export default SystemeticEx;
