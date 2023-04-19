import { React, useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { getCourses, getCoursesByInstructorId, getAttendanceListByOnlyDate } from '../../services/api';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import Loading from '../../layouts/LoadingScreen/Loading';

const Attendance = () => {

    useEffect(() => {
        window.scroll(0, 0);
        getAllCourseList();
        getTodaysAttendance();
    }, [])

    const [value, setValue] = useState(new Date());
    const [search, setSearch] = useState('')
    const [courses, setCourses] = useState([])
    const [attendancecount, setAttendanceCount] = useState(0)
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate();

    const [attendance, setAttendance] = useState([]);

    const getAllCourseList = async () => {
        setLoading(true)
        const userDetails = sessionStorage.getItem('Instructor');
        const userDets = JSON.parse(userDetails)
        let allCourse = await getCoursesByInstructorId(userDets._id);
        setCourses(allCourse.data)
    }

    const getTodaysAttendance = async () => {
        const date = new Date();
        const list = await getAttendanceListByOnlyDate({ date })
        setAttendance(list.data.data)
        setAttendanceCount(list.data.data.length)
        setLoading(false)
    }


    const onCalenderChange = async (e) => {
        setValue(new Date(e))

        const date1 = new Date(e);
        const date = moment(date1).format()

        try {
            const list = await getAttendanceListByOnlyDate({ date })

            if (list.data.data) {
                setAttendance(list.data.data)
                setAttendanceCount(list.data.data.length)
            }
            else {
                setAttendance([])
                setAttendanceCount(0)
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
                                <h1 className="h4 mb-4">Attendance</h1>
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
                                <button onClick={() => navigate(-1)} className="btn btn-dark" style={{ borderRadius: "0" }}>
                                    <i className="bi bi-chevron-left mr-1"></i>Back
                                </button>
                            </div>
                        </div>

                        <div className="row p-0">
                            <div className="col-4">
                                <Calendar onChange={(e) => onCalenderChange(e)} value={value} className="mx-auto w-100 shadow" />

                                <Link style={{ color: 'inherit' }} className="col-xl-3 col-sm-6 col-12  mb-2">
                                    <div className="card shadow" style={{ border: '0' }}>
                                        <div className="card-content">
                                            <div className="card-body">
                                                <div className="media d-flex">
                                                    <div className="media-body text-left">
                                                        <h4 className="">{courses.length}</h4>
                                                        <span>Total Courses</span>
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
                                                        <h4 className="">{attendancecount}</h4>
                                                        <span>Updated</span>
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
                                                        <h4 className="">{courses.length - attendancecount}</h4>
                                                        <span>Not Updated</span>
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
                            <div className="col-8">
                                <div className="card" style={{ borderRadius: '0' }}>
                                    <div className="row my-3">
                                        <div className="col-12">
                                            <h6 className="text-center">Attendance Data - <strong>{moment(value).format('LL')}</strong></h6>
                                        </div>
                                    </div>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col" style={{ width: '80%' }} className='pl-4'>Course</th>
                                                <th scope="col">Attendance</th>
                                                {/* <th scope="col" className="text-center"> </th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                courses.filter(value => {
                                                    if (search === '') {
                                                        return value
                                                    }
                                                    else if (value.Name.toLowerCase().includes(search.toLowerCase())) {
                                                        return value
                                                    }
                                                })
                                                    .map(item => (
                                                        <tr>
                                                            <td className='align-middle '>
                                                                <Link className="d-flex align-items-center text-decoration-none mx-1" to={`/dashboard/instructor/attendance/course/` + (item._id)} style={{ textDecoration: "none" }}>
                                                                    <img className="img-fluid rounded" src={process.env.REACT_APP_SERVER_FILE + item.CoverImage} alt="" style={{ height: '3rem' }} />
                                                                    <div className="pl-3 m-0">
                                                                        <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#1E293B' }}>{item.Name}</span>
                                                                        <p className="text-body my-auto" style={{ fontSize: '12px' }}>• {item.Category}</p>
                                                                    </div>
                                                                </Link>
                                                            </td>
                                                            <td className='align-middle'>
                                                                {
                                                                    attendance.filter((item1) => item1.Course_id == item._id).length ?
                                                                        attendance.filter((item1) => item1.Course_id == item._id).map(item2 =>
                                                                        (
                                                                            item2.Day == 'Holiday' ?
                                                                                <span className="badge" style={{ fontSize: '13px', backgroundColor: '#EBF5F0', color: '#38A169', borderRadius: '0' }}>Holiday</span>
                                                                                :
                                                                                <span className="badge" style={{ fontSize: '13px', backgroundColor: '#EBF5F0', color: '#38A169', borderRadius: '0' }}>{item2.Present_Student} out of {item2.Total_Student}</span>
                                                                        )
                                                                            // <span className="badge" style={{ fontSize: '13px', backgroundColor: '#EBF5F0', color: '#38A169', borderRadius: '0' }}>{item2.Present_Student} out of {item2.Total_Student}</span>
                                                                        )
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
                    </>
            }

        </div>
    )
}

export default Attendance
