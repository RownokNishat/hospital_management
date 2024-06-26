import React, { useEffect, useState } from "react";
import Styles from "./Prescription.module.css";
import FamilyHistory from "./FamilyHistory";
import PersonalHistory from "./PersonalHistory";
import DietaryHistory from "./DietaryHistory";

const GeneralOthers = (props) => {
  const [toggle, settoggle] = useState(true);

  const { generalExOther } = props;

  return (
    <div>
      <div>
        <div className={Styles.leftSideHeader}>
          <h5>Others</h5> &nbsp; &nbsp;
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
            <p className="ms-3 font-weight-bold mt-1 mb-0">Appearance </p>
            <div className="d-flex">
              <input
                className="ms-3 mt-0"
                type="radio"
                id="Appearance"
                name="Appearance"
                value="Well"
                checked={generalExOther?.Appearance == "Well" ? true : false}
                onChange={props.handleOnChange_EX_Others}
              />
              <label className="ms-1 mt-1" htmlFor="vehicle1">
                {" "}
                Well
              </label>
              <br />
              <input
                className="ms-3"
                type="radio"
                id="Appearance"
                name="Appearance"
                value="Ill Looking"
                checked={
                  generalExOther?.Appearance == "Ill Looking" ? true : false
                }
                onChange={props.handleOnChange_EX_Others}
              />
              <label className="ms-1 mt-1" htmlFor="vehicle1">
                {" "}
                Ill looking
              </label>
            </div>

            <p className="ms-3 font-weight-bold mt-1 mb-0">Body Built </p>
            <div className="d-flex">
              <input
                className="ms-3"
                type="radio"
                id="body_built"
                name="Body Built"
                value="Average"
                checked={generalExOther?.body_built == "Average" ? true : false}
                onChange={props.handleOnChange_EX_Others}
              />
              <label className="ms-1 mt-1" htmlFor="vehicle1">
                {" "}
                Average
              </label>
              <br />
              <input
                className="ms-3"
                type="radio"
                id="body_built"
                value="Small"
                name="Body Built"
                checked={generalExOther?.body_built == "Small" ? true : false}
                onChange={props.handleOnChange_EX_Others}
              />
              <label className="ms-1 mt-1" htmlFor="vehicle1">
                {" "}
                Small
              </label>
              <br />
              <input
                className="ms-3"
                type="radio"
                id="body_built"
                value="Heavy"
                checked={generalExOther?.body_built == "Heavy" ? true : false}
                name="Body Built"
                onChange={props.handleOnChange_EX_Others}
              />
              <label className="ms-1 mt-1" htmlFor="vehicle1">
                {" "}
                Heavy
              </label>
            </div>

            <p className="ms-3 font-weight-bold mt-1 mb-0">Nutrition </p>
            <div className="d-flex">
              {" "}
              <input
                className="ms-3"
                type="radio"
                id="Nutrition"
                value="Nourished"
                name="Nutrition"
                checked={
                  generalExOther?.Nutrition == "Nourished" ? true : false
                }
                onChange={props.handleOnChange_EX_Others}
              />
              <label className="ms-1 mt-1" htmlFor="vehicle1">
                {" "}
                Nourished
              </label>
              <br />
              <input
                className="ms-3"
                type="radio"
                id="Nutrition"
                name="Nutrition"
                value="Under Nourished"
                checked={
                  generalExOther?.Nutrition == "Under Nourished" ? true : false
                }
                onChange={props.handleOnChange_EX_Others}
              />
              <label className="ms-1 mt-1" htmlFor="vehicle1">
                {" "}
                Under Nourished
              </label>
            </div>

            <p className="ms-3 font-weight-bold mt-1 mb-0">Decubitus </p>
            <div className="d-flex">
              {" "}
              <input
                className="ms-3"
                type="radio"
                id="Decubitus"
                value="On choice"
                name="Decubitus"
                checked={
                  generalExOther?.Decubitus == "On choice" ? true : false
                }
                onChange={props.handleOnChange_EX_Others}
              />
              <label className="ms-1 mt-1" htmlFor="vehicle1">
                {" "}
                On choice
              </label>
              <br />
              <input
                className="ms-3"
                type="radio"
                id="Decubitus"
                value="Propped Up"
                name="Decubitus"
                checked={
                  generalExOther?.Decubitus == "Propped Up" ? true : false
                }
                onChange={props.handleOnChange_EX_Others}
              />
              <label className="ms-1 mt-1" htmlFor="vehicle1">
                {" "}
                Propped Up
              </label>
              <br />
              <input
                className="ms-3"
                type="radio"
                id="Decubitus"
                name="Decubitus"
                value="Mohammedan Prayer position"
                checked={
                  generalExOther?.Decubitus == "Mohammedan Prayer position"
                    ? true
                    : false
                }
                onChange={props.handleOnChange_EX_Others}
              />
              <label className="ms-1 mt-1" htmlFor="vehicle1">
                {" "}
                Mohammedan Prayer position
              </label>
            </div>

            <p className="ms-3 font-weight-bold mt-1 mb-0">Cyanosis </p>
            <div className="d-flex">
              <input
                className="ms-3"
                type="radio"
                id="Cyanosis"
                value="Present"
                name="Cyanosis"
                checked={generalExOther?.Cyanosis == "Present" ? true : false}
                onChange={props.handleOnChange_EX_Others}
              />
              <label className="ms-1 mt-1" htmlFor="vehicle1">
                {" "}
                Present
              </label>
              <br />
              <input
                className="ms-3"
                type="radio"
                id="Cyanosis"
                value="Absent"
                name="Cyanosis"
                checked={generalExOther?.Cyanosis == "Absent" ? true : false}
                onChange={props.handleOnChange_EX_Others}
              />
              <label className="ms-1 mt-1" htmlFor="vehicle1">
                {" "}
                Absent
              </label>
            </div>

            <p className="ms-3 font-weight-bold mt-1 mb-0">Clubbing </p>
            <div className="d-flex">
              <input
                className="ms-3"
                type="radio"
                id="Clubbing"
                value="Present"
                name="Clubbing"
                checked={generalExOther?.Clubbing == "Present" ? true : false}
                onChange={props.handleOnChange_EX_Others}
              />
              <label className="ms-1 mt-1" htmlFor="vehicle1">
                {" "}
                Present
              </label>
              <br />
              <input
                className="ms-3"
                type="radio"
                id="Clubbing"
                value="Absent"
                name="Clubbing"
                checked={generalExOther?.Clubbing == "Absent" ? true : false}
                onChange={props.handleOnChange_EX_Others}
              />
              <label className="ms-1 mt-1" htmlFor="vehicle1">
                {" "}
                Absent
              </label>
            </div>

            <p className="ms-3 font-weight-bold mt-1 mb-0">Dehydration </p>
            <div className="d-flex">
              {" "}
              <input
                className="ms-3"
                type="radio"
                id="Dehydration"
                value="Present"
                name="Dehydration"
                checked={
                  generalExOther?.Dehydration == "Present" ? true : false
                }
                onChange={props.handleOnChange_EX_Others}
              />
              <label className="ms-1 mt-1" htmlFor="vehicle1">
                {" "}
                Present
              </label>
              <br />
              <input
                className="ms-3"
                type="radio"
                id="Dehydration"
                value="Absent"
                name="Dehydration"
                checked={generalExOther?.Dehydration == "Absent" ? true : false}
                onChange={props.handleOnChange_EX_Others}
              />
              <label className="ms-1 mt-1" htmlFor="vehicle1">
                {" "}
                Absent
              </label>
            </div>
            <p className="ms-3 font-weight-bold mt-1 mb-0">Koilonychia </p>
            <div className="d-flex">
              <input
                className="ms-3"
                type="radio"
                id="Koilonychia"
                value="Present"
                name="Koilonychia"
                checked={
                  generalExOther?.Koilonychia == "Present" ? true : false
                }
                onChange={props.handleOnChange_EX_Others}
              />
              <label className="ms-1 mt-1" htmlFor="vehicle1">
                {" "}
                Present
              </label>
              <br />
              <input
                className="ms-3"
                type="radio"
                id="Koilonychia"
                value="Absent"
                name="Koilonychia"
                checked={generalExOther?.Koilonychia == "Absent" ? true : false}
                onChange={props.handleOnChange_EX_Others}
              />
              <label className="ms-1 mt-1" htmlFor="vehicle1">
                {" "}
                Absent
              </label>
            </div>

            <p className="ms-3 font-weight-bold mt-1 mb-0">Leukonychia </p>
            <div className="d-flex">
              <input
                className="ms-3"
                type="radio"
                id="Leukonychia"
                value="Present"
                name="Leukonychia"
                checked={
                  generalExOther?.Leukonychia == "Present" ? true : false
                }
                onChange={props.handleOnChange_EX_Others}
              />
              <label className="ms-1 mt-1" htmlFor="vehicle1">
                {" "}
                Present
              </label>
              <br />
              <input
                className="ms-3"
                type="radio"
                id="Leukonychia"
                value="Absent"
                name="Leukonychia"
                checked={generalExOther?.Leukonychia == "Absent" ? true : false}
                onChange={props.handleOnChange_EX_Others}
              />
              <label className="ms-1 mt-1" htmlFor="vehicle1">
                {" "}
                Absent
              </label>
            </div>

            <p className="ms-3 font-weight-bold mt-1 mb-0">Neck vein </p>
            <input
              className={Styles.searchTearm2}
              id="Neck_vein"
              value={
                generalExOther?.Leukonychia ? generalExOther?.Leukonychia : ""
              }
              onChange={props.handleOnChange_EX_Others}
            ></input>

            <p className="ms-3 font-weight-bold mt-1 mb-0">Gynaecomastia </p>
            <div className="d-flex">
              {" "}
              <input
                className="ms-3"
                type="radio"
                id="Gynaecomastia"
                value="Present"
                name="Gynaecomastia"
                checked={
                  generalExOther?.Gynaecomastia == "Present" ? true : false
                }
                onChange={props.handleOnChange_EX_Others}
              />
              <label className="ms-1 mt-1" htmlFor="vehicle1">
                {" "}
                Present
              </label>
              <br />
              <input
                className="ms-3"
                type="radio"
                id="Gynaecomastia"
                value="Absent"
                checked={
                  generalExOther?.Gynaecomastia == "Absent" ? true : false
                }
                name="Gynaecomastia"
                onChange={props.handleOnChange_EX_Others}
              />
              <label className="ms-1 mt-1" htmlFor="vehicle1">
                {" "}
                Absent
              </label>
            </div>

            <p className="ms-3 font-weight-bold mt-1 mb-0">Pigmentation </p>
            <div className="d-flex">
              <input
                className="ms-3"
                type="radio"
                id="Pigmentation"
                value="Present"
                name="Pigmentation"
                checked={
                  generalExOther?.Pigmentation == "Present" ? true : false
                }
                onChange={props.handleOnChange_EX_Others}
              />
              <label className="ms-1 mt-1" htmlFor="vehicle1">
                {" "}
                Present
              </label>
              <br />
              <input
                className="ms-3"
                type="radio"
                id="Pigmentation"
                value="Absent"
                name="Pigmentation"
                checked={
                  generalExOther?.Pigmentation == "Absent" ? true : false
                }
                onChange={props.handleOnChange_EX_Others}
              />
              <label className="ms-1 mt-1" htmlFor="vehicle1">
                {" "}
                Absent
              </label>
            </div>

            <p className="ms-3 font-weight-bold mt-1 mb-0">Bony Tenderness </p>
            <div className="d-flex">
              <input
                className="ms-3"
                type="radio"
                id="Bony_Tenderness"
                value="Tender"
                name="Bony Tenderness"
                checked={
                  generalExOther?.Bony_Tenderness == "Tender" ? true : false
                }
                onChange={props.handleOnChange_EX_Others}
              />
              <label className="ms-1 mt-1" htmlFor="vehicle1">
                {" "}
                Tender
              </label>
              <br />
              <input
                className="ms-3"
                type="radio"
                id="Bony_Tenderness"
                value="Non teder"
                checked={
                  generalExOther?.Bony_Tenderness == "Non teder" ? true : false
                }
                name="Bony Tenderness"
                onChange={props.handleOnChange_EX_Others}
              />
              <label className="ms-1 mt-1" htmlFor="vehicle1">
                {" "}
                Non teder
              </label>
            </div>

            <p className="ms-3 font-weight-bold mt-1 mb-0">Spider naevi </p>
            <input
              className={Styles.searchTearm2}
              id="Spider_naevi"
              value={
                generalExOther?.Spider_naevi ? generalExOther?.Spider_naevi : ""
              }
              onChange={props.handleOnChange_EX_Others}
            ></input>

            <p className="ms-3 font-weight-bold mt-1 mb-0">Palmer Erythemia </p>
            <input
              className={Styles.searchTearm2}
              id="Palmer_erythemia"
              value={
                generalExOther?.Palmer_erythemia
                  ? generalExOther?.Palmer_erythemia
                  : ""
              }
              onChange={props.handleOnChange_EX_Others}
            ></input>

            <p className="ms-3 font-weight-bold mt-1 mb-0">
              Distribution of body hair
            </p>
            <input
              className={Styles.searchTearm2}
              id="Distribution_of_body_hair"
              value={
                generalExOther?.Distribution_of_body_hair
                  ? generalExOther?.Distribution_of_body_hair
                  : ""
              }
              onChange={props.handleOnChange_EX_Others}
            ></input>

            <p className="ms-3 font-weight-bold mt-1 mb-0">Skin condition </p>
            <input
              className={Styles.searchTearm2}
              id="Skin_condition"
              value={
                generalExOther?.Skin_condition
                  ? generalExOther?.Skin_condition
                  : ""
              }
              onChange={props.handleOnChange_EX_Others}
            ></input>

            <p className="ms-3 font-weight-bold mt-1 mb-0">Family history </p>

            <FamilyHistory
              familyHistorys={props.familyHistorys}
              handleOnChangeFamilyHistory={props.handleOnChangeFamilyHistory}
              handleRemoveClickFamilyHistory={
                props.handleRemoveClickFamilyHistory
              }
              handleAddClickFamilyHistory={props.handleAddClickFamilyHistory}
            />

            <p className="ms-3 font-weight-bold mt-1 mb-0">Personal History </p>
            <PersonalHistory
              personalHistorys={props.personalHistorys}
              handleInputChangePersonalHistory={
                props.handleInputChangePersonalHistory
              }
              handleRemoveClickPersonalHistory={
                props.handleRemoveClickPersonalHistory
              }
              handleAddClickPersonalHistory={
                props.handleAddClickPersonalHistory
              }
            />

            <p className="ms-3 font-weight-bold mt-1 mb-0">Dietary History</p>
            <DietaryHistory
              dieatryHistorys={props.dieatryHistorys}
              handleInputChangeDietaryHistory={
                props.handleInputChangeDietaryHistory
              }
              handleRemoveClickDietaryHistory={
                props.handleRemoveClickDietaryHistory
              }
              handleAddClickDietaryHistory={props.handleAddClickDietaryHistory}
            />

            <p className="ms-3 font-weight-bold mt-1 mb-0">Salient Feature </p>
            <input
              className={Styles.searchTearm2}
              id="Salient_feature"
              onChange={props.handleOnChange_EX_Others}
              value={
                generalExOther?.Salient_feature
                  ? generalExOther?.Salient_feature
                  : ""
              }
            ></input>

            <p className="ms-3 font-weight-bold mt-1 mb-0">
              Provisional Diagnosis{" "}
            </p>
            <input
              className={Styles.searchTearm2}
              id="Provisional_diagnosis"
              value={
                generalExOther?.Provisional_diagnosis
                  ? generalExOther?.Provisional_diagnosis
                  : ""
              }
              onChange={props.handleOnChange_EX_Others}
            ></input>

            <p className="ms-3 font-weight-bold mt-1 mb-0">
              Differential Diagnosis
            </p>
            <input
              className={Styles.searchTearm2}
              id="Differential_diagnosis"
              value={
                generalExOther?.Differential_diagnosis
                  ? generalExOther?.Differential_diagnosis
                  : ""
              }
              onChange={props.handleOnChange_EX_Others}
            ></input>
          </>
        )}
      </div>
    </div>
  );
};

export default GeneralOthers;
