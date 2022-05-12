import React from 'react';
import { HashLink } from 'react-router-hash-link';

import Register from './Register';
import Login from './Login';
import Profile from './Profile';
import Logout from './Logout';

const Navbar = () => {
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
                        <button type="button" className="btn btn-outline-dark px-4" data-bs-toggle="modal" data-bs-target="#register-modal" data-bs-dismiss="modal">
                            Register
                        </button>
					</li>
					<li className="nav-item m-2">
                        <button type="button" className="btn btn-outline-dark px-4" data-bs-toggle="modal" data-bs-target="#login-modal" data-bs-dismiss="modal">
                            Login
                        </button>
					</li>
				</ul>
				{/* <ul className="navbar-nav">
					<li className="nav-item m-2">
                        <button type="button" className="logout btn btn-outline-danger px-4 shadow-lg" data-bs-toggle="modal" data-bs-target="#logout-modal" data-bs-dismiss="modal">
                            Logout
                        </button>
						<Logout />
					</li>
					<li className="nav-item m-2">
                        <button type="button" className="btn btn-outline-dark px-4 ps-3 d-flex shadow-lg" data-bs-toggle="offcanvas" data-bs-target="#profileOffCanvas" aria-controls='profileOffCanvas' >
							<i className="bi bi-person me-2"></i>
                            Profile
                        </button>
						<Profile />
					</li>
				</ul> */}
			</div>

		</nav>

		<Register type="register" />
		
		<Login />

        </div>
    );
}

export default Navbar;
