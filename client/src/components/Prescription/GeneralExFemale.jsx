import React, { useState } from 'react'
import Styles from "./Prescription.module.css";

const GeneralExFemale = (props) => {
    const [toggle, settoggle] = useState(true)
    return (
        <div>
            <div className={Styles.leftSideHeader}>
                <h5 >In Case of Female</h5> &nbsp; &nbsp;
                {
                    toggle ?
                        <i className="fas fa-angle-double-right mt-3" onClick={() => settoggle(false)}></i> :
                        <i className="fas fa-angle-double-down mt-3" onClick={() => settoggle(true)}></i>
                }

            </div>
            {
                toggle ? null :
                    <>
                        <p className="ms-3 font-weight-bold mt-1 mb-0">Menstrual & ostetric History{" "}</p>
                        <input
                            className={Styles.searchTearm2}
                            onChange={props.handleOnChange_EX_Female}
                            type="text"
                            id="Menstrual_obstetric_History"
                            placeholder="Menstrual & ostetric History"
                        ></input>
                        <p className="ms-3 font-weight-bold mt-1 mb-0">Para </p>
                        <input
                            className={Styles.searchTearm2}
                            onChange={props.handleOnChange_EX_Female}
                            type="text"
                            id="Para"
                            placeholder="Para"
                        ></input>
                        <p className="ms-3 font-weight-bold mt-1 mb-0">Marrid for</p>
                        <input
                            className={Styles.searchTearm2}
                            onChange={props.handleOnChange_EX_Female}
                            type="text"
                            id="Marrid_for"
                            placeholder="Marrid for"
                        ></input>
                        <p className="ms-3 font-weight-bold mt-1 mb-0">Gravida</p>
                        <input
                            className={Styles.searchTearm2}
                            onChange={props.handleOnChange_EX_Female}
                            type="text"
                            id="Gravida"
                            placeholder="Gravida"
                        ></input>
                        <p className="ms-3 font-weight-bold mt-1 mb-0">ALC</p>
                        <input
                            className={Styles.searchTearm2}
                            onChange={props.handleOnChange_EX_Female}
                            type="text"
                            id="ALC"
                            placeholder="ALC"
                        ></input>
                        <p className="ms-3 font-weight-bold mt-1 mb-0">LMP </p>
                        <input
                            className={Styles.searchTearm2}
                            onChange={props.handleOnChange_EX_Female}
                            type="date"
                            id="LMP"
                            placeholder="LMP"
                        ></input>
                        <p className="ms-3 font-weight-bold mt-1 mb-0">EDD </p>
                        <input
                            className={Styles.searchTearm2}
                            onChange={props.handleOnChange_EX_Female}
                            type="date"
                            id="EDD"
                            placeholder="EDD"
                        ></input>
                        <p className="ms-3 font-weight-bold mt-1 mb-0">Age of Menarche</p>
                        <input
                            className={Styles.searchTearm2}
                            onChange={props.handleOnChange_EX_Female}
                            type="text"
                            id="Age_of_Menarche"
                            placeholder="Age of Menarche"
                        ></input>
                        <p className="ms-3 font-weight-bold mt-1 mb-0">M. Period</p>
                        <input
                            className={Styles.searchTearm2}
                            onChange={props.handleOnChange_EX_Female}
                            type="text"
                            id="M_Period"
                            placeholder="M. Period"
                        ></input>
                        <p className="ms-3 font-weight-bold mt-1 mb-0">M. Cycle</p>
                        <input
                            className={Styles.searchTearm2}
                            onChange={props.handleOnChange_EX_Female}
                            type="text"
                            id="M_Cycle"
                            placeholder="M. Cycle"
                        ></input>
                        <p className="ms-3 font-weight-bold mb-0">M. Flow</p>
                        <div className="d-flex">
                            <input
                                className="ms-3"
                                type="radio"
                                id="M_Flow"
                                name="M_Flow"
                                value="Average"
                                onChange={props.handleOnChange_EX_Female}
                            />
                            <label className="ms-1 mt-1" htmlFor="vehicle1">{" "}Average</label>
                            <br />
                            <input
                                className="ms-3"
                                type="radio"
                                id="M_Flow"
                                name="M_Flow"
                                value="Excess"
                                onChange={props.handleOnChange_EX_Female}
                            />
                            <label className="ms-1 mt-1" htmlFor="vehicle1">{" "}Excess</label>
                            <br />
                            <input
                                className="ms-3"
                                type="radio"
                                id="M_Flow"
                                name="M_Flow"
                                value="Low"
                                onChange={props.handleOnChange_EX_Female}
                            />
                            <label className="ms-1 mt-1" htmlFor="vehicle1">{" "}Low</label>
                        </div>
                        <p className="ms-3 font-weight-bold mb-0">Practiced</p>
                        <div className="d-flex">
                            <input
                                className="ms-3"
                                type="radio"
                                id="Practiced"
                                name="Practiced"
                                value="Condom"
                                onChange={props.handleOnChange_EX_Female}
                            />
                            <label className="ms-1 mt-1" htmlFor="vehicle1">{" "}Condom</label>
                            <br />
                            <input
                                className="ms-3"
                                type="radio"
                                id="Practiced"
                                name="Practiced"
                                value="Pill"
                                onChange={props.handleOnChange_EX_Female}
                            />
                            <label className="ms-1 mt-1" htmlFor="vehicle1">{" "}Pill</label>
                            <br />
                            <input
                                className="ms-3"
                                type="radio"
                                id="Practiced"
                                name="Practiced"
                                value="UCD"
                                onChange={props.handleOnChange_EX_Female}
                            />
                            <label className="ms-1 mt-1" htmlFor="vehicle1">{" "}UCD</label>
                            <input
                                className="ms-3"
                                type="radio"
                                id="Practiced"
                                name="Practiced"
                                value="Others"
                                onChange={props.handleOnChange_EX_Female}
                            />
                            <label className="ms-1 mt-1" htmlFor="vehicle1">{" "}Others</label>
                        </div>
                        <p className="ms-3 font-weight-bold mt-1 mb-0">Last Use </p>
                        <input
                            className={Styles.searchTearm2}
                            onChange={props.handleOnChange_EX_Female}
                            type="date"
                            id="Last_Use"
                            placeholder="Last Use "
                        ></input>
                        <p className="ms-3 font-weight-bold mt-1 mb-0">Per Vagainal</p>
                        <input
                            className={Styles.searchTearm2}
                            onChange={props.handleOnChange_EX_Female}
                            type="text"
                            id="Per_Vagainal"
                            placeholder="Per Vagainal"
                        ></input>
                        <p className="ms-3 font-weight-bold mt-1 mb-0">Breast</p>
                        <input
                            className={Styles.searchTearm2}
                            onChange={props.handleOnChange_EX_Female}
                            type="text"
                            id="Breast"
                            placeholder="Breast"
                        ></input>
                    </>
            }

        </div>
    )
}

export default GeneralExFemale