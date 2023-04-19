import { React, useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getStudentsAsPerCourse, getCoursesByID, getAttendanceByDateByCourse } from '../../services/api';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import Loading from '../../layouts/LoadingScreen/Loading';

const ManageAttendance = () => {

    useEffect(() => {
        window.scroll(0, 0)
        getStudentListForCourse();
        getCourseDetails();
        getAttendees();
    }, [])

    const [value, setValue] = useState(new Date());
    const [search, setSearch] = useState('')
    const [students, setStudents] = useState([])
    const [course, setCourse] = useState({})
    const [attendees, setAttendees] = useState({})
    const [attendanceData, setAttendanceData] = useState([])
    const [present, setPresent] = useState(0)
    const [absent, setAbsent] = useState(0)
    const [totalstudent, setTotalStudent] = useState(0)
    const { id } = useParams()
    const [loading, setLoading] = useState(false)

    const getStudentListForCourse = async () => {
        // setLoading(true)
        const studentList = await getStudentsAsPerCourse(id)
        setStudents(studentList.data)
    }

    const getCourseDetails = async () => {
        const coursedets = await getCoursesByID(id);
        setCourse(coursedets.data)
    }

    const getAttendees = async () => {
        const date = new Date();
        const list = await getAttendanceByDateByCourse(id, { date })
        console.log(list.data.data)
        setAttendees(list.data.data)
        setAttendanceData(list.data.data.Attendance_data)
        setPresent(list.data.data.Present_Student)
        setAbsent(list.data.data.Absent_Student)
        setTotalStudent(list.data.data.Total_Student)
        // setLoading(false)
    }

    const onCalenderChange = async (e) => {
        setValue(new Date(e))

        const date1 = new Date(e);
        const date = moment(date1).format()

        try {
            const list = await getAttendanceByDateByCourse(id, { date })
            if (list) {
                setAttendees(list.data.data)
                setAttendanceData(list.data.data.Attendance_data)
                setPresent(list.data.data.Present_Student)
                setAbsent(list.data.data.Absent_Student)
                setTotalStudent(list.data.data.Total_Student)
            }
            else {
                setAttendees({})
                setAttendanceData([])
                setPresent(0)
                setAbsent(0)
                setTotalStudent(0)
            }

        }
        catch (err) {
            console.log(err)
        }

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
                                <h1 className="h4 mb-4">Manage Attendance</h1>
                            </div>
                            <div className='col-5'>
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="Search user"
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
                                <Link to={"/dashboard/instructor/attendance/add/" + course._id} className="btn btn-dark" style={{ borderRadius: '0' }}>Add +</Link>
                            </div>
                        </div>

                        <div className="row p-0">
                            <div className="col-8">
                                <div className="card" style={{ borderRadius: '0' }}>
                                    <div className="row my-3">
                                        <div className="col-11">
                                            <h6 className="text-center">Attendance Data of <strong>{course.Name}</strong> on <strong>{moment(value).format('LL')}</strong></h6>
                                        </div>
                                        <div className="col-1">
                                            <Link to={'/dashboard/instructor/attendance/edit/' + course._id} className="fa fa-edit"></Link>
                                        </div>
                                    </div>
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col" style={{ width: '80%' }} className='pl-4'>Name</th>
                                                <th scope="col">Attendance</th>
                                                {/* <th scope="col" className="text-center"> </th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                attendees ?
                                                    attendees.Day == "Holiday" ?
                                                        <tr className='text-center'>
                                                            <td colSpan='4'>{moment(value).format('LL')} was a Holiday</td>
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
                            </div>
                            <div className="col-4">
                                <Calendar onChange={(e, event) => onCalenderChange(e)} value={value} className="mx-auto w-100 shadow" />

                                <Link style={{ color: 'inherit' }} className="col-xl-3 col-sm-6 col-12  mb-2">
                                    <div className="card shadow" style={{ border: '0' }}>
                                        <div className="card-content">
                                            <div className="card-body">
                                                <div className="media d-flex">
                                                    <div className="media-body text-left">
                                                        <h4 className="">{totalstudent}</h4>
                                                        <span>Total Students</span>
                                                    </div>
                                                    <div className="align-self-center">
                                                        <i className="bi bi-people  fa-2x font-large-2 float-right" style={{ color: '#754FFE' }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                <Link style={{ color: 'inherit' }} className="col-xl-3 col-sm-6 col-12  mb-2">
                                    <div className="card shadow" style={{ border: '0' }}>
                                        <div className="card-content">
                                            <div className="card-body">
                                                <div className="media d-flex">
                                                    <div className="media-body text-left">
                                                        <h4 className="">{present}</h4>
                                                        <span>Present</span>
                                                    </div>
                                                    <div className="align-self-center">
                                                        <i className="bi bi-calendar2-check fa-2x font-large-2 float-right" style={{ color: '#754FFE' }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                <Link style={{ color: 'inherit' }} className="col-xl-3 col-sm-6 col-12  mb-2">
                                    <div className="card shadow" style={{ border: '0' }}>
                                        <div className="card-content">
                                            <div className="card-body">
                                                <div className="media d-flex">
                                                    <div className="media-body text-left">
                                                        <h4 className="">{absent}</h4>
                                                        <span>Absent</span>
                                                    </div>
                                                    <div className="align-self-center">
                                                        <i className="bi bi-calendar2-x fa-2x font-large-2 float-right" style={{ color: '#754FFE' }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                            </div>
                        </div>
                    </>
            }

        </div>
    )
}

export default ManageAttendance
