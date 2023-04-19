import React from 'react'
import { NavHashLink } from 'react-router-hash-link';


function Navbar() {
    return (
        <div className="container-fluid p-0">
            <nav className="navbar navbar-expand-lg navbar-light py-3 py-lg-0 px-lg-5" >
                <NavHashLink to="/" className="navbar-brand ml-lg-3">
                    <img alt="" style={{ height: '70px' }} className="ml-sm-0 ml-2" src="/img/dws_logo.png" />
                </NavHashLink>
                <button
                    type="button"
                    className="navbar-toggler"
                    data-toggle="collapse"
                    data-target="#navbarCollapse"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div
                    className="collapse navbar-collapse justify-content-between "
                    id="navbarCollapse"
                >
                    <div className="navbar-nav mx-auto py-0">
                        <NavHashLink to="/" className="nav-item nav-link">
                            Home
                        </NavHashLink>
                        <NavHashLink to="/about" className="nav-item nav-link">
                            About
                        </NavHashLink>
                        <div className="nav-item dropdown">
                            <a
                                href="#"
                                className="nav-link dropdown-toggle"
                                data-toggle="dropdown"
                            >
                                Courses
                            </a>
                            <div className="dropdown-menu m-0">
                                <NavHashLink to="/Allcourses" className="dropdown-item">
                                    All Courses
                                </NavHashLink>
                                <hr />
                                <NavHashLink to="/ITcourse" className="dropdown-item">
                                    I.T Courses
                                </NavHashLink>
                                <NavHashLink to="/Multimediacourse" className="dropdown-item">
                                    Multimedia Courses
                                </NavHashLink>
                            </div>
                        </div>
                        <NavHashLink to="/contact" className="nav-item nav-link">
                            Contact
                        </NavHashLink>
                    </div>
                    <NavHashLink to='/login' className="btn btn-primary py-2 px-4 d-none d-lg-block" style={{ border: 'none' }}>
                        Log In &nbsp;<i class="fa fa-arrow-right ms-3"></i>
                    </NavHashLink>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
