import { React, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import AOS from 'aos';
import 'aos/dist/aos.css';

function Hero({ login, setlogin }) {

    useEffect(() => {
        AOS.init();
        console.log(process.env)
    }, [])

    return (
        <>
            <section id="hero" className="hero d-flex align-items-end">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 col-12 d-flex flex-column justify-content-center">
                            <h6 data-aos="fade-down" className="text-white mb-3"><img src="/img/checkmark.png" style={{ height: '16px' }} /> Most trusted education institute in Vadodara</h6>
                            <h1 data-aos="fade-up">
                                Welcome to <br />
                                <span style={{ fontSize: '45px' }}>The Digital Workstation</span>
                            </h1>
                            <p data-aos="fade-up" data-aos-delay={400}>
                                Start, switch, or advance your career with more than 20 Courses and Professional Certificates.
                            </p>
                            <div data-aos="fade-up" data-aos-delay={600}>
                                <div className="text-lg-start ">
                                    <Link
                                        to="/all-courses"
                                        className="btn-browse-course scrollto d-inline-flex align-items-center justify-content-center align-self-center"
                                    >
                                        <span>Browser Courses</span>
                                        {/* <i className="bi bi-arrow-right" /> */}
                                    </Link>
                                    {
                                        login ?
                                            <a
                                                href={'/my-courses'}
                                                className="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center"
                                            >
                                                <span>My Courses</span>
                                            </a>
                                            :
                                            <a
                                                href={'/authentication/sign-up'}
                                                className="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center"
                                            >
                                                <span>Get Started</span>
                                            </a>
                                    }
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-1"></div> */}
                        <div
                            className="col-lg-5 col-12 hero-img"
                            data-aos="zoom-out"
                            data-aos-delay={200}
                        >
                            <img src="/img/hero4.png" className="img-fluid"
                                //  style={{height: '408px', width: '549px'}} 
                                alt="" />
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Hero
