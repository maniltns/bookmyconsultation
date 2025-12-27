import React, { useState } from 'react';
import './Header.css';
import logo from '../../assets/logo.jpeg';
import { Button, Tab, Tabs, Card, Snackbar } from '@material-ui/core';
import Modal from 'react-modal';
import Login from '../../screens/login/Login';
import Register from '../../screens/register/Register';

Modal.setAppElement(document.getElementById('root'));

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: 0,
        border: 'none',
        background: 'none'
    }
};

const Header = ({ isLoggedIn, loginHandler, logoutHandler }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [value, setValue] = useState(0);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");

    const openModal = () => {
        setModalIsOpen(true);
        setValue(0); // Reset to first tab
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const onLoginSuccess = () => {
        setModalIsOpen(false);
        setSnackBarMessage("Login Successful");
        setSnackBarOpen(true);
        loginHandler();
    }

    const handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackBarOpen(false);
    };

    return (
        <div className="header">
            <img src={logo} alt="Logo" className="logo" />
            <div className="header-right">
                {!isLoggedIn ? (
                    <Button variant="contained" color="primary" onClick={openModal}>
                        Login
                    </Button>
                ) : (
                    <Button variant="contained" color="secondary" onClick={logoutHandler}>
                        Logout
                    </Button>
                )}
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Login Modal"
            >
                <Card>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label="Login" />
                        <Tab label="Register" />
                    </Tabs>
                    {value === 0 && <Login loginHandler={onLoginSuccess} />}
                    {value === 1 && <Register />}
                </Card>
            </Modal>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={snackBarOpen}
                autoHideDuration={6000}
                onClose={handleSnackBarClose}
                message={snackBarMessage}
            />
        </div>
    );
};

export default Header;
