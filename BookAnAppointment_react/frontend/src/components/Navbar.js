import React from 'react';

import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();

    function Logout() {

        localStorage.clear();
        navigate("/");
    }

    if (localStorage.getItem('isAutenticated')) {
        const user = localStorage.getItem('user');
        return (<div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Book An Appointment</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Hi..!  Dr. {user}  </Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link active" aria-current="page" to="/report">Reports</Link>
                            </li>

                            <li className="nav-item m-1">
                                <button className='btn btn-outline-danger' onClick={Logout}>Logout</button>
                            </li>


                        </ul>

                    </div>
                </div>
            </nav>
        </div>);

    } else {
        return (
            <div>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">Book An Appointment</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                                </li>

                                <li className="nav-item m-1">
                                    <Link to="/signup" className='btn btn-outline-primary'>Signup</Link>
                                </li>
                                <li className="nav-item m-1">
                                    <Link to="/signin" className='btn btn-outline-info'>Signin</Link>
                                </li>
                            </ul>

                        </div>
                    </div>
                </nav>
            </div>
        );
    }

}

export default Navbar;
