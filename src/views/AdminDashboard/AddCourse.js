import { React, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Page1 from './AddCourseForm/Page1';
import Page2 from './AddCourseForm/Page2';
import Page3 from './AddCourseForm/Page3';

const AddCourse = () => {

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

    const ModulesDefaultValues = [
        // {id: 0, ModuleName:'', ModuleGoal:'', ModuleObjective: [{id: 0, Title: ""}], ModuleTopics: [{id: 0, Title: ""}] }
    ]

    const navigate = useNavigate();
    const [course, setCourse] = useState(CourseDefaultValues);
    const [modules, setModules] = useState([]);
    const [page, setpage] = useState(1)

    const onValueChange = (e) => {
        setCourse({ ...course, [e.target.name]: e.target.value})
        console.log(course)
    }

    const onModulesChange = (e) => {
        // setModules({ ...modules, })
    }



    return (
        <div className="px-3">
            <div className='row'>
                <div className='col-9'>
                    <h1 className="h4 mb-4"> Create New Course</h1>
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
                                        <button className={"btn rounded-circle " + (page === 1 ? 'btn-dark' : 'btn-light')}>1</button>
                                        <span className='ml-1'>Basic Details</span>
                                    </button>
                                </div>
                                <div className="col-2">
                                    <hr />
                                </div>
                                <div className="col-3 m-0">
                                    <button>
                                    <button className={"btn rounded-circle " + (page === 2 ? 'btn-dark' : 'btn-light')}>2</button>
                                        <span className='ml-1'>Modules and Topics</span>
                                    </button>
                                </div>
                                <div className="col-2">
                                    <hr />
                                </div>
                                <div className="col-2 m-0">
                                    <button>
                                        <button className={"btn rounded-circle " + (page === 3 ? 'btn-dark' : 'btn-light')}>3</button>
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
                <Page1 page={page} setpage={setpage} onValueChange={onValueChange} course={course} setCourse={setCourse} /> 
                : 
                page == 2 ? 
                <Page2 page={page} setpage={setpage} modules={modules} setModules={setModules} /> 
                : 
                <Page3 page={page} setpage={setpage} onValueChange={onValueChange} course={course} setCourse={setCourse} modules={modules} />
            }

        </div>
    )
}

export default AddCourse
