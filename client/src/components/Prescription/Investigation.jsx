import React, { useState, useEffect } from "react";
import Styles from "./Prescription.module.css";
import Axios from 'axios'
import { useSelector } from 'react-redux'

const Investigation = (props) => {
  const [hc_investigation_name, sethc_investigation_name] = useState(null);
  const [searchItems, setSearchItems] = useState([]);
  const [findInd, setFindInd] = useState(0)
  const auth = useSelector(state => state.AuthReducer)

  const getInvestigation = () => {
    const url1 = `../../api/prescription/search_investigation`
    const data = { hc_investigation_name: hc_investigation_name }
    const headers = {
      "Content-Type": "application/json",
      "authorization": `Bearer ${auth.token}`
    }

    Axios.post(url1, data, { headers })
      .then(res => {
        setSearchItems(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    if (hc_investigation_name) {
      getInvestigation()
    } else {
      setSearchItems(null)
    }
  }, [hc_investigation_name]);

  return (
    <div onClick={() => { sethc_investigation_name("") }}>
      <div className={Styles.chief_complains}>
        <h5 className={Styles.leftSideHeader}>Investigations</h5>
        <div className={Styles.chief_complain_div}>
          {props.investigations.map((x, i) => {
            return (
              <div key={i} className="box d-flex">
                <p className="mt-2">{i + 1}</p>
                <input
                  className={Styles.searchTearm}
                  name="investigations"
                  placeholder="Investigations"
                  value={x.investigations}
                  onChange={(e) => {
                    setFindInd(i)
                    sethc_investigation_name(e.target.value)
                    props.handleInputChangeInvestigation(e, i)
                  }}
                />

                {
                  searchItems?.length > 0 && (
                    <ul className={Styles.ulComponent}>
                      {searchItems?.map((item, index) => {
                        return (
                          <li
                            key={index}
                            className={Styles.liComponent}
                            onClick={() => {
                              props.handleSelectInvestigation(findInd, item.hc_investigation_name)
                              sethc_investigation_name(null)
                            }}
                          >
                            {item.hc_investigation_name}
                          </li>
                        )
                      })}
                    </ul>
                  )}
                <div className="d-flex mt-2">
                  {props.investigations.length !== 1 && (
                    <button
                      className={Styles.removeButton}
                      onClick={() => props.handleRemoveClickInvestigation(i)}
                    >
                      <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                  )}
                  {props.investigations.length - 1 === i && (
                    <button
                      className={Styles.addButton}
                      onClick={props.handleAddClickInvestigation}
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

export default Investigation;
