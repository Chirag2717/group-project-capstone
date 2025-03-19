import React, {useState} from 'react';
import {useLocation} from "react-router-dom";
import {CognitoUser, CognitoUserPool} from "amazon-cognito-identity-js";
import poolData from "./PoolData";
import {useNavigate} from 'react-router-dom';
import { API } from '../API';
const axios = require('axios')


function Authentication() {
    const navigate = useNavigate();
    const location = useLocation();
    const[code,setCode] = useState("");
    const userEmail = location.state.email;
    const userPool = new CognitoUserPool(poolData);

    const user = new CognitoUser({
        Username:userEmail,
        Pool:userPool
    })
//referenced from https://www.tabnine.com/code/javascript/functions/amazon-cognito-identity-js/CognitoUser/confirmRegistration
    const onSubmit = (event)=> {
        event.preventDefault();
        user.confirmRegistration(code,true,(err,res)=>{
            if(err){
                console.log(err)
            } 
            else{
                console.log((res))
                createTopic()
                navigate("/login")}
            }
        )
    }


    const createTopic = async() => {
        try {
            const resp = await axios.post(`${API}/createTopic`, {
                "email":userEmail
            });
            return resp
        } catch (err) {
            console.error(err);
            return "Something failed"
        }
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
            <label htmlFor="code" className={"fw-bold"}>Enter one time password received on {userEmail} </label>
            <input className={"form-control"} required={true} value={code} onChange={(event)=>setCode(event.target.value)}></input>
                <br/>
                <button type="submit" className={"btn btn-primary mr-3"}>Submit</button>
            </form>
        </div>
    );
}

export default Authentication;