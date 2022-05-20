import React from 'react';

import { images } from '../javascript/imageImports.js';

const DashboardLogin = () => {
    return (
        <div className="login container-fluid d-flex align-items-center" style={{backgroundImage: `url(${images.backgroundImage})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", height: "100vh", width: "100vw"}}>
            <div className='login col-10 col-md-6 col-lg-4 card bg-light mx-auto px-md-4 px-1 py-4'>
                <div className="card-body">
                    <h2 className="title display-6 my-4 text-center">LOGIN</h2>
                    <form className='form text-center'>
                        {/* add the classnames "is-invalid" or "is-valid" to the input parent div to see error and success */}
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control is-invalid" id='adminUsername' tabIndex="-1" />
                            <label htmlFor="adminUsername">Username</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input type="password" className="form-control is-invalid" id='adminPassword' tabIndex="-1" />
                            <label htmlFor="adminPassword">Password</label>
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
    );
}

export default DashboardLogin;
