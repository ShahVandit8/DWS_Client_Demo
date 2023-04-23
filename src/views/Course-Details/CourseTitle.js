import { React, useEffect, useState } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import Star from '../../components/Rating-Star/Star';

function CourseTitle(props) {

    useEffect(() => {
        AOS.init();
    }, [])

    const { CourseName, ShortDescription, StudentCount, Level, Duration, RatingOutOf, Rating } = props

    return (
        <>
            <section className="course-detail d-flex align-items-center">
                <div className="container mb-3">
                    <div className="row">
                        <div className="col-lg-7 d-flex flex-column">
                            <h1 data-aos="fade-up">
                                {/* Getting Started with JavaScript */}
                                {CourseName}
                            </h1>
                            <p data-aos="fade-up" data-aos-delay={400}>
                                {/* More than 10+ courses are available */}
                                {ShortDescription}
                                {/* JavaScript is the popular programming language which powers web pages and web applications. This course will get you started coding in JavaScript. */}
                            </p>
                                    <div className="mt-4 mx-auto" data-aos="fade-up" data-aos-delay={600}>
                                        <div className='d-flex flex-row'>
                                            <div className='mr-4 d-none d-md-flex'>
                                                <h6><span className='bi bi-person'>&nbsp;  {StudentCount} Enrolled</span></h6>
                                            </div>
                                            <div className='mr-4 mt-n1 d-none d-md-flex'>
                                                <Star rating={Rating} />
                                                <span className='mr-1' style={{ fontSize: '14px', color: '#fff' }}>({RatingOutOf})</span>
                                            </div>
                                            <div className='mr-4'>
                                                <h6><span className="bi bi-reception-4">&nbsp;  {Level}</span></h6>
                                            </div>
                                            <div className=''>
                                                <h6><span className="bi bi-clock">&nbsp;  {Duration}</span></h6>
                                            </div>
                                        </div>
                                    </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CourseTitle
