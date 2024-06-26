import React, { useState, useEffect } from "react";
import Styles from "./PrescribedMedicine.module.css";
import Axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { drugTypes } from '../../redux/reducers/Prescription/prescriptionAction'
import './PrescribedMedicine.css'
const PrescribedMedicine = (props) => {
  const dispatch = useDispatch()
  const [findInd, setFindInd] = useState(0)
  const [height, setHeight] = useState(null)
  const drugType = useSelector(state => state.prescriptionData.drugType)

  //Drug Type
  const getDrugType = () => {
    const url1 = `../../api/prescription/drug_type`
    Axios.get(url1)
      .then(res => {
        dispatch(drugTypes(res.data))
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getDrugType()
  }, []);

  return (
    <div>
      <div className={Styles.medicineList}>
        {props.medicineList.map((x, i) => {
          return (
            <div key={i}>
              <div className="d-flex">
                <p className="mt-2">{i + 1}</p>

                <select
                  className=" dropdown-toggle m-2 h-4"
                  aria-haspopup="true"
                  aria-expanded="false"
                  name="med_type"
                  value={x.med_type}
                  onChange={(e) => props.handleMedicineInputChange(e, i)}
                >
                  <option hidden>Type</option>
                  {drugType?.map((item) => (
                    <option key={item._id} value={item.hc_drug_type}>
                      {item.hc_drug_type}
                    </option>
                  ))}
                </select>

                <input
                  id="dropdownListStyle"
                  // onMouseEnter={()=>getDropDownHeight(i)}
                  className={Styles.searchTearm}
                  name="med_name"
                  placeholder="Enter Medicine"
                  value={x.med_name}
                  onChange={(e) => {
                    setFindInd(i);
                    props.handleMedicineInputChange(e, i);
                  }}
                />
                {/* Drug Dropdown */}
                {props.autoCompleteDrugName?.length > 0 && (
                  <ul style={{ top: height }} className={Styles.ulComponent}>
                    {props.autoCompleteDrugName?.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className={Styles.liComponent}
                          onClick={() =>
                            props.handleSelectDrug(findInd, item.hc_drug_name)
                          }
                        >
                          {item.hc_drug_name}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              <div className={Styles.secondRow}>
                <input
                  className="ms-2"
                  type="checkbox"
                  name="med_important"
                  onChange={(e) => props.handleMedicineInputChange(e, i)}
                />
                <select
                  className=" dropdown-toggle m-2 h-4 selectClass"
                  aria-haspopup="true"
                  aria-expanded="false"
                  name="med_dose_in_a_day"
                  value={x.med_dose_in_a_day}
                  onChange={(e) => props.handleMedicineInputChange(e, i)}
                >
                  <option hidden>Dose</option>
                  <option value="০+০+১">০ + ০ + ১</option>
                  <option value="০+১+০">০ + ১ + ০</option>
                  <option value="১+০+০">১ + ০ + ০</option>
                  <option value="১+১+০">১ + ১ + ০</option>
                  <option value="০+১+১">০ + ১ + ১</option>
                  <option value="১+০+১">১ + ০ + ১</option>
                  <option value="১+১+১">১ + ১ + ১</option>
                  <option value="১+১+১+১">১ + ১ + ১ + ১</option>
                </select>
                

                <select
                  className="dropdown-toggle m-2 h-4 selectClass"
                  aria-haspopup="true"
                  aria-expanded="false"
                  name="med_dose_meal"
                  value={x.med_dose_meal}
                  onChange={(e) => props.handleMedicineInputChange(e, i)}
                >
                  <option hidden> Usage</option>
                  <option value="খাবার পরে"> খাবার পরে </option>
                  <option value="খাবার আগে"> খাবার আগে</option>
                  <option value="ঘুমানোর আগে"> ঘুমানোর আগে</option>
                  <option value="সন্ধায়"> সন্ধায়</option>
                  <option value="ব্যাথা থাকলে খাবেন">
                    {" "}
                    ব্যাথা থাকলে খাবেন
                  </option>
                  <option value="ব্যাথা থাকলে লাগাবেন">
                    {" "}
                    ব্যাথা থাকলে লাগাবেন
                  </option>
                  <option value="মালিশ করবেন"> মালিশ করবেন</option>
                  <option value="ব্রণে লাগাবেন "> ব্রণে লাগাবেন </option>
                  <option value="প্রয়োজনমতো"> প্রয়োজনমতো</option>
                  <option value="১ পাফ "> ১ পাফ </option>
                  <option value="২ পাফ"> ২ পাফ</option>
                  <option value="৩ পাফ"> ৩ পাফ</option>
                  <option value="১ ফোটা করে আক্রান্ত চোখে দিবেন">
                    {" "}
                    ১ ফোটা করে আক্রান্ত চোখে দিবেন
                  </option>
                  <option value="২ ফোটা করে আক্রান্ত চোখে দিবেন">
                    {" "}
                    ২ ফোটা করে আক্রান্ত চোখে দিবেন
                  </option>
                  <option value="৩ ফোটা করে আক্রান্ত চোখে দিবেন">
                    {" "}
                    ৩ ফোটা করে আক্রান্ত চোখে দিবেন
                  </option>
                  <option value="১ ফোটা করে ডান ও বাম নাসারন্ধে দিবেন">
                    {" "}
                    ১ ফোটা করে ডান ও বাম নাসারন্ধে দিবেন
                  </option>
                  <option value="২ ফোটা করে ডান ও বাম নাসারন্ধে দিবেন">
                    {" "}
                    ২ ফোটা করে ডান ও বাম নাসারন্ধে দিবেন
                  </option>
                  <option value="৩ ফোটা করে ডান ও বাম নাসারন্ধে দিবেন">
                    {" "}
                    ৩ ফোটা করে ডান ও বাম নাসারন্ধে দিবেন
                  </option>
                  <option value="১ ফোটা করে ডান ও বাম কানে দিবেন">
                    {" "}
                    ১ ফোটা করে ডান ও বাম কানে দিবেন
                  </option>
                  <option value="২ ফোটা করে ডান ও বাম কানে দিবেন">
                    {" "}
                    ২ ফোটা করে ডান ও বাম কানে দিবেন
                  </option>
                  <option value="৩ ফোটা করে ডান ও বাম কানে দিবেন">
                    {" "}
                    ৩ ফোটা করে ডান ও বাম কানে দিবেন
                  </option>
                  <option value="১/২/৩/৪ চামচ আধা গ্লাস পানিতে মিশিয়ে গড়গড় করবেন">
                    {" "}
                    ১/২/৩/৪ চামচ আধা গ্লাস পানিতে মিশিয়ে গড়গড় করবেন
                  </option>
                  <option value="৩০ সেকেন্ড কুলকুচি করে ফেলে দিবেন">
                    {" "}
                    ৩০ সেকেন্ড কুলকুচি করে ফেলে দিবেন
                  </option>
                  <option value="গোসলের সময় "> গোসলের সময় </option>
                </select>

                <select
                  className="dropdown-toggle m-2 h-4 selectClass"
                  aria-haspopup="true"
                  aria-expanded="false"
                  name="med_dose_days"
                  value={x.med_dose_days}
                  onChange={(e) => props.handleMedicineInputChange(e, i)}
                >
                  <option hidden>Days</option>
                  <option value="৩ দিন"> ৩ দিন </option>
                  <option value="৫ দিন"> ৫ দিন </option>
                  <option value="৭ দিন"> ৭ দিন </option>
                  <option value="১০ দিন"> ১০ দিন </option>
                  <option value="১৪ দিন"> ১৪ দিন</option>
                  <option value="১৫ দিন"> ১৫ দিন</option>
                  <option value="১ মাস"> ১ মাস </option>
                  <option value="২ মাস"> ২ মাস </option>
                  <option value="৩ মাস"> ৩ মাস </option>
                  <option value="চলবে"> চলবে </option>
                  <option value="প্রয়োজন অনুসারে"> প্রয়োজন অনুসারে </option>
                </select>

                <div className={Styles.removeAdd}>
                  {props.medicineList.length !== 1 && (
                    <button
                      className={Styles.removeButton}
                      onClick={() => props.handleMedicineRemove(i)}
                    >
                      <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                  )}
                  {props.medicineList.length - 1 === i && (
                    <button
                      className={Styles.addButton}
                      onClick={props.handleMedicineAdd}
                    >
                      <i className="fa fa-plus" aria-hidden="true"></i>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PrescribedMedicine;