import React, { useState, useEffect } from "react";
import "./dashboard.css";
import LineChart from "../Chart/linechart";
import DougHuntChart from "../Chart/doughuntchart";
import HorizontalBarchart from "../Chart/horizontalbarchart";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { loginFailed } from "../../redux/reducers/Auth/authAction";
import PieChart from "./PieChart";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const [chartData, setChartData] = useState(null);
  const auth = useSelector((state) => state.AuthReducer);
  const [state, setState] = useState({
    isLoading: true,
    getAllDocCount: {
      birthreport: 0,
      patients: 0,
      accountant: 0,
      deathreport: 0,
      doctors: 0,
      laboratorist: 0,
      nurses: 0,
      operationreport: 0,
      payrolllist: 0,
      pharmacists: 0,
      receptionist: 0,
    },
    month: {
      jan: 0,
      feb: 0,
      march: 0,
      april: 0,
      may: 0,
      jun: 0,
      july: 0,
      aug: 0,
      sep: 0,
      oct: 0,
      nov: 0,
      des: 0,
    },
  });

  const getData = async () => {
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${auth.token}`,
    };
    try {
      Axios.get(`api/dashboard/users`, { headers })
        .then((res) => {
          setState({
            ...state,
            isLoading: false,
            getAllDocCount: {
              ...state.getAllDocCount,
              patients: res.data.patients,
              doctors: res.data.doctors,
              hospitals: res.data.hospitals,
              medicalStudents: res.data.medicalStudents,
            },
          });
        })
        .catch(() => dispatch(loginFailed()));
      const data = { date: new Date().toISOString() }
      Axios.post(
        auth.role == "Hospital"
          ? `api/service/serveyHospital`
          : `api/service/serveyDoctor`,
          data,{ headers }
      )
        .then((res) => {
          console.log(res.data)
          setChartData(res.data)
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    getData();
  }, []);


  return state.isLoading ? (
    <div className="dashboardpage">
      <i className="fas fa-spinner fa-pulse fa-2x "></i>
    </div>
  ) : (
    <div className="dashboardpage">
      <div className="topheader">
        <ul>
          <li>
            <i
              className="fa fa-arrow-circle-o-right fa-2x"
              aria-hidden="true"
            ></i>
          </li>
          <li>
            <span>Dashboard</span>
          </li>
        </ul>
      </div>

      <div className="first_section">
        <div className="row">
          <div className="col-sm">
            {" "}
            <div className="box">
              {" "}
              <div className="box_containt">
                <h1
                  style={{
                    fontWeight: "700",
                    color: "#BA79CB",
                    fontSize: "30px",
                  }}
                >
                  {state.getAllDocCount.patients}
                </h1>
                {/* <hr /> */}
                <span
                  style={{
                    fontWeight: "700",

                    color: "#BA79CB",
                  }}
                >
                  Our Patients
                </span>
              </div>
              <i className="fa fa-user fa-4x" aria-hidden="true"></i>
            </div>
          </div>
          <div className="col-sm">
            {" "}
            <div className="box">
              {" "}
              <div className="box_containt">
                <h1
                  style={{
                    fontWeight: "700",
                    color: "#FFA812",
                    fontSize: "30px",
                  }}
                >
                  {state.getAllDocCount.doctors}
                </h1>
                {/* <hr /> */}
                <span
                  style={{
                    fontWeight: "700",

                    color: "#FFA812",
                  }}
                >
                  Our Doctors
                </span>
              </div>
              <i className="fa fa-user-md fa-4x" aria-hidden="true"></i>
            </div>
          </div>
          <div className="col-sm">
            {" "}
            <div className="box">
              {" "}
              <div className="box_containt">
                <h1
                  style={{
                    fontWeight: "700",
                    color: "#00A65A",
                    fontSize: "30px",
                  }}
                >
                  {state.getAllDocCount.hospitals}
                </h1>
                {/* <hr /> */}
                <span
                  style={{
                    fontWeight: "700",

                    color: "#00A65A",
                  }}
                >
                  Our Hospital
                </span>
              </div>
              <i className="fa fa-hospital-o fa-4x" aria-hidden="true"></i>
            </div>
          </div>
          <div className='row'>
            <div className="col-sm">
              <div className="box">
                <div className="box_containt">
                  <h1
                    style={{
                      fontWeight: "700",
                      color: "#F56954",
                      fontSize: "30px",
                    }}
                  >
                    {state.getAllDocCount.medicalStudents}
                  </h1>

                  <span
                    style={{
                      fontWeight: "700",
                      color: "#F56954",
                    }}
                  >
                    Our Medical Student
                  </span>
                </div>
                <i className="fa fa fa-user-graduate fa-4x" aria-hidden="true"></i>
              </div>
            </div>
            <div className="col-sm">
              <div className="box">
                <div className="box_containt">
                  <h1
                    style={{
                      fontWeight: "700",
                      color: "#F56954",
                      fontSize: "30px",
                    }}
                  >
                    {chartData ? chartData._hasVisited : 0}
                  </h1>
                  <span
                    style={{
                      fontWeight: "700",
                      color: "#F56954",
                    }}
                  >
                    Patient Visited {auth.role === 'Doctor' ? "you" : "your Hospital"}
                  </span>
                </div>
                <i className="fa fa-bed fa-4x" aria-hidden="true"></i>
              </div>
            </div>
            <div className="col-sm">
              <div className="box">
                <div className="box_containt">
                  <h1
                    style={{
                      fontWeight: "700",
                      color: "#95641E",
                      fontSize: "30px",
                    }}
                  >
                    {chartData ? chartData._appointment : 0}
                  </h1>

                  <span
                    style={{
                      fontWeight: "700",
                      color: "#95641E",
                    }}
                  >
                    Appoinment Patient Visited
                  </span>
                </div>
                <i className="fa fa-calendar fa-4x" aria-hidden="true"></i>
              </div>
            </div>
          </div>
          {/*  <div className="col-sm">
            <div className="box">
              <div className="box_containt">
                <h1
                  style={{
                    fontWeight: "700",
                    color: "#F56954",
                    fontSize: "30px",
                  }}
                >
                  {state.getAllDocCount.pharmacists}
                </h1>

                <span
                  style={{
                    fontWeight: "700",
                    color: "#F56954",
                  }}
                >
                  Pharmacist
                </span>
              </div>
              <i className="fa fa-medkit fa-4x" aria-hidden="true"></i>
            </div>
          </div> */}
        </div>

        {/* <div className="row">
          <div className="col-sm">
            {" "}
            <div className="box">
              {" "}
              <div className="box_containt">
                <h1
                  style={{
                    fontWeight: "700",
                    color: "#00B29E",
                    fontSize: "30px",
                  }}
                >
                  {state.getAllDocCount.laboratorist}
                </h1>
                
                <span
                  style={{
                    fontWeight: "700",
                    color: "#00B29E",
                  }}
                >
                  Laboratorist
                </span>
              </div>
              <i className="fa fa-flask fa-4x" aria-hidden="true"></i>
            </div>
          </div>
          <div className="col-sm">
            {" "}
            <div className="box">
              {" "}
              <div className="box_containt">
                <h1
                  style={{
                    fontWeight: "700",
                    color: "#EC3B83",
                    fontSize: "30px",
                  }}
                >
                  {state.getAllDocCount.accountant}
                </h1>
               
                <span
                  style={{
                    fontWeight: "700",
                    color: "#EC3B83",
                  }}
                >
                  Accountant
                </span>
              </div>
              <i className="fa fa-money fa-4x" aria-hidden="true"></i>
            </div>
          </div>
          <div className="col-sm">
            {" "}
            <div className="box">
              {" "}
              <div className="box_containt">
                <h1
                  style={{
                    fontWeight: "700",
                    color: "#00C0EF",
                    fontSize: "30px",
                  }}
                >
                  {state.getAllDocCount.receptionist}
                </h1>
                
                <span
                  style={{
                    fontWeight: "700",
                    color: "#00C0EF",
                  }}
                >
                  Receptionist
                </span>
              </div>
              <i className="fa fa-briefcase fa-4x" aria-hidden="true"></i>
            </div>
          </div>

          <div className="col-sm">
            {" "}
            <div className="box">
              {" "}
              <div className="box_containt">
                <h1
                  style={{
                    fontWeight: "700",
                    color: "#BA79CB",
                    fontSize: "30px",
                  }}
                >
                  {state.getAllDocCount.payrolllist}
                </h1>
               
                <span
                  style={{
                    fontWeight: "700",
                    color: "#BA79CB",
                  }}
                >
                  Payments
                </span>
              </div>
              <i className="fa fa-credit-card-alt fa-4x" aria-hidden="true"></i>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3">
            {" "}
            <div className="box">
              {" "}
              <div className="box_containt">
                <h1
                  style={{
                    fontWeight: "700",
                    color: "#00A65A",
                    fontSize: "30px",
                  }}
                >
                  {state.getAllDocCount.operationreport}
                </h1>
                
                <span
                  style={{
                    fontWeight: "700",
                    color: "#00A65A",
                  }}
                >
                  Operation Reportt
                </span>
              </div>
              <i className="fa fa-hospital-o fa-4x" aria-hidden="true"></i>
            </div>
          </div>

          <div className="col-sm-3">
            {" "}
            <div className="box">
              {" "}
              <div className="box_containt">
                <h1
                  style={{
                    fontWeight: "700",
                    color: "#95641E",
                    fontSize: "30px",
                  }}
                >
                  {state.getAllDocCount.birthreport}
                </h1>
                
                <span
                  style={{
                    fontWeight: "700",
                    color: "#95641E",
                  }}
                >
                  Birth Report
                </span>
              </div>
              <i className="fa fa-child fa-4x" aria-hidden="true"></i>
            </div>
          </div>

          <div className="col-sm-3">
            {" "}
            <div className="box">
              {" "}
              <div className="box_containt">
                <h1
                  style={{
                    fontWeight: "700",
                    color: "#701C1C",
                    fontSize: "30px",
                  }}
                >
                  {state.getAllDocCount.deathreport}
                </h1>
                
                <span
                  style={{
                    fontWeight: "700",
                    color: "#701C1C",
                  }}
                >
                  Death Report
                </span>
              </div>
              <i className="fa fa-ban fa-4x" aria-hidden="true"></i>
            </div>
          </div>
        </div> */}
      </div>
      <PieChart chartData={chartData}></PieChart>
      {/* <div className="second_section">
          <div className="row">
            <div className="col-lg-8">
              <div className="wrap_chart">
                <LineChart month={state.month}></LineChart>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="wrap_chart">
                <DougHuntChart
                  operationCount={state.getAllDocCount.operationreport}
                  birthReportCount={state.getAllDocCount.birthreport}
                  deathreportCount={state.getAllDocCount.deathreport}
                ></DougHuntChart>
              </div>
            </div>
          </div>
        </div>
        <div className="third_section">
          <div className="wrap_chart">
            <HorizontalBarchart
              getAllDocCount={state.getAllDocCount}
            ></HorizontalBarchart>
          </div>
        </div> */}
    </div>
  );
  // }
};

export default DashboardPage;
