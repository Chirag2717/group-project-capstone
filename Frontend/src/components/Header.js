import './Header.css';
import Button from '@material-ui/core/Button';
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";


function Header() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear()
        navigate("/")
    }

    return (

        <header className='protoHeader'>
            <div className='logo-name clickable'>
                <div className='app-name'>Bookaholic</div>

                {localStorage.getItem("email")? (<Button variant="contained" color="primary" onClick={handleLogout}>
                    Logout
                </Button>) : ("")}
            </div>

        </header>

    );
}

export default Header;
