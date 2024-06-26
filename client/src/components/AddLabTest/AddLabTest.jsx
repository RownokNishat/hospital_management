import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Axios from "axios";
import "./AddLabTest.css";

const AddLabTest = () => {
  const [PDF, setPdfFile] = useState(null);
  const [testName, setTestName] = useState("");
  const auth = useSelector((state) => state.AuthReducer);
  const { id } = useParams();
  const [state, setState] = useState({ isLoading: false, response: false });

  const handleSubmit = (e) => {
    e.preventDefault();

    setState({
      ...state,
      isLoading: true,
    });

    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${auth.token}`,
      patientid: id,
      testname: testName
    };

    const file = new FormData();
    file.append("pdf", PDF);
    if (file) {
      try {
        Axios.post(`../../api/file/testReportUpload`, file, { headers })
          .then((res) => {
            setTestName("")
            setState({
              ...state,
              isLoading: false,
              response: true,
              webViewLink: res.data.webViewLink,
              webContentLink: res.data.webContentLink,
            });
          })
      } catch (error) {
        setState({
          ...state,
          isLoading: false,
        });
        alert("Failed to add Diagnosis Test Report. Please Try Again!!!");
      }
    } else {
      setState({
        ...state,
        isLoading: false,
      });
      alert("Failed to add Diagnosis Test Report. Please Try Again!!!");

    }
  };

  return state.isLoading ? (
    <div className="doctorsListpage">
      <i className="fas fa-spinner fa-pulse fa-2x "></i>
    </div>
  ) : (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="testName">Diagnosis Test Name</label>
        <input
          type='text'
          id="testName"
          className="form-control mb-3"
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
        />
        <input
          type='file'
          className="form-control mb-3"
          onChange={(e) => setPdfFile(e.target.files[0])}
        />
        <button type='submit' className='btn btn-success'>Upload Report</button>
      </form>
      <br />
      {
        state.response ? <>
          <button
            type='submit'
            className='btn btn-warning mr-3'
            onClick={() => window.open(state.webViewLink)}
          >View</button>
          <button
            type='submit'
            className='btn btn-warning'
            onClick={() => window.open(state.webContentLink)}
          >Download</button>
        </> : <></>
      }

    </div>
  );
};

export default AddLabTest;
