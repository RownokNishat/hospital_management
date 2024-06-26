import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Axios from "axios";


const StudentPrescriptionFromDoctor = () => {
    const [skip, setskip] = useState(0);
    const history = useHistory()
    const auth = useSelector((state) => state.AuthReducer);
    const [state, setState] = useState({
        serachText: "",
        isLoading: false,
        limit: 10,

        isLoadMoredata: false,
        isCloseBtnAppear: true,
        isDeleting: false,

        totalNumOfPatient: null,
        noMoreDataText: "",

        openFormDailog: false,
        openAlertDailog: false,
        openErrorDailog: false,
        openConfirmDailog: false,

        prescriptionlist: [],
        isSearching: false,
        isSearchDataShow: false,

        selectedPatientName: "",
        selectedPatientId: "",
    });

    const previousPatient = () => {
        setState({
            ...state,
            isLoadMoredata: true,
            noMoreDataText: "",
        });
        setskip(skip - 50);
    }
    const showMore = () => {
        if (state.patientlist.length == 50) {
            setskip(skip + 50);
            setState({ ...state, isLoadMoredata: true });
        } else {
            setState({
                ...state,
                noMoreDataText: "No More Patients",
            });
        }
    }

    const getPatient = () => {
        const headers = {
            "Content-Type": "application/json",
            authorization: `Bearer ${auth.token}`,
            skip: skip,
        };
        try {
            Axios.get(`api/student/patientPrescriptionForStudent`, { headers })
                .then((res) => {
                    setState({
                      ...state,
                      prescriptionlist: res.data.reverse(),
                      isLoadMoredata: false,
                    });
                })
                .catch((error) => console.log(error));
        } catch (error) {
            console.log("error");
        }
    };

    useEffect(() => {
        getPatient();
    }, [skip]);

    return (<>
        <div className="topheader">
            <ul className ='d-flex'>
                <li>
                    <i
                        className="fa fa-arrow-circle-o-right fa-2x mt-2"
                        aria-hidden="true"
                    ></i>
                </li>
                <li>
                    <h5> &nbsp;&nbsp;Doctor's Prescription</h5>
                </li>
            </ul>
        </div>
        <hr />
        <div className="top_section">
            <div className="wrap">
                {/* <ul>
                    <li>
                        <div className="search">
                            <input
                                type="text"
                                className="searchTerm"
                                placeholder="Search patient by full name"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSeach();
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
                                onClick={handleSeach}
                                type="submit"
                                className="searchButton"
                            >
                                <i className="fa fa-search"></i>
                            </button>
                        </div>
                    </li>
                    <li style={{ fontSize: "12px" }}> #</li>
                    <li tyle={{ fontSize: "12px" }}>{state.prescriptionlist.length} </li>
                </ul> */}
            </div>
        </div>
        <table className="table table-striped">
            <thead className="thead tablehead">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Diagnosis</th>
                    <th scope="col">Prescription</th>
                </tr>
            </thead>
            {state.isSearching ? (
                <i className="fas fa-spinner fa-pulse fa-2x "></i>
            ) : state.prescriptionlist.length === 0 ? (
                <tbody>
                    <tr>
                        <td>No Patient Found</td>
                    </tr>
                </tbody>
            ) : (
                <tbody className="tablebody">
                    {
                        state.prescriptionlist &&
                        state.prescriptionlist.map((item, index) => {
                            console.log(item);
                            return (
                                <tr key={index}>
                                    <td data-label="No" className="align-middle">{index + 1}</td>
                                    
                                    <td data-label="Diagnosis" >
                                        <div className="align-middle d-flex">
                                            {
                                                item.Diagnosis.map((diagnosis, index, arr) => <>
                                                    <p key={diagnosis._id}>{diagnosis.diagonosis}</p>
                                                    {arr.length > index + 1 ? ", " : ""}
                                                </>)
                                            }
                                        </div>

                                    </td>
                                    <td
                                        data-label="Prescription Link"
                                        className="align-middle"
                                    >
                                        <Link
                                            style={{ textDecoration: "none" }}
                                            to={`/patientPrescription/${item._id}`}
                                        >
                                            <b>Prescription</b>
                                        </Link>
                                    </td>
                                </tr>)
                        })
                    }

                </tbody>
            )}
        </table>

        <div className="loadmoredatasection">
            {state.isLoadMoredata ? (
                <i className="fas fa-spinner fa-pulse fa-2x loadmoredataspinner"></i>
            ) : (
                <div className="nomoredatatext">{state.noMoreDataText}</div>
            )}
            {state.prescriptionlist.length ===
                0 ? null : state.isSearchDataShow ? null : (
                    <>
                        <button
                            type="button"
                            disabled={skip == 0 ? true : false}
                            className="btn btn-warning"
                            onClick={() => previousPatient()}
                        >
                            Previous
                        </button>
                        <button
                            type="button"
                            disabled={state.prescriptionlist.length == 10 ? false : true}
                            className="btn btn-warning justify-content-end"
                            onClick={() => showMore()}
                        >
                            Next
                        </button>
                    </>
                )}
        </div>
    </>)
}

export default StudentPrescriptionFromDoctor;