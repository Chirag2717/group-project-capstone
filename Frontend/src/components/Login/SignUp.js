import React from "react";
import {useState} from "react";
import {CognitoUserAttribute, CognitoUserPool} from "amazon-cognito-identity-js";
import {useNavigate} from 'react-router-dom';
import poolData from "./PoolData";


function SignUp() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const userPool = new CognitoUserPool(poolData);


    const onSubmit = (event) => {
        event.preventDefault();
        //referenced from https://www.youtube.com/watch?v=Yp5sZd7ZyCI
        const attributeList = [
            new CognitoUserAttribute({
                Name: 'phone_number',
                Value: mobileNumber,
            }),
        ];

//referenced from https://www.youtube.com/watch?v=8WZmIdXZe3Q&t=9s
        userPool.signUp(email, password, attributeList, null, (err, data) => {
            if (err) {
                if (err.code === 'UsernameExistsException') {
                    navigate("/login")
                }
            } else {
                navigate("/authenticate", {state: {email}})
            }
        })
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className={"form-group"}>
                    <label htmlFor="email" className={"fw-bold"}>Email</label>
                    <input required={true} type="email" className={"form-control"} value={email}
                           onChange={(event) => setEmail(event.target.value)}
                           placeholder={"Enter your email id"}></input>
                </div>
                <div className={"form-group"}>
                    <label htmlFor="password" className={"fw-bold"}>Password</label>
                    <input className={"form-control"} required={true} type="password" value={password}
                           onChange={(event) => setPassword(event.target.value)}
                           placeholder={"Enter a password"}></input>
                </div>
                <div className={"form-group"}>
                    <label htmlFor="mobileNumber" className={"fw-bold"}>Mobile Number</label>
                    <input className={"form-control"} required={true} value={mobileNumber}
                           onChange={(e) => setMobileNumber(e.target.value)}
                           placeholder={"Enter +1 followed by your number"}></input>
                </div>
                <br/>
                <button type="submit" className={"btn btn-primary mr-3"}>Signup</button>
            </form>
        </div>
    )
}

export default SignUp;