import React, { useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';



const Navbar = (props) => {
	return (
        <div className='navigation bg-dark position-sticky top-0'>
            <nav className="navbar navbar-expand-sm navbar-dark" role="navigation">
				<div className="container-fluid">
					<HashLink className="navbar-brand text-uppercase text-warning" smooth to="#page-top">DATASPARK</HashLink>

					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-nav" aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
				</div>
				
				<div className="collapse navbar-collapse justify-content-end align-center" id="main-nav">
					<ul className={`navbar-nav ${(props.status) ? 'd-none' : ''}`}>
						<li className="nav-item m-2">
							<button type="button" className="btn btn-outline-warning px-4" data-bs-toggle="modal" data-bs-target="#register-modal" data-bs-dismiss="modal">
								Register
							</button>
						</li>
						<li className="nav-item m-2">
							<button type="button" className="btn btn-outline-warning px-4" data-bs-toggle="modal" data-bs-target="#login-modal" data-bs-dismiss="modal">
								Login
							</button>
							
						</li>
					</ul>
					<ul className={`navbar-nav ${(props.status) ? '' : 'd-none'}`}>
						<li className="nav-item m-2">
							<button type="button" className="logout btn btn-outline-danger px-4 shadow-lg" data-bs-toggle="modal" data-bs-target="#logout-modal" data-bs-dismiss="modal">
								Logout
							</button>
						</li>
						<li className="nav-item m-2">
							<button type="button" className="btn btn-outline-warning px-4 ps-3 d-flex shadow-lg" data-bs-toggle="offcanvas" data-bs-target="#profileOffCanvas" aria-controls='profileOffCanvas' >
								<i className="bi bi-person me-2"></i>
								Profile
							</button>
						</li>
					</ul>
				</div>

			</nav>

        </div>
    );
}

export default Navbar;
