import React from 'react';

const Register = () => {
	return (
        <div className='modal fade' id='register-modal' aria-hidden='true' aria-labelledby='register-modal' tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body d-flex-column">
                        <h2 className="title display-6 my-4 text-center">REGISTER</h2>
                        <form className='col-10 mx-auto pt-4 needs-validation' noValidate>
                            {/* add the classnames "is-invalid" or "is-valid" to the input element to see error and success */}
                            <div className="form-floating mb-3">
                                <input type="email" className="form-control is-invalid" id='registerEmail' tabIndex="-1" required/>
                                <label htmlFor="registerEmail">Email address</label>
                                <div className="invalid-feedback">
                                    Error message
                                </div>
                            </div>

                            <div className="form-floating mb-3">
                                <input type="text" className="form-control is-invalid" id='registerUsername' tabIndex="-1" required/>
                                <label htmlFor="registerUsername">Username</label>
                                <div className="invalid-feedback">
                                    Error message
                                </div>
                            </div>

                            <div className="form-floating mb-3">
                                <input type="password" className="form-control is-valid" id='registerPassword' tabIndex="-1" required/>
                                <label htmlFor="registerPassword">Password</label>
                                <div className="invalid-feedback">
                                    Error message
                                </div>
                            </div>
                            
                            <div className="form-floating mb-3">
                                <input type="password" className="form-control" id='registerConfirmPassword' tabIndex="-1" required/>
                                <label htmlFor="registerConfirmPassword">Confirm Password</label>
                                <div className="invalid-feedback">
                                    Error message
                                </div>
                            </div>

                            <div className="d-grid col-6 mx-auto text-center my-4">
                                <button type="submit" className="btn btn-outline-dark py-2 shadow-lg" tabIndex="-1">REGISTER</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Register;
