import React, { useState } from 'react';
import './Home.css';
import { Tabs, Tab } from '@material-ui/core';
import DoctorList from '../doctorList/DoctorList';
import Appointment from '../appointment/Appointment';

const Home = ({ isLoggedIn }) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <Tabs value={value} onChange={handleChange} variant="fullWidth" indicatorColor="primary" textColor="primary">
                <Tab label="Doctors" />
                <Tab label="Appointment" />
            </Tabs>

            <div className="tab-content">
                {value === 0 && <DoctorList />}
                {value === 1 && <Appointment isLoggedIn={isLoggedIn} />}
            </div>
        </div>
    );
};

export default Home;
