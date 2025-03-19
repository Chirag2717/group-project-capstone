import React, {useState} from 'react';
import {CognitoUser, AuthenticationDetails, CognitoUserPool} from "amazon-cognito-identity-js";
import poolData from "./PoolData";
import {useNavigate} from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");

    const userPool = new CognitoUserPool(poolData);
    const onSubmit = (event)=>{
        event.preventDefault();
//referenced from https://www.youtube.com/watch?v=yhD2XJVFQUg
        const user = new CognitoUser({
            Username:email,
            Pool:userPool
        })

        const authenticationDetails = new AuthenticationDetails({
            Username:email,
            Password:password
        })
        user.authenticateUser(authenticationDetails,{
           onSuccess:(data) =>{
               console.log("success",data)
               localStorage.setItem("email",JSON.stringify(email))
               navigate("/viewBooks")
           },
            onFailure:(err)=>{
               console.log("failure",err)
            }
        })
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className={"form-group"}>
                    <label htmlFor="email" className={"fw-bold"}>Email</label>
                    <input required={true} type="email" className={"form-control"} value={email}
                           onChange={(event) => setEmail(event.target.value)} placeholder={"Enter your email id"}></input>
                </div>

                <div className={"form-group"}>
                    <label htmlFor="password" className={"fw-bold"}>Password</label>
                    <input className={"form-control"} required={true} type="password" value={password}
                           onChange={(event) => setPassword(event.target.value)} placeholder={"Enter a password"}></input>
                </div>
                <br/>
                <button type="submit" className={"btn btn-primary m-3"}>Login</button>
                <button type="button" onClick={()=>navigate("/")} className={"btn btn-primary"}>Back</button>
            </form>
        </div>
    );
}

export default Login;