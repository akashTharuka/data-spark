import React, { useState } from 'react';

import { images } from '../javascript/imageImports.js';
import { Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';

const DashboardLogin = (props) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isPending, setIsPending] = useState("");

    const [errMsg, setErrMsg] = useState("");

    const validateData = (login) => {
        let valid = true;

        let email = login.email;
        let password = login.password;

        if (email == "" || password == ""){
            setErrMsg("Authentication Error");
            valid = false;
        }
        else{
            setErrMsg("");
        }

        return valid;
    }

    const handleDashboardLogin = (e) => {
        e.preventDefault();

        const login = {username, password};

        let valid = validateData(login);

        if (valid){
            axios.post('http://localhost:5000/adminlogin', login)
                .then((res) => {
                    let msg = res.data.msg;
                    console.log(msg);
                    if (msg != ""){
                        setErrMsg(msg);
                    }
                    else{
                        sessionStorage.setItem("admin_token", res.data.access_token);
                        document.location = "/dashboard";
                    }
                    setIsPending(false);
                }).catch((error) => {
                    setIsPending(false);
                    console.log(error);
                });
        }
    }

    return (
        <div className="login container-fluid d-flex align-items-center" style={{backgroundImage: `url(${images.backgroundImage})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", height: "100vh", width: "100vw"}}>
            <div className='login col-10 col-md-6 col-lg-4 card bg-light mx-auto px-md-4 px-1 py-4'>
                <div className="card-body">
                    <h2 className="title display-6 my-4 text-center">LOGIN</h2>
                    <form className='form text-center'>
                        {/* add the classnames "is-invalid" or "is-valid" to the input parent div to see error and success */}
                        <div className="form-floating mb-3">
                            <input 
                                type="text" 
                                className="form-control" 
                                id='adminUsername' 
                                tabIndex="-1" 
                                value={username}
                                onChange={(e) => {setUsername(e.target.value)}}
                            />
                            <label htmlFor="adminUsername">Username</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input 
                                type="password" 
                                className="form-control" 
                                id='adminPassword' 
                                tabIndex="-1" 
                                value={password}
                                onChange={(e) => {setPassword(e.target.value)}}
                            />
                            <label htmlFor="adminPassword">Password</label>
                        </div>
                        
                        <div className={`err-div ${(errMsg == "") ? "d-none" : ""}`}>
                            <small className="err-msg text-danger">
                                <i className="fa fa-exclamation-circle me-2 text-danger"></i>
                                {errMsg}
                            </small> 
                        </div>

                        <div className="d-grid col-6 mx-auto text-center my-4">
                            { !isPending && <button type="submit" onClick={(e) => handleDashboardLogin(e)} className="btn btn-outline-dark py-2 shadow-lg" tabIndex="-1">LOGIN</button> }
                            { isPending && <button type="submit" className="btn btn-outline-dark py-2 shadow-lg" tabIndex="-1" disabled>LOGIN</button> }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default withRouter(DashboardLogin);
