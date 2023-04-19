import { React, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getEnrollments, getStudents, getCourses, editEnrollmentPassedOut, editEnrollmentTermiate, editEnrollmentActive } from '../../services/api'
import moment from 'moment'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../layouts/LoadingScreen/Loading';

const Enrollments = () => {

    useEffect(() => {
        getAllEnrollments();
        getAllStudents();
        getAllcourses();
    }, [])

    const [enrollments, setEnrollments] = useState([])
    const [students, setStudents] = useState([])
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();

    const getAllEnrollments = async () => {
        setLoading(true)
        const result = await getEnrollments()
        if (result) {
            setEnrollments(result.data)
        }
    }

    const getAllStudents = async () => {
        const result = await getStudents()
        if (result) {
            setStudents(result.data)
        }
    }

    const getAllcourses = async () => {
        const result = await getCourses()
        if (result) {
            setCourses(result.data)
        }
        setLoading(false)
    }

    const onEditEnrollmentPassedOut = async (e) => {

        if (window.confirm('Want to make this student passed out ?')) {
            try {
                const edit = await editEnrollmentPassedOut(e)
                if (edit) {
                    toast('✅ Enrollment Status Edited Succesfully')
                    window.setTimeout(PageReload, 3000)
                }
                else {
                    toast.error('Sorry Something went wrong')
                }
            }
            catch (err) {
                toast.error('Error: ' + err)
            }
        }

    }

    const onEditEnrollmentActive = async (e) => {

        if (window.confirm('Want to make this student status Active ?')) {
            try {
                const edit = await editEnrollmentActive(e)
                if (edit) {
                    toast('✅ Enrollment Status Edited Succesfully')
                    window.setTimeout(PageReload, 3000)
                }
                else {
                    toast.error('Sorry Something went wrong')
                }
            }
            catch (err) {
                toast.error('Error: ' + err)
            }
        }

    }

    const onEditEnrollmentTerminate = async (e) => {

        if (window.confirm('Do you want to terminate this enrollment ?')) {
            try {
                const edit = await editEnrollmentTermiate(e)
                if (edit) {
                    toast('✅ Enrollment Status Edited Succesfully')
                    window.setTimeout(PageReload, 3000)
                }
                else {
                    toast.error('Sorry Something went wrong')
                }
            }
            catch (err) {
                toast.error('Error: ' + err)
            }
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
                                <h1 className="h4 mb-4">Enrollments</h1>
                            </div>
                            <div className='col-5'>
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="Search student"
                                        style={{ borderRadius: '0' }}
                                    // onChange={(e) => setSearch(e.target.value)}
                                    />
                                    <div class="input-group-append">
                                        <button class="btn btn-dark" type="button" style={{ borderRadius: '0' }}>
                                            <i class="fa fa-search"></i>
                                        </button>
                                    </div>

                                </div>
                            </div>
                            <div className='col-3 text-right pr-5'>
                                <button onClick={() => navigate(-1)} className="btn btn-dark" style={{ borderRadius: '0' }}><i className="bi bi-chevron-left mr-1"></i>Back</button>
                            </div>
                        </div>

                        <div className="">
                            <div className="card p-0" style={{ borderRadius: '0' }}>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Student</th>
                                            <th>Enrolled in</th>
                                            <th>Enrollment Date</th>
                                            <th>Enrollment Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            enrollments.length ?
                                                enrollments.map(item => (
                                                    students.filter((item1) => item1._id == item.Student_id).map(item2 => (
                                                        <tr>
                                                            <td className="align-middle">
                                                                <Link className="d-flex align-items-center text-decoration-none mx-1" to={"/dashboard/admin/users/" + (item2._id)} style={{ textDecoration: "none" }}>
                                                                    <img className="img-fluid" src={process.env.REACT_APP_SERVER_FILE + item2.ProfilePicture} alt="" style={{ height: '2.5rem', borderRadius: '50%' }} />
                                                                    <div className="pl-3 m-0">
                                                                        <span className='text-dark' style={{ fontSize: '16px' }}>
                                                                            {item2.Name}
                                                                        </span>
                                                                        <p className="text-body my-auto" style={{ fontSize: '11px' }}>• {item2.Email}</p>
                                                                    </div>
                                                                </Link>
                                                            </td>
                                                            <td className="align-middle">
                                                                <span className='text-dark' style={{ fontSize: '15px' }}>
                                                                    {
                                                                        courses.filter((item3) => item3._id == item.Course_id).map((item4) => (
                                                                            <> {item4.Name}</>
                                                                        ))
                                                                    }
                                                                </span>
                                                            </td>
                                                            <td className="align-middle">
                                                                <span className='text-dark' style={{ fontSize: '15px' }}>
                                                                    {moment(item.Enrollment_date).format("LL")}
                                                                </span>
                                                            </td>
                                                            <td className="align-middle">
                                                                {
                                                                    item.Status == 'Active' ?
                                                                        <span className="badge" style={{ fontSize: '13px', backgroundColor: '#EBF5F0', color: '#38A169', borderRadius: '0' }}>Active</span>
                                                                        :
                                                                        item.Status == 'Terminated' ?
                                                                            <span className="badge" style={{ fontSize: '13px', backgroundColor: '#FBE9E9', color: '#DC2626', borderRadius: '0' }}>Terminated</span>
                                                                            :
                                                                            <span className="badge" style={{ fontSize: '13px', backgroundColor: 'rgba(117, 79, 254, 0.1)', color: '#754FFE', borderRadius: '0' }}>Passed Out</span>
                                                                }
                                                            </td>
                                                            <td>
                                                                <div className="dropdown col-5 ml-2 mt-1" style={{ border: '0' }}>
                                                                    <span className="bi bi-three-dots-vertical text-center" href="#" id="Dropdown1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></span>
                                                                    <div className="dropdown-menu shadow " aria-labelledby="Dropdown1" style={{ border: '0' }}>

                                                                        {
                                                                            item.Status == 'Active' ?
                                                                                <button onClick={(e) => onEditEnrollmentPassedOut(item._id)} className="dropdown-item" to={"/dashboard/admin/editinstructor/" + (item._id)}>
                                                                                    <i className="bi bi-pencil-square mr-2 " />
                                                                                    Mark as Passed Out
                                                                                </button>
                                                                                :
                                                                                <button onClick={(e) => onEditEnrollmentActive(item._id)} className="dropdown-item" to={"/dashboard/admin/editinstructor/" + (item._id)}>
                                                                                    <i className="bi bi-pencil-square mr-2 " />
                                                                                    Mark as Active
                                                                                </button>
                                                                        }

                                                                        {
                                                                            item.Status == "Terminated" ?
                                                                                <></>
                                                                                :
                                                                                <button onClick={(e) => onEditEnrollmentTerminate(item._id)} className="dropdown-item">
                                                                                    <i className="bi bi-trash mr-2" />
                                                                                    Terminate Enrollment
                                                                                </button>
                                                                        }

                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ))
                                                :
                                                <tr>
                                                    <td colspan="5" className="align-middle text-center">
                                                        <span>No New Enrollments</span>
                                                    </td>
                                                </tr>
                                        }
                                    </tbody>
                                </table>
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

export default Enrollments
