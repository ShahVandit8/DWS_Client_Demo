import { React, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getStudentsAsPerCourse, getCoursesByID, addNewAttendance } from "../../services/api";
import moment from "moment";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../../layouts/LoadingScreen/Loading";

const AddAttendance = () => {

  useEffect(() => {
    getStudentListForCourse();
    getCourseDetails();
  }, []);


  const defaultValue = {
    Attendance_Date: '',
    Course_id: '',
    Attendance_data: [],
  }

  const navigate = useNavigate();
  const { id } = useParams();
  const [course, setCourse] = useState({});
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState(defaultValue);
  const [attendance_data, setAttendance_data] = useState([])
  const [defaultattendance, setDefaultAttendance] = useState([])
  const [present, setPresent] = useState(0)
  const [absent, setAbsent] = useState(0)
  const [date, setDate] = useState(moment(Date()).format('yyyy-MM-DD'))
  const [loading, setLoading] = useState(false)

  const getCourseDetails = async () => {
    setLoading(true)
    const coursedets = await getCoursesByID(id);
    setCourse(coursedets.data);
    setAttendance({ ...attendance, Course_id: coursedets._id })
  };

  const getStudentListForCourse = async () => {
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
    setAttendance_data(list)
    setDefaultAttendance(list)
    setLoading(false)
  };

  const onDataChanged = (id, value) => {
    let index = attendance_data.findIndex(x => x.Student_id === id);

    if (index !== -1) {

      let temporaryarray = attendance_data.slice();

      if (temporaryarray[index]["Data"] === "") {
        temporaryarray[index]["Data"] = value;
        console.log(temporaryarray)
        setAttendance_data(temporaryarray);

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
        setAttendance_data(temporaryarray);

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
        setAttendance_data(temporaryarray);

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

  console.log(attendance_data)

  const addAttendanceNew = async (e) => {
    e.preventDefault();

    if (date == '') {
      alert('Please select a date')
    }
    else {
      let currentDate = new Date();
      let selectedDate = new Date(date)
      if (selectedDate > currentDate) {
        alert('Cannot add attendance of Future date')
      }
      else {

        if (attendance_data.length < 1) {
          alert('0 Student Enrollment - Attendance Not Available')
        }
        else {
          const Holidaycheckbox = document.getElementById('holiday')

          if (Holidaycheckbox.checked) {

            console.log(defaultattendance)

            const data = {
              Attendance_date: date,
              Course_id: course._id,
              Attendance_data: defaultattendance,
              Total_Student: 0,
              Present_Student: 0,
              Absent_Student: 0,
              Day: 'Holiday'
            }

            try {
              const result = await addNewAttendance(data)
              console.log(result)
              if (result.data.status == 'ok') {
                toast('✅ Attendance added successfully')
                window.setTimeout(PageBack, 3000)
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
                Attendance_date: date,
                Course_id: course._id,
                Attendance_data: attendance_data,
                Total_Student: students.length,
                Present_Student: present,
                Absent_Student: absent,
                Day: 'Working Day'
              }

              try {
                const result = await addNewAttendance(data)
                console.log(result)
                if (result.data.status == 'ok') {
                  toast('✅ Attendance added successfully')
                  window.setTimeout(PageBack, 3000)
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

  const PageBack = () => {
    navigate(-1)
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
                <h1 className="h4 mb-4">Add Attendance</h1>
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
                          students.length ?
                            students.map(item => (
                              <tr>
                                <td className='align-middle '>
                                  <Link className="d-flex align-items-center text-decoration-none mx-1" to={"/dashboard/admin/users/" + (item._id)} style={{ textDecoration: "none" }}>
                                    <img className="img-fluid" src={process.env.REACT_APP_SERVER_FILE + item.ProfilePicture} alt="" style={{ height: '2.5rem', borderRadius: '50%' }} />
                                    <div className="pl-3 m-0">
                                      <span className='text-dark' style={{ fontSize: '14px' }}>{item.Name}</span>
                                    </div>
                                  </Link>
                                </td>
                                <td className='align-middle '>
                                  <div className="d-flex">
                                    <div className="form-check">
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        name={"attendance-data" + item._id}
                                        id="flexRadioDefault1"
                                        onChange={() => onDataChanged(item._id, 'Present')}
                                      />
                                      <label className="form-check-label" htmlFor="flexRadioDefault1">
                                        Present
                                      </label>
                                    </div>
                                    <div className="form-check ml-4">
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        name={"attendance-data" + item._id}
                                        id="flexRadioDefault2"
                                        onChange={() => onDataChanged(item._id, 'Absent')}
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
                              <td colSpan='4'>No Student is Enrolled</td>
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
                    <form onSubmit={(e) => addAttendanceNew(e)}>
                      <table className="table table-striped">
                        <tbody>
                          <tr>
                            <td className="align-middle">Course Name</td>
                            <td className="align-middle">{course.Name}</td>
                          </tr>
                          <tr>
                            <td className="align-middle">Date</td>
                            <td className="align-middle">
                              <input type="date" name="" id="" defaultValue={moment(Date()).format('yyyy-MM-DD')} onChange={(e) => setDate(e.target.value)} />
                            </td>
                          </tr>
                          <tr>
                            <td className="align-middle">Check this if date is Holiday</td>
                            <td className="align-middle">
                              <input type="checkbox" name="holiday" id="holiday" />
                            </td>
                          </tr>
                          <tr>
                            <td className="align-middle">Total Students</td>
                            <td className="align-middle">{students.length}</td>
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
                              <button type="submit" className="btn btn-sm btn-dark">Add Attendance</button>
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
  );
};

export default AddAttendance;
