import React, { useState } from "react";
import Styles from "./Prescription.module.css";

const GeneralExBaby = (props) => {
  const [toggle, settoggle] = useState(true)

  return (
    <div>
      <div className={Styles.leftSideHeader}>
        <h5 >General Examination of Baby</h5> &nbsp; &nbsp;
        {
          toggle ?
            <i className="fas fa-angle-double-right mt-3" onClick={() => settoggle(false)}></i> :
            <i className="fas fa-angle-double-down mt-3" onClick={() => settoggle(true)}></i>
        }
      </div>

      {
        toggle ? null :
          <>
            <p className="ms-3 font-weight-bold mt-1 mb-0">Mothers disease during pregnancy </p>
            <input
              className={Styles.searchTearm2}
              onChange={props.generalExBabyDataOnChange}
              type="text"
              id="Mothers_disease_during_pregnancy"
              placeholder="Mothers disease during pregnancy"
            ></input>
            <p className="ms-3 font-weight-bold mt-1 mb-0">Vaccine History Of Mother </p>
            <input
              className={Styles.searchTearm2}
              onChange={props.generalExBabyDataOnChange}
              type="text"
              id="Vaccine_History_Of_Mother"
              placeholder="Vaccine History Of Mother"
            ></input>
            <p className="ms-3 font-weight-bold mt-1 mb-0">Labour Duration </p>
            <input
              className={Styles.searchTearm2}
              onChange={props.generalExBabyDataOnChange}
              type="text"
              id="Labor_duration"
              placeholder="Labor duration"
            ></input>
            <p className="ms-3 font-weight-bold mt-1 mb-0">Cry </p>
            <input
              className={Styles.searchTearm2}
              onChange={props.generalExBabyDataOnChange}
              type="text"
              id="Cry"
              placeholder="Cry"
            ></input>
            <p className="ms-3 font-weight-bold mt-1 mb-0">Movement </p>
            <input
              className={Styles.searchTearm2}
              onChange={props.generalExBabyDataOnChange}
              type="text"
              id="Movement"
              placeholder="Movement"
            ></input>
            <p className="ms-3 font-weight-bold mt-1 mb-0">Breathing </p>
            <input
              className={Styles.searchTearm2}
              onChange={props.generalExBabyDataOnChange}
              type="text"
              id="Breathing"
              placeholder="Breathing"
            ></input>
          </>
      }
    </div>
  );
};

export default GeneralExBaby;
