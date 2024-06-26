import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from 'axios'
import { useSelector, useDispatch } from "react-redux";
import { drugTypes } from '../../../redux/reducers/Prescription/prescriptionAction'

const EditDrug = () => {
    const { drugId } = useParams();
    const drugType = useSelector(state => state.prescriptionData.drugType)
    const auth = useSelector((state) => state.AuthReducer);
    const dispatch = useDispatch()
    const [isLoading, setisLoading] = useState(false);
    const [isEdited, setisEdited] = useState(false);
    const [drugData, setdrugData] = useState({});

    const headers = {
        "Content-Type": "application/json",
        authorization: `Bearer ${auth.token}`,
        drugid:drugId
    };

    const getDrugType = () => {
        const url1 = `../../api/prescription/drug_type`
        Axios.get(url1)
            .then(res => {
                dispatch(drugTypes(res.data))
            })
            .catch(err => {
                console.log(err)
            })
    }
    const getDrugData = () => {
        const url1 = `../../api/company/getDrugData`
        Axios.get(url1, { headers })
            .then(res => {
                setdrugData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getDrugType()
        getDrugData()
    }, []);

    const onEdit = (e) => {
        setisEdited(true)
        const {name, value} = e.target
        setdrugData({
            ...drugData,
            [name]:value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const url1 = `../../api/company/updateDrugData`
        Axios.post(url1, drugData,{ headers })
            .then(res => {
                console.log(res.data);
                alert('Update Successfull!!!')
            })
            .catch(err => {
                alert('please Try Again')
            })
    }

    return (
        <>
            <form style={{ width: "80%" }} onSubmit={handleSubmit}>
                <div className="first_section mt-5">
                    <div className="form-row">
                        <div className="col-md-3 mb-3">
                    <label htmlFor="banglaname">Drug Type</label>
                            <select
                                className="form-control dropdown-toggle"
                                aria-haspopup="true"
                                aria-expanded="false"
                                name="drugtype"
                                value={drugData.drugtype}
                                onChange={onEdit}
                                required
                            >
                                <option hidden>Drug Type</option>
                                {
                                    drugType?.map((item) =>
                                        <option key={item._id} value={item.hc_drug_type}>{item.hc_drug_type}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div className="col-md-6 mb-3">
                        <label htmlFor="banglaname">Drug Name</label>
                            <input
                                name="drugName"
                                type="text"
                                className="form-control"
                                id="drugName"
                                value={drugData.drugName}
                                placeholder="Drug Name"
                                onChange={onEdit}
                                required
                            />
                        </div>
                        <div className="col-md-3 mb-3">
                        <label htmlFor="banglaname">Price</label>
                            <input
                                name="price"
                                type="Number"
                                className="form-control"
                                id="price"
                                value={drugData.price}
                                placeholder='Drug Price'
                                onChange={onEdit}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-12 mb-3">
                            <label htmlFor="banglaname">Drug Description</label>
                            <textarea
                                name="description"
                                type="text-area"
                                className="form-control"
                                id="description"
                                value={drugData.description}
                                placeholder='Drug description'
                                onChange={onEdit}
                                rows="8"
                                required
                            />
                        </div>
                    </div>
                    <button className="btn btn-success" type="submit" disabled={!isEdited}>
                        Update
                    </button>
                </div>
            </form>
        </>
    )
}

export default EditDrug;