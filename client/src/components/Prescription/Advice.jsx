import React from "react";
import Styles from "./Prescription.module.css";

const Advice = (props) => {
  return (
    <div className={Styles.adviceDiv}>
      <div className="d-flex">
        <input
          className={Styles.largeCheckboxs}
          type="checkbox"
          id="option-all"
          onChange={props.handleAdviceCheckBoxChange}
          name="selectAll"
          checked={props.advicelist.filter((pd) => pd?.isChecked !== true).length < 1}
        ></input>
        <label htmlFor="option-all" className="ms-1">
          Select All
        </label>
      </div>

      <div className={Styles.adviceList}>
        <ul id="AdviceList">
          <li></li>
        </ul>
        {props.advicelist?.map((pd) => {
          return (
            <div key={pd._id} >
              <div className="ms-3 d-flex">
                <input
                  className={Styles.largeCheckboxs}
                  name={pd.Advice}
                  type="checkbox"
                  id={pd._id}
                  onChange={props.handleAdviceCheckBoxChange}
                  checked={pd?.isChecked || false}
                ></input>
                <label htmlFor={pd.advice} className="text-left small ms-2">
                  {pd.Advice}
                </label>
              </div>
            </div>
          );
        })}
      </div>

      <div>
        <button onClick={props.handleAllFilterdAdvice} className="btn btn-danger">
          Save
        </button>
      </div>
    </div>
  );
};

export default Advice;
