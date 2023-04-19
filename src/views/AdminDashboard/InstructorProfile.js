import { React, useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getInstructorByID } from '../../services/api'
import moment from 'moment'
import Loading from '../../layouts/LoadingScreen/Loading'

const InstructorProfile = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
        getInstructor();
    }, [])


    const [instructor, setInstructor] = useState({})
    const [courses, setCourses] = useState([])
    const [image, setIamge] = useState();
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false)

    const getInstructor = async () => {
        setLoading(true)
        let instrcutorDetails = await getInstructorByID(id);
        setInstructor(instrcutorDetails.data);
        setCourses(instrcutorDetails.data.Courses);
        setIamge((process.env.REACT_APP_SERVER_FILE) + (instrcutorDetails.data.ProfilePhoto))
        setLoading(false)
    }

    return (
        <div className="container">
            {
                loading ?
                    <Loading />
                    :
                    <>
                        <div className='row'>
                            <div className='col-9'>
                                <h1 className="h4 mb-4">View Instructor Details</h1>
                            </div>
                            <div className='col-3 text-right pr-5'>
                                <button onClick={() => navigate(-1)} className="btn btn-dark" style={{ borderRadius: '0' }}><i className="bi bi-chevron-left mr-1"></i>Back</button>
                            </div>
                        </div>
                        <div className="main-body">
                            <form className=""
                            // onSubmit={editAdmin}
                            >
                                <div className="row">
                                    <div className="col-lg-4">
                                        <div className="card" style={{ borderRadius: '0' }}>
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
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-8 mb-4">
                                        <div className="card" style={{ borderRadius: '0' }}>
                                            <div class="card-header">Account Details</div>
                                            <div className="card-body">

                                                <div>
                                                    <div className="mb-3">
                                                        <label className="small mb-1" htmlFor="inputName">Full Name</label>
                                                        <input className="form-control" style={{ backgroundColor: 'white', borderRadius: '0' }} id="inputName" name="Name" type="text" value={instructor.Name} readOnly />
                                                    </div>

                                                    <div className="row gx-3 mb-3">
                                                        <div className="col-md-6">
                                                            <label className="small mb-1" htmlFor="inputEmail">Email</label>
                                                            <input className="form-control" style={{ backgroundColor: 'white', borderRadius: '0' }} id="inputEmail" type="text" value={instructor.Email} readOnly />
                                                        </div>
                                                        {/* Form Group (last name)*/}
                                                        <div className="col-md-6">
                                                            <label className="small mb-1" htmlFor="inputDOB">Date of Birth</label>
                                                            <input className="form-control" style={{ backgroundColor: 'white', borderRadius: '0' }} id="inputDOB" type="date" value={moment(instructor.DOB).format('yyyy-MM-DD')} readOnly />
                                                        </div>
                                                    </div>
                                                    {/* Form Row        */}
                                                    <div className="row gx-3 mb-3">
                                                        {/* Form Group (organization name)*/}
                                                        <div className="col-md-6">
                                                            <label className="small mb-1" htmlFor="inputContact">Contact No</label>
                                                            <input className="form-control" style={{ backgroundColor: 'white', borderRadius: '0' }} id="inputContact" type="text" value={instructor.Mobile} readOnly />
                                                        </div>
                                                        {/* Form Group (location)*/}
                                                        <div className="col-md-6">
                                                            <label className="small mb-1" htmlFor="inputGender">Gender</label>
                                                            <select name="Gender" id="inputGender" className="form-control" style={{ backgroundColor: 'white', borderRadius: '0' }} value={instructor.Gender} required readOnly>
                                                                <option value="select" selected>Select Gender</option>
                                                                <option value="Male">Male</option>
                                                                <option value="Female">Female</option>
                                                                <option value="Other">Other</option>
                                                            </select>
                                                            {/* <input className="form-control" id="inputLocation" type="text" placeholder="Enter your location" defaultValue="San Francisco, CA" /> */}
                                                        </div>
                                                    </div>


                                                    <div className=" gx-3 mb-3">
                                                        <label className="small mb-1" htmlFor="inputInstitute">Address</label>
                                                        <textarea
                                                            className="form-control"
                                                            name="Address"
                                                            style={{ backgroundColor: 'white', borderRadius: '0' }}
                                                            placeholder="Address"
                                                            rows='5'
                                                            required
                                                            value={instructor.Address}
                                                            readOnly
                                                        // onChange={(e) => onValueChange(e)}
                                                        />
                                                    </div>

                                                </div>

                                            </div>
                                        </div>

                                        <div className="row mt-4">
                                            <div className="col-sm-12">
                                                <div className="card" style={{ borderRadius: '0' }}>
                                                    <div className="card-header">
                                                        Course                                </div>
                                                    <div className="card-body p-0">

                                                        {courses.length > 0 ?
                                                            <table className="table table-striped">
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col" className='pl-4'>Course</th>
                                                                        <th scope="col" className="text-center"></th>
                                                                        <th scope="col" style={{ width: '30%' }} className="text-right pr-4">Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        courses.map(item => (
                                                                            <tr key={item.id}>
                                                                                <td className='align-middle'>
                                                                                    <a className="d-flex align-items-center text-decoration-none mx-1" href={`/course/` + (item.id)} target="_blank" style={{ textDecoration: "none" }}>
                                                                                        <img className="img-fluid rounded" src={process.env.REACT_APP_SERVER_FILE + item.CoverImage} alt="" style={{ height: '3.5rem' }} />
                                                                                        <div className="pl-3 m-0">
                                                                                            <span style={{ fontWeight: 'bold', color: '#1E293B' }}>{item.Name}</span>
                                                                                        </div>
                                                                                    </a>
                                                                                </td>
                                                                                <td colSpan="2" className='align-middle'>
                                                                                    <a href={`/dashboard/admin/courses/manage/` + (item.id)} className="col-4 btn btn-dark float-right" style={{ borderRadius: '0', width: 'fit-content' }}>Manage</a>
                                                                                </td>
                                                                            </tr>
                                                                        ))
                                                                    }
                                                                </tbody>
                                                            </table>
                                                            :
                                                            <div className="text-center my-3">
                                                                <span>No Course Assigned to {instructor.Name}</span>
                                                            </div>
                                                        }

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </form>
                        </div>
                    </>
            }

        </div>
    )
}

export default InstructorProfile
