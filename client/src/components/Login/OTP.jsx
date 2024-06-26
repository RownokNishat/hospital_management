import React from "react";

const OTP = (props) => {
  return (
    <div className="d-flex flex-column">
      <input
        type="number"
        onChange={(e) => props.setReceivedOTP(e.target.value)}
        placeholder="Type your received OTP"
      ></input>
      <button className="btn btn-success mt-3 w-25" onClick={props.submitOTP}>
        Submit
      </button>
    </div>
  );
};

export default OTP;
