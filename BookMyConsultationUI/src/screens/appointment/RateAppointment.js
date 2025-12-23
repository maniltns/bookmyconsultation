import React, { useState } from 'react';
import { Card, CardHeader, CardContent, Button, TextField, Typography, FormControl, FormHelperText } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

const RateAppointment = ({ appointmentId, doctorId, closeModal }) => {
    const [comments, setComments] = useState("");
    const [rating, setRating] = useState(0);
    const [ratingError, setRatingError] = useState("dispNone");
    const [submissionError, setSubmissionError] = useState("");

    const handleRate = async () => {
        if (rating === 0) {
            setRatingError("dispBlock");
            return;
        }

        const payload = {
            appointmentId: appointmentId,
            doctorId: doctorId,
            rating: rating,
            comments: comments
        };

        try {
            const response = await fetch('/ratings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('access-token')
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                closeModal();
            } else {
                setSubmissionError("Failed to submit rating");
            }
        } catch (e) {
            setSubmissionError("Something went wrong");
        }
    };

    return (
        <Card>
            <CardHeader title="Rate an Appointment" style={{ backgroundColor: 'purple', color: 'white', height: '70px', padding: '11px' }} />
            <CardContent>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Comments"
                        multiline
                        rows={4}
                        variant="outlined"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                    />
                </FormControl>

                <div style={{ marginTop: '20px', marginBottom: '10px' }}>
                    <Typography component="legend">Rating</Typography>
                    <Rating
                        name="simple-controlled"
                        value={rating}
                        onChange={(event, newValue) => {
                            setRating(newValue);
                            setRatingError("dispNone");
                        }}
                    />
                </div>
                <FormHelperText className={ratingError}><span className="red">Submit a rating</span></FormHelperText>

                {submissionError && <Typography color="error">{submissionError}</Typography>}

                <Button variant="contained" color="primary" onClick={handleRate} style={{ marginTop: '20px' }}>
                    RATE APPOINTMENT
                </Button>
            </CardContent>
        </Card>
    );
};

export default RateAppointment;
