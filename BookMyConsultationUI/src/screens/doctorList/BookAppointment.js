import React, { useState } from 'react';
import { Button, Card, CardHeader, CardContent, Typography, TextField, Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

const BookAppointment = ({ doctorName, doctorId, closeModal }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState("");
    const [medicalHistory, setMedicalHistory] = useState("");
    const [symptoms, setSymptoms] = useState("");

    const [reqTime, setReqTime] = useState("dispNone");
    const [bookingError, setBookingError] = useState("");

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
        setReqTime("dispNone");
    };

    const bookAppointmentHandler = async () => {
        if (selectedTime === "") {
            setReqTime("dispBlock");
            return;
        }

        const userUuid = sessionStorage.getItem("uuid");
        // We probably need user email/details too, but let's assume UUID is enough or we fetch user details first.
        // For now, construct payload.

        const payload = {
            doctorId: doctorId,
            doctorName: doctorName,
            userId: userUuid,
            appointmentDate: selectedDate.toISOString().split('T')[0], // yyyy-mm-dd
            timeSlot: selectedTime,
            createdDate: new Date().toISOString().split('T')[0],
            symptoms: symptoms,
            priorMedicalHistory: medicalHistory
        };

        try {
            const response = await fetch('/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('access-token')
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                // Success
                closeModal();
            } else {
                // Error - "Either the slot is already booked or not available"
                alert("Either the slot is already booked or not available");
            }
        } catch (e) {
            setBookingError("Something went wrong");
        }
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Card>
                <CardHeader title="Book an Appointment" style={{ backgroundColor: 'purple', color: 'white', height: '70px', padding: '11px' }} />
                <CardContent>
                    <TextField
                        label="Doctor Name"
                        value={doctorName}
                        disabled
                        fullWidth
                        margin="normal"
                    />
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Date"
                        format="MM/dd/yyyy"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        fullWidth
                        minDate={new Date()}
                    />
                    <FormControl fullWidth margin="normal" error={reqTime === "dispBlock"}>
                        <InputLabel id="time-slot-label">Time Slot</InputLabel>
                        <Select
                            labelId="time-slot-label"
                            id="time-slot"
                            value={selectedTime}
                            onChange={handleTimeChange}
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value={"10:00-11:00"}>10:00 AM - 11:00 AM</MenuItem>
                            <MenuItem value={"11:00-12:00"}>11:00 AM - 12:00 PM</MenuItem>
                            <MenuItem value={"12:00-01:00"}>12:00 PM - 01:00 PM</MenuItem>
                            <MenuItem value={"02:00-03:00"}>02:00 PM - 03:00 PM</MenuItem>
                            <MenuItem value={"03:00-04:00"}>03:00 PM - 04:00 PM</MenuItem>
                            <MenuItem value={"04:00-05:00"}>04:00 PM - 05:00 PM</MenuItem>
                        </Select>
                        <FormHelperText className={reqTime}><span className="red">Select a time slot</span></FormHelperText>
                    </FormControl>
                    <TextField
                        label="Medical History"
                        fullWidth
                        margin="normal"
                        value={medicalHistory}
                        onChange={(e) => setMedicalHistory(e.target.value)}
                    />
                    <TextField
                        label="Symptoms"
                        fullWidth
                        margin="normal"
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                    />
                    {bookingError && <Typography color="error">{bookingError}</Typography>}
                    <br />
                    <Button variant="contained" color="primary" onClick={bookAppointmentHandler} style={{ marginTop: '20px' }}>
                        BOOK APPOINTMENT
                    </Button>
                </CardContent>
            </Card>
        </MuiPickersUtilsProvider>
    );
};

export default BookAppointment;
