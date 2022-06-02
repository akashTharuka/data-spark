import React from 'react';
import { HashLink } from 'react-router-hash-link';

import Logout from '../components/Logout';

const DashboardNav = () => {
	return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-light" role="navigation">
                <div className="container-fluid">
                    <HashLink className="navbar-brand text-uppercase" smooth to="#page-top">DATASPARK</HashLink>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-nav" aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                
                <div className="collapse navbar-collapse justify-content-end align-center" id="main-nav">
                    <ul className="navbar-nav">
                        <li className="nav-item m-2">
                            <button type="button" className="logout btn btn-outline-danger px-4 shadow-lg" data-bs-toggle="modal" data-bs-target="#logout-modal" data-bs-dismiss="modal">
                                Logout
                            </button>
                            <Logout type="dashboard" />
                        </li>
                    </ul>
                </div>
		    </nav>
        </div>
    );
}

export default DashboardNav;
