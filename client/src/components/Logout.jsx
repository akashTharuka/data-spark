import React from 'react';
import { useHistory } from 'react-router-dom';

const Logout = () => {

    const history = useHistory();

    const handleLogout = (e) => {
        sessionStorage.removeItem("token");
        console.log("Logged out");
        history.push('/');
        document.location.reload();
    }

    return (
        <div className='modal fade' id='logout-modal' aria-hidden='true' aria-labelledby='logout-modal' tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <h2 className="title display-6 my-4 text-center">LOGOUT</h2>
                        <div className="row my-3 justify-content-evenly">
                            <div className="col-4 d-flex justify-content-end">
                                <button type="button" className="btn btn-outline-dark px-5 my-5 shadow-lg" data-bs-dismiss="modal">Cancel</button>
                            </div>
                            <div className="col-4 d-flex justify-content-start">
                                <button type="button" onClick={handleLogout} className="btn btn-dark px-5 my-5 shadow-lg">Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Logout;
