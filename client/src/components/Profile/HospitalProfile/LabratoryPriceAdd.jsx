import React, { useState } from "react";
import Axios from 'axios'
import { useSelector } from 'react-redux'

const LabratoryPriceAdd = (props) => {
  const auth = useSelector(state => state.AuthReducer)
  const headers = {
    "Content-Type": "application/json",
    authorization: `Bearer ${auth.token}`,
  };
  const [state, setState] = useState({
    formData: {
      diagnosis_name: '',
      diagnosis_price: ''
    }
  })

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

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post('/api/hospital/hospitalDiagnosis', state.formData, {headers})
      .then(res=>{
        window.location.reload()
      })
      .catch(error=>console.log(error))
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="first_section">
          <input
            name="diagnosis_name"
            type="text"
            className="form-control form-control-lg mb-2"
            id="labTestName"
            placeholder="Lab Test Name"
            onChange={(e) => onEdit(e)}
            required
          />
          <input
            type="number"
            name="diagnosis_price"
            className="form-control form-control form-control-lg mb-2"
            id="labTestPrice"
            placeholder="Lab Test Price"
            onChange={(e) => onEdit(e)}
          />

        </div>

        <button type="submit" className="btn btn-info mt-2 ">
          Save
        </button>
      </form>
    </div>
  );
};

export default LabratoryPriceAdd;
