import React from "react";
import Axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Styles from "../Hospitals/Hospital.module.css";
import { Link } from "react-router-dom";
const Hospitals = () => {
  const [hospitals, setHospitals] = useState([]);

  const getAllHospital = () => {
    Axios.get(`../api/hospital/landingPageHospitals`)
      .then((res) => {
        setHospitals(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // console.log(hospitals);

  useEffect(() => {
    getAllHospital();
  }, []);
  return (
    <div className={Styles.hospital}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button className={Styles.heading} disabled={true}>
          Our Available Hospitals
        </button>
      </div>
      <div className={Styles.hospitalDiv}>
        <div className="row">
          {hospitals?.map((p) => {
            return (
              <div key={p._id} className="col-lg-3 col-md-6 col-12">
                <div className={Styles.doctorCard}>
                  <div className={Styles.doctorImage}>
                    {p.hc_doctor_avatar === "" ? (
                      <div className="userbg">
                        <i className="fa fa-user fa-2x"></i>
                      </div>
                    ) : (
                      <img
                        className={Styles.dashboardDoctorImage}
                        alt=""
                        srcSet={p.hc_hospital_logo}
                      />
                    )}
                  </div>

                  <div className={Styles.doctorDetails}>
                    <p className="mt-1 mb-0">
                      <span className="font-weight-bold">
                        {p.hc_hospital_english_name}
                      </span>
                    </p>

                    <p className="mt-0 mb-0 ">
                      {" "}
                      <span className="font-weight-bold"> Address: </span>
                      {p.hc_hospital_address.upazila},{" "}
                      {p.hc_hospital_address.district}
                    </p>

                    <p className="mt-0 mb-0 ">
                      {" "}
                      <span className="font-weight-bold"> Contact No: </span>
                      {p.hc_hospital_phoneno}
                    </p>

                    <p className="mt-0 mb-0 ">
                      {" "}
                      <span className="font-weight-bold"> Email: </span>
                      {p.hc_hospital_email}
                    </p>
                  </div>
                  <div className={Styles.doctorAppoinment}>
                    <button className="btn btn-success border-round mb-3">
                      <Link
                        style={{ textDecoration: "none", color: "white" }}
                        to={`/hospitalDoctors/${p._id}`}
                      >
                        <b>See Doctors</b>
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Hospitals;
