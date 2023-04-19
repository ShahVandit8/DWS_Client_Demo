import { React, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getStudentsAsPerCourse, getCoursesByID, getAttendanceByDateByCourse, editAttendance } from "../../services/api";
import moment from "moment";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../../layouts/LoadingScreen/Loading";

const EditAttendance = () => {

    useEffect(() => {
        getStudentListForCourse();
        getCourseDetails();
    }, []);


    const navigate = useNavigate();
    const { id } = useParams();
    const [course, setCourse] = useState({});
    const [students, setStudents] = useState([]);
    const [present, setPresent] = useState(0)
    const [absent, setAbsent] = useState(0)
    const [date, setDate] = useState('')

    const [loading, setLoading] = useState(false)

    const [attendees, setAttendees] = useState({})
    const [attendanceData, setAttendanceData] = useState([])
    const [totalstudent, setTotalStudent] = useState(0)


    const onnDateChange = async (e) => {
        setDate(new Date(e))

        const date1 = new Date(e);
        const date = moment(date1).format()

        try {
            const list = await getAttendanceByDateByCourse(id, { date })
            console.log(list)
            if (list.data.status === 'ok') {
                setAttendees(list.data.data)
                setAttendanceData(list.data.data.Attendance_data)
                setPresent(list.data.data.Present_Student)
                setAbsent(list.data.data.Absent_Student)
                setTotalStudent(list.data.data.Total_Student)
                console.log(list.data.data)
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

    const getCourseDetails = async () => {
        const coursedets = await getCoursesByID(id);
        setCourse(coursedets.data);
        setLoading(false)
    };

    const getStudentListForCourse = async () => {
        setLoading(true)
        const studentList = await getStudentsAsPerCourse(id);
        setStudents(studentList.data);
    };

    const onHolidayCheckChange = async () => {

        const Holidaycheckbox = document.getElementById('holiday')

        if (Holidaycheckbox.checked) {
            setAttendees({ ...attendees, Day: 'Holiday' })
        }
        else {
            const studentList = await getStudentsAsPerCourse(id);
            setStudents(studentList.data);

            let list = []
            studentList.data.map(item => {
                const newitem = {
                    Student_id: item._id,
                    Data: '',
                }
                console.log(newitem)
                list.push(newitem)
            })
            setAttendanceData(list)
            setAttendees({ ...attendees, Day: 'Working Day' })
        }

    }

    const onDataChanged = (id, value) => {

        let index = attendanceData.findIndex(x => x.Student_id === id);

        if (index !== -1) {

            let temporaryarray = attendanceData.slice();

            if (temporaryarray[index]["Data"] === "") {
                temporaryarray[index]["Data"] = value;
                console.log(temporaryarray)
                setAttendanceData(temporaryarray);

                let present = 0;
                let absent = 0;

                temporaryarray.map((item) => {
                    if (item.Data == "Present") {
                        present = present + 1;
                    }
                    else if (item.Data == "Absent") {
                        absent = absent + 1;
                    }
                })
                setPresent(present);
                setAbsent(absent);
            }
            else if (temporaryarray[index]["Data"] === "Present") {
                temporaryarray[index]["Data"] = "Absent";
                console.log(temporaryarray)
                setAttendanceData(temporaryarray);

                let present = 0;
                let absent = 0;

                temporaryarray.map((item) => {
                    if (item.Data == "Present") {
                        present = present + 1;
                    }
                    else if (item.Data == "Absent") {
                        absent = absent + 1;
                    }
                })
                setPresent(present);
                setAbsent(absent);

            }
            else if (temporaryarray[index]["Data"] === "Absent") {
                temporaryarray[index]["Data"] = "Present";
                console.log(temporaryarray)
                setAttendanceData(temporaryarray);

                let present = 0;
                let absent = 0;

                temporaryarray.map((item) => {
                    if (item.Data == "Present") {
                        present = present + 1;
                    }
                    else if (item.Data == "Absent") {
                        absent = absent + 1;
                    }
                })
                setPresent(present);
                setAbsent(absent);

            }

        }
        else {
            console.log('no match')
        }
    }

    const editAttendanceData = async (e) => {
        e.preventDefault();

        if (date == '') {
            alert('Please select a date')
        }
        else {
            let currentDate = new Date();
            let selectedDate = new Date(date)
            if (selectedDate > currentDate) {
                alert('Cannot edit attendance of Future date')
            }

            else {

                if (attendanceData.length < 1) {
                    alert('There is no record of attendance to edit - Select a proper date')
                }
                else {
                    const Holidaycheckbox = document.getElementById('holiday')

                    if (Holidaycheckbox.checked) {

                        const data = {
                            Attendance_date: attendees.Attendance_date,
                            Course_id: attendees.Course_id,
                            Attendance_data: [],
                            Total_Student: 0,
                            Present_Student: 0,
                            Absent_Student: 0,
                            Day: 'Holiday'
                        }

                        try {
                            const result = await editAttendance(data)
                            console.log(result)
                            if (result.data.status == 'ok') {
                                toast('✅ Attendance Updated successfully')
                            }
                            else if (result.data.status == 'error') {
                                toast.error('Error: Attendance for this date has been already saved')
                            }
                        }
                        catch (err) {
                            toast.error('Error: ' + err.message)
                        }
                    }
                    else {

                        let num = 0;

                        students.map(item => {
                            const getSelectedValue = document.querySelector(`input[name="attendance-data${item._id}"]:checked`);
                            if (getSelectedValue != null) {
                                num++;
                            }
                        })

                        if (num != students.length) {
                            alert('Please fill attendance sheet')
                        }
                        else {
                            const data = {
                                Attendance_date: attendees.Attendance_date,
                                Course_id: attendees.Course_id,
                                Attendance_data: attendanceData,
                                Total_Student: totalstudent,
                                Present_Student: present,
                                Absent_Student: absent,
                                Day: 'Working Day'
                            }

                            try {
                                const result = await editAttendance(data)
                                console.log(result)
                                if (result.data.status == 'ok') {
                                    toast('✅ Attendance Updated successfully')
                                }
                                else if (result.data.status == 'error') {
                                    toast.error('Error: Attendance for this date has been already saved')
                                }
                            }
                            catch (err) {
                                toast.error('Error: ' + err.message)
                            }
                        }

                    }
                }


            }
        }
    }


    return (
        <div className="px-3">
            {
                loading ?
                    <Loading />
                    :
                    <>
                        <div className="row">
                            <div className="col-4">
                                <h1 className="h4 mb-4">Edit Attendance</h1>
                            </div>
                            <div className="col-5">
                                <div class="input-group">
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Search user"
                                        style={{ borderRadius: "0" }}
                                    // onChange={(e) => setSearch(e.target.value)}
                                    />
                                    <div class="input-group-append">
                                        <button
                                            class="btn btn-dark"
                                            type="button"
                                            style={{ borderRadius: "0" }}
                                        >
                                            <i class="fa fa-search"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3 text-right pr-5">
                                <button
                                    onClick={() => navigate(-1)}
                                    className="btn btn-dark"
                                    style={{ borderRadius: "0" }}
                                >
                                    <i className="bi bi-chevron-left mr-1"></i>Back
                                </button>
                            </div>
                        </div>

                        <div className="row m-0">

                            <div className="col-8 p-0">
                                <div className="card shadow p-0" style={{ borderRadius: "0" }}>
                                    <div>
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col" style={{ width: '70%' }} className='pl-4'>Name</th>
                                                    <th scope="col">Attendance</th>
                                                    {/* <th scope="col" className="text-center"> </th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    attendanceData.length ?
                                                        attendanceData.map(item => (
                                                            // <tr className="text-dark">
                                                            //     <td colSpan="2" className="text-dark">{item.Student_id}</td>
                                                            //     </tr>
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

                                                                </td>
                                                                <td className='align-middle '>
                                                                    <div className="d-flex">
                                                                        <div className="form-check">
                                                                            <input
                                                                                className="form-check-input"
                                                                                type="radio"
                                                                                name={"attendance-data" + item.Student_id}
                                                                                id="flexRadioDefault1"
                                                                                checked={item.Data == 'Present' ? true : false}
                                                                                onChange={() => onDataChanged(item.Student_id, 'Present')}
                                                                            />
                                                                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                                                Present
                                                                            </label>
                                                                        </div>
                                                                        <div className="form-check ml-4">
                                                                            <input
                                                                                className="form-check-input"
                                                                                type="radio"
                                                                                name={"attendance-data" + item.Student_id}
                                                                                id="flexRadioDefault2"
                                                                                checked={item.Data == 'Absent' ? true : false}
                                                                                onChange={() => onDataChanged(item.Student_id, 'Absent')}
                                                                            />
                                                                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                                                Absent
                                                                            </label>
                                                                        </div>
                                                                    </div>

                                                                </td>
                                                            </tr>
                                                        ))
                                                        :
                                                        <tr className='text-center'>
                                                            <td colSpan='4'>No Attendance Found</td>
                                                        </tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>

                            <div className="col-4">
                                <div className="card">
                                    <div className="card-header">
                                        <span>Attendance Details</span>
                                    </div>
                                    <div className="card-body p-0">
                                        <form
                                            onSubmit={(e) => editAttendanceData(e)}
                                        >
                                            <table className="table table-striped">
                                                <tbody>
                                                    <tr>
                                                        <td className="align-middle">Course Name</td>
                                                        <td className="align-middle">{course.Name}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="align-middle">Date</td>
                                                        <td className="align-middle">
                                                            <input type="date" name="" id="" onChange={(e) => onnDateChange(e.target.value)} />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="align-middle">Check this if date is Holiday</td>
                                                        <td className="align-middle">
                                                            <input type="checkbox" name="holiday" id="holiday" onChange={() => onHolidayCheckChange()} checked={attendees.Day == 'Holiday' ? true : false} />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="align-middle">Total Students</td>
                                                        <td className="align-middle">{totalstudent}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="align-middle">Present Students</td>
                                                        <td className="align-middle">{present}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="align-middle">Absent Students</td>
                                                        <td className="align-middle">{absent}</td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan="2" className="align-middle text-center">
                                                            <button type="submit" className="btn btn-sm btn-dark">Edit Attendance</button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </form>
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

export default EditAttendance
