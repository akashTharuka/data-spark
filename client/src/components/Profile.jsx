import React from 'react';
import Register from './Register';

const Profile = () => {
    return (
        <div className="offcanvas offcanvas-end" tabIndex="-1" id='profileOffCanvas' aria-labelledby='profileOffCanvasLabel' aria-hidden="true">
            <div className="offcanvas-header">
                <h5 id="profileOffCanvasLabel" className='title display-6'>PROFILE</h5>
                <button type='button' className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label='Close' tabIndex="-1"></button>
            </div>
            <div className="offcanvas-body">
                <div className="row my-3 d-flex">
                    <h2 className="lead">Account Details</h2>
                </div>
                <form className='col-10 mx-auto pt-4'>
                    <div className="form-floating mb-3">
                        <input type="email" readOnly className="form-control" id='editReadOnlyEmail' tabIndex="-1" value="akash_tharuka@yahoo.com" />
                        <label htmlFor="editReadOnlyEmail">Email address</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="text" readOnly className="form-control" id='editReadOnlyUsername' tabIndex="-1" value="Tharukaeaa.19" />
                        <label htmlFor="editReadOnlyUsername">Username</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="password" readOnly className="form-control" id='editReadOnlyPassword' tabIndex="-1" value="admin1234" />
                        <label htmlFor="editReadOnlyPassword">Password</label>
                    </div>

                    <div className="d-grid col-6 mx-auto text-center my-4">
                        <button type="button" className="btn btn-outline-dark py-2 shadow-lg" tabIndex="-1" data-bs-toggle="modal" data-bs-target="#edit-modal" data-bs-dismiss="modal">EDIT</button>
                    </div>
                </form>

                <Register type="edit" />

                <div className="row my-3 d-flex">
                    <h2 className="lead">Your Datasets</h2>
                </div>
            </div>
        </div>
    );
}

export default Profile;
