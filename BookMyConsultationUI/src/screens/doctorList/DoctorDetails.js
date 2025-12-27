import React from 'react';
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

const DoctorDetails = ({ doctor }) => {
    return (
        <Card>
            <CardHeader title="Doctor Details" style={{ backgroundColor: 'purple', color: 'white', height: '70px', padding: '11px' }} />
            <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                    Dr: {doctor.firstName} {doctor.lastName}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    Total Experience: {doctor.totalYearsOfExp} years
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    Speciality: {doctor.speciality}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    Date of Birth: {doctor.dob}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    City: {doctor.address ? doctor.address.city : "N/A"}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    Email: {doctor.emailId}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    Mobile: {doctor.mobile}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    Rating: <Rating name="read-only" value={doctor.rating} readOnly />
                </Typography>
            </CardContent>
        </Card>
    );
};

export default DoctorDetails;
