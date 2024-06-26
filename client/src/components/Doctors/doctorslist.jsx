import React, { useState, useEffect } from "react";
import "./doctorslist.css";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import FormPrompt from "../DailogBoxes/formprompt";
import AlertDialogBox from "../DailogBoxes/alertdailogbox";
import ConfirmDialogBox from "../DailogBoxes/confirmdailogbox";
import ErorrDialogBox from "../DailogBoxes/errordaologbox";
import AddDoctorDetails from "../PersonDetails/AddDoctorDetails";
import { hospitalDoctors } from "../../redux/reducers/hospital/hospitalAction";

const DoctorsList = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.AuthReducer);
  const hospital = useSelector((state) => state.hospitalReducer);
  const [openConfirmDailog, setopenConfirmDailog] = useState(false);
  const [state, setState] = useState({
    serachText: "",
    isLoading: true,
    limit: 10,

    isLoadMoredata: false,
    isCloseBtnAppear: true,
    isDeleting: false,

    totalNumOfDoctors: null,
    noMoredataText: "",

    openFormDailog: false,
    openAlertDailog: false,
    openErrorDailog: false,
    openConfirmDailog: false,

    doctorsList: [],
    isSearching: false,
    isSearchDataShow: false,

    selecteDoctorName: "",
    selectedDoctorId: "",
  });


  const getDoctors = () => {
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${auth.token}`,
    };
    Axios.get(`api/hospital/filterHospitalDoctors`, {
      headers,
    })
      .then((res) => {
        setState({
          ...state,
          isLoading: false,
        });
        dispatch(hospitalDoctors(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };


  useEffect(() => {
    getDoctors();
  }, []);

  const showMore = () => {
    if (state.limit <= state.totalNumOfDoctors) {
      const limit = state.limit + 10;
      console.log(state.totalNumOfDoctors);
      setState({
        ...state,
        limit: limit,
      });
      // onFetchData(limit);
    } else {
      setState({
        ...state,
        noMoredataText: "No More Doctors",
      });
    }
  };

  const handleOnDelete = (doctorsName, id) => {
    setState({
      ...state,
      selecteDoctorName: doctorsName,
      selectedDoctorId: id,
    });
    setopenConfirmDailog(true);
  };

  const deleteData = async () => {
    setopenConfirmDailog(false);
    setState({
      ...state,
      isDeleting: true,
    });
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${auth.token}`,
      doctorid: state.selectedDoctorId,
    };
    try {
      Axios.get(`api/hospital/deleteDoctorAC`, { headers })
        .then((res) => {
          if (res.status == "200") {
            getDoctors();
            // closeConfirmDailog()
            setState({
              ...state,
              isDeleting: false,
              selecteDoctorName: "",
              selectedDoctorId: "",
            });
          } else {
            setState({
              ...state,
              isDeleting: false,
            });
            handleErrorDailog();
          }
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

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
      // openConfirmDailog: false,
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
    window.location.reload(false);
  };
  const closeErrorDailog = () => {
    setState({
      ...state,
      openErrorDailog: false,
    });
  };
  const closeConfirmDailog = () => {
    setopenConfirmDailog(false);
  };
  const setCloseBtnAppear = () => {
    setState({
      ...state,
      isCloseBtnAppear: false,
    });
  };

  let count = 0;
  return state.isLoading ? (
    <div className="doctorsListpage">
      <i className="fas fa-spinner fa-pulse fa-2x "></i>
    </div>
  ) : (
    <div className="doctorsListpage">
      <div className="main_section">
        <ConfirmDialogBox
          openDailog={openConfirmDailog}
          onSetOpenDailog={closeConfirmDailog}
          handleConfirmOkBtn={deleteData}
          isLoading={state.isDeleting}
          title="Delete"
          des={
            "Are you sure to delete " +
            state.selecteDoctorName +
            " " +
            "details"
          }
        ></ConfirmDialogBox>
        <AlertDialogBox
          openDailog={state.openAlertDailog}
          onSetOpenDailog={closeAlertDailog}
          title="Added"
          des="New doctor has been added successfully"
        ></AlertDialogBox>
        <ErorrDialogBox
          openDailog={state.openErrorDailog}
          onSetOpenDailog={closeErrorDailog}
          title="Error"
          des="Someting went wrong. Try again"
        ></ErorrDialogBox>

        <FormPrompt
          openDailog={state.openFormDailog}
          title="Add New Doctor"
          onSetOpenDailog={closeFormDailog}
          isCloseBtnAppear={state.isCloseBtnAppear}
        >
          <AddDoctorDetails
            openDailog={state.openFormDailog}
            setCloseBtnAppear={setCloseBtnAppear}
            handleSuccessDailog={handleSuccessDailog}
            handleErrorDailog={handleErrorDailog}
            onSetOpenDailog={closeFormDailog}
            collectionName="doctors"
            id="doctorid"
          ></AddDoctorDetails>
        </FormPrompt>
        <div className="topheader">
          <ul>
            <li>
              <i
                className="fa fa-arrow-circle-o-right fa-2x"
                aria-hidden="true"
              ></i>
            </li>
            <li>
              <h5>Doctors</h5>
            </li>
          </ul>
        </div>
        <hr />
        <div className="top_section">
          <div className="wrap">
            <ul>
              <li>
                <div className="search">
                  <input
                    type="text"
                    className="searchTerm"
                    placeholder="Search doctor by full name"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        // handleSeach();
                      }
                    }}
                    onChange={(e) => {
                      setState({
                        ...state,
                        serachText: e.target.value,
                      });
                    }}
                  />

                  <button
                    // onClick={handleSeach}
                    type="submit"
                    className="searchButton"
                  >
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </li>
              <li style={{ fontSize: "14px" }}> #</li>
              <li tyle={{ fontSize: "14px" }}>{hospital.doctors?.length} </li>
            </ul>
          </div>

          <button
            type="button"
            className="btn btn-warning"
            onClick={() => {
              setState({
                ...state,
                openFormDailog: true,
              });
            }}
          >
            + Add doctors
          </button>
        </div>
        <table className="table  table-striped">
          <thead className="thead  tablehead">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Profile</th>
              <th scope="col">Name</th>
              <th scope="col">Sex</th>
              <th scope="col">Age</th>
              <th scope="col">Education</th>
              <th scope="col">Mobile</th>
              <th scope="col">Home district</th>
              <th scope="col">Date of birth</th>
              <th scope="col">Option</th>
            </tr>
          </thead>
          {state.isSearching ? (
            <i className="fas fa-spinner fa-pulse fa-2x "></i>
          ) : hospital?.doctors?.length === 0 ? (
            <tbody>
              <tr>
                <td>No Doctors Found</td>
              </tr>
            </tbody>
          ) : (
            <tbody className="tablebody">
              {hospital?.doctors &&
                hospital?.doctors?.map((p) => {
                  count++;
                  const diff =
                    Date.now() - new Date(p.hc_doctor_date_of_birth).getTime();
                  const age = new Date(diff).getUTCFullYear() - 1970;
                  const education = p.hc_doctor_education
                    ?.filter((i) => i.degree != "BCS")
                    .map(
                      (item, index) => item.degree + " (" + item.title + ")"
                    );
                  return (
                    <tr key={p._id}>
                      <td data-label="No" className="align-middle">
                        {count}
                      </td>
                      <td data-label="Image" className="align-middle">
                        {p.hc_doctor_avatar === "" ? (
                          <div className="userbg">
                            <i className="fa fa-user fa-2x"></i>
                          </div>
                        ) : (
                          <img
                            className="image"
                            alt=""
                            srcSet={p.hc_doctor_avatar}
                          />
                        )}
                      </td>
                      <td data-label="Name" className="align-middle">
                        {p.hc_doctor_englishName}
                      </td>
                      <td data-label="Gender" className="align-middle">
                        {p.hc_doctor_sex}
                      </td>
                      <td data-label="Age" className="align-middle">
                        {p.age === "" ? "N/A" : p.age} {age}
                      </td>
                      <td data-label="Specialist" className="align-middle">
                        {education?.map(
                          (item, index) =>
                            `${item} ${
                              index + 1 < education.length ? ", " : " "
                            }`
                        )}
                      </td>
                      <td data-label="Phone No" className="align-middle">
                        {" "}
                        {p.hc_doctor_phoneno === ""
                          ? "N/A"
                          : p.hc_doctor_phoneno}
                      </td>
                      <td data-label="Home district" className="align-middle">
                        {p.hc_doctor_address?.district === ""
                          ? "N/A"
                          : p.hc_doctor_address?.district}
                      </td>
                      <td data-label="Birth Date" className="align-middle">
                        {p.hc_doctor_date_of_birth}
                      </td>
                      <td data-label="Option" className="align-middle">
                        {/* <Link to="/editpersondetails">
                          <button
                            onClick={async () => {
                              const sendData = {
                                ...p,
                                collectionName: "doctors",
                                personId: p.doctorid,
                              };

                              // props.setOPersonDetails(sendData);
                            }}
                            type="button"
                            className="btn btn-success"
                          >
                            <i className="fa fa-edit" aria-hidden="true"></i>
                          </button>
                        </Link> */}
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => {
                            handleOnDelete(p.hc_doctor_englishName, p._id);
                          }}
                        >
                          <i className="fa fa-trash" aria-hidden="true"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          )}
        </table>

        <div className="loadmoredatasection">
          {state.isLoadMoredata ? (
            <i className="fas fa-spinner fa-pulse fa-2x loadmoredataspinner"></i>
          ) : (
            <div className="nomoredatatext">{state.noMoredataText}</div>
          )}
          {state.doctorsList?.length ===
          0 ? null : state.isSearchDataShow ? null : (
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => showMore()}
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorsList;
