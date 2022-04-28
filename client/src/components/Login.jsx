import React from 'react';

const Login = () => {
    return (
        <div className='modal fade' id='login-modal' aria-hidden='true' aria-labelledby='login-modal' tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <h2 className="title display-6 my-4 text-center">LOGIN</h2>
                        <form className='col-10 mx-auto pt-4'>
                            {/* add the classnames "invalid" or "valid" to the input parent div to see error and success */}
                            <div className="form-floating mb-3">
                                <input type="email" className="form-control" id='loginEmail' />
                                <label htmlFor="loginEmail">Email address<i className="fa fa-check-circle ms-3 text-success success"></i></label>
                                <div className="error">
                                    <i className="fa fa-exclamation-circle me-3 text-danger"></i>
                                    <small className="err-msg text-danger">Error Message</small>
                                </div>
                                
                            </div>

                            <div className="form-floating mb-3">
                                <input type="password" className="form-control" id='loginPassword' />
                                <label htmlFor="loginPassword">Password<i className="fa fa-check-circle ms-3 text-success success"></i></label>
                                <div className="error">
                                    <i className="fa fa-exclamation-circle me-3 text-danger"></i>
                                    <small className="err-msg text-danger">Error Message</small>
                                </div>
                            </div>

                            <div className="d-grid col-6 mx-auto text-center my-4">
                                <button type="submit" className="btn btn-outline-dark py-2">LOGIN</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
