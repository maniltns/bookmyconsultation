import React, { useState } from 'react';
import { Button, FormControl, InputLabel, Input, FormHelperText, Typography } from '@material-ui/core';

const Login = ({ loginHandler }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [reqEmail, setReqEmail] = useState("dispNone");
    const [reqPassword, setReqPassword] = useState("dispNone");
    const [invalidEmail, setInvalidEmail] = useState("dispNone");
    const [loginError, setLoginError] = useState(false);

    const emailChangeHandler = (e) => {
        setEmail(e.target.value);
        setReqEmail("dispNone");
        setInvalidEmail("dispNone"); // Reset invalid email error on change
    }

    const passwordChangeHandler = (e) => {
        setPassword(e.target.value);
        setReqPassword("dispNone");
    }

    const handleLogin = async () => {
        let valid = true;
        setReqEmail("dispNone");
        setReqPassword("dispNone");
        setInvalidEmail("dispNone");

        if (email === "") {
            setReqEmail("dispBlock");
            valid = false;
        } else {
            // Simple email validation
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!re.test(String(email).toLowerCase())) {
                setInvalidEmail("dispBlock");
                valid = false;
            }
        }

        if (password === "") {
            setReqPassword("dispBlock");
            valid = false;
        }

        if (valid) {
            try {
                const rawResponse = await fetch('/auth/login', {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Basic ' + window.btoa(email + ":" + password),
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Accept': "application/json;charset=UTF-8"
                    }
                });

                if (rawResponse.ok) {
                    const result = await rawResponse.json();
                    // Store user data/token if needed
                    sessionStorage.setItem("uuid", result.id);
                    sessionStorage.setItem("access-token", result.accessToken);

                    loginHandler();
                } else {
                    setLoginError(true);
                    // Or throw error
                    const error = new Error('Something went wrong');
                    throw error;
                }
            } catch (e) {
                // handle error
                console.log(e);
                setLoginError(true);
            }
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            <FormControl required className="formControl">
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input id="email" type="email" value={email} onChange={emailChangeHandler} />
                <FormHelperText className={reqEmail}><span className="red">Please fill out this field</span></FormHelperText>
                <FormHelperText className={invalidEmail}><span className="red">Enter valid Email</span></FormHelperText>
            </FormControl>
            <br />
            <FormControl required className="formControl">
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input id="password" type="password" value={password} onChange={passwordChangeHandler} />
                <FormHelperText className={reqPassword}><span className="red">Please fill out this field</span></FormHelperText>
            </FormControl>
            <br />
            {loginError && <Typography variant="h6" color="error">Login Failed. Please check credentials.</Typography>}
            <br />
            <Button variant="contained" color="primary" onClick={handleLogin}>
                LOGIN
            </Button>
        </div>
    );
};

export default Login;
