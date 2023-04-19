import { React, useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';

import CourseDetailsTab from './CourseDetailsTab';
import CoursePriceTab from './CoursePriceTab';

import { Link } from 'react-router-dom';
import Recommendation from './Recommendation';

function CourseDetail(props) {

    useEffect(() => {
        AOS.init();
    }, [])

    const { id, CoverImage, Modules, LongDescription, Price, SellingPrice, Rating, RatingOutOf, RatingList, StartDate, Category } = props;

    return (
        <>
            <section id="course-content" className="course-content">
                <div className="container">
                    <div className="row d-flex">
                        <div className='col-lg-8 col-12 content-tab'>

                            <CourseDetailsTab
                                Modules={Modules}
                                LongDescription={LongDescription}
                                Rating={Rating}
                                RatingOutOf={RatingOutOf}
                                RatingList={RatingList}
                            />


                        </div>
                        <div className='col-lg-4 col-12 detail-tab'>

                            <CoursePriceTab
                                id={id}
                                CoverImage={CoverImage}
                                Price={Price}
                                Sellingprice={SellingPrice}
                                StartDate={StartDate}
                            />


                        </div>
                    </div>

                    <div className="row d-flex mt-2">
                        <Recommendation Category={Category} id={id}/>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CourseDetail
