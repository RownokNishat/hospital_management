import React from "react";
import Styles from "./Prescription.module.css";

const FamilyHistory = (props) => {
  return (
    <div>
      <div className={Styles.chief_complains}>

        <div className={Styles.chief_complain_div}>
          {props.familyHistorys.map((x, i) => {
            return (
              <div key={i} className="box d-flex">
                <p className="mt-2">{i + 1}</p>
                <input
                  className={Styles.searchTearm}
                  name="familyHistorys"
                  placeholder="familyHistorys"
                  value={x.familyHistorys}
                  onChange={(e) => props.handleOnChangeFamilyHistory(e, i)}
                />
                <div className="d-flex mt-2">
                  {props.familyHistorys.length !== 1 && (
                    <button
                      className={Styles.removeButton}
                      onClick={() => props.handleRemoveClickFamilyHistory(i)}
                    >
                      <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                  )}
                  {props.familyHistorys.length - 1 === i && (
                    <button
                      className={Styles.addButton}
                      onClick={props.handleAddClickFamilyHistory}
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

export default FamilyHistory;
