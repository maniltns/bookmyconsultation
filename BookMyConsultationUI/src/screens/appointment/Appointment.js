import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button } from '@material-ui/core';
import Modal from 'react-modal';
import RateAppointment from './RateAppointment';

Modal.setAppElement('#root');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: 0,
        backgroundColor: 'transparent',
        border: 'none',
        width: '40%'
    }
};

const Appointment = ({ isLoggedIn }) => {
    const [appointments, setAppointments] = useState([]);
    const [rateModalOpen, setRateModalOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    useEffect(() => {
        if (isLoggedIn) {
            const userUuid = sessionStorage.getItem("uuid");
            if (userUuid) {
                fetch(`/users/${userUuid}/appointments`, {
                    headers: {
                        'Authorization': 'Bearer ' + sessionStorage.getItem('access-token')
                    }
                })
                    .then(res => res.json())
                    .then(data => setAppointments(data))
                    .catch(err => console.log(err));
            }
        }
    }, [isLoggedIn]);

    const handleRateAppointment = (appt) => {
        setSelectedAppointment(appt);
        setRateModalOpen(true);
    };

    const closeRateModal = () => {
        setRateModalOpen(false);
        setSelectedAppointment(null);
    };

    if (!isLoggedIn) {
        return (
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <Typography variant="h6">Login to see appointments</Typography>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {appointments.length === 0 ? (
                <Typography variant="h6">No appointments found</Typography>
            ) : (
                appointments.map(appt => (
                    <Paper key={appt.appointmentId} style={{ width: '40%', margin: '15px', padding: '20px', textAlign: 'left', cursor: 'pointer' }} elevation={3}>
                        <Typography variant="h6">Dr: {appt.doctorName}</Typography>
                        <Typography>Date: {appt.appointmentDate}</Typography>
                        <Typography>Symptoms: {appt.symptoms || "N/A"}</Typography>
                        <Typography>medicalHistory: {appt.priorMedicalHistory || "N/A"}</Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ marginTop: '15px' }}
                            onClick={() => handleRateAppointment(appt)}
                        >
                            RATE APPOINTMENT
                        </Button>
                    </Paper>
                ))
            )}

            <Modal
                isOpen={rateModalOpen}
                onRequestClose={closeRateModal}
                style={customStyles}
                contentLabel="Rate Appointment"
            >
                {selectedAppointment && (
                    <RateAppointment
                        appointmentId={selectedAppointment.appointmentId}
                        doctorId={selectedAppointment.doctorId}
                        closeModal={closeRateModal}
                    />
                )}
            </Modal>
        </div>
    );
};

export default Appointment;
