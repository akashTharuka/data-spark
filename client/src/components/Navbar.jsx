import React, { Component } from 'react';
import { HashLink } from 'react-router-hash-link';

import Register from './Register';
import Login from './Login';

export default class Navbar extends Component {
  render() {
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
			</div>

		</nav>
		<Register />
		<Login />
        </div>
    )
  }
}
