import React from 'react';

const Login = () => {
    return (
        <div className='modal fade' id='login-modal' aria-hidden='true' aria-labelledby='login-modal' tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <h2 className="title display-6 my-4 text-center">LOGIN</h2>
                        <form className='col-10 mx-auto pt-4'>
                            {/* add the classnames "is-invalid" or "is-valid" to the input parent div to see error and success */}
                            <div className="form-floating mb-3">
                                <input type="email" className="form-control is-invalid" id='loginEmail' tabIndex="-1" />
                                <label htmlFor="loginEmail">Email address</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input type="password" className="form-control is-invalid" id='loginPassword' tabIndex="-1" />
                                <label htmlFor="loginPassword">Password</label>
                            </div>
                            
                            <div className="err-div">
                                <small className="err-msg text-danger">
                                    <i className="fa fa-exclamation-circle me-2 text-danger"></i>
                                    Authentication Error
                                </small> 
                            </div>

                            <div className="d-grid col-6 mx-auto text-center my-4">
                                <button type="submit" className="btn btn-outline-dark py-2 shadow-lg" tabIndex="-1">LOGIN</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
