import { React, useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    getCoursesByID, editCourseModulesStatus, getInstructors, editCourseInstructor, getStudentsAsPerCourse, getActiveEnrollments,
    getAttendanceByDateByCourse, getRevenueCourseWise, editEnrollmentPassedOut, getFilesByCourse,
} from '../../services/api';

import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../layouts/LoadingScreen/Loading';

const ManageCourses = () => {

    useEffect(() => {
        getCourseDetails();
        getInstructorsList();
        getStudentListForCourse();
        getAllEnrollments();
        getRevenue();
        getFilesData();
        getAttendees();
    }, [])

    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState([]);
    const [modules, setModules] = useState([]);
    const [instructor, setInstructor] = useState({})
    const [instructors, setInstructors] = useState([])
    const [enrollments, setEnrollments] = useState([])
    const [students, setStudents] = useState([])
    const [image, setImage] = useState('')
    const [update, setUpdate] = useState({
        Modules: [],
        Completion: 0
    })
    const [newinstructor, setnewinstructor] = useState({})

    const [attendees, setAttendees] = useState({})
    const [attendanceData, setAttendanceData] = useState([])
    const [present, setPresent] = useState(0)
    const [absent, setAbsent] = useState(0)
    const [totalstudent, setTotalStudent] = useState(0)
    const [available, setAvailable] = useState(false)
    const [earnings, setEarnings] = useState(0)
    const [loading, setLoading] = useState(false)

    const [files, setFiles] = useState([])
    const [filescount, setFilesCount] = useState(0)

    const getCourseDetails = async () => {
        setLoading(true)
        let courseDetails = await getCoursesByID(id)
        setCourse(courseDetails.data)
        setModules(courseDetails.data.Modules)
        setUpdate({ ...update, Modules: courseDetails.data.Modules, Completion: courseDetails.data.Completion })
        setInstructor(courseDetails.data.Instructor)
        setImage((process.env.REACT_APP_SERVER_FILE) + (courseDetails.data.Instructor.ProfilePhoto))
    }

    const getInstructorsList = async () => {
        let InstructorList = await getInstructors();
        setInstructors(InstructorList.data)
    }

    const getStudentListForCourse = async () => {
        const studentList = await getStudentsAsPerCourse(id)
        setStudents(studentList.data)
    }

    const getFilesData = async () => {
        const files = await getFilesByCourse(id)
        if (files.data.data) {
            setFiles(files.data.data)
            setFilesCount(files.data.data.length)
        }
    }

    const getAllEnrollments = async () => {
        const enrollmentlist = await getActiveEnrollments();
        setEnrollments(enrollmentlist.data)
    }

    const getRevenue = async () => {
        const amount = await getRevenueCourseWise(id);
        setEarnings(Number(amount.data))
    }

    const getAttendees = async () => {
        const date = new Date();
        const list = await getAttendanceByDateByCourse(id, { date })
        console.log(list)
        if (list.data.status === 'ok') {
            setAttendees(list.data.data)
            setAttendanceData(list.data.data.Attendance_data)
            setPresent(list.data.data.Present_Student)
            setAbsent(list.data.data.Absent_Student)
            setTotalStudent(list.data.data.Total_Student)
            setAvailable(true)
            console.log(list.data.data)
        }
        else {
            setAttendees({})
            setAttendanceData([])
            setPresent(0)
            setAbsent(0)
            setTotalStudent(0)
            setAvailable(false)
        }
        setLoading(false)
    }

    const onTopicStatusChange = async (id, whichvalue) => {
        let index = modules.findIndex(x => x.id === id);
        if (index !== -1) {
            let temporaryarray = modules.slice();
            if (temporaryarray[index]["Status"] === 0) {
                temporaryarray[index]["Status"] = 1;
                setModules(temporaryarray);

                let totaltopics = modules.length;
                let completedTopics = 0

                modules.map(item => {
                    if (item.Status === 0) {
                        return
                    }
                    else {
                        completedTopics++;
                    }
                })

                let percentcomplete = Math.round((completedTopics / totaltopics) * 100)

                setUpdate({ ...update, Modules: modules, Completion: Number(percentcomplete) })

            }
            else {
                temporaryarray[index]["Status"] = 0;
                setModules(temporaryarray);

                let totaltopics = modules.length;
                let completedTopics = 0

                modules.map(item => {
                    if (item.Status === 0) {
                        return
                    }
                    else {
                        completedTopics++;
                    }
                })

                let percentcomplete = Math.round((completedTopics / totaltopics) * 100)

                setUpdate({ ...update, Modules: modules, Completion: Number(percentcomplete) })

            }

            console.log(modules)
        }
        else {
            console.log('not match')
        }
    }

    const UpdateTopicStatus = async (e) => {
        e.preventDefault();

        const courseupdated = await editCourseModulesStatus(update, id);

        if (courseupdated) {
            toast("✅ Changes have been saved successfully");
            window.setTimeout(PageReload, 3000)
        }
        else {
            toast.error("Changes not saved");
        }

    }

    const openFilePreview = (e) => {
        window.open(process.env.REACT_APP_SERVER_FILES + e)
    }

    const PageReload = () => {
        navigate(0)
    }

    return (
        <div className='px-3'>

            {
                loading ?
                    <Loading />
                    :
                    <>
                        <div className='row'>
                            <div className='col-9'>
                                <h1 className="h4 mb-4">{course.Name}</h1>
                            </div>
                            <div className='col-3 text-right pr-5'>
                                <button onClick={() => navigate(-1)} className="btn btn-dark" style={{ borderRadius: '0' }}><i className="bi bi-chevron-left mr-1"></i>Back</button>
                            </div>
                        </div>

                        <div className="row">

                            {/* card 1 */}
                            <div className="col-xl-3 col-sm-6 col-12  mb-2">
                                <div className="card shadow" style={{ border: '0' }}>
                                    <div className="card-content">
                                        <div className="card-body">
                                            <div className="media d-flex">
                                                <div className="media-body text-left">
                                                    <h4 className="">{course.Completion}%</h4>
                                                    <span>Course Progress</span>
                                                </div>
                                                <div className="align-self-center">
                                                    <i className="bi bi-hourglass-split fa-2x font-large-2 float-right" style={{ color: '#754FFE' }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* card 2 */}
                            <div className="col-xl-3 col-sm-6 col-12  mb-2">
                                <div className="card shadow" style={{ border: '0' }}>
                                    <div className="card-content">
                                        <div className="card-body">
                                            <div className="media d-flex">
                                                <div className="media-body text-left">
                                                    <h4 className="">
                                                        {
                                                            enrollments.filter((item) => item.Course_id == course._id).length
                                                        }
                                                    </h4>
                                                    <span>Student Enrolled</span>
                                                </div>
                                                <div className="align-self-center">
                                                    <i className="bi bi-person-fill fa-2x font-large-2 float-right" style={{ color: '#754FFE' }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* card 3 */}
                            <div className="col-xl-3 col-sm-6 col-12  mb-2">
                                <div className="card shadow" style={{ border: '0' }}>
                                    <div className="card-content">
                                        <div className="card-body">
                                            <div className="media d-flex">
                                                <div className="media-body text-left">
                                                    <h4 className="">{modules.length}</h4>
                                                    <span>Total Modules</span>
                                                </div>
                                                <div className="align-self-center">
                                                    <i className="bi bi-card-list fa-2x font-large-2 float-right" style={{ color: '#754FFE' }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* card 4 */}
                            <div className="col-xl-3 col-sm-6 col-12  mb-2">
                                <div className="card shadow" style={{ border: '0' }}>
                                    <div className="card-content">
                                        <div className="card-body">
                                            <div className="media d-flex">
                                                <div className="media-body text-left">
                                                    <h4 className="">
                                                        {filescount}
                                                    </h4>
                                                    <span>Course Resourses</span>
                                                </div>
                                                <div className="align-self-center">
                                                    <i className="bi bi-file-earmark fa-2x font-large-2 float-right" style={{ color: '#754FFE' }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <form className="row mt-3"
                            onSubmit={UpdateTopicStatus}
                        >

                            {/*Topic List */}
                            <div className="col-md-6 col-12 mb-2">

                                <div className="card shadow">
                                    <div className="card-header py-3 bg-white">
                                        Module Completion
                                    </div>
                                    <div className="card-body">
                                        <table className="table table-striped">
                                            <tbody>
                                                {
                                                    modules.map((item, index) => (
                                                        <tr key={item.id}>
                                                            <td>{item.ModuleName}</td>
                                                            <td>
                                                                <div className="form-check float-right">
                                                                    <input className="form-check-input" type="checkbox" checked={item.Status === 0 ? '' : 'checked'} id={index}
                                                                        onChange={(e) => onTopicStatusChange(item.id, item.status)}
                                                                    />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                                <tr>
                                                    <td colSpan="2" className='text-center pt-3'>
                                                        <button className='btn btn-dark' style={{ borderRadius: '0' }} type="submit" >Update Status</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="card mt-3">
                                    <div className="card-header row m-0 py-3 bg-white" style={{}}>
                                        <div className="col-12 col-md-8 p-0">
                                            <span className="align-middle">Student Attendance</span>
                                        </div>
                                        <div className="col-12 col-md-4 p-0">
                                            <Link to={"/dashboard/instructor/attendance/course/" + course._id} style={{ borderRadius: '0' }} className='btn btn-sm btn-outline-dark float-center float-md-right '>View All</Link>
                                        </div>

                                    </div>
                                    <div className="card-body p-0" style={{ "overflow-y": 'hidden', maxHeight: '320px' }}>
                                        {
                                            available ?
                                                <>
                                                    <div>
                                                        <table className='table table-striped'>
                                                            <thead>
                                                                <tr>
                                                                    <th style={{ width: '70%' }}>Name</th>
                                                                    <th>Attendance</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    attendees ?
                                                                        attendees.Day == "Holiday" ?
                                                                            <tr className='text-center'>
                                                                                <td colSpan='4'>Holiday</td>
                                                                            </tr>
                                                                            :
                                                                            attendanceData.length ?
                                                                                attendanceData.map(item => (
                                                                                    <tr>
                                                                                        <td className='align-middle '>
                                                                                            {
                                                                                                students.filter((item1) => item1._id == item.Student_id).map((item2) => (
                                                                                                    <Link className="d-flex align-items-center text-decoration-none mx-1" to={"/dashboard/instructor/users/" + (item2._id)} style={{ textDecoration: "none" }}>
                                                                                                        <img className="img-fluid" src={process.env.REACT_APP_SERVER_FILE + item2.ProfilePicture} alt="" style={{ height: '2.5rem', borderRadius: '50%' }} />
                                                                                                        <div className="pl-3 m-0">
                                                                                                            <span className='text-dark' style={{ fontSize: '14px' }}>{item2.Name}</span>
                                                                                                        </div>
                                                                                                    </Link>
                                                                                                ))
                                                                                            }
                                                                                            {/* <Link className="d-flex align-items-center text-decoration-none mx-1" to={"/dashboard/admin/users/" + (item._id)} style={{ textDecoration: "none" }}>
                                                                         <img className="img-fluid" src={process.env.REACT_APP_SERVER_FILE + item.ProfilePicture} alt="" style={{ height: '2.5rem', borderRadius: '50%' }} />
                                                                         <div className="pl-3 m-0">
                                                                             <span className='text-dark' style={{ fontSize: '14px' }}>{item.Name}</span>
                                                                         </div>
                                                                     </Link> */}
                                                                                        </td>
                                                                                        {/* <td className='align-middle '>
                                                                     <span class="badge bg-success">Present</span>
                                                                 </td> */}
                                                                                        <td className='align-middle '>
                                                                                            {
                                                                                                item.Data == "Present" ?
                                                                                                    <span className="badge" style={{ backgroundColor: '#00BA82', borderRadius: '0' }}>Present</span>
                                                                                                    :
                                                                                                    <span className="badge" style={{ backgroundColor: '#F23455', borderRadius: '0' }}>Absent</span>
                                                                                            }
                                                                                        </td>
                                                                                    </tr>
                                                                                ))
                                                                                :
                                                                                <tr className='text-center'>
                                                                                    <td colSpan='4'>No Attendance Record Found</td>
                                                                                </tr>

                                                                        :
                                                                        <tr className='text-center'>
                                                                            <td colSpan='4'>No Attendance Record Found</td>
                                                                        </tr>
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </>
                                                :
                                                <div className="row p-3 m-0 ">
                                                    <div className="col-8">
                                                        <span>Today's Attandance is yet to be filled</span>
                                                    </div>
                                                    <div className="col-4">
                                                        <Link to={"/dashboard/instructor/attendance/add/" + course._id} className='btn btn-sm btn-dark float-right' style={{ borderRadius: '0' }}>Add Attandance +</Link>
                                                    </div>
                                                </div>
                                        }

                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-md-6 mb-2">

                                <div className="card">
                                    <div className="card-header row m-0 py-3 bg-white" style={{}}>
                                        <div className="col-12 col-md-8 p-0">
                                            <span className="align-middle">Student Enrolled</span>
                                        </div>
                                        <div className="col-12 col-md-4 p-0">
                                            <Link to={"/dashboard/instructor/enrollments/course/" + course._id} style={{ borderRadius: '0' }} className='btn btn-sm btn-outline-dark float-center float-md-right '>View All</Link>
                                        </div>

                                    </div>
                                    <div className="card-body p-0" style={{ "overflow-y": 'hidden', maxHeight: '320px' }}>

                                        {
                                            students.length ?
                                                <>
                                                    <table className='table'>
                                                        <thead>
                                                            <tr>
                                                                <th scope="col" style={{ width: '60%' }} className='pl-4'>Name</th>
                                                                <th scope="col" className="text-center">Date of Enrollment</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                students.map((item, index) => (
                                                                    <tr>
                                                                        <td className='align-middle '>
                                                                            <Link className="d-flex align-items-center text-decoration-none mx-1" to={"/dashboard/instructor/users/" + (item._id)} style={{ textDecoration: "none" }}>
                                                                                <img className="img-fluid" src={process.env.REACT_APP_SERVER_FILE + item.ProfilePicture} alt="" style={{ height: '2.5rem', borderRadius: '50%' }} />
                                                                                <div className="pl-3 m-0">
                                                                                    <span className='text-dark' style={{ fontSize: '14px' }}>{item.Name}</span>
                                                                                </div>
                                                                            </Link>
                                                                        </td>
                                                                        <td className='align-middle text-center'>
                                                                            {
                                                                                enrollments.filter((items) => items._id == item.Courses[item.Courses.findIndex(x => x.Course_id == id)].Enrollment_id).map(item2 => (
                                                                                    <span> {moment(item2.Enrollment_date).format('DD-MM-yyyy')} </span>
                                                                                ))
                                                                                // enrollments.map((item) => (
                                                                                //     <span>{item._id}</span>
                                                                                // ))
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                            }
                                                        </tbody>
                                                    </table>
                                                </>
                                                :
                                                <div className="row p-3 m-0 ">
                                                    <div className="col-12 text-center">
                                                        <span>No Student enrolled in {course.Name}</span>
                                                    </div>
                                                </div>
                                        }

                                    </div>
                                </div>

                                <div className="card mt-3">
                                    <div className="card-header row m-0 py-3 bg-white" style={{}}>
                                        <div className="col-12 col-md-8 p-0">
                                            <span className="align-middle">Course Resoucres</span>
                                        </div>
                                        <div className="col-12 col-md-4 p-0">
                                            <Link to={"/dashboard/instructor/resources/course/" + course._id} style={{ borderRadius: '0' }} className='btn btn-sm btn-outline-dark float-center float-md-right '>View All</Link>
                                        </div>

                                    </div>
                                    <div className="card-body p-0" style={{ "overflow-y": 'hidden', maxHeight: '320px' }}>

                                        <table className="table">
                                            <tbody>
                                                {
                                                    files.length ?
                                                        files.map(file => (
                                                            <tr>
                                                                <td className='align-middle'>
                                                                    <Link className="d-flex align-items-center text-decoration-none mx-1" style={{ textDecoration: "none" }}>
                                                                        <button style={{ height: '2.5rem', width: '2.5rem', borderRadius: '50%', color: '#754FFE', backgroundColor: '#D5D6D8' }} >
                                                                            {
                                                                                file.File_type == 'docx' || file.File_type == 'doc' || file.File_type == 'txt' ?
                                                                                    <span className='bi bi-file-earmark-word-fill' style={{ color: '#754FFE', fontSize: '20px' }}></span>
                                                                                    :
                                                                                    file.File_type == 'pdf' ?
                                                                                        <span className='bi bi-file-earmark-pdf-fill' style={{ color: '#754FFE', fontSize: '20px' }}></span>
                                                                                        :
                                                                                        file.File_type == 'jpg' || file.File_type == 'jpeg' || file.File_type == 'png' ?
                                                                                            // <img className="img-fluid" src={process.env.REACT_APP_SERVER_FILES + file.File} alt="" style={{ height: '2.5rem', borderRadius: '50%' }} />
                                                                                            <span className='bi bi-file-earmark-image' style={{ color: '#754FFE', fontSize: '20px' }}></span>
                                                                                            :
                                                                                            <span className='bi bi-file-earmark-fill' style={{ color: '#754FFE', fontSize: '20px' }}></span>
                                                                            }
                                                                        </button>
                                                                        <div className="pl-3 m-0">
                                                                            {/* <a href={'/file-preview/'+file.File}>{file.File.substring(file.File.indexOf('_') + 1)}</a> */}
                                                                            <a target="_blank" onClick={(e) => openFilePreview(file.File)} rel="noreferrer" >{file.File.substring(file.File.indexOf('_') + 1)}</a>
                                                                        </div>
                                                                    </Link>

                                                                </td>
                                                                <td className='align-middle'>
                                                                    <div className='text-center'>
                                                                        <Link to={"/dashboard/instructor/resources/course/" + course._id} className="bi bi-sliders2"></Link>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))
                                                        :
                                                        <tr>
                                                            <td colSpan='2' className='align-middle text-center'>
                                                                <span>No File Found</span>
                                                            </td>
                                                        </tr>
                                                }
                                            </tbody>
                                        </table>

                                    </div>
                                </div>

                            </div>

                        </form>
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

export default ManageCourses
