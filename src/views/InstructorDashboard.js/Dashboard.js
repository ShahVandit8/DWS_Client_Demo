import { React, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getCoursesByInstructorId, getAttendanceListByOnlyDate, getStudentsAsMultipleCourse, getEnrollmentsByMultiCourseId, getFilesByMultiCourse } from '../../services/api';

import moment from 'moment';
import jwtDecode from 'jwt-decode';
import Loading from '../../layouts/LoadingScreen/Loading';

const Dashboard = () => {

    useEffect(() => {

        const token = sessionStorage.getItem('InstructorToken')
        if (token) {
            const user = jwtDecode(token)
            if (!user) {
                sessionStorage.removeItem('InstructorToken')
            }
            else {
                const userDetails = sessionStorage.getItem('Instructor');
                const userDets = JSON.parse(userDetails)
                setUserId((userDets._id))
                getCourseList(userDets._id);
                console.log(userDets._id)
            }
        }


        getTodaysAttendance();

    }, [])

    const [userid, setUserId] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const [courses, setCourses] = useState([])
    const [attendance, setAttendance] = useState([])
    const [student, setStudent] = useState([])

    const [enrollment, setEnrollment] = useState(0);
    const [allenrollment, setAllEnrollment] = useState([]);

    const [filescount, setFilesCount] = useState(0)

    const getCourseList = async (id) => {

        setLoading(true)
        const result = await getCoursesByInstructorId(id)
        if (result) {
            setCourses(result.data)
            console.log(result.data)

            const array = []
            const result1 = await result.data.map(item => {
                array.push(item._id)
                // setArray(oldArray => [...oldArray, item._id])
            })

            Promise.all(result1).then(async action => {
                const result2 = await getStudentsAsMultipleCourse({ array })
                if (result2) {
                    setStudent(result2.data)
                }


                let enrolsmentlist = await getEnrollmentsByMultiCourseId({ array });
                if (enrolsmentlist) {
                    let count = enrolsmentlist.data.length
                    setEnrollment(Number(count))
                    setAllEnrollment((enrolsmentlist.data).reverse())
                }

                const files = await getFilesByMultiCourse({ array })
                if (files.data.data) {
                    setFilesCount(files.data.data.length)
                }

            }).catch(err => {
                alert(err)
            })
        }
    }

    const getTodaysAttendance = async () => {
        const date = new Date();
        const list = await getAttendanceListByOnlyDate({ date })
        setAttendance(list.data.data)
        setLoading(false)
    }


    return (
        <div>
            {
                loading ?
                    <Loading />
                    :
                    <>
                        <div className="container-fluid">
                            {/* <!-- Page Heading --> */}
                            <div style={{ paddingLeft: 13 }}>
                                < div className="d-sm-flex align-items-center justify-content-between mb-4" style={{ color: '#DDDFEB' }} >

                                    <h1 className="h4 mb-0" style={{ color: '#1E293B' }}>Instructor Dashboard</h1>
                                </div >
                            </div>
                            {/* <!-- Content Row --> */}

                            <hr style={{ height: '1%' }} />

                            <div className="row p-2">

                                <Link className="col-xl-3 col-sm-6 col-12 mb-2" to="/dashboard/instructor/courses" style={{ color: 'inherit', textDecoration: 'none' }}>
                                    <div className="card shadow" style={{ border: '0' }}>
                                        <div className="card-content">
                                            <div className="card-body">
                                                <div className="media d-flex">
                                                    <div className="media-body text-left">
                                                        {
                                                            loading ?
                                                                <>
                                                                    <div className="loading">
                                                                        <div className="bar"></div>
                                                                    </div>
                                                                    <div className="loading mt-4">
                                                                        <div className="bar"></div>
                                                                    </div>
                                                                </>
                                                                :
                                                                <>
                                                                    <h4 className="">{courses ? courses.length : 0}</h4>
                                                                    <span>My Courses</span>
                                                                </>
                                                        }
                                                    </div>
                                                    <div className="align-self-center">
                                                        <i className="bi bi-folder  fa-2x  font-large-2 float-right" style={{ color: '#754FFE' }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                <Link className="col-xl-3 col-sm-6 col-12 mb-2" to="/dashboard/instructor/students" style={{ color: 'inherit', textDecoration: 'none' }}>
                                    <div className="card shadow" style={{ border: '0' }}>
                                        <div className="card-content">
                                            <div className="card-body">
                                                <div className="media d-flex">
                                                    <div className="media-body text-left">
                                                        {
                                                            loading ?
                                                                <>
                                                                    <div className="loading">
                                                                        <div className="bar"></div>
                                                                    </div>
                                                                    <div className="loading mt-4">
                                                                        <div className="bar"></div>
                                                                    </div>
                                                                </>
                                                                :
                                                                <>
                                                                    <h4 className="">{student ? student.length : 0}</h4>
                                                                    <span>Student Enrolled</span>
                                                                </>
                                                        }
                                                    </div>
                                                    <div className="align-self-center">
                                                        <i className="bi bi-person-check fa-2x  font-large-2 float-right" style={{ color: '#754FFE' }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                <Link to="/dashboard/instructor/enrollments" className="col-xl-3 col-sm-6 col-12 mb-2" style={{ color: 'inherit', textDecoration: 'none' }}>
                                    <div className="card shadow" style={{ border: '0' }}>
                                        <div className="card-content">
                                            <div className="card-body">
                                                <div className="media d-flex">
                                                    <div className="media-body text-left">
                                                        {
                                                            loading ?
                                                                <>
                                                                    <div className="loading">
                                                                        <div className="bar"></div>
                                                                    </div>
                                                                    <div className="loading mt-4">
                                                                        <div className="bar"></div>
                                                                    </div>
                                                                </>
                                                                :
                                                                <>
                                                                    <h4 className="">{enrollment}</h4>
                                                                    <span>Total Enrollments</span>
                                                                </>

                                                        }
                                                    </div>
                                                    <div className="align-self-center">
                                                        <i className="bi bi-clipboard2-check fa-2x font-large-2 float-right" style={{ color: '#754FFE' }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                <Link to="/dashboard/instructor/resources" className="col-xl-3 col-sm-6 col-12 mb-2" style={{ color: 'inherit', textDecoration: 'none' }}>
                                    <div className="card shadow" style={{ border: '0' }}>
                                        <div className="card-content">
                                            <div className="card-body">
                                                <div className="media d-flex">
                                                    <div className="media-body text-left">
                                                        {
                                                            loading ?
                                                                <>
                                                                    <div className="loading">
                                                                        <div className="bar"></div>
                                                                    </div>
                                                                    <div className="loading mt-4">
                                                                        <div className="bar"></div>
                                                                    </div>
                                                                </>
                                                                :
                                                                <>
                                                                    <h4 className="">{filescount}</h4>
                                                                    <span>Total File Resources</span>
                                                                </>

                                                        }
                                                    </div>
                                                    <div className="align-self-center">
                                                        <i className="bi bi-file-earmark-check  fa-2x font-large-2 float-right" style={{ color: '#754FFE' }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                            </div>

                            <div className="row p-2">

                                {/* Recent Order List */}
                                <div className="col-md-4 col-12 mt-2">
                                    <div className="card shadow" style={{ border: '0' }}>
                                        <div className="card-header row m-0 py-3 bg-white" style={{}}>
                                            <div className="col-12 col-md-8 p-0">
                                                <span className="align-middle">Course Completion</span>
                                            </div>
                                            <div className="col-12 col-md-4 p-0">
                                                <Link to="/dashboard/instructor/courses/completion-status" style={{ borderRadius: '0' }} className='btn btn-sm btn-outline-dark float-center float-md-right '>View All</Link>
                                            </div>

                                        </div>
                                        <div className="card-body p-0" style={{ "overflow-y": 'hidden', height: '350px' }}>
                                            <table className="table">
                                                <tbody>
                                                    {
                                                        loading ?
                                                            <>
                                                                <div className="loading">
                                                                    <div className="bar"></div>
                                                                </div>
                                                                <div className="loading mt-4">
                                                                    <div className="bar"></div>
                                                                </div>
                                                                <div className="loading mt-4">
                                                                    <div className="bar"></div>
                                                                </div>
                                                                <div className="loading mt-4">
                                                                    <div className="bar"></div>
                                                                </div>
                                                                <div className="loading mt-4">
                                                                    <div className="bar"></div>
                                                                </div>
                                                                <div className="loading mt-4">
                                                                    <div className="bar"></div>
                                                                </div>
                                                                <div className="loading mt-4">
                                                                    <div className="bar"></div>
                                                                </div>
                                                                <div className="loading mt-4">
                                                                    <div className="bar"></div>
                                                                </div>
                                                                <div className="loading mt-4">
                                                                    <div className="bar"></div>
                                                                </div>
                                                            </>
                                                            :
                                                            courses.map(item => (
                                                                <tr>
                                                                    <td className='align-middle'>
                                                                        <Link to={"/dashboard/instructor/courses/manage/" + item._id} className="d-flex align-items-center text-decoration-none mx-1" style={{ textDecoration: "none" }}>
                                                                            <img className="img-fluid rounded" src={process.env.REACT_APP_SERVER_FILE + item.CoverImage} alt="" style={{ height: '2.5rem' }} />
                                                                            <div className="pl-3 m-0 w-100">
                                                                                <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#1E293B' }}>{item.Name}</span>
                                                                                <div className="progress my-auto" style={{ height: '5px' }}>
                                                                                    <div
                                                                                        className="progress-bar"
                                                                                        role="progressbar"
                                                                                        style={{ backgroundColor: '#754FFE', width: item.Completion + "%" }}
                                                                                        aria-valuenow={20}
                                                                                        aria-valuemin={0}
                                                                                        aria-valuemax={100}
                                                                                    />
                                                                                </div>
                                                                                {/* <p className="text-body my-auto" style={{ fontSize: '12px' }}>• {item.Category}</p> */}
                                                                            </div>
                                                                        </Link>
                                                                    </td>
                                                                    <td className='align-middle text-center' >
                                                                        <span className="badge" style={{ fontSize: '14px', backgroundColor: '#E6F6FD', color: '#22AAED', borderRadius: '0' }}>{item.Completion}%</span>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                    }
                                                </tbody>
                                            </table>

                                        </div>
                                    </div>
                                </div>


                                {/*Notification List */}
                                <div className="col-md-4 col-12 mt-2">
                                    <div className="card shadow" style={{ border: '0' }}>
                                        <div className="card-header row m-0 py-3 bg-white" style={{}}>
                                            <div className="col-12 col-md-8 p-0">
                                                <span className="align-middle">Recent Enrollments</span>
                                            </div>
                                            <div className="col-12 col-md-4 p-0">
                                                <Link to="/dashboard/instructor/enrollments" style={{ borderRadius: '0' }} className='btn btn-sm btn-outline-dark float-center float-md-right '>View All</Link>
                                            </div>

                                        </div>
                                        <div className="card-body p-0" style={{ "overflow-y": 'hidden', height: '350px' }}>
                                            <table className="table">
                                                <tbody>
                                                    {
                                                        allenrollment.length ?
                                                            allenrollment.map(item => (
                                                                student.filter((item1) => item1._id == item.Student_id).map(item2 => (
                                                                    <tr>
                                                                        <td className="align-middle">
                                                                            <Link className="d-flex align-items-center text-decoration-none mx-1" to={"/dashboard/instructor/users/" + (item2._id)} style={{ textDecoration: "none" }}>
                                                                                <img className="img-fluid" src={process.env.REACT_APP_SERVER_FILE + item2.ProfilePicture} alt="" style={{ height: '2.5rem', borderRadius: '50%' }} />
                                                                                <div className="pl-3 m-0">
                                                                                    <span className='text-dark' style={{ fontSize: '15px' }}>
                                                                                        {item2.Name} Enrolled in
                                                                                        {
                                                                                            courses.filter((item3) => item3._id == item.Course_id).map((item4) => (
                                                                                                <> {item4.Name}</>
                                                                                            ))
                                                                                        }
                                                                                    </span>
                                                                                    <p className="text-body my-auto px-1" style={{ fontSize: '11px', backgroundColor: 'rgba(117, 79, 254, 0.2)', width: 'fit-content' }}>• {moment(item.Enrollment_date).fromNow()}</p>
                                                                                </div>
                                                                            </Link>
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                            ))
                                                            :
                                                            <tr>
                                                                <td className="align-middle text-center">
                                                                    <span>No New Enrollments</span>
                                                                </td>
                                                            </tr>
                                                    }
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>
                                </div>

                                {/*Notification List */}
                                <div className="col-md-4 col-12 mt-2">
                                    <div className="card shadow" style={{ border: '0' }}>
                                        <div className="card-header row m-0 py-3 bg-white" style={{}}>
                                            <div className="col-12 col-md-8 p-0">
                                                <span className="align-middle">Today's Attendance</span>
                                            </div>
                                            <div className="col-12 col-md-4 p-0">
                                                <Link to="/dashboard/instructor/attendance" style={{ borderRadius: '0' }} className='btn btn-sm btn-outline-dark float-center float-md-right '>View All</Link>
                                            </div>

                                        </div>
                                        <div className="card-body p-0" style={{ "overflow-y": 'hidden', height: '350px' }}>
                                            <table className="table ">
                                                <tbody>
                                                    {
                                                        courses.map(item => (
                                                            <tr>
                                                                <td className='align-middle '>
                                                                    <Link to={`/dashboard/instructor/attendance/course/` + (item._id)} className="d-flex align-items-center text-decoration-none mx-1" style={{ textDecoration: "none" }}>
                                                                        <img className="img-fluid rounded" src={process.env.REACT_APP_SERVER_FILE + item.CoverImage} alt="" style={{ height: '2.5rem' }} />
                                                                        <div className="pl-3 m-0">
                                                                            <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#1E293B' }}>{item.Name}</span>
                                                                            <p className="text-body my-auto" style={{ fontSize: '12px' }}>• {item.Category}</p>
                                                                        </div>
                                                                    </Link>
                                                                </td>
                                                                <td className='align-middle text-center'>
                                                                    {
                                                                        attendance.filter((item1) => item1.Course_id == item._id).length ?
                                                                            attendance.filter((item1) => item1.Course_id == item._id).map(item2 => (
                                                                                <span className="badge" style={{ fontSize: '13px', backgroundColor: '#EBF5F0', color: '#38A169', borderRadius: '0' }}>{item2.Present_Student} out of {item2.Total_Student}</span>
                                                                            ))
                                                                            :
                                                                            <span className="badge" style={{ fontSize: '12px', backgroundColor: '#FBE9E9', color: '#DC2626', borderRadius: '0' }}>Not Updated</span>
                                                                    }
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }

                                                </tbody>
                                            </table>
                                        </div>

                                    </div>
                                </div>

                            </div>

                        </div>
                    </>
            }

        </div>
    )
}

export default Dashboard
