import { React, useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';

function PageHeading(props) {

    const { Title, Description } = props;

    useEffect(() => {
        AOS.init();
    }, [])

    return (
        <>
            <section id="hero" className="pgheading d-flex align-items-end">
                <div className="container mb-3">
                    <div className="row">
                        <div className="col-lg-8 d-flex flex-column justify-content-center">
                            <h1 data-aos="fade-up">
                                {/* Information Technology Courses */}
                                {Title}
                            </h1>
                            <p data-aos="fade-up" data-aos-delay={400}>
                                {/* More than 10+ courses are available */}
                                {Description}
                            </p>
                            <div data-aos="fade-up" data-aos-delay={600}>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

PageHeading.defaultProps = {
    Title : 'Page Title Here',
    Description : 'Page Description with small font size'
}

export default PageHeading
