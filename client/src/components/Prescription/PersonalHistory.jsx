import React from "react";
import Styles from "./Prescription.module.css";

const PersonalHistory = (props) => {
  return (
    <div>
      <div className={Styles.chief_complains}>
        <div className={Styles.chief_complain_div}>
          {props.personalHistorys.map((x, i) => {
            return (
              <div key={i} className="box d-flex">
                <p className="mt-2">{i + 1}</p>
                <input
                  className={Styles.searchTearm}
                  name="personalHistorys"
                  placeholder="personalHistorys"
                  value={x.personalHistorys}
                  onChange={(e) => props.handleInputChangePersonalHistory(e, i)}
                />
                <div className="d-flex mt-2">
                  {props.personalHistorys.length !== 1 && (
                    <button
                      className={Styles.removeButton}
                      onClick={() => props.handleRemoveClickPersonalHistory(i)}
                    >
                      <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                  )}
                  {props.personalHistorys.length - 1 === i && (
                    <button
                      className={Styles.addButton}
                      onClick={props.handleAddClickPersonalHistory}
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
    </div>
  );
};

export default PersonalHistory;
