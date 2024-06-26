import React, { useEffect, useState } from "react";
import Styles from "./HospitalProfile.module.css";
import "./HospitalProfile.css";
import Axios from "axios";
import { useSelector } from "react-redux";
import FormPrompt from "../../DailogBoxes/formprompt";
import AlertDialogBox from "../../DailogBoxes/alertdailogbox";
import ConfirmDialogBox from "../../DailogBoxes/confirmdailogbox";
import ErorrDialogBox from "../../DailogBoxes/errordaologbox";
import AddHospitalDetails from "../../PersonDetails/AddHospitalDetails";
import LabratoryPriceAdd from "./LabratoryPriceAdd";
import NewStudentRegister from "../../RegistrationForm/NewStudentRegister";
import NewCompanyRegister from "../../RegistrationForm/NewCompanyRegister";

const HospitalProfile = () => {
  const [isLoading, setisLoading] = useState(true);
  const [hospitalState, setHospitalState] = useState(null);
  const auth = useSelector((state) => state.AuthReducer);
  const [openConfirmDailog, setopenConfirmDailog] = useState(false);

  const [openLabConfirmDailog, setopenLabConfirmDailog] = useState(false);

  const [state, setState] = useState({
    serachText: "",
    isLoading: false,
    limit: 10,

    isLoadMoredata: false,
    isCloseBtnAppear: true,
    isDeleting: false,
    noMoreDataText: "",

    openFormDailog: false,
    openAlertDailog: false,
    openErrorDailog: false,
    openConfirmDailog: false,
    isSearching: false,
    isSearchDataShow: false,

    openLabFormDailog: false,
    openLabAlertDailog: false,

    openStudentFormDailog: false,
    openStudentAlertDailog: false,


    openCompanyFormDailog: false,
    openCompanyAlertDailog: false,

  });

  const hospitalData = () => {
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${auth.token}`,
    };

    try {
      Axios.get(`../api/getProfileDetails`, { headers })
        .then((res) => {
          setHospitalState(res.data.hospital);
          setisLoading(false);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    hospitalData();
  }, []);

  const handleSuccessDailog = () => {
    setState({
      ...state,
      openFormDailog: false,
      openAlertDailog: true,
    });
  };

  const handleErrorDailog = () => {
    setopenConfirmDailog(false);
    setState({
      ...state,
      openFormDailog: false,
      openConfirmDailog: false,
      openErrorDailog: true,
    });
  };

  const closeFormDailog = () => {
    setState({
      ...state,
      openFormDailog: false,
    });
  };

  const closeAlertDailog = () => {
    setState({
      ...state,
      openAlertDailog: false,
    });
  };

  //Common
  const closeErrorDailog = () => {
    setState({
      ...state,
      openErrorDailog: false,
    });
  };
  const closeConfirmDailog = () => {
    setopenConfirmDailog(false);
  };

  //Common end

  // Lab
  const handleLabSuccessDailog = () => {
    setState({
      ...state,
      openLabFormDailog: false,
      openLabAlertDailog: true,
    });
  };

  const handleLabErrorDailog = () => {
    setopenConfirmDailog(false);
    setState({
      ...state,
      openLabFormDailog: false,
      openConfirmDailog: false,
      openErrorDailog: true,
    });
  }

  const closeLabFormDailog = () => {
    setState({
      ...state,
      openLabFormDailog: false,
    });
  };

  const closeLabAlertDailog = () => {
    setState({
      ...state,
      openLabAlertDailog: false,
    });
  };




  //Student
  const handleStudentSuccessDailog = () => {
    setState({
      ...state,
      openStudentFormDailog: false,
      openStudentAlertDailog: true,
    });
  };

  const handleStudentErrorDailog = () => {
    setopenConfirmDailog(false);
    setState({
      ...state,
      openStudentFormDailog: false,
      openConfirmDailog: false,
      openErrorDailog: true,
    });
  }

  const closeStudentFormDailog = () => {
    setState({
      ...state,
      openStudentFormDailog: false,
    });
  };

  const closeStudentAlertDailog = () => {
    setState({
      ...state,
      openStudentAlertDailog: false,
    });
  };

  //Company
  const handleCompanySuccessDailog = () => {
    setState({
      ...state,
      openCompanyFormDailog: false,
      openCompanyAlertDailog: true,
    });
  };

  const handleCompanyErrorDailog = () => {
    setopenConfirmDailog(false);
    setState({
      ...state,
      openCompanyFormDailog: false,
      openConfirmDailog: false,
      openErrorDailog: true,
    });
  }

  const closeCompanyFormDailog = () => {
    setState({
      ...state,
      openCompanyFormDailog: false,
    });
  };

  const closeCompanyAlertDailog = () => {
    setState({
      ...state,
      openCompanyAlertDailog: false,
    });
  };

  const setCloseBtnAppear = () => {
    setState({
      ...state,
      isCloseBtnAppear: false,
    });
  };

  return (
    <>
      {isLoading ? (
        <div className="doctorsListpage">
          <i className="fas fa-spinner fa-pulse fa-2x "></i>
        </div>
      ) : (
        <div>
          <ConfirmDialogBox
            openDailog={openConfirmDailog}
            onSetOpenDailog={closeConfirmDailog}
            isLoading={state.isDeleting}
            title="Delete"
            des={
              "Are you sure to delete " +
              state.selectedPatientName +
              " " +
              "details"
            }
          ></ConfirmDialogBox>

          {/* Hospital Add modal */}
          <AlertDialogBox
            openDailog={state.openAlertDailog}
            onSetOpenDailog={closeAlertDailog}
            title="Added"
            des="New Hospital has been added sccessfully"
          ></AlertDialogBox>
          <ErorrDialogBox
            openDailog={state.openErrorDailog}
            onSetOpenDailog={closeErrorDailog}
            title="Error"
            des="Someting went wrong. Try again"
          ></ErorrDialogBox>

          <FormPrompt
            openDailog={state.openFormDailog}
            title="Add New Hospital"
            onSetOpenDailog={closeFormDailog}
            isCloseBtnAppear={state.isCloseBtnAppear}
          >
            <AddHospitalDetails
              setCloseBtnAppear={setCloseBtnAppear}
              handleSuccessDailog={handleSuccessDailog}
              handleErrorDailog={handleErrorDailog}
              collectionName="patients"
              id="hospitalid"
            ></AddHospitalDetails>
          </FormPrompt>

          {/* Lab Test price modal */}
          <AlertDialogBox
            openDailog={state.openLabAlertDailog}
            onSetOpenDailog={closeLabAlertDailog}
            title="Added"
            des="New Lab Test has been added sccessfully"
          ></AlertDialogBox>
          <ErorrDialogBox
            openDailog={state.openErrorDailog}
            onSetOpenDailog={closeErrorDailog}
            title="Error"
            des="Someting went wrong. Try again"
          ></ErorrDialogBox>

          <FormPrompt
            openDailog={state.openLabFormDailog}
            title="Add Diagnosis Test"
            onSetOpenDailog={closeLabFormDailog}
            isCloseBtnAppear={state.isCloseBtnAppear}
          >
            <LabratoryPriceAdd
              setCloseBtnAppear={setCloseBtnAppear}
              handleSuccessDailog={handleLabSuccessDailog}
              handleErrorDailog={handleLabErrorDailog}
              collectionName="diagnosis Test"
              id="hospitalid"
            ></LabratoryPriceAdd>
          </FormPrompt>

          {/* Student registration modal */}
          <AlertDialogBox
            openDailog={state.openStudentAlertDailog}
            onSetOpenDailog={closeStudentAlertDailog}
            title="Added"
            des="New Student has been added sccessfully"
          ></AlertDialogBox>
          <ErorrDialogBox
            openDailog={state.openErrorDailog}
            onSetOpenDailog={closeErrorDailog}
            title="Error"
            des="Someting went wrong. Try again"
          ></ErorrDialogBox>

          <FormPrompt
            openDailog={state.openStudentFormDailog}
            title="Add New Student"
            onSetOpenDailog={closeStudentFormDailog}
            isCloseBtnAppear={state.isCloseBtnAppear}
          >
            <NewStudentRegister
              setCloseBtnAppear={setCloseBtnAppear}
              handleSuccessDailog={handleStudentSuccessDailog}
              handleErrorDailog={handleStudentErrorDailog}
              collectionName="Students"
              id="student_id"
            ></NewStudentRegister>
          </FormPrompt>


          {/* Company modal */}
          <AlertDialogBox
            openDailog={state.openCompanyAlertDailog}
            onSetOpenDailog={closeCompanyAlertDailog}
            title="Added"
            des="NewCompany has been added sccessfully"
          ></AlertDialogBox>
          <ErorrDialogBox
            openDailog={state.openErrorDailog}
            onSetOpenDailog={closeErrorDailog}
            title="Error"
            des="Someting went wrong. Try again"
          ></ErorrDialogBox>

          <FormPrompt
            openDailog={state.openCompanyFormDailog}
            title="Add New Company"
            onSetOpenDailog={closeCompanyFormDailog}
            isCloseBtnAppear={state.isCloseBtnAppear}
          >
            <NewCompanyRegister
              setCloseBtnAppear={setCloseBtnAppear}
              handleSuccessDailog={handleCompanySuccessDailog}
              handleErrorDailog={handleCompanyErrorDailog}
              collectionName="Companies"
              id="company_id"
            ></NewCompanyRegister>
          </FormPrompt>

          <div className={Styles.topheader}>
            <ul>
              <li>
                <i
                  className="fa fa-arrow-circle-o-right fa-2x text-muted"
                  aria-hidden="true"
                ></i>
              </li>
              <li>
                <h5>Hospital Profile</h5>
              </li>
            </ul>
          </div>
          <hr></hr>
          <div className={Styles.gridContainer}>
            <div className=" border-end">
              <div>
                <img
                  src={hospitalState?.hc_hospital_logo}
                  alt="Profile"
                  style={{ height: "200px", width: "300px" }}
                ></img>
              </div>
              <div className=" mt-2">
                <h5 className={Styles.ProfileDescription}>
                  {hospitalState?.hc_hospital_english_name}
                </h5>
              </div>
              <div className="row">
                <div className="col-5">
                  <p className={Styles.ProfileDescription}>Reg No</p>
                </div>
                <div className="col-7">
                  <p className={Styles.ProfileDescription}>
                    : {hospitalState?.hc_hospital_DGHS_reg_no}
                  </p>
                </div>
                <div className="col-5">
                  <p className={Styles.ProfileDescription}>Address</p>
                </div>
                <div className="col-7">
                  <p className={Styles.ProfileDescription}>
                    : {hospitalState?.hc_hospital_address?.upazila},{" "}
                    {hospitalState?.hc_hospital_address?.district}
                  </p>
                </div>

                <div className="col-5">
                  <p className={Styles.ProfileDescription}>Contact</p>
                </div>
                <div className="col-7">
                  <p className={Styles.ProfileDescription}>
                    : {hospitalState?.hc_hospital_phoneno}
                  </p>
                </div>
              </div>
              <hr />
            </div>
            <div className="">
              <div className="row">
                <div className="col-lg-6 col-12">
                  <div className={Styles.searchDiv}>
                    <div className="">
                      <div className={Styles.search}>
                        <input
                          id="searchText"
                          type="text"
                          className={Styles.searchTerm}
                          placeholder="At first select option"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                            }
                          }}
                          onChange={(e) => { }}
                        />

                        <button type="submit" className={Styles.searchButton}>
                          <i className="fa fa-search"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 AddButtonDiv pe-3 col-12">
                  {
                    auth.UID == '6288cb73f6316b2b30359db0' || auth.UID == '632b4b5fe3cddc60f7988656' ? <div className="col-6 d-flex AddButtonDiv justify-content-end">
                      <button
                        type="button"
                        className="btn btn-warning border-rounded btn-sm"
                        onClick={() => {
                          setState({
                            ...state,
                            openStudentFormDailog: true,
                          });
                        }}
                      >
                        + Add Student
                      </button>
                      &nbsp;
                      <button
                        type="button"
                        className="btn btn-warning border-rounded btn-sm"
                        onClick={() => {
                          setState({
                            ...state,
                            openCompanyFormDailog: true,
                          });
                        }}
                      >
                        + Add Company
                      </button>
                    </div> : <></>
                  }

                  <div className="col-6 AddButtonDiv">
                    {
                      auth.UID == '6288cb73f6316b2b30359db0' || auth.UID == '632b4b5fe3cddc60f7988656' ? <button
                        type="button"
                        className="btn btn-warning border-rounded btn-sm"
                        onClick={() => {
                          setState({
                            ...state,
                            openFormDailog: true,
                          });
                        }}
                      >
                        + Add Hospital
                      </button> : <></>
                    }

                    &nbsp;
                    <button
                      type="button"
                      className="btn btn-warning border-rounded btn-sm"
                      onClick={() => {
                        setState({
                          ...state,
                          openLabFormDailog: true,
                        });
                      }}
                    >
                      + Add Diagnosis
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <div className="row">
                  <div className="col">
                    <h5>Diagnostic Test Details</h5>
                  </div>
                  <div className="d-flex justify-content-end col-3"></div>
                </div>
                <table className="table table-striped mt-3">
                  <thead className="thead tablehead thead-dark">
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Name</th>
                      <th scope="col">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hospitalState?.hc_hospital_diagnosis_test_details?.map(
                      (item, index) => {
                        return (
                          <tr key={index}>
                            <td data-label="No"> {index + 1}</td>
                            <td data-label="Name">{item.diagnosis_name}</td>
                            <td data-label="Price"> {item.diagnosis_price}</td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>



  );
};

export default HospitalProfile;
