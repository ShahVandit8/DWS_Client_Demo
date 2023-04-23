import { React, useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    getCoursesByID, editCourseModulesStatus, getInstructors, editCourseInstructor, getStudentsAsPerCourse, getActiveEnrollments,
    getAttendanceByDateByCourse, getRevenueCourseWise, editEnrollmentPassedOut
} from '../../services/api';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../layouts/LoadingScreen/Loading';

const ManageCourse = () => {

    useEffect(() => {
        getCourseDetails();
        getInstructorsList();
        getStudentListForCourse();
        getAllEnrollments();
        getRevenue();
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
    const [totalstudent, setTotalStudent] = useState(0)
    const [available, setAvailable] = useState(false)
    const [earnings, setEarnings] = useState(0)
    const [loading, setLoading] = useState(false)

    const getCourseDetails = async () => {
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
            setTotalStudent(list.data.data.Total_Student)
            setAvailable(true)
            console.log(list.data.data)
        }
        else {
            setAttendees({})
            setAttendanceData([])
            setTotalStudent(0)
            setAvailable(false)
        }
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

    const PageReload = () => {
        navigate(0)
    }

    const onInstructorChange = (e) => {

        const instructor = instructors.filter((item) => item._id == e.target.value)
        const instructor1 = {
            id: instructor[0]._id,
            Name: instructor[0].Name,
            ProfilePhoto: instructor[0].ProfilePhoto
        }

        setnewinstructor({ Instructor: instructor1 })
    }

    const ChangeInstructor = async (e) => {
        e.preventDefault()

        try {
            // const formdata = new FormData();
            // formdata.append('Instructor', JSON.stringify(newinstructor))
            const editInstructor = await editCourseInstructor(newinstructor, id)

            if (editInstructor) {
                toast("✅ Changes have been saved successfully");
                window.setTimeout(PageReload, 3000)
            }
        }
        catch (err) {
            toast.error("Changes not saved");
            window.setTimeout(PageReload, 3000)
        }
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
                                                        {/* {
                                                enrollments.filter((item) => item.Course_id == course._id).map((item1) => (
                                                    setEarnings(...earnings, item1.Amount)
                                                ))
                                            } */}
                                                        ₹ {earnings}
                                                    </h4>
                                                    <span>Course Earnings</span>
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
                                            <Link to={"/dashboard/admin/attendance/course/" + course._id} style={{ borderRadius: '0' }} className='btn btn-sm btn-outline-dark float-center float-md-right '>View All</Link>
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
                                                                                                    <Link className="d-flex align-items-center text-decoration-none mx-1" to={"/dashboard/admin/users/" + (item2._id)} style={{ textDecoration: "none" }}>
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
                                                        <Link to={"/dashboard/admin/attendance/add/" + course._id} className='btn btn-sm btn-dark float-right' style={{ borderRadius: '0' }}>Add Attandance +</Link>
                                                    </div>
                                                </div>
                                        }

                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-md-6 mb-2">
                                <div className="card shadow">
                                    <div className="card-body">
                                        <div className="d-flex flex-column align-items-center text-center">



                                            <div className="avatar-upload">
                                                <div className="avatar-preview">
                                                    <div
                                                        id="imagePreview"
                                                        // style={{ backgroundImage: `url(${URL + admin.ProfileCover})` }}
                                                        style={{ backgroundImage: `url(${image})` }}
                                                    ></div>
                                                </div>
                                            </div>


                                            <div className="mt-3">
                                                <h3>{instructor.Name}</h3>
                                                <p className="text-secondary mb-1">Instructor</p>
                                                <button className="btn btn-outline-dark mt-2" style={{ borderRadius: '0' }} data-bs-toggle="modal" data-bs-target="#instructorchangemodal" type='button'>Change Instructor <i class="fa fa-edit"></i></button>
                                            </div>
                                        </div>


                                    </div>
                                </div>

                                <div className="card mt-3">
                                    <div className="card-header row m-0 py-3 bg-white" style={{}}>
                                        <div className="col-12 col-md-8 p-0">
                                            <span className="align-middle">Student Enrolled</span>
                                        </div>
                                        <div className="col-12 col-md-4 p-0">
                                            <Link to={"/dashboard/admin/enrollments/course/" + course._id} style={{ borderRadius: '0' }} className='btn btn-sm btn-outline-dark float-center float-md-right '>View All</Link>
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
                                                                            <Link className="d-flex align-items-center text-decoration-none mx-1" to={"/dashboard/admin/users/" + (item._id)} style={{ textDecoration: "none" }}>
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

                            </div>

                        </form>

                        <div
                            className="modal fade"
                            id="instructorchangemodal"
                            // style={{zIndex:'1001'}}
                            tabIndex={-1}
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                        >
                            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">
                                            Change Instructor
                                        </h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                        />
                                    </div>
                                    <div className="modal-body">
                                        <div className="text-center">
                                            <span style={{ fontSize: '14px' }}>Note: If you change the Instructor, {instructor.Name} will not be able to access {course.Name} Course </span>
                                        </div>
                                        <div className="row card mt-4 p-2" style={{ borderRadius: '0' }}>
                                            <span>Select Instructor</span>
                                            <select type="text" className='form-control' style={{ borderRadius: '0' }} onChange={(e) => onInstructorChange(e)}>
                                                <option>Select</option>
                                                {
                                                    instructors.map(item => (
                                                        <option value={item._id} disabled={instructor.id == item._id ? true : false} >{item.Name}</option>
                                                    ))
                                                }
                                            </select>

                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            id="closebutton"
                                            className="btn btn-secondary"
                                            data-bs-dismiss="modal"
                                        >
                                            Close
                                        </button>
                                        <button type="button" className="btn btn-dark" onClick={ChangeInstructor} >
                                            Change Instructor
                                        </button>
                                    </div>
                                </div>
                            </div>
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

export default ManageCourse
