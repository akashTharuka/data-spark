import React from 'react';

const Profile = () => {
    return (
        <div className="offcanvas offcanvas-end" tabIndex="-1" id='profileOffCanvas' aria-labelledby='profileOffCanvasLabel' aria-hidden="true">
            <div className="offcanvas-header">
                <h5 id="profileOffCanvasLabel" className='title display-6'>PROFILE</h5>
                <button type='button' className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label='Close' tabIndex="-1"></button>
            </div>
            <div className="offcanvas-body">
                body
            </div>
        </div>
    );
}

export default Profile;
