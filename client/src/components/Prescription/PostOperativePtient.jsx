import React, { useState } from "react";
import Styles from "./Prescription.module.css";

const PostOperativePtient = (props) => {
  const [toggle, settoggle] = useState(true);

  const { postOperativeEx } = props;

  return (
    <div>
      <div className={Styles.leftSideHeader}>
        <h5> In case of Post Operative Patient</h5> &nbsp; &nbsp;
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
          <p className="ms-3 font-weight-bold mt-1 mb-0">O.T Procedure </p>
          <input
            className={Styles.searchTearm2}
            onChange={props.handlePostOperative}
            type="text"
            id="OT_procedure"
            value={
              postOperativeEx?.OT_procedure ? postOperativeEx?.OT_procedure : ""
            }
            placeholder="OT procedure"
          ></input>
          <p className="ms-3 font-weight-bold mt-1 mb-0">Infection </p>
          <input
            className={Styles.searchTearm2}
            onChange={props.handlePostOperative}
            type="text"
            id="Infection"
            placeholder="Infection"
            value={postOperativeEx?.Infection ? postOperativeEx?.Infection : ""}
          ></input>
        </>
      )}
    </div>
  );
};

export default PostOperativePtient;
