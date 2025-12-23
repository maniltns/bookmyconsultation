import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import Modal from 'react-modal';
import BookAppointment from './BookAppointment';
import DoctorDetails from './DoctorDetails';

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

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [specialties, setSpecialties] = useState([]);
    const [selectedSpecialty, setSelectedSpecialty] = useState("");

    // Modal State
    const [detailsModalOpen, setDetailsModalOpen] = useState(false);
    const [bookModalOpen, setBookModalOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    useEffect(() => {
        // Fetch Specialties
        fetch('/doctors/speciality')
            .then(res => res.json())
            .then(data => setSpecialties(data))
            .catch(err => console.log(err));

        // Fetch Doctors
        fetch('/doctors')
            .then(res => res.json())
            .then(data => setDoctors(data))
            .catch(err => console.log(err));
    }, []);

    const handleSpecialtyChange = (event) => {
        const specialty = event.target.value;
        setSelectedSpecialty(specialty);
        // Filter logic
        const url = specialty === "" ? '/doctors' : `/doctors?speciality=${specialty}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setDoctors(data))
            .catch(err => console.log(err));
    };

    const handleViewDetails = (doctor) => {
        setSelectedDoctor(doctor);
        setDetailsModalOpen(true);
    };

    const handleBookAppointment = (doctor) => {
        setSelectedDoctor(doctor);
        setBookModalOpen(true);
    };

    const closeDetailsModal = () => {
        setDetailsModalOpen(false);
        setSelectedDoctor(null);
    };

    const closeBookModal = () => {
        setBookModalOpen(false);
        setSelectedDoctor(null);
    };

    return (
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ marginBottom: '20px' }}>
                <FormControl style={{ minWidth: 200 }}>
                    <InputLabel id="specialty-label">Select Speciality</InputLabel>
                    <Select
                        labelId="specialty-label"
                        value={selectedSpecialty}
                        onChange={handleSpecialtyChange}
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        {specialties.map((spec, index) => (
                            <MenuItem key={index} value={spec}>{spec}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

            {doctors.map(doctor => (
                <Paper key={doctor.id} style={{ width: '40%', margin: '15px', padding: '20px', textAlign: 'left', cursor: 'pointer' }} elevation={3}>
                    <Typography variant="h6">Doctor Name: {doctor.firstName} {doctor.lastName}</Typography>
                    <Typography>Speciality: {doctor.speciality}</Typography>
                    <Typography>Rating: {doctor.rating}</Typography>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                        <Button variant="contained" color="primary" style={{ width: '40%', margin: '10px' }} onClick={() => handleBookAppointment(doctor)}>
                            BOOK APPOINTMENT
                        </Button>
                        <Button variant="contained" style={{ backgroundColor: 'green', color: 'white', width: '40%', margin: '10px' }} onClick={() => handleViewDetails(doctor)}>
                            VIEW DETAILS
                        </Button>
                    </div>
                </Paper>
            ))}

            <Modal
                isOpen={detailsModalOpen}
                onRequestClose={closeDetailsModal}
                style={customStyles}
                contentLabel="Doctor Details"
            >
                {selectedDoctor && <DoctorDetails doctor={selectedDoctor} />}
            </Modal>

            <Modal
                isOpen={bookModalOpen}
                onRequestClose={closeBookModal}
                style={customStyles}
                contentLabel="Book Appointment"
            >
                {selectedDoctor && (
                    <BookAppointment
                        doctorName={`${selectedDoctor.firstName} ${selectedDoctor.lastName}`}
                        doctorId={selectedDoctor.id}
                        closeModal={closeBookModal}
                    />
                )}
            </Modal>
        </div>
    );
};

export default DoctorList;
