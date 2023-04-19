import {React, useEffect} from 'react'
import PageHeading from '../../../components/PageHeadings/PageHeading';

const Features = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
                <PageHeading Title="Why Choose Us?" Description="Why You Should Start Learning with Us?" />
        <div className="section">
            <div className="container-fluid bg-image">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 mb-5 pt-5 pb-lg-5">
                            {/* <div className="section-title position-relative mb-4">
                                <header className="section-header pb-0 text-left">
                                    <h2>Why Choose Us?</h2>
                                    <p>Why You Should Start Learning with Us?</p>
                                </header>
                            </div> */}
                            <p className="mb-4 pb-2">The Digital Workstation is one of the most experienced learning institute in Vadodara Gujarat. The Digital Workstation offers quality education in Multimedia, Information Technology, Web Designing and Programming Languages. These trained professionals find job placements in best companies of their field.</p>
                            <div className="d-flex mb-3">
                                <div className="btn-icon bg-dark mr-4">
                                    <i className="fa fa-2x fa-graduation-cap text-white" />
                                </div>
                                <div className="mt-n1">
                                    <h4>Skilled Instructors</h4>
                                    <p>Our trainers are not just teachers but active and experienced IT industry experts. They will only teach topics from their niche in IT field.</p>
                                </div>
                            </div>
                            <div className="d-flex mb-3">
                                <div className="btn-icon bg-dark mr-4">
                                    <i className="fa fa-2x fa-certificate text-white" />
                                </div>
                                <div className="mt-n1">
                                    <h4>Completion Certificate</h4>
                                    <p>Our certificates are recognized everywhere. We support students to prepare for other international certificates to build a strong portfolio.</p>
                                </div>
                            </div>
                            <div className="d-flex">
                                <div className="btn-icon bg-dark mr-4">
                                    <i className="fa fa-2x fa-users text-white" />
                                </div>
                                <div className="mt-n1">
                                    <h4>Classroom Training</h4>
                                    <p className="m-0">Comprehensive instructor-led training gets you up-to-speed quicker than ever. In-person classes available to fit any schedule and skill level.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 d-sm-none d-none d-lg-block" style={{ minHeight: '500px' }}>
                            <div className="position-relative h-100">
                                <img className="position-absolute" src="/img/serviceimg1.png" style={{ objectFit: 'cover', height: '36rem' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Features
