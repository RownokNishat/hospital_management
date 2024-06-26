import React from "react";
import Styles from "./Prescription.module.css";
import { useState } from "react";

const DietaryHistory = (props) => {
  return (
    <div>
      <div className={Styles.chief_complains}>
        <div className={Styles.chief_complain_div}>
          {props.dieatryHistorys.map((x, i) => {
            return (
              <div key={i} className="box d-flex">
                <p className="mt-2">{i + 1}</p>
                <input
                  className={Styles.searchTearm}
                  name="dieatryHistorys"
                  placeholder="dieatryHistorys"
                  value={x.dieatryHistorys}
                  onChange={(e) => props.handleInputChangeDietaryHistory(e, i)}
                />
                <div className="d-flex mt-2">
                  {props.dieatryHistorys.length !== 1 && (
                    <button
                      className={Styles.removeButton}
                      onClick={() => props.handleRemoveClickDietaryHistory(i)}
                    >
                      <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                  )}
                  {props.dieatryHistorys.length - 1 === i && (
                    <button
                      className={Styles.addButton}
                      onClick={props.handleAddClickDietaryHistory}
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

export default DietaryHistory;
