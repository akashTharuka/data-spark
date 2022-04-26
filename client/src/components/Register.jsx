import React from 'react'

const Register = () => {
	return (
        <div className='modal fade' id='register-modal' aria-hidden='true' aria-labelledby='register-modal' tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <h2 className="title display-6 my-4 text-center">REGISTER</h2>
                        <form>
                            <label htmlFor="username-register" className="form-label">Username:</label>
                            <div className="input-group mb-2">
                                <span className="input-group-text">
                                    <i className="bi bi-person text-secondary"></i>
                                </span>
                                <input type="text" id="username-register" className="form-control" />
                                {/* tooltip */}
                                <span className="input-group-text">
                                    <span className="tt" data-bs-placement="bottom" title="Enter a valid username.">
                                        <i className="bi bi-question-circle text-muted"></i>
                                    </span>
                                </span>
                            </div>
                            
                            <label htmlFor="email-register" className="form-label">Email Address:</label>
                            <div className="input-group mb-2">
                                <span className="input-group-text">
                                    <i className="bi bi-envelope-fill text-secondary"></i>
                                </span>
                                <input type="text" id="email-register" className="form-control" placeholder="e.g. mario@example.com" />
                                {/* tooltip */}
                                <span className="input-group-text">
                                    <span className="tt" data-bs-placement="bottom" title="Enter an email address we can contact you.">
                                    <i className="bi bi-question-circle text-muted"></i>
                                    </span>
                                </span>
                            </div>

                            <label htmlFor="password-register" className="form-label">Password:</label>
                            <div className="input-group mb-2">
                                <span className="input-group-text">
                                    <i className="bi bi-unlock text-secondary"></i>
                                </span>
                                <input type="password" id="password-register" className="form-control" />
                                {/* tooltip */}
                                <span className="input-group-text">
                                    <span className="tt" data-bs-placement="bottom" title="Enter an alphanumeric password with characters between 6-20.">
                                        <i className="bi bi-question-circle text-muted"></i>
                                    </span>
                                </span>
                            </div>

                            <label htmlFor="confirm-password-register" className="form-label">Confirm Password:</label>
                            <div className="input-group mb-2">
                                <span className="input-group-text">
                                    <i className="bi bi-unlock text-secondary"></i>
                                </span>
                                <input type="password" id="confirm-password-register" className="form-control" />
                                {/* tooltip */}
                                <span className="input-group-text">
                                    <span className="tt" data-bs-placement="bottom" title="Enter the above password the sameway">
                                        <i className="bi bi-question-circle text-muted"></i>
                                    </span>
                                </span>
                            </div>

                            <div className="text-center">
                                <button type="submit" className="btn btn-outline-dark">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Register;
