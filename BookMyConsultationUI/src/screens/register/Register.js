import React, { useState } from 'react';
import { Button, FormControl, InputLabel, Input, FormHelperText, Typography } from '@material-ui/core';

const Register = ({ loginHandler }) => { // Assuming we might want to auto-login or switch tab
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [contact, setContact] = useState("");

    const [reqFirstName, setReqFirstName] = useState("dispNone");
    const [reqLastName, setReqLastName] = useState("dispNone");
    const [reqEmail, setReqEmail] = useState("dispNone");
    const [reqPassword, setReqPassword] = useState("dispNone");
    const [reqContact, setReqContact] = useState("dispNone");

    const [invalidEmail, setInvalidEmail] = useState("dispNone");
    const [invalidContact, setInvalidContact] = useState("dispNone");

    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [registrationError, setRegistrationError] = useState("");

    const registerHandler = async () => {
        let valid = true;
        setReqFirstName("dispNone");
        setReqLastName("dispNone");
        setReqEmail("dispNone");
        setReqPassword("dispNone");
        setReqContact("dispNone");
        setInvalidEmail("dispNone");
        setInvalidContact("dispNone");

        if (firstName === "") { setReqFirstName("dispBlock"); valid = false; }
        if (lastName === "") { setReqLastName("dispBlock"); valid = false; }
        if (password === "") { setReqPassword("dispBlock"); valid = false; }

        if (email === "") {
            setReqEmail("dispBlock");
            valid = false;
        } else {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!re.test(String(email).toLowerCase())) {
                setInvalidEmail("dispBlock");
                valid = false;
            }
        }

        if (contact === "") {
            setReqContact("dispBlock");
            valid = false;
        } else {
            const re = /^\d{10}$/; // Simple 10 digit check
            if (!re.test(String(contact))) {
                setInvalidContact("dispBlock");
                valid = false;
            }
        }

        if (valid) {
            const userParams = {
                firstName: firstName,
                lastName: lastName,
                emailId: email,
                password: password,
                mobile: contact
            };

            try {
                const rawResponse = await fetch('/users/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Accept': "application/json;charset=UTF-8"
                    },
                    body: JSON.stringify(userParams)
                });

                if (rawResponse.ok) {
                    setRegistrationSuccess(true);
                    // Requirements say: "The application should display the message ‘Registration Successful’ and log the user in."
                    // So we call login logic via parent if available, but technically we need to login via API to get token?
                    // Or just switch state. The instruction says "log the user in".
                    // Usually registration doesn't return a token, so we might need to Auto Login.
                    // For now, I'll assume we simulate login or just show the message and user closes/logs in.
                    // "Display the message 'Registration Successful' and log the user in."
                    // I will attempt to perform a login call or just call loginHandler if passed.
                    // Given the Login component handles the actual auth token retrieval, I might just show success. 
                    // But strictly following text: "log the user in."
                    // I'll call loginHandler(). Ideally I should background login or just set loggedIn=true.

                    // Perform background login to get token? Or just user sets state?
                    // I'll try to do the login call:
                    const loginResponse = await fetch('/auth/login', {
                        method: 'POST',
                        headers: {
                            'Authorization': 'Basic ' + window.btoa(email + ":" + password),
                            'Content-Type': 'application/json;charset=UTF-8',
                            'Accept': "application/json;charset=UTF-8"
                        }
                    });
                    if (loginResponse.ok) {
                        const result = await loginResponse.json();
                        sessionStorage.setItem("uuid", result.id);
                        sessionStorage.setItem("access-token", result.accessToken);
                        // wait a bit to show message?
                        setTimeout(() => {
                            if (loginHandler) loginHandler();
                        }, 1000);
                    }
                } else {
                    const errorData = await rawResponse.json();
                    setRegistrationError(errorData.message || "Registration Failed");
                }
            } catch (e) {
                setRegistrationError("Something went wrong");
            }
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            <FormControl required className="formControl">
                <InputLabel htmlFor="firstName">First Name</InputLabel>
                <Input id="firstName" type="text" value={firstName} onChange={e => { setFirstName(e.target.value); setReqFirstName("dispNone") }} />
                <FormHelperText className={reqFirstName}><span className="red">Please fill out this field</span></FormHelperText>
            </FormControl>
            <br />
            <FormControl required className="formControl">
                <InputLabel htmlFor="lastName">Last Name</InputLabel>
                <Input id="lastName" type="text" value={lastName} onChange={e => { setLastName(e.target.value); setReqLastName("dispNone") }} />
                <FormHelperText className={reqLastName}><span className="red">Please fill out this field</span></FormHelperText>
            </FormControl>
            <br />
            <FormControl required className="formControl">
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input id="email" type="email" value={email} onChange={e => { setEmail(e.target.value); setReqEmail("dispNone"); setInvalidEmail("dispNone") }} />
                <FormHelperText className={reqEmail}><span className="red">Please fill out this field</span></FormHelperText>
                <FormHelperText className={invalidEmail}><span className="red">Enter valid Email</span></FormHelperText>
            </FormControl>
            <br />
            <FormControl required className="formControl">
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input id="password" type="password" value={password} onChange={e => { setPassword(e.target.value); setReqPassword("dispNone") }} />
                <FormHelperText className={reqPassword}><span className="red">Please fill out this field</span></FormHelperText>
            </FormControl>
            <br />
            <FormControl required className="formControl">
                <InputLabel htmlFor="contact">Mobile No.</InputLabel>
                <Input id="contact" type="text" value={contact} onChange={e => { setContact(e.target.value); setReqContact("dispNone"); setInvalidContact("dispNone") }} />
                <FormHelperText className={reqContact}><span className="red">Please fill out this field</span></FormHelperText>
                <FormHelperText className={invalidContact}><span className="red">Enter valid mobile number</span></FormHelperText>
            </FormControl>
            <br />
            {registrationSuccess && <Typography variant="h6" style={{ color: 'green' }}>Registration Successful</Typography>}
            {registrationError && <Typography variant="h6" color="error">{registrationError}</Typography>}
            <br />
            <Button variant="contained" color="primary" onClick={registerHandler}>
                REGISTER
            </Button>
        </div>
    );
};

export default Register;
