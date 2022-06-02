import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import config from '../config.json'

const Register = (props) => {

    const [oldPassword, setOldPassword]         = useState("");
    const [newPassword, setNewPassword]         = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPending, setIsPending]             = useState(false);
    
    const [oldPswMsg, setOldPswMsg]             = useState("");
    const [newPswMsg, setNewPswMsg]             = useState("");
    const [confirmPswMsg, setConfirmPswMsg]     = useState("");

    const history = useHistory();

    const validateData = (edit) => {
        const oldPassword     = edit.oldPassword;
        const newPassword     = edit.newPassword;
        const confirmPassword = edit.confirmPassword;

        let valid = true;

        // old password validation
        if (oldPassword === ""){
            setOldPswMsg("Cannot be empty");
            valid = false;
        }
        else{
            setOldPswMsg("success");
        }

        // new password validation
        if (newPassword === ""){
            setNewPswMsg("Password cannot be empty");
            valid = false;
        }
        else if (! /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{7,}$/.test(newPassword)){
            setNewPswMsg("At least one digit, one lowercase & uppercase, and min 8 characters");
            valid = false;
        }
        else{
            setNewPswMsg("success");
        }

        // confirm password validation
        if (confirmPassword === ""){
            setConfirmPswMsg("Please confirm the password");
            valid = false;
        }
        else if (newPassword !== confirmPassword){
            setConfirmPswMsg("Password mismatch");
            valid = false;
        }
        else{
            setConfirmPswMsg("success");
        }

        return valid;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const edit = { oldPassword, newPassword, confirmPassword };

        const valid = validateData(edit);

        if (valid){
            setIsPending(true);

            const access_token = sessionStorage.getItem("token");

            axios.post(config.domain + '/updatePassword', edit, { headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-type': 'application/json'
            }})
                .then((res) => {
                    setIsPending(false);
                    console.log(res.data);
                    if (res.data.msg !== "") {
                        setOldPswMsg(res.data.msg);
                    }
                    else{
                        console.log(res.data.msg);
                        sessionStorage.removeItem("token");
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

	return (
        <div className='modal fade' id="edit-password-modal" aria-hidden='true' aria-labelledby='edit-password-modal' tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body d-flex-column">
                        <h2 className="title display-6 my-4 text-center text-uppercase">edit password</h2>
                        <form className='col-10 mx-auto pt-4 needs-validation' noValidate>
                            {/* add the classnames "is-invalid" or "is-valid" to the input element to see error and success */}
                            <div className="form-floating mb-3">
                                <input 
                                    type="password" 
                                    className={`form-control ${(oldPswMsg == "") ? "" : (oldPswMsg != "success" ? "is-invalid" : "is-valid")}`}
                                    id='editOldPassword' 
                                    tabIndex="-1" 
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    placeholder='Old Password'
                                    required
                                />
                                <label htmlFor="registerPassword">Old Password</label>
                                <div className="invalid-feedback">
                                    {oldPswMsg}
                                </div>
                            </div>

                            <div className="form-floating mb-3">
                                <input 
                                    type="password" 
                                    className={`form-control ${(newPswMsg == "") ? "" : (newPswMsg != "success" ? "is-invalid" : "is-valid")}`}
                                    id='editNewPassword' 
                                    tabIndex="-1" 
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder='New Password'
                                    required
                                />
                                <label htmlFor="registerPassword">New Password</label>
                                <div className="invalid-feedback">
                                    {newPswMsg}
                                </div>
                            </div>
                            
                            <div className='form-floating mb-3'>
                                <input 
                                    type="password" 
                                    className={`form-control ${(confirmPswMsg == "") ? "" : (confirmPswMsg != "success" ? "is-invalid" : "is-valid")}`}
                                    id='editConfirmPassword'
                                    tabIndex="-1" 
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder='Confirm Password'
                                    required
                                />
                                <label htmlFor="registerConfirmPassword">Confirm Password</label>
                                <div className="invalid-feedback">
                                    {confirmPswMsg}
                                </div>
                            </div>

                            <div className="d-grid col-6 mx-auto text-center my-4">
                                { !isPending && <button type="submit" onClick={handleSubmit} className="btn btn-outline-dark py-2 shadow-lg text-uppercase" tabIndex="-1">EDIT</button>}
                                { isPending && <button type="submit" className="btn btn-outline-dark py-2 shadow-lg text-uppercase" tabIndex="-1" disabled>EDIT</button>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Register;
