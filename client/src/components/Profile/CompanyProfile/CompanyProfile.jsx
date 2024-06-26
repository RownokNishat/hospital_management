import React, { useEffect, useState } from "react";
import Styles from "../DoctorProfile/DoctorProfile.module.css";
import "../DoctorProfile/DoctorProfile.css";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import AlertDialogBox from "../../DailogBoxes/alertdailogbox";
import ErorrDialogBox from "../../DailogBoxes/errordaologbox";
import FormPrompt from "../../DailogBoxes/formprompt";
import { drugTypes } from "../../../redux/reducers/Prescription/prescriptionAction";
import CompanyUpdate from "./CompanyUpdate";

const CompanyProfile = () => {
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(true);
  const [doctorState, setDoctorState] = useState(null);
  const drugType = useSelector((state) => state.prescriptionData.drugType);
  const auth = useSelector((state) => state.AuthReducer);
  const [openConfirmDailog, setopenConfirmDailog] = useState(false);
  const [state, setState] = useState({
    isLoading: true,
    isCloseBtnAppear: true,
    openFormDailog: false,
    openAlertDailog: false,
    openErrorDailog: false,
    openConfirmDailog: false,
    openProfileFormDailog: false,

    openCompanyFormDailog: false,
    openCompanyAlertDailog: false,
    formData: {
      drugtype: "",
      drugName: "",
      description: "",
      price: Number,
    },
  });

  const doctorData = () => {
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${auth.token}`,
    };

    try {
      Axios.get(`../api/getProfileDetails`, { headers })
        .then((res) => {
          setDoctorState(res.data?._company);
          setisLoading(false);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };
  //Drug Type
  const getDrugType = () => {
    const url1 = `../../api/prescription/drug_type`;
    Axios.get(url1)
      .then((res) => {
        dispatch(drugTypes(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    doctorData();
    getDrugType();
  }, []);

  const closeAlertDailog = () => {
    setState({
      ...state,
      openAlertDailog: false,
    });
  };
  const closeErrorDailog = () => {
    setState({
      ...state,
      openErrorDailog: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setState({
      ...state,
      isLoading: true,
    });

    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${auth.token}`,
    };
    Axios.post(`/api/company/company_medicine_name`, state.formData, {
      headers,
    })
      .then((res) => {
        setState({
          ...state,
          isLoading: false,
          openAlertDailog: true,
          formData: {
            drugtype: "",
            drugName: "",
            description: "",
            price: Number,
          },
        });
      })
      .catch((error) => console.log(error));
  };
  const onEdit = (e) => {
    const formData = state.formData;
    setState({
      ...state,
      formData: {
        ...formData,
        [e.target.name]: e.target.value,
      },
    });
  };

  const closeConfirmDailog = () => {
    setopenConfirmDailog(false);
  };

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
  };

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
          <AlertDialogBox
            openDailog={state.openAlertDailog}
            onSetOpenDailog={closeAlertDailog}
            title="Medicine Added successfully !!!"
          ></AlertDialogBox>
          <ErorrDialogBox
            openDailog={state.openErrorDailog}
            onSetOpenDailog={closeErrorDailog}
            title="Error"
            des="Someting went wrong. Please Try again"
          ></ErorrDialogBox>

          {/* Company modal */}
          <AlertDialogBox
            openDailog={state.openCompanyAlertDailog}
            onSetOpenDailog={closeCompanyAlertDailog}
            title="Added"
            des="Company has been updated sccessfully"
          ></AlertDialogBox>

          <FormPrompt
            openDailog={state.openCompanyFormDailog}
            title="Company Update"
            onSetOpenDailog={closeCompanyFormDailog}
            isCloseBtnAppear={state.isCloseBtnAppear}
          >
            <CompanyUpdate
              doctorState={doctorState}
              setCloseBtnAppear={setCloseBtnAppear}
              handleSuccessDailog={handleCompanySuccessDailog}
              handleErrorDailog={handleCompanyErrorDailog}
              collectionName="Companies"
              id="company_id"
            ></CompanyUpdate>
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
                <h5>Company Profile</h5>
              </li>
            </ul>
          </div>
          <hr></hr>
          <div className={Styles.gridContainer}>
            <div className=" border-end">
              <div>
                <img
                  src={doctorState?.hc_company_avatar}
                  alt="Profile"
                  style={{ height: "200px", width: "300px" }}
                ></img>
              </div>
              <div className=" mt-2">
                <h5 className={Styles.ProfileDescription}>
                  {doctorState?.hc_company_englishName}
                </h5>
              </div>
              <div className="row">
                <div className="col-5">
                  <p className={Styles.ProfileDescription}>Reg No</p>
                </div>
                <div className="col-7">
                  <p className={Styles.ProfileDescription}>
                    : {doctorState?.hc_company_reg_no}
                  </p>
                </div>

                <div className="col-5">
                  <p className={Styles.ProfileDescription}>Phone No</p>
                </div>
                <div className="col-7">
                  <p className={Styles.ProfileDescription}>
                    : {doctorState?.hc_company_phoneno}
                  </p>
                </div>

                <div className="col-5">
                  <p className={Styles.ProfileDescription}>Email</p>
                </div>
                <div className="col-7">
                  <p className={Styles.ProfileDescription}>
                    : {doctorState?.hc_company_email}
                  </p>
                </div>

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
                  Update Profile
                </button>
              </div>
              <hr />
            </div>
            <div className="ml-3">
              {/* <div className={Styles.searchDiv}>
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
                      onChange={(e) => {}}
                    />

                    <button type="submit" className={Styles.searchButton}>
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </div>
              </div> */}

              <div className="mt-3">
                <h2>ADD Medicine and price</h2>
                <form style={{ width: "80%" }} onSubmit={handleSubmit}>
                  <div className="first_section mt-5">
                    <div className="form-row">
                      <div className="col-md-3 mb-3">
                        <select
                          className="form-control dropdown-toggle"
                          aria-haspopup="true"
                          aria-expanded="false"
                          name="drugtype"
                          value={state.formData.drugtype}
                          onChange={onEdit}
                          required
                        >
                          <option hidden>Drug Type</option>
                          {drugType?.map((item) => (
                            <option key={item._id} value={item.hc_drug_type}>
                              {item.hc_drug_type}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6 mb-3">
                        {/* <label htmlFor="banglaname">Drug Name</label> */}
                        <input
                          name="drugName"
                          type="text"
                          className="form-control"
                          id="drugName"
                          value={state.formData.drugName}
                          placeholder="Drug Name"
                          onChange={onEdit}
                          required
                        />
                      </div>
                      <div className="col-md-3 mb-3">
                        <input
                          name="price"
                          type="Number"
                          className="form-control"
                          id="price"
                          value={state.formData.price}
                          placeholder="Drug Price"
                          onChange={onEdit}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="col-md-12 mb-3">
                        {/* <label htmlFor="banglaname">Drug Description</label> */}
                        <textarea
                          name="description"
                          type="text-area"
                          className="form-control"
                          id="description"
                          value={state.formData.description}
                          placeholder="Drug description"
                          onChange={onEdit}
                          rows="8"
                          required
                        />
                      </div>
                    </div>
                    <button className="btn btn-success" type="submit">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CompanyProfile;
