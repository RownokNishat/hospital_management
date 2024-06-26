import React from 'react';
import Doctors from '../PatientDashboard/Doctors/Doctors';
import Hospitals from './Hospitals/Hospitals';
import SearchDoctors from './SearchDoctors/SearchDoctors';

const PatientDashBoard = () => {
    return (
        <div>
            <Doctors></Doctors>
            <Hospitals></Hospitals>
        </div>
    );
};

export default PatientDashBoard;