import {React, useEffect} from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';

function About() {

    useEffect(() => {
        AOS.init();
      }, [])

    return (
        <section id="about" className="about">
            <div className="container" data-aos="fade-up">
                <div className="row gx-0">
                    <div
                        className="col-lg-6 d-flex flex-column justify-content-center"
                        data-aos="fade-up"
                        data-aos-delay={200}
                    >
                        <div className="content">
                            <h3>Who We Are</h3>
                            <h2>
                                The Digital Workstation
                            </h2>
                            <p>
                            The Digital Workstation was started more than 15 Years ago with a concept of imparting quality education to professionals and career seekers in the field of Information Technology, Software Development, Multimedia as well as commercial art, adverting, Web Publishing, Animation, Engineering Design etc.
                            </p>
                            <div className="text-lg-start">
                                <a
                                    href="/about-us"
                                    className="btn-read-more d-inline-flex align-items-center justify-content-center align-self-center"
                                >
                                    <span>Read More</span>
                                    <i className="bi bi-arrow-right" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div
                        className="col-lg-6 d-flex align-items-center"
                        data-aos="zoom-out"
                        data-aos-delay={200}
                    >
                        <img src="/img/about.jpg" className="img-fluid about-img" alt="" />
                    </div>
                </div>
            </div>
        </section>

    )
}

export default About
