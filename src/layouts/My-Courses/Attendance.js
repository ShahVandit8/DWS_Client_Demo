import { React, useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Topbar from '../../components/Edit-User/Topbar'
import { getAttendanceByDateByCourse, getAttendanceByStudent } from '../../services/api';

const Attendance = () => {

    useEffect(() => {
        getAttendees();

        const userDetails = sessionStorage.getItem('User');
        const userdets = JSON.parse(userDetails)
        setUserid(userdets._id)

        getStudentAttendance();
    }, [])

    const [attendancedata, setAttendanceData] = useState([])
    const [attendance, setAttendance] = useState([])
    const [userid, setUserid] = useState('')
    const [loading, setLoading] = useState(false)
    const { id } = useParams();

    const getAttendees = async () => {
        setLoading(true)
        const date = new Date();
        const list = await getAttendanceByDateByCourse(id, { date })
        console.log(list.data.data)
        if (list.data.data) {
            setAttendanceData(list.data.data.Attendance_data)

        }
        setLoading(false)
    }

    const getStudentAttendance = async () => {
        const userDetails = sessionStorage.getItem('User');
        const userdets = JSON.parse(userDetails)
        const student_id = Number(userdets._id)
        console.log(student_id)
        const result = await getAttendanceByStudent(id, { student_id })
        if (result.data) {
            console.log(result.data)
            setAttendance(result.data.data)
        }
        else {
            console.log("Not Found")
        }

    }

    return (
        <div>
            <Topbar Title="Attendance" Description="Your Attendance Data" />

            <div className='card3'>
                <div className="container">

                    <div>
                        {
                            loading ?
                                <>Loding...</>
                                :
                                attendancedata.length > 0 ?
                                    attendancedata.filter(item => item.Student_id == userid).map(item2 => (
                                        item2.Data == 'Present' ?
                                            <div className="row p-0  m-0 mt-3" style={{ backgroundColor: '#EBF5F0', borderRadius: '0' }}>
                                                <div className="col-1 text-center">
                                                    <span style={{ fontSize: '35px', color: '#38A169' }} className="bi bi-check-circle-fill"></span>
                                                </div>
                                                <div className="col-9 d-flex align-items-center">
                                                    <span style={{ fontSize: '16px' }}>You Were Present in Class Today</span>
                                                </div>
                                            </div>
                                            :
                                            item2.Data = 'Absent' ?
                                                <div className="row p-0  m-0 mt-3" style={{ backgroundColor: '#FBE9E9', borderRadius: '0' }}>
                                                    <div className="col-1 text-center">
                                                        <span style={{ fontSize: '35px', color: '#DC2626' }} className="bi bi-x-circle-fill"></span>
                                                    </div>
                                                    <div className="col-9 d-flex align-items-center">
                                                        <span style={{ fontSize: '16px' }}>You Were Absent in Class Today</span>
                                                    </div>
                                                </div>
                                                :
                                                <div className="row p-0  m-0 mt-3" style={{ backgroundColor: 'rgba(255, 193, 7, 0.2)', borderRadius: '0' }}>
                                                    <div className="col-1 text-center">
                                                        <span style={{ fontSize: '35px', color: '#FFC107' }} className="bi bi-exclamation-circle-fill"></span>
                                                    </div>
                                                    <div className="col-9 d-flex align-items-center">
                                                        <span style={{ fontSize: '16px' }}>Today's Attendance is not updated yet.</span>
                                                    </div>
                                                </div>

                                    ))
                                    :
                                    <div className="row p-0  m-0 mt-3" style={{ backgroundColor: 'rgba(255, 193, 7, 0.2)', borderRadius: '0' }}>
                                        <div className="col-md-1 col-2 text-center">
                                            <span style={{ fontSize: '35px', color: '#FFC107' }} className="bi bi-exclamation-circle-fill"></span>
                                        </div>
                                        <div className="col-9 d-flex align-items-center">
                                            <span style={{ fontSize: '16px' }}>Today's Attendance is not updated yet.</span>
                                        </div>
                                    </div>
                        }

                    </div>

                    <div className="card mt-3" style={{ borderRadius: '0' }}>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th style={{ width: '80%' }}>Date</th>
                                    <th>Attendance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    attendance.length?
                                    attendance.map(item => (
                                        <tr>
                                            <td className='align-middle'>
                                                <span>{item.Attendance_date}</span>
                                            </td>
                                            <td className='align-middle'>
                                                {item.Day == 'Holiday' ?
                                                    <span className="badge" style={{ fontSize: '13px', backgroundColor: 'rgba(117, 79, 254, 0.1)', color: '#754FFE', borderRadius: '0' }}>Holiday</span>
                                                    :
                                                    item.Attendance_data.filter(item1 => item1.Student_id == userid).map(item3 => (
                                                        item3.Data == 'Present' ?
                                                            <span className="badge" style={{ backgroundColor: '#00BA82', borderRadius: '0' }}>Present</span>
                                                            :
                                                            item3.Data == 'Absent' ?
                                                                <span className="badge" style={{ backgroundColor: '#F23455', borderRadius: '0' }}>Absent</span>
                                                                :
                                                                <></>
                                                    ))
                                                }
                                            </td>
                                        </tr>
                                    ))
                                    :
                                    <tr>
                                        <td colspan="2" className="align-middle text-center">
                                                No Attendance Record Found
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Attendance
