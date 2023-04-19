import React from 'react'

function Counts() {
    return (
        <section id="counts" className="counts">
            <div className="container" data-aos="fade-up">
                <div className="row gy-4">
                    <div className="col-lg-3 col-md-6">
                        <div className="count-box">
                            <i className="bi bi-emoji-smile" style={{ color: '#A435F0'}} />
                            <div>
                                <span
                                    data-purecounter-start={0}
                                    data-purecounter-end={232}
                                    data-purecounter-duration={1}
                                    className="purecounter"
                                >20+</span>
                                <p>Year Experience</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="count-box">
                            <i className="bi bi-journal-richtext" style={{ color: "#A435F0" }} />
                            <div>
                                <span
                                    data-purecounter-start={0}
                                    data-purecounter-end={521}
                                    data-purecounter-duration={1}
                                    className="purecounter"
                                >21+</span>
                                <p>Best Courses</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="count-box">
                            <i className="bi bi-person-video3" style={{ color: "#A435F0" }} />
                            <div>
                                <span
                                    data-purecounter-start={0}
                                    data-purecounter-end={1463}
                                    data-purecounter-duration={1}
                                    className="purecounter"
                                >10+</span>
                                <p>Instructors</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="count-box">
                            <i className="bi bi-people" style={{ color: "#A435F0" }} />
                            <div>
                                <span
                                    data-purecounter-start={0}
                                    data-purecounter-end={15}
                                    data-purecounter-duration={1}
                                    className="purecounter"
                                >4000+</span>
                                <p>Student Trained</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Counts
