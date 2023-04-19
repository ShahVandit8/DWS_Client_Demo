import {React, useState} from 'react'
import moment from 'moment'

import CourseModuleAccordian from '../../components/Accordion/CourseModuleAccordian';
import Star from '../../components/Rating-Star/Star';
import Ratings from '../../components/Rating-Star/Rating';
import ReviewDisplay from '../../components/Review/ReviewDisplay';


function CourseDetailsTab(props) {

    const [rating, setRating] = useState(0)

    // Catch Rating value
    const handleRating = (rate) => {
        setRating(rate)
    }

    const handleReset = () => {
        // Set the initial value
        setRating(0)
    }

    const List = [
        { id: 0, Title: 'Understand the basics of JavaScript programming 1' },
        { id: 1, Title: 'Understand the basics of JavaScript programming 2' },
        { id: 2, Title: 'Understand the basics of JavaScript programming 3' },
    ]

    const List2 = [
        { id: 0, Title: 'History and Introduction 1' },
        { id: 1, Title: 'History and Introduction 2' },
        { id: 2, Title: 'History and Introduction 3' },
    ]

    const { Modules, LongDescription, Rating, RatingOutOf, RatingList } = props;

    console.log(Modules)

    return (
        <>
            <div className='card' style={{ border: 0, backgroundColor: '#fff' }}>
                <div className='card-header' style={{ backgroundColor: '#fff' }}>
                    <ul className="nav nav-pills" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a
                                className="nav-link active"
                                id="module-tab"
                                data-toggle="tab"
                                href="#module"
                                role="tab"
                                aria-controls="module"
                                aria-selected="true"
                            >
                                Modules
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                id="description-tab"
                                data-toggle="tab"
                                href="#description"
                                role="tab"
                                aria-controls="description"
                                aria-selected="false"
                            >
                                Description
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                id="reviews-tab"
                                data-toggle="tab"
                                href="#reviews"
                                role="tab"
                                aria-controls="reviews"
                                aria-selected="false"
                            >
                                Reviews
                            </a>
                        </li>
                    </ul>

                </div>

                <div className="card-body">
                    <div className="tab-content" id="myTabContent">
                        <div
                            className="tab-pane fade show active"
                            id="module"
                            role="tabpanel"
                            aria-labelledby="module-tab"
                        >
                            <div className="accordion accordion-flush" id="accordionFlushExample" style={{ outline: 'none' }}>

                                {
                                    Modules.map(item => (
                                        <CourseModuleAccordian
                                            id={item.id}
                                            ModuleName={item.ModuleName}
                                            ModuleGoal={item.ModuleGoal}
                                            List={item.ModuleObjective}
                                            ModuleObjective={item.ModuleObjective}
                                            ModuleTopics={item.ModuleTopics}
                                        />
                                    ))
                                }
                            
                            </div>

                        </div>
                        <div
                            className="tab-pane fade"
                            id="description"
                            role="tabpanel"
                            aria-labelledby="description-tab"
                        >
                            <p className="text-dark">{LongDescription}</p>
                        </div>
                        <div
                            className="tab-pane fade"
                            id="reviews"
                            role="tabpanel"
                            aria-labelledby="reviews-tab"
                        >
                            {/* <h1 className="text-dark">Reviews</h1> */}
                            <div className="container-fluid py-3">
                                <div className="row">
                                    <div className="col-6">
                                        <span className="text-dark h5">How students rated this courses</span>
                                    </div>
                                    <div className="col-6 d-flex text-dark">
                                        <Star rating={Rating} size="20px"/>
                                        <span className='ml-3 mr-1' style={{ fontSize: '18px' }}>{Rating}</span>
                                        <span className='mr-1' style={{ fontSize: '12px', color: 'grey' }}> ({RatingOutOf})</span>
                                    </div>
                                    <div className="row my-5">
                                        <span className="text-dark" style={{ fontSize: '19px' }}>Reviews</span>
                                    </div>

                                    {
                                        RatingList.map(item => (
                                            <ReviewDisplay profilepicture={item.profileimg} username={item.StudentName} time={moment(item.Date).fromNow()} rating={item.Rating} description={item.Description} />
                                        ))
                                    }

                                    {/* <div>
                                        <ReviewDisplay profilepicture="/img/profile1.jpeg" username="Sanaja Shah" time='5 Days ago' rating='5' description='Very Good Course' />
                                    </div> */}

                                </div>
                            </div>

                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}

export default CourseDetailsTab
