import React from 'react';
import {useNavigate} from "react-router-dom";
function WelcomePage(props) {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Welcome to BookAHolic..</h1>
            <button type="button" className="btn btn-primary m-5" onClick={()=>navigate("login")}>Login</button>
            <button type="button" className="btn btn-primary" onClick={()=>navigate("signup")}>Signup</button>
        </div>
    );
}

export default WelcomePage;