import { React, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getCourses, changeStatusofCourse } from '../../services/api';
import Loading from '../../layouts/LoadingScreen/Loading';

const CourseCompletion = () => {

    const [loading, setLoading] = useState(false)

    const [course, setCourse] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        getAllCourses();
    }, []);

    const getAllCourses = async () => {
        setLoading(true)
        let allCourse = await getCourses();
        setCourse(allCourse.data);
        setLoading(false)
    }

    return (
        <div className="px-3">
            {
                loading ?
                    <Loading />
                    :
                    <>
                        <div className='row' >
                            <div className='col-4'>
                                <h1 className="h4 mb-4">Courses Completion Status</h1>
                            </div>
                            <div className='col-5'>
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="Search course"
                                        style={{ borderRadius: '0' }}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    <div class="input-group-append">
                                        <button class="btn btn-dark" type="button" style={{ borderRadius: '0' }}>
                                            <i class="fa fa-search"></i>
                                        </button>
                                    </div>

                                </div>
                            </div>
                            <div className='col-3 text-right pr-5'>
                                <button onClick={() => navigate(-1)} className="btn btn-dark" style={{ borderRadius: '0' }}><i className="bi bi-chevron-left mr-1"></i>Back</button>
                            </div>
                        </div>

                        <div className="card" style={{ borderRadius: '0' }}>

                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col" style={{ width: '30%' }} className='pl-4'>Course</th>
                                        <th scope="col" style={{ width: '20%' }} className="text-center">Completion %</th>
                                        <th scope="col" style={{ width: '30%' }} className="text-center">Instructor</th>
                                        <th scope="col" style={{ width: '20%' }} className="text-center">Actions</th>
                                        {/* <th scope="col" className="text-center"> </th> */}
                                    </tr>
                                </thead>
                                <tbody className="p-2">
                                    {
                                        loading ?
                                            <>
                                                <tr>
                                                    <td className="loading">
                                                        <div className="bar"></div>
                                                    </td>
                                                    <td className="loading">
                                                        <div className="bar"></div>
                                                    </td>
                                                    <td className="loading">
                                                        <div className="bar"></div>
                                                    </td>
                                                    <td className="loading">
                                                        <div className="bar"></div>
                                                    </td>
                                                </tr>
                                            </>
                                            :
                                            course.length ?
                                                course.filter(value => {
                                                    if (search === '') {
                                                        return value
                                                    }
                                                    else if (value.Name.toLowerCase().includes(search.toLowerCase())) {
                                                        return value
                                                    }
                                                })
                                                    .map((item) => (
                                                        <>
                                                            <tr key={item._id}>
                                                                <td className='align-middle '>
                                                                    <Link to={`/dashboard/admin/courses/manage/` + (item._id)} className="d-flex align-items-center text-decoration-none mx-1" style={{ textDecoration: "none" }}>
                                                                        <img className="img-fluid rounded" src={process.env.REACT_APP_SERVER_FILE + item.CoverImage} alt="" style={{ height: '3.5rem' }} />
                                                                        <div className="pl-3 m-0" style={{ width: '100%' }}>
                                                                            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#1E293B' }}>{item.Name}</span>
                                                                            <div className="progress mb-2" style={{ height: '5px' }}>
                                                                                <div
                                                                                    className="progress-bar"
                                                                                    role="progressbar"
                                                                                    style={{ backgroundColor: '#754FFE', width: item.Completion + "%" }}
                                                                                    aria-valuenow={20}
                                                                                    aria-valuemin={0}
                                                                                    aria-valuemax={100}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </Link>
                                                                </td>
                                                                <td className='align-middle text-center'>
                                                                    <Link className="col-12" style={{ color: 'inherit' }}>
                                                                        <span className="ml-2" style={{ fontSize: '14px' }}>{item.Completion} %</span>
                                                                    </Link>
                                                                </td>
                                                                <td className='align-middle text-center'>
                                                                    <Link to={"/dashboard/admin/instructor/" + item.Instructor.id} className="col-12" style={{ color: 'inherit' }}>
                                                                        <img src={process.env.REACT_APP_SERVER_FILE + (item.Instructor.ProfilePhoto)} alt="" style={{ height: '2.2rem', borderRadius: '50%' }} />
                                                                        <span className="ml-3" style={{ fontSize: '14px' }}>{item.Instructor.Name}</span>
                                                                    </Link>
                                                                </td>

                                                                <td className='align-middle text-center'>
                                                                    <Link to={`/dashboard/admin/courses/manage/` + (item._id)} className="btn btn-dark" style={{ borderRadius: '0' }}>Manage</Link>
                                                                </td>
                                                            </tr>

                                                        </>
                                                    ))
                                                :
                                                <tr>
                                                    <td className="text-center text-dark" colspan="5">No Record Found</td>
                                                </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </>
            }

        </div>
    )
}

export default CourseCompletion
