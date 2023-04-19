import { React, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getCoursesByInstructorId, changeStatusofCourse } from '../../services/api';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../layouts/LoadingScreen/Loading';

const Courses = () => {

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const [course, setCourse] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);

        getAllCourses();
    }, []);

    const getAllCourses = async (id) => {
        setLoading(true)
        const userDetails = sessionStorage.getItem('Instructor');
        const userDets = JSON.parse(userDetails)
        let allCourse = await getCoursesByInstructorId(userDets._id);
        setCourse(allCourse.data)
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
                                <h1 className="h4 mb-4">Courses</h1>
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
                                        <th scope="col" className="text-center">Students</th>
                                        <th scope="col" className="text-center">Status</th>
                                        <th scope="col" className="text-center">Actions</th>
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
                                                                    <Link className="d-flex align-items-center text-decoration-none mx-1" to={"/dashboard/instructor/courses/manage/" + item._id} style={{ textDecoration: "none" }}>
                                                                        <img className="img-fluid rounded" src={process.env.REACT_APP_SERVER_FILE + item.CoverImage} alt="" style={{ height: '3rem' }} />
                                                                        <div className="pl-3 m-0">
                                                                            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#1E293B' }}>{item.Name}</span>
                                                                            <p className="text-body my-auto" style={{ fontSize: '13px' }}>• {item.Category}</p>
                                                                        </div>
                                                                    </Link>
                                                                </td>
                                                                <td className='align-middle text-center'>
                                                                    <span>{item.StudentCount}</span>
                                                                </td>
                                                                <td className='align-middle text-center'>
                                                                    <Link className="col-12" style={{ color: 'inherit' }}>
                                                                        {
                                                                            item.Status == 'Active' ?
                                                                                // <img src="/img/active.png" alt="" style={{ height: '0.7rem' }} />
                                                                                <span className="badge" style={{ fontSize: '13px', backgroundColor: '#EBF5F0', color: '#38A169', borderRadius: '0' }}>Active</span>
                                                                                :
                                                                                // <img src="/img/inactive.png" alt="" style={{ height: '0.7rem' }} />
                                                                                <span className="badge" style={{ fontSize: '13px', backgroundColor: '#FBE9E9', color: '#DC2626', borderRadius: '0' }}>Inactive</span>
                                                                        }
                                                                        {/* <img src="/img/active.png" alt="" style={{ height: '0.7rem' }} /> */}
                                                                        {/* <span className="ml-2" style={{ fontSize: '14px' }}>{item.Status}</span> */}
                                                                    </Link>
                                                                </td>
                                                                <td className='align-middle'>
                                                                    <div className="dropdown col-5 ml-2 mt-1 mx-auto" style={{ border: '0' }}>
                                                                        <span className="bi bi-three-dots-vertical" href="#" id="Dropdown1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></span>
                                                                        <div className="dropdown-menu  shadow " aria-labelledby="Dropdown1" style={{ border: '0' }}>
                                                                            <Link to={"/dashboard/instructor/courses/manage/" + item._id} className="dropdown-item">
                                                                                <i className="bi bi-gear mr-2" />
                                                                                Manage
                                                                            </Link>
                                                                        </div>
                                                                    </div>
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


            <ToastContainer
                position="top-center"
                autoClose={3000}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

        </div>
    )
}

export default Courses
