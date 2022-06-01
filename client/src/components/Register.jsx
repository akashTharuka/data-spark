import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import config from '../config.json'

const Register = (props) => {

    const [email, setEmail]                     = useState("");
    const [username, setUsername]               = useState("");
    const [password, setPassword]               = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPending, setIsPending]             = useState(false);
    
    const [emailMsg, setEmailMsg] = useState("");
    const [usernameMsg, setUsernameMsg] = useState("");
    const [pswMsg, setPswMsg] = useState("");
    const [confirmPswMsg, setConfirmPswMsg] = useState("");

    const history = useHistory();

    useEffect(() => {
        if (props.email){
            setEmail(props.email);
        }
        if (props.username){
            setUsername(props.username);
        }
    }, [props.email, props.username]);

    const validateData = (register) => {
        let email = register.email;
        let username = register.username;
        let password = register.password;
        let confirmPassword = register.confirmPassword;

        let valid = true;

        // validate email
        if (email === ""){
            setEmailMsg("Email cannot be empty");
            valid = false;
        }
        else if (! /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            setEmailMsg("not a valid email");
            valid = false;
        }
        else{
            setEmailMsg("success");
        }

        // validate username
        if (username === ""){
            setUsernameMsg("Username cannot be empty");
            valid = false;
        }
        else if (! /^[a-zA-Z0-9]+$/.test(username)){
            setUsernameMsg("Only alphanumeric characters");
            valid = false;
        }
        else{
            setUsernameMsg("success");
        }

        if (props.type === "register"){
            // password validation
            if (password === ""){
                setPswMsg("Password cannot be empty");
                valid = false;
            }
            else if (! /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{7,}$/.test(password)){
                setPswMsg("At least one digit, one lowercase & uppercase, and min 8 characters");
                valid = false;
            }
            else{
                setPswMsg("success");
            }

            // confirm password validation
            if (confirmPassword === ""){
                setConfirmPswMsg("Please confirm the password");
                valid = false;
            }
            else if (password !== confirmPassword){
                setConfirmPswMsg("Password mismatch");
                valid = false;
            }
            else{
                setConfirmPswMsg("success");
            }
        }
        else{
            if (password === ""){
                setPswMsg("Password cannot be empty");
                valid = false;
            }
            else{
                setPswMsg("success");
            }
        }

        return valid;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const register = {email, username, password, confirmPassword};

        const valid = validateData(register);

        if (valid){
            setIsPending(true);

            // register
            if(props.type === "register") {
                axios.post(config.domain + '/register', register, {headers: {
                    'Authorization': '',
                    'Content-Type': 'application/json',
                }})
                .then((res) => {
                    setIsPending(false);
                    setEmailMsg(res.data.emailErr);
                    setUsernameMsg(res.data.usernameErr);

                    let emailUsernameCheck = false;

                    if (res.data.emailErr == "success" && res.data.usernameErr == "success") {
                           
                            sessionStorage.setItem("token", res.data.access_token)
                            history.push('/');
                            document.location.reload();
                    }

                }).catch((error) => {
                    setIsPending(false);
                });
            }

            // edit profile
            if(props.type === "edit") {

                const access_token = sessionStorage.getItem("token");

                const edit = { email, username, password }

                axios.post(config.domain + '/profile', edit, { headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'Content-type': 'application/json'
                }})
                    .then((res) => {
                        setIsPending(false);

                        let emailUsernameCheck = false;

                        if (res.data.message !== "") {
                            setPswMsg(res.data.message);
                        }
                        else{
                            console.log(res.data.message);
                            history.push('/');
                            document.location.reload();
                        }
                    })
                    .catch((error) => {
                        setIsPending(false);
                        console.log(error);
                        history.push('/');
                        document.location.reload();
                    });
            }
        }
    }

	return (
        <div className='modal fade' id={props.type + '-modal'} aria-hidden='true' aria-labelledby='register-modal' tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body d-flex-column">
                        <h2 className="title display-6 my-4 text-center text-uppercase">{props.type}</h2>
                        <form className='col-10 mx-auto pt-4 needs-validation' noValidate>
                            {/* add the classnames "is-invalid" or "is-valid" to the input element to see error and success */}
                            <div className="form-floating mb-3">
                                <input 
                                    type="email" 
                                    className={`form-control ${(emailMsg == "") ? "" : (emailMsg != "success" ? "is-invalid" : "is-valid")}`}
                                    id={props.type + 'Email'} 
                                    tabIndex="-1" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <label htmlFor="registerEmail">Email address</label>
                                <div className="invalid-feedback">
                                    {emailMsg}
                                </div>
                            </div>

                            <div className="form-floating mb-3">
                                <input 
                                    type="text" 
                                    className={`form-control ${(usernameMsg == "") ? "" : (usernameMsg != "success" ? "is-invalid" : "is-valid")}`}
                                    id={props.type + 'Username'} 
                                    tabIndex="-1" 
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                                <label htmlFor="registerUsername">Username</label>
                                <div className="invalid-feedback">
                                    {usernameMsg}
                                </div>
                            </div>

                            <div className="form-floating mb-3">
                                <input 
                                    type="password" 
                                    className={`form-control ${(pswMsg == "") ? "" : (pswMsg != "success" ? "is-invalid" : "is-valid")}`}
                                    id={props.type + 'Password'} 
                                    tabIndex="-1" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <label htmlFor="registerPassword">{(props.type === "edit") ? "Verify your password to continue" : "password"}</label>
                                <div className="invalid-feedback">
                                    {pswMsg}
                                </div>
                            </div>
                            
                            <div className={`form-floating mb-3 ${(props.type === "edit") ? "d-none" : ""}`}>
                                <input 
                                    type="password" 
                                    className={`form-control ${(confirmPswMsg == "") ? "" : (confirmPswMsg != "success" ? "is-invalid" : "is-valid")}`}
                                    id={props.type + 'ConfirmPsw'} 
                                    tabIndex="-1" 
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <label htmlFor="registerConfirmPassword">Confirm Password</label>
                                <div className="invalid-feedback">
                                    {confirmPswMsg}
                                </div>
                            </div>

                            <div className="d-grid col-6 mx-auto text-center my-4">
                                { !isPending && <button type="submit" onClick={handleSubmit} className="btn btn-outline-dark py-2 shadow-lg text-uppercase" tabIndex="-1">{props.type}</button>}
                                { isPending && <button type="submit" className="btn btn-outline-dark py-2 shadow-lg text-uppercase" tabIndex="-1" disabled>{props.type}</button>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Register;
