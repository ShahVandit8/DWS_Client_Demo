import { React, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getCourses, changeStatusofCourse } from '../../services/api';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../layouts/LoadingScreen/Loading';


function AllCourses() {

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const [course, setCourse] = useState([]);
    const [search, setSearch] = useState("");

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

    const changeCourseStatus = async (id) => {

        if (window.confirm("Do you want to change the status of the course") == true) {
            try {
                const editCourse = await changeStatusofCourse(id)

                if (editCourse) {
                    toast('✅ Course Status Changed')
                    window.setTimeout(PageReload, 3000)
                }
                else {
                    toast.error('Sorry Someting went wrong')
                }
            }
            catch (err) {
                toast.error('Error : ' + err)
            }
        } else {
            PageReload();
        }

    }

    const PageReload = () => {
        navigate(0)
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
                                <h1 className="h4 mb-4"> All Courses</h1>
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
                                <Link to="/dashboard/admin/courses/create" className="btn btn-dark" style={{ borderRadius: '0' }}>Add New Course +</Link>
                            </div>
                        </div>

                        <div className="card" style={{ borderRadius: '0' }}>

                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col" style={{ width: '30%' }} className='pl-4'>Course</th>
                                        <th scope="col" className="text-center">Instructor</th>
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
                                                                    <Link to={"/dashboard/admin/courses/manage/" + item._id} className="d-flex align-items-center text-decoration-none mx-1" style={{ textDecoration: "none" }}>
                                                                        <img className="img-fluid rounded" src={process.env.REACT_APP_SERVER_FILE + item.CoverImage} alt="" style={{ height: '3rem' }} />
                                                                        <div className="pl-3 m-0">
                                                                            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#1E293B' }}>{item.Name}</span>
                                                                            <p className="text-body my-auto" style={{ fontSize: '13px' }}>• {item.Category}</p>
                                                                        </div>
                                                                    </Link>
                                                                </td>
                                                                <td className='align-middle text-center'>
                                                                    <Link to={"/dashboard/admin/instructor/" + item.Instructor.id} className="col-12" style={{ color: 'inherit' }}>
                                                                        <img src={process.env.REACT_APP_SERVER_FILE + (item.Instructor.ProfilePhoto)} alt="" style={{ height: '2.2rem', borderRadius: '50%' }} />
                                                                        <span className="ml-3" style={{ fontSize: '14px' }}>{item.Instructor.Name}</span>
                                                                    </Link>
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
                                                                            <a href={`/course/` + (item._id)} target="_blank" className="dropdown-item">
                                                                                <i className="bi bi-eye mr-2 " />
                                                                                View on website
                                                                            </a>
                                                                            <Link to={"/dashboard/admin/courses/edit/" + item._id} className="dropdown-item">
                                                                                <i className="bi bi-pencil-square mr-2 " />
                                                                                Edit
                                                                            </Link>
                                                                            <Link to={"/dashboard/admin/courses/manage/" + item._id} className="dropdown-item">
                                                                                <i className="bi bi-gear mr-2" />
                                                                                Manage
                                                                            </Link>
                                                                            <div className="dropdown-divider" />
                                                                            <button onClick={() => changeCourseStatus(item._id)} className="dropdown-item">
                                                                                <i className="bi bi-toggle2-on mr-2 " />
                                                                                Change Status
                                                                            </button>
                                                                        </div>
                                                                    </div>

                                                                    {/* <button type="button" className="btn btn-danger" style={{ marginRight: 5 }} */}
                                                                    {/* //  onClick={() => deleteCourseDetails(item._id)} */}
                                                                    {/* ><i class="fa fa-trash-alt"></i> Delete</button> */}
                                                                    {/* <Link to={`/dashboard/admin/managecourse/` + (item._id)} className="btn btn-warning"><i class="fa fa-cog"></i> Manage</Link> */}
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

export default AllCourses
