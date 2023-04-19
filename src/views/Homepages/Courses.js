import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { NavHashLink } from 'react-router-hash-link'
import { getActiveCourses, getITCourses, getMultimediaCourses } from '../../services/api'


import CourseGrid from '../../components/Cards/Courses/CourseGrid'

function Courses() {

    useEffect(() => {
        getAllCourses();
        getITCoursesList();
        getMultiCourses();
    }, [])

    const [courses, setCourses] = useState([])
    const [itcourses, setITCourses] = useState([])
    const [multicourses, setMulticourses] = useState([])
    const [loading, setLoading] = useState(false)

    const getAllCourses = async () => {
        setLoading(true)
        const courselist = await getActiveCourses()
        setCourses(courselist.data)
    }

    const getITCoursesList = async () => {
        const courselist = await getITCourses()
        setITCourses(courselist.data)
    }

    const getMultiCourses = async () => {
        const result = await getMultimediaCourses()
        setMulticourses(result.data)
        setLoading(false)
    }

    return (
        <>
            <section id="features" className="features">
                <div className="container" data-aos="fade-up">
                    <header className="section-header">
                        <h2>Courses</h2>
                        <p>Most Popular Courses</p>
                    </header>
                    {/* / row */}
                    {/* Feature Tabs */}
                    <div className="row feture-tabs" data-aos="fade-up">
                        <div className="col-lg-12">
                            {/* Tabs */}
                            <ul className="nav nav-pills mb-3">
                                <li>
                                    <a className="nav-link active" data-bs-toggle="pill" href="#allcourses">
                                        All
                                    </a>
                                </li>
                                <li>
                                    <a className="nav-link" data-bs-toggle="pill" href="#itcourses">
                                        I.T
                                    </a>
                                </li>
                                <li>
                                    <a className="nav-link" data-bs-toggle="pill" href="#multimediacourses">
                                        Multimedia
                                    </a>
                                </li>
                            </ul>
                            {/* End Tabs */}
                            {/* Tab Content */}
                            <div className="tab-content">
                                <div className="tab-pane fade show active" id="allcourses">
                                    <div className='row justify-content-center'>

                                        {
                                            loading ?
                                                <>
                                                    <div className="col-sm-6 col-md-3">
                                                        <div className="movie--isloading">
                                                            <div className="loading-image" />
                                                            <div className="loading-content">
                                                                <div className="loading-text-container">
                                                                    <div className="loading-main-text" />
                                                                    <div className="loading-sub-text" />
                                                                </div>
                                                                <div className="loading-btn" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6 col-md-3">
                                                        <div className="movie--isloading">
                                                            <div className="loading-image" />
                                                            <div className="loading-content">
                                                                <div className="loading-text-container">
                                                                    <div className="loading-main-text" />
                                                                    <div className="loading-sub-text" />
                                                                </div>
                                                                <div className="loading-btn" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6 col-md-3">
                                                        <div className="movie--isloading">
                                                            <div className="loading-image" />
                                                            <div className="loading-content">
                                                                <div className="loading-text-container">
                                                                    <div className="loading-main-text" />
                                                                    <div className="loading-sub-text" />
                                                                </div>
                                                                <div className="loading-btn" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6 col-md-3">
                                                        <div className="movie--isloading">
                                                            <div className="loading-image" />
                                                            <div className="loading-content">
                                                                <div className="loading-text-container">
                                                                    <div className="loading-main-text" />
                                                                    <div className="loading-sub-text" />
                                                                </div>
                                                                <div className="loading-btn" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                                :
                                                courses.map((item) => (
                                                    <CourseGrid id={item._id} Title={item.Name} CoverPicture={process.env.REACT_APP_SERVER_FILE + item.CoverImage} Section={item.Modules.length} Duration={item.Duration} Rating={item.Rating} RatingOutOf={item.RatingOutOf} Price={item.SellingPrice} Level={item.Level} />
                                                ))
                                        }


                                    </div>
                                </div>

                                {/* End Tab 1 Content */}
                                <div className="tab-pane fade show" id="itcourses">
                                    <div className='row justify-content-center'>
                                        {
                                            loading ?
                                                <>
                                                    <div className="col-sm-6 col-md-3">
                                                        <div className="movie--isloading">
                                                            <div className="loading-image" />
                                                            <div className="loading-content">
                                                                <div className="loading-text-container">
                                                                    <div className="loading-main-text" />
                                                                    <div className="loading-sub-text" />
                                                                </div>
                                                                <div className="loading-btn" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6 col-md-3">
                                                        <div className="movie--isloading">
                                                            <div className="loading-image" />
                                                            <div className="loading-content">
                                                                <div className="loading-text-container">
                                                                    <div className="loading-main-text" />
                                                                    <div className="loading-sub-text" />
                                                                </div>
                                                                <div className="loading-btn" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6 col-md-3">
                                                        <div className="movie--isloading">
                                                            <div className="loading-image" />
                                                            <div className="loading-content">
                                                                <div className="loading-text-container">
                                                                    <div className="loading-main-text" />
                                                                    <div className="loading-sub-text" />
                                                                </div>
                                                                <div className="loading-btn" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6 col-md-3">
                                                        <div className="movie--isloading">
                                                            <div className="loading-image" />
                                                            <div className="loading-content">
                                                                <div className="loading-text-container">
                                                                    <div className="loading-main-text" />
                                                                    <div className="loading-sub-text" />
                                                                </div>
                                                                <div className="loading-btn" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                                :
                                                itcourses.map((item) => (
                                                    <CourseGrid id={item._id} Title={item.Name} CoverPicture={process.env.REACT_APP_SERVER_FILE + item.CoverImage} Section={item.Modules.length} Duration={item.Duration} Rating={item.Rating} RatingOutOf={item.RatingOutOf} Price={item.SellingPrice} Level={item.Level} />
                                                ))
                                        }
                                    </div>
                                </div>

                                {/* End Tab 2 Content */}
                                <div className="tab-pane fade show" id="multimediacourses">
                                    <div className='row justify-content-center'>
                                        {
                                            loading ?
                                                <>
                                                    <div className="col-sm-6 col-md-3">
                                                        <div className="movie--isloading">
                                                            <div className="loading-image" />
                                                            <div className="loading-content">
                                                                <div className="loading-text-container">
                                                                    <div className="loading-main-text" />
                                                                    <div className="loading-sub-text" />
                                                                </div>
                                                                <div className="loading-btn" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6 col-md-3">
                                                        <div className="movie--isloading">
                                                            <div className="loading-image" />
                                                            <div className="loading-content">
                                                                <div className="loading-text-container">
                                                                    <div className="loading-main-text" />
                                                                    <div className="loading-sub-text" />
                                                                </div>
                                                                <div className="loading-btn" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6 col-md-3">
                                                        <div className="movie--isloading">
                                                            <div className="loading-image" />
                                                            <div className="loading-content">
                                                                <div className="loading-text-container">
                                                                    <div className="loading-main-text" />
                                                                    <div className="loading-sub-text" />
                                                                </div>
                                                                <div className="loading-btn" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6 col-md-3">
                                                        <div className="movie--isloading">
                                                            <div className="loading-image" />
                                                            <div className="loading-content">
                                                                <div className="loading-text-container">
                                                                    <div className="loading-main-text" />
                                                                    <div className="loading-sub-text" />
                                                                </div>
                                                                <div className="loading-btn" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                                :
                                                multicourses.map((item) => (
                                                    <CourseGrid id={item._id} Title={item.Name} CoverPicture={process.env.REACT_APP_SERVER_FILE + item.CoverImage} Section={item.Modules.length} Duration={item.Duration} Rating={item.Rating} RatingOutOf={item.RatingOutOf} Price={item.SellingPrice} Level={item.Level} />
                                                ))
                                        }
                                    </div>
                                </div>
                                {/* End Tab 3 Content */}
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <img src="assets/img/features-2.png" className="img-fluid" alt="" />
                        </div>
                    </div>
                    {/* End Feature Tabs */}
                    {/* Feature Icons */}
                    {/* End Feature Icons */}
                </div>
            </section>
        </>
    )
}

export default Courses
