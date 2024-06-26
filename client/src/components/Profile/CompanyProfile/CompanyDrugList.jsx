import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const CompanyDrugList = () => {
    const history = useHistory();
    const auth = useSelector((state) => state.AuthReducer);
    const [state, setstate] = useState({
        isLoading: true,
        drugList: []
    });
    const headers = {
        "Content-Type": "application/json",
        authorization: `Bearer ${auth.token}`,
    };
    useEffect(() => {
        Axios.get(`../api/company/company_medicines`, { headers })
            .then(res => {
                setstate({
                    isLoading: false,
                    drugList: res.data
                })
            })
            .catch(err => console.log(err))
    }, []);
    return (
        <>
            <div className="topheader">
                <ul className='d-flex'>
                    <li>
                        <i
                            className="fa fa-arrow-circle-o-right fa-2x mt-2"
                            aria-hidden="true"
                        ></i>
                    </li>
                    <li>
                        <h5> &nbsp;&nbsp;Drug List</h5>
                    </li>
                </ul>
            </div>
            <hr />
            <table className="table table-striped">
                <thead className="thead tablehead">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Drug Name</th>
                        {auth.role === 'Patient' ? <th scope="col">Company</th> : <></>}
                        <th scope="col">Description</th>
                        <th scope="col">Price per Unit</th>
                        <th scope="col">Edit</th>
                    </tr>
                </thead>
                {
                    state.isLoading ? <i className="fas fa-spinner fa-pulse fa-2x "></i> : state.drugList.length === 0 ? (
                        <tbody>
                            <tr >
                                <td>No Drug Found</td>
                            </tr>
                        </tbody>
                    ) : (
                        <tbody>
                            {
                                state.drugList &&
                                state.drugList.map((item, index) => {
                                    return (<>
                                        {
                                            auth.role === 'Patient' ?
                                                <tr key={index}>
                                                    <td width='3%' data-label="No" className="align-middle">{index + 1}</td>
                                                    <td width='11%' data-label="Drug Name" className="text-left">{item.drugName}</td>
                                                    <td width='11%' data-label="Company" className="text-left">{item.companyID.hc_company_englishName}</td>
                                                    <td width='65%' data-label="Description" className="text-justify">{item.description}</td>
                                                    <td width='10%' data-label="Price" className="text-center">{item.price}</td>
                                                </tr> : <></>
                                        }
                                        {
                                            auth.role === 'Company' ?
                                                <tr key={index}>
                                                    <td width='5%' data-label="No" className="align-middle">{index + 1}</td>
                                                    <td width='20%' data-label="Drug Name" className="text-left">{item.drugName}</td>
                                                    <td width='65%' data-label="Description" className="text-justify">{item.description}</td>
                                                    <td width='10%' data-label="Price" className="text-center">{item.price}</td>
                                                    <td width='10%'
                                                        data-label="Edit"
                                                        className="text-center"
                                                        onClick={()=> history.push(`/editDrug/${item._id}`)}

                                                    ><i className="fa fa-edit"></i></td>
                                                </tr> : <></>
                                        }
                                    </>

                                    )
                                })
                            }
                        </tbody>
                    )
                }
            </table>

        </>
    )
}

export default CompanyDrugList