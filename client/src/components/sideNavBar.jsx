import React, { useState, useEffect } from "react";
import "./sliderNavBar.css";
import Styles from "./sideNavBar.module.css";
import AddPersonDetails from "./PersonDetails/addpersondetails";
import PatienList from "./Patients/patientlist";
import DoctorsList from "./Doctors/doctorslist";
import BedAllotment from "./Bed/bedallotment";
import EditPersonDetails from "./PersonDetails/editpersondetails";

import Bedlist from "./Bed/bedlist";
import MedicineList from "./Medicine/medicinelist";
import BloodBagList from "./Bloodbag/bloodbaglist";
import NurseList from "./Nurses/nurselist";
import PharmacistsList from "./Pharmacistslist/pharmacistslist";
import LaboratoristList from "./Laboratorist/laboratoristlist";
import AccountantList from "./Accountant/accountantlist";
import ReceptionistList from "./Receptionist/receptionistlist";

import DeathReportList from "./DeathReport/deathreportlist";
import DeathRepotAllotment from "./DeathReport/deathreportallotment";

import BirthReportList from "./BirthReport/birthreportlsit";
import BirthRepotAllotment from "./BirthReport/birthreportallotment";
import PayrollList from "./Payroll/payrolllist";
import Dashboard from "./Dashboard/dashboard";
import OperationAllotment from "./OperationReprot/operationallotment";
import OperationReportList from "./OperationReprot/operationreportlist";
import CreatePayRoll from "./Payroll/createpayroll";
import {
  BrowserRouter as Routers,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { userLogOut, navbarToggle } from "../redux/reducers/Auth/authAction";
import PatientProfile from "./Profile/PatientProfile/PatientProfile";
import DoctorProfile from "./Profile/DoctorProfile/DoctorProfile";
import HospitalProfile from "./Profile/HospitalProfile/HospitalProfile";
import { Button } from "@material-ui/core";
import Prescription from "./Prescription/Prescription";
import { useHistory } from "react-router-dom";
import PDF from "./Prescription/PDF";
import Print from "./Prescription/Page2Print";
import Page2Print from "./Prescription/Page2Print";
import PatientDashBoard from "./PatientDashboard/PatientDashBoard";
import PatientPrescription from "./Profile/PatientProfile/PatientPrescription";
import Axios from "axios";
import Notifications from "./PatientDashboard/Notifications/Notifications";
import SearchDoctors from "./PatientDashboard/SearchDoctors/SearchDoctors";
import HospitalAppoinment from "./AppoinmentHandle/HospitalAppoinment/HospitalAppoinment";
import DoctorAppoinment from "./AppoinmentHandle/DoctorAppoinment/DoctorAppoinment";
import HospitalDoctors from "./PatientDashboard/HospitalDoctors/HospitalDoctors";
import AddLabTest from "./AddLabTest/AddLabTest";
import DoctorProfileUpdate from "./Profile/DoctorProfile/DoctorProfileUpdate";
import CompanyProfile from "./Profile/CompanyProfile/CompanyProfile";
import StudentProfile from "./Profile/StudentProfile/StudentProfile";
import StudentPrescription from "./Prescription/StudentPrescription";
import StudentPrescriptionFromDoctor from "./Profile/StudentProfile/StudentPrescriptionFromDoctor";
import CompanyDrugList from "./Profile/CompanyProfile/CompanyDrugList";
import LoginPage from "./Login/login";
import EditDrug from "./Profile/CompanyProfile/EditDrug";

const SideNavBar = () => {
  const history = useHistory();
  const [notification, setNotification] = useState(null);
  const [countNotification, setcountNotification] = useState(null);
  const [openDiv, setOpenDiv] = useState(false);
  const auth = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    addTitleClass: true,
    patientdetails: null,
    togglePymentTitle: true,
    selectedCat: "",
  });
  const headers = {
    "Content-Type": "application/json",
    authorization: `Bearer ${auth.token}`,
  };

  const patientData = () => {
    try {
      Axios.get(`../../api/getProfileDetails`, { headers }).then((res) => {
        const notification =
          res?.data?.patient?.hc_patient_notifications?.reverse() ||
          res?.data?.doctor?.hc_doctor_notifications?.reverse() ||
          res?.data?.hospital?.hc_hospital_notifications?.reverse();
        const count = notification?.filter(
          (i) => i.notificationID?.isChecked === false
        ).length;
        setNotification(notification);
        setcountNotification(count == 0 ? null : count);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    patientData();
  }, []);

  const getData = (data) => {
    setState({ ...state, patientdetails: data });
  };

  const toggleHamburger = () => {
    dispatch(navbarToggle(!auth.addHamburgerClass));
  };
  const toggleTitle = () => {
    setState({ ...state, addTitleClass: !state.addTitleClass });
  };
  const togglePymentTitle = () => {
    setState({ ...state, togglePymentTitle: !state.togglePymentTitle });
  };
  const logout = () => {
    dispatch(userLogOut());
    history.push("/login");
  };
  const setTitleActive = (selectedCat) => {
    setState({
      ...state,
      selectedCat: selectedCat,
    });
  };

  let boxClass = ["wrapper"];

  if (auth.addHamburgerClass) {
    boxClass.push("collap");
  }
  let titleClass = ["subcat"];
  if (state.addTitleClass) {
    titleClass.push("collap");
  }
  let togglePymentTitlee = ["subcat"];
  if (state.togglePymentTitle) {
    togglePymentTitlee.push("collap");
  }

  const showNotification = (notification) => {
    const array = [];
    notification &&
      notification.filter((item) => {
        if (item.notificationID.isChecked === false) {
          array.push(item.notificationID._id);
        }
      });
    if (array.length > 0) {
      Axios.put("../api/notification/showed_notification", array, { headers })
        .then((res) => {
          setcountNotification(null);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className={boxClass.join(" ")}>
      {openDiv ? (
        <Notifications
          showNotification={showNotification}
          notification={notification}
          setNotification={setNotification}
        ></Notifications>
      ) : null}
      <Routers>
        <div className="top_navbar">
          <div className="hamburger" onClick={toggleHamburger}>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="top_menu">
            <div className="logo">Health Book</div>
            <div
              style={{
                display: "flex",
              }}
            >
              {auth?.role ? null : (
                <li
                  className="logInOut"
                  style={{
                    display: "flex",
                  }}
                  onClick={() => history.push("/login")}
                >
                  <button className="btn btn-success">Log In</button>
                </li>
              )}
              <ul className="navbarPointer">
                {
                  auth?.role ? (
                    <li className="logInOut" onClick={() => logout()}>
                      <i class="fa fa-sign-out" title="Sign out" aria-hidden="true"></i>
                    </li>
                  ) : null
                }
                {auth?.role === "Student" || !auth?.role ? (
                  <></>
                ) : (
                  <li>
                    <span
                      onClick={() => {
                        setOpenDiv(!openDiv);
                      }}
                    >
                      <i
                        className="fas fa-bell notificationIcon"
                        title="Notification"
                      ></i>
                      <sup className={Styles.notificationNumber}>
                        <span>{countNotification}</span>
                      </sup>
                    </span>
                  </li>
                )}
                {auth?.role === "Patient" ? (
                  <li>
                    <Link to="/PatientProfile">
                      <i className="fas fa-user" title="Patient Profile"></i>
                    </Link>
                  </li>
                ) : null}
                {auth?.role === "Hospital" ? (
                  <li>
                    <Link to="/HospitalProfile">
                      {" "}
                      <i
                        className="fas fa-hospital"
                        title="Hospital Profile"
                      ></i>
                    </Link>
                  </li>
                ) : null}
                {auth?.role === "Doctor" ? (
                  <li>
                    <Link to="/DoctorProfile">
                      {" "}
                      <i className="fas fa-user-md" title="Doctor Profile"></i>
                    </Link>
                  </li>
                ) : null}{" "}
                {auth?.role === "Student" ? (
                  <li>
                    <Link to="/studentProfile">
                      {" "}
                      <i
                        className="fa fa fa-user-graduate"
                        title="Student Profile"
                        aria-hidden="true"
                      ></i>
                    </Link>
                  </li>
                ) : null}{" "}
                {auth?.role === "Company" ? (
                  <li>
                    <Link to="/companyProfile">
                      {" "}
                      <i
                        className="fas fa-building"
                        title="Company Profile"
                      ></i>
                    </Link>
                  </li>
                ) : null}{" "}
              </ul>
            </div>
          </div>
        </div>

        <div className="sidebar">
          <div className="noSubCat">
            <ul className="navStyle">
              {auth.role == "Hospital" || auth.role == "Doctor" ? (
                <Link to="/adminDashboard">
                  <li
                    className={
                      state.selectedCat === "Dashboard" ? "active" : ""
                    }
                    onClick={() => setTitleActive("Dashboard")}
                  >
                    <span className="icon">
                      <i className="fa fa-home" aria-hidden="true"></i>
                    </span>
                    <span className="title">Dashboard</span>
                  </li>
                </Link>
              ) : null}
              {auth.role == "Patient" || !auth.role ? (
                <Link to="/dashboard">
                  <li
                    className={
                      state.selectedCat === "Dashboard" ? "active" : ""
                    }
                    onClick={() => setTitleActive("Dashboard")}
                  >
                    <span className="icon">
                      <i className="fa fa-home" aria-hidden="true"></i>
                    </span>
                    <span className="title">Dashboard</span>
                  </li>
                </Link>
              ) : null}
              {auth.role == "Student" ? (
                <Link to="/doctorsPrescription">
                  <li
                    className={
                      state.selectedCat === "Doctor's Prescription"
                        ? "active"
                        : ""
                    }
                    onClick={() => setTitleActive("Doctor's Prescription")}
                  >
                    <span className="icon">
                      <i className="fa fa-prescription" aria-hidden="true"></i>
                    </span>
                    <span className="title">Doctor's Prescription</span>
                  </li>
                </Link>
              ) : null}
              {auth ? (
                auth.role == "Doctor" || auth.role == "Hospital" ? (
                  <Link to="/patientlist">
                    <li
                      className={
                        state.selectedCat === "Patient" ? "active" : ""
                      }
                      onClick={() => setTitleActive("Patient")}
                    >
                      <span className="icon">
                        <i className="fa fa-user" aria-hidden="true"></i>
                      </span>
                      <span className="title">Patient</span>
                    </li>
                  </Link>
                ) : null
              ) : null}
              {auth ? (
                auth.role == "Hospital" ? (
                  <Link to="/doctorslist">
                    <li
                      className={
                        state.selectedCat === "Doctors" ? "active" : ""
                      }
                      onClick={() => setTitleActive("Doctors")}
                    >
                      {" "}
                      <span className="icon">
                        <i className="fa fa-user-md" aria-hidden="true"></i>
                      </span>
                      <span className="title">Doctors</span>
                    </li>
                  </Link>
                ) : null
              ) : null}

              {auth.role == "Hospital" ? (
                <Link to="/hospitalAppoinment">
                  <li
                    className={
                      state.selectedCat === "Appoinment" ? "active" : ""
                    }
                    onClick={() => setTitleActive("Appoinment")}
                  >
                    <span className="icon">
                      <i className="fa fa-calendar" aria-hidden="true"></i>
                    </span>
                    <span className="title">Appoinment</span>
                  </li>
                </Link>
              ) : null}

              {auth.role == "Doctor" ? (
                <Link to="/doctorAppoinment">
                  <li
                    className={
                      state.selectedCat === "Appoinment" ? "active" : ""
                    }
                    onClick={() => setTitleActive("Appoinment")}
                  >
                    <span className="icon">
                      <i className="fa fa-calendar" aria-hidden="true"></i>
                    </span>
                    <span className="title">Appoinment</span>
                  </li>
                </Link>
              ) : null}
              {auth.role == "Company" || auth.role == "Patient" ? (
                <Link to="/companyDrugList">
                  <li
                    className={state.selectedCat === "Drugs" ? "active" : ""}
                    onClick={() => setTitleActive("Drugs")}
                  >
                    <span className="icon">
                      <i className="fa fa-pills" aria-hidden="true"></i>
                    </span>
                    <span className="title">Drugs</span>
                  </li>
                </Link>
              ) : null}
            </ul>
          </div>
          <hr />
        </div>

        <div className="main_container">
          <Switch>
            <Route path="/" exact>
              <PatientDashBoard></PatientDashBoard>
            </Route>
            <Route exact path="/adminDashboard">
              <Dashboard />
            </Route>
            <Route exact path="/patientlist">
              <PatienList />
            </Route>

            <Route exact path="/login">
              <LoginPage></LoginPage>
            </Route>
            <Route path="/addpatient">
              <AddPersonDetails />
            </Route>

            <Route path="/editpersondetails/:patientid">
              <EditPersonDetails />
            </Route>

            <Route path="/doctorslist">
              <DoctorsList />
            </Route>
            <Route path="/bedlist">
              <Bedlist />
            </Route>
            <Route path="/bedlistt/bedallotment">
              <BedAllotment />
            </Route>
            <Route path="/medicinelist">
              <MedicineList />
            </Route>
            <Route path="/bloodbaglist">
              <BloodBagList />
            </Route>

            <Route path="/operationreportlist/operationreport">
              <OperationAllotment />
            </Route>
            <Route path="/operationreportlist">
              <OperationReportList />
            </Route>
            <Route path="/deathreportlist/deathreportallotment">
              <DeathRepotAllotment />
            </Route>
            <Route path="/deathreportlist">
              <DeathReportList />
            </Route>
            <Route path="/birthreportlist/birthreportallotment">
              <BirthRepotAllotment />
            </Route>
            <Route path="/birthreportlist">
              <BirthReportList />
            </Route>
            <Route path="/nurselist">
              <NurseList />
            </Route>
            <Route path="/pharmacistslist">
              <PharmacistsList />
            </Route>

            <Route path="/laboratoristlist">
              <LaboratoristList />
            </Route>

            <Route path="/accountantlist">
              <AccountantList />
            </Route>

            <Route path="/receptionistlist">
              <ReceptionistList />
            </Route>

            <Route path="/createpayroll">
              <CreatePayRoll />
            </Route>
            <Route path="/payrolllist">
              <PayrollList />
            </Route>

            <Route exact path="/PatientProfile/:patientID">
              <PatientProfile></PatientProfile>
            </Route>
            <Route path="/PatientProfile">
              <PatientProfile></PatientProfile>
            </Route>
            <Route path="/DoctorProfile">
              <DoctorProfile></DoctorProfile>
            </Route>
            <Route path="/HospitalProfile">
              <HospitalProfile></HospitalProfile>
            </Route>
            <Route path="/studentProfile">
              <StudentProfile></StudentProfile>
            </Route>
            <Route path="/companyProfile">
              <CompanyProfile></CompanyProfile>
            </Route>
            <Route path="/companyDrugList">
              <CompanyDrugList></CompanyDrugList>
            </Route>

            <Route exact path="/Prescription/:patientid/:appointmentid">
              <Prescription></Prescription>
            </Route>

            <Route path="/Prescription/:patientid">
              <Prescription></Prescription>
            </Route>
            <Route path="/editPrescription/:patientid/:prescriptionid">
              <Prescription></Prescription>
            </Route>

            <Route path="/studentPrescription">
              <StudentPrescription></StudentPrescription>
            </Route>

            <Route path="/patientPrescription/:prescriptionId">
              <PatientPrescription></PatientPrescription>
            </Route>
            <Route path="/std_prescription/:studentprescriptionid">
              <PatientPrescription></PatientPrescription>
            </Route>
            <Route path="/doctorsPrescription/">
              <StudentPrescriptionFromDoctor />
            </Route>

            <Route path="/hospitalDoctors/:hospitalID">
              <HospitalDoctors></HospitalDoctors>
            </Route>
            <Route path="/editDrug/:drugId">
              <EditDrug></EditDrug>
            </Route>

            <Route path="/downloadPDF">
              <PDF></PDF>
            </Route>

            <Route path="/print">
              <Page2Print></Page2Print>
            </Route>

            <Route path="/dashboard">
              <PatientDashBoard></PatientDashBoard>
            </Route>

            <Route path="/searchDocotrs">
              <SearchDoctors></SearchDoctors>
            </Route>

            <Route path="/hospitalAppoinment">
              <HospitalAppoinment></HospitalAppoinment>
            </Route>

            <Route path="/doctorAppoinment">
              <DoctorAppoinment></DoctorAppoinment>
            </Route>

            <Route path="/addLabReport/:id">
              <AddLabTest></AddLabTest>
            </Route>

            <Route path="/editDoctorProfile">
              <DoctorProfileUpdate></DoctorProfileUpdate>
            </Route>

            <Redirect to="" />
          </Switch>
        </div>
      </Routers>
    </div>
  );
};

export default SideNavBar;
