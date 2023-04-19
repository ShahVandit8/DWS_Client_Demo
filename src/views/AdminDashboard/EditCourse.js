import { React, useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getCoursesByID } from '../../services/api.js'

import Page1 from './EditCourseForm/Page1';
import Page2 from './EditCourseForm/Page2';
import Page3 from './EditCourseForm/Page3';
import Loading from '../../layouts/LoadingScreen/Loading.js';

const EditCourse = () => {

    useEffect(() => {
        getdetailsofcourse();
    }, [])

    const CourseDefaultValues = {
        Name: '',
        CoverImage: '',
        Category: '',
        ShortDescription: '',
        Level: '',
        Modules: [],
        LongDescription: '',
        Price: '',
        SellingPrice: '',
        Instructor: {},
        Duration: '',
        StartDate: '',
        Timings: '',
    }

    const navigate = useNavigate();
    const [course, setCourse] = useState([]);
    const [modules, setModules] = useState([]);
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false)
    const [page, setpage] = useState(1)
    const { id } = useParams();

    const onValueChange = (e) => {
        setCourse({ ...course, [e.target.name]: e.target.value })
        console.log(course)
    }

    const getdetailsofcourse = async () => {
        setLoading(true)
        const coursedetail = await getCoursesByID(id);
        setCourse(coursedetail.data)
        setModules(coursedetail.data.Modules)
        setImage(process.env.REACT_APP_SERVER_FILE + coursedetail.data.CoverImage)
        setLoading(false)
    }

    return (
        <div className="px-3">
            {
                loading ?
                    <Loading />
                    :
                    <>
                        <div className='row'>
                            <div className='col-9'>
                                <h1 className="h4 mb-4"> Edit Course</h1>
                            </div>
                            <div className='col-3 text-right pr-5'>
                                <button onClick={() => navigate(-1)} className="btn btn-dark" style={{ borderRadius: '0' }}><i className="bi bi-chevron-left mr-1"></i>Back</button>
                            </div>
                        </div>
                        <div className='container'>
                            <div className="row border">
                                <div className="card" style={{ borderRadius: '0' }}>
                                    <div className="card-body">
                                        <div className="row text-center">
                                            <div className="col-2 m-0">
                                                <button>
                                                    <button onClick={() => setpage(1)} className={"btn rounded-circle " + (page === 1 ? 'btn-dark' : 'btn-light')}>1</button>
                                                    <span className='ml-1'>Basic Details</span>
                                                </button>
                                            </div>
                                            <div className="col-2">
                                                <hr />
                                            </div>
                                            <div className="col-3 m-0">
                                                <button>
                                                    <button onClick={() => setpage(2)} className={"btn rounded-circle " + (page === 2 ? 'btn-dark' : 'btn-light')}>2</button>
                                                    <span className='ml-1'>Modules and Topics</span>
                                                </button>
                                            </div>
                                            <div className="col-2">
                                                <hr />
                                            </div>
                                            <div className="col-2 m-0">
                                                <button>
                                                    <button onClick={() => setpage(3)} className={"btn rounded-circle " + (page === 3 ? 'btn-dark' : 'btn-light')}>3</button>
                                                    <span className='ml-1'>Other Details</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {
                            page == 1 ?
                                <Page1 page={page} setpage={setpage} onValueChange={onValueChange} course={course} setCourse={setCourse} image={image} setImage={setImage} />
                                :
                                page == 2 ?
                                    <Page2 page={page} setpage={setpage} modules={modules} setModules={setModules} />
                                    :
                                    <Page3 page={page} setpage={setpage} onValueChange={onValueChange} course={course} setCourse={setCourse} modules={modules} />
                        }
                    </>
            }
        </div>
    )
}

export default EditCourse
