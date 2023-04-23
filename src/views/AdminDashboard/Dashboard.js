import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { getCourseCount, getInstructorCount, getCourses, getActiveCourses, getUsers, getRecentEnrollments, getTotalRevenue, getStudents, getInactiveCourses, getAttendanceListByOnlyDate } from '../../services/api';
import Loading from '../../layouts/LoadingScreen/Loading';

function Dashboard() {

    useEffect(() => {
        window.scrollTo(0, 0);
        getTotalCourseCount();
        getTotalInstructorCount();
        getAllCourseList();
        getActiveCourse();
        getUserscount();
        getEnrolmentCount();
        getRevenue();
        getInActiveCourse();
        getTodaysAttendance();

        getStudentsCount();
    }, []);

    const [loading, setLoading] = useState(false)

    const [totalcourse, setTotalCourse] = useState(0);
    const [totalinstructor, setTotalInstructor] = useState(0);
    const [courses, setCourses] = useState([])
    const [activeCourses, setActiveCourses] = useState(0);
    const [inactiveCourses, setInactiveCourses] = useState(0);
    const [enrollment, setEnrollment] = useState(0);
    const [revenue, setRevenue] = useState(0);
    const [users, setUsers] = useState(0);
    const [students, setStudents] = useState(0);
    const [allstudents, setAllStudents] = useState([]);
    const [allenrollment, setAllEnrollment] = useState([]);


    const [attendance, setAttendance] = useState([]);

    const getTotalCourseCount = async () => {
        setLoading(true);
        let CourseCount = await getCourseCount();
        setTotalCourse(Number(CourseCount.data));
    }
    const getTotalInstructorCount = async () => {
        let InstructorCount = await getInstructorCount();
        setTotalInstructor(Number(InstructorCount.data));
    }
    const getAllCourseList = async () => {
        let CourseList = await getCourses();
        setCourses(CourseList.data);
    }
    const getActiveCourse = async () => {
        let courselist = await getActiveCourses();
        let count = courselist.data.length
        setActiveCourses(Number(count))
    }
    const getInActiveCourse = async () => {
        let courselist = await getInactiveCourses();
        let count = courselist.data.length
        setInactiveCourses(Number(count))
    }
    const getUserscount = async () => {
        let userlist = await getUsers();
        let count = userlist.data.length
        setUsers(Number(count))
    }
    const getEnrolmentCount = async () => {
        let enrolsmentlist = await getRecentEnrollments();
        let count = enrolsmentlist.data.length
        setEnrollment(Number(count))
        setAllEnrollment(enrolsmentlist.data)
    }
    const getRevenue = async () => {
        let enrolsmentlist = await getTotalRevenue();
        setRevenue(Number(enrolsmentlist.data))
    }
    const getStudentsCount = async () => {
        let studentlist = await getStudents();
        setStudents(Number(studentlist.data.length))
        setAllStudents(studentlist.data)
        setLoading(false);
    }

    const getTodaysAttendance = async () => {
        const date = new Date();
        const list = await getAttendanceListByOnlyDate({ date })
        setAttendance(list.data.data)
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

                                    <h1 className="h4 mb-0" style={{ color: '#1E293B' }}>Admin Dashboard</h1>
                                </div >
                            </div>
                            {/* <!-- Content Row --> */}

                            <hr style={{ height: '1%' }} />

                            <div className="row p-2">

                                <Link className="col-xl-3 col-sm-6 col-12 mb-2" to="/dashboard/admin/courses/all" style={{ color: 'inherit', textDecoration: 'none' }}>
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
                                                                    <h4 className="">{totalcourse}</h4>
                                                                    <span>Total Courses</span>
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

                                <Link to="/dashboard/admin/courses/active" className="col-xl-3 col-sm-6 col-12  mb-2" style={{ color: 'inherit', textDecoration: 'none' }} >
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
                                                                    <h4 className="">{activeCourses}</h4>
                                                                    <span>Active Courses</span>
                                                                </>

                                                        }
                                                    </div>
                                                    <div className="align-self-center">
                                                        <i className="bi bi-folder-check   fa-2x font-large-2 float-right" style={{ color: '#754FFE' }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                <Link to="/dashboard/admin/courses/inactive" className="col-xl-3 col-sm-6 col-12  mb-2" style={{ color: 'inherit', textDecoration: 'none' }}>
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
                                                                    <h4 className="">{inactiveCourses}</h4>
                                                                    <span>Inactive Courses</span>
                                                                </>

                                                        }
                                                    </div>
                                                    <div className="align-self-center">
                                                        <i className="bi bi-folder-x  fa-2x font-large-2 float-right" style={{ color: '#754FFE' }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                <Link to="/dashboard/admin/users" style={{ color: 'inherit' }} className="col-xl-3 col-sm-6 col-12  mb-2">
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
                                                                    <h4 className="">{users}</h4>
                                                                    <span>Register Users</span>
                                                                </>

                                                        }
                                                    </div>
                                                    <div className="align-self-center">
                                                        <i className="bi bi-people  fa-2x font-large-2 float-right" style={{ color: '#754FFE' }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                            </div>

                            <div className="row p-2">

                                <Link className="col-xl-3 col-sm-6 col-12 mb-2" to="/dashboard/admin/students" style={{ color: 'inherit', textDecoration: 'none' }}>
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
                                                                    <h4 className="">{students}</h4>
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

                                <Link to="/dashboard/admin/instructor" className="col-xl-3 col-sm-6 col-12  mb-2" style={{ color: 'inherit', textDecoration: 'none' }} >
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
                                                                    <h4 className="">{totalinstructor}</h4>
                                                                    <span>Total Instructor</span>
                                                                </>

                                                        }
                                                    </div>
                                                    <div className="align-self-center">
                                                        <i className="bi bi-person-video3  fa-2x font-large-2 float-right" style={{ color: '#754FFE' }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                <Link to="/dashboard/admin/enrollments" className="col-xl-3 col-sm-6 col-12 mb-2" style={{ color: 'inherit', textDecoration: 'none' }}>
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

                                <div className="col-xl-3 col-sm-6 col-12  mb-2">
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
                                                                    <h4 className="">₹ {revenue}</h4>
                                                                    <span>Total Earnings</span>
                                                                </>

                                                        }
                                                    </div>
                                                    <div className="align-self-center">
                                                        <i className="bi bi-currency-rupee fa-2x font-large-2 float-right" style={{ color: '#754FFE' }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

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
                                                <Link to="courses/completion-status" style={{ borderRadius: '0' }} className='btn btn-sm btn-outline-dark float-center float-md-right '>View All</Link>
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
                                                                        <Link to={"/dashboard/admin/courses/manage/" + item._id} className="d-flex align-items-center text-decoration-none mx-1" style={{ textDecoration: "none" }}>
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
                                                                    {/* <h4 className="small font-weight-bold">
                                    {item.Name} <span className="float-right">{item.Completion}%</span>
                                </h4>
                                <div className="progress mb-4" style={{ height: '5px' }}>
                                    <div
                                        className="progress-bar"
                                        role="progressbar"
                                        style={{ backgroundColor: '#754FFE', width: item.Completion + "%" }}
                                        aria-valuenow={20}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    />
                                </div> */}
                                                                </tr>
                                                            ))
                                                    }
                                                </tbody>
                                            </table>



                                            {/* <h4 className="small font-weight-bold">
                    Name <span className="float-right">20%</span>
                </h4>
                <div className="progress mb-4" style={{ height: '5px' }}>
                    <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: "20%" }}
                        aria-valuenow={20}
                        aria-valuemin={0}
                        aria-valuemax={100}
                    />
                </div> */}


                                            {/* {
        course.map(item => (
            <>
                <h4 className="small font-weight-bold">
                    {item.Title} <span className="float-right">{item.Status}%</span>
                </h4>
                <div className="progress mb-4">
                    <div
                        className="progress-bar bg-warning"
                        role="progressbar"
                        style={{ width: (item.Status)+"%" }}
                        aria-valuenow={20}
                        aria-valuemin={0}
                        aria-valuemax={100}
                    />
                </div>
            </>
        ))
    } */}

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
                                                <Link to="/dashboard/admin/enrollments" style={{ borderRadius: '0' }} className='btn btn-sm btn-outline-dark float-center float-md-right '>View All</Link>
                                            </div>

                                        </div>
                                        <div className="card-body p-0" style={{ "overflow-y": 'hidden', height: '350px' }}>
                                            <table className="table">
                                                <tbody>
                                                    {
                                                        allenrollment.length ?
                                                            allenrollment.map(item => (
                                                                allstudents.filter((item1) => item1._id == item.Student_id).map(item2 => (
                                                                    <tr>
                                                                        <td className="align-middle">
                                                                            <Link className="d-flex align-items-center text-decoration-none mx-1" to={"/dashboard/admin/users/" + (item2._id)} style={{ textDecoration: "none" }}>
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
                                                    {/* <a className="dropdown-item d-flex align-items-center justify-content-center text-center my-2" href="#">
                            <div>
                                <span className="font-weight-bold">No New Notifications!</span>
                            </div>
                        </a> */}
                                                </tbody>
                                            </table>
                                        </div>
                                        {/* <a href="#" class="btn btn-md btn-danger btn-circle" style={{position: 'static',  }}><i class="fa fa-plus"></i></a> */}
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
                                                <Link to="attendance" style={{ borderRadius: '0' }} className='btn btn-sm btn-outline-dark float-center float-md-right '>View All</Link>
                                            </div>

                                        </div>
                                        <div className="card-body p-0" style={{ "overflow-y": 'hidden', height: '350px' }}>
                                            <table className="table ">
                                                <tbody>
                                                    {
                                                        courses.map(item => (
                                                            <tr>
                                                                <td className='align-middle '>
                                                                    <Link to={"/dashboard/admin/attendance/course/" + item._id} className="d-flex align-items-center text-decoration-none mx-1" style={{ textDecoration: "none" }}>
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
                                                                    {/* {
                                            attendance.filter((item1) => item1.Course_id == item._id).map(item2 => (
                                                <span style={{ fontSize: '14px' }}>{item2.Present_Student} out of {item2.Total_Student}</span>
                                            ))
                                        } */}
                                                                    {/* <span style={{ fontSize: '14px'}}>35 out of 40</span> */}
                                                                    {/* <span style={{ fontSize: '14px'}}>Not Updated</span> */}
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                    {/* <a className="dropdown-item d-flex align-items-center justify-content-center text-center my-2" href="#">
                            <div>
                                <span className="font-weight-bold">No New Notifications!</span>
                            </div>
                        </a> */}
                                                </tbody>
                                            </table>
                                        </div>
                                        {/* <a href="#" class="btn btn-md btn-danger btn-circle" style={{position: 'static',  }}><i class="fa fa-plus"></i></a> */}
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
