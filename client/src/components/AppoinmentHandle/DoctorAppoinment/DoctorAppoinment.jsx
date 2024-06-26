import React, { useState, useEffect } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useSelector } from "react-redux";
import Axios from "axios";
import { useHistory } from "react-router-dom";

const DoctorAppoinment = () => {
  const auth = useSelector((state) => state.AuthReducer);
  const history = useHistory();
  const [date, setDate] = useState(null);
  const [handleDate, setHandleDate] = useState(null);
  const [result, setResult] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [hospital, setHospital] = useState("");
  const [approve, setApprove] = useState(null);
  const [state, setState] = useState({
    isLoading: false,
    formData: {
      hc_appoinmentdate: "",
      hc_hospitalid: "",
    },
  });

  const getHospitals = () => {
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${auth.token}`,
    };

    const data = {
      doctorID: auth.UID,
    };

    Axios.post("/api/doctor/doctorHospitalData", data, { headers })
      .then((res) => {
        setHospitals(res.data[0].hc_doctor_of_hospital);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getHospitals();
  }, []);

  const handleChange = (date) => {
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1; // Months start at 0!
    let dd = date.getDate();
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    setHandleDate(`${dd}+"/"+${mm}+"/"+${yyyy}`);
    date = `${date}`;
    setDate(date.slice(4, 15));
  };

  useEffect(() => {
    const data = state.formData;
    data.hc_appoinmentdate = new Date(date).toISOString();
    data.hc_hospitalid = hospital;

    setState({
      ...state,
      isLoading: true,
    });

    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${auth.token}`,
    };

    Axios.post("/api/appointment/doctors_appointment_list", data, { headers })
      .then((res) => {
        setResult(res.data);
        setState({
          ...state,
          isLoading: false,
        });
        
      })
      .catch((error) => {
        console.log(error);
      });
  }, [date, hospital, approve]);

  const onChange = (e) => {
    setHospital(e.target.value);
  };

  const handleApprove = (
    id,
    hc_appoinmentDate,
    hc_doctorId,
    hc_hospitalID,
    hc_patientID,
    visitingSlot
  ) => {
    const data = {
      id,
      hc_appoinmentDate,
      hc_doctorId,
      hc_hospitalID,
      hc_patientID,
      visitingSlot,
    };
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${auth.token}`,
    };

    Axios.put("/api/appointment/approve_Appointment", data, { headers })
      .then((res) => {
        setApprove(res);
        window.alert('Approved the apppoinment');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h5>Doctor Appoinment Handle</h5>
      <label>Select date</label>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          style={{
            padding: "0px 10px",
            border: "1px solid rgb(197, 197, 197)",
          }}
          id="birthdate"
          name="hc_doctor_date_of_birth"
          className="  form-control mb-3"
          InputProps={{
            disableUnderline: true,
          }}
          minDate={new Date()}
          value={date}
          onChange={handleChange}
          autoComplete="off"
          format="dd/MM/yyyy"
        />
      </MuiPickersUtilsProvider>

      <select
        name="hc_HospitalID"
        className="form-select btn  dropdown-toggle mt-2 mb-2 text-start"
        aria-haspopup="true"
        aria-expanded="false"
        onChange={(e) => onChange(e)}
        required
      >
        <option hidden>Select Hospital</option>
        {hospitals?.map((hosp, index) => {
          return (
            <option key={index} value={hosp.hospitalID._id}>
              {hosp?.hospitalID.hc_hospital_english_name}
            </option>
          );
        })}
      </select>

      <div>
        <h5>Appoinment List : </h5>
        <table className="table  table-striped">
          <thead className="thead  tablehead">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Patient Name</th>
              <th scope="col">Appoinment Date</th>
              <th scope="col">Visiting Slot</th>
              <th scope="col">Visit</th>
              <th scope="col">Accept</th>
            </tr>
          </thead>
          {state.isLoading ? (
            <>
              <i className="fas fa-spinner fa-pulse fa-2x "></i>
            </>
          ) : result?.length === 0 ? (
            <tbody>
              <tr>
                <td>No Appoiments Found</td>
              </tr>
            </tbody>
          ) : (
            <tbody className="tablebody">
              {result?.map((appoinment, index) => {
                const date = new Date(appoinment.hc_appoinmentDate);
                return (
                  <tr key={appoinment._id}>
                    <td>{index + 1}</td>

                    <td>
                      {appoinment.hc_appointment_patient?.hc_patient_firstName}
                      &nbsp;
                      {appoinment.hc_appointment_patient?.hc_patient_lastName}
                    </td>
                    <td>{`${date.getDate()}-${
                      date.getMonth() + 1
                    }-${date.getFullYear()}`}</td>
                    <td>{appoinment.visitingSlot}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm"
                        disabled={appoinment.approved == 1 ? false : true}
                        onClick={() =>
                          history.push(
                            `./Prescription/${appoinment.hc_appointment_patient._id}/${appoinment._id}`
                          )
                        }
                      >
                        Prescription
                      </button>
                    </td>

                    <td>
                      {appoinment.approved ? (
                        <p>Approved</p>
                      ) : (
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            handleApprove(
                              appoinment._id,
                              appoinment.hc_appoinmentDate,
                              appoinment.hc_doctorId._id,
                              appoinment.hc_hospitalID,
                              appoinment.hc_appointment_patient._id,
                              appoinment.visitingSlot
                            );
                          }}
                        >
                          <i
                            className="fa fa-check-square-o"
                            aria-hidden="true"
                          ></i>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default DoctorAppoinment;
