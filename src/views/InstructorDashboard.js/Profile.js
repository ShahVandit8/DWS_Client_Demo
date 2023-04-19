import { React, useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getInstructorByID, editInstructorProfile } from '../../services/api'
import moment from 'moment'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../layouts/LoadingScreen/Loading';

const Profile = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
        getAdmin();
    }, [])

    const defaltValue = {
        Name: '',
        ProfileCover: '',
        Email: '',
        Password: '',
        Gender: '',
        DOB: '',
        Mobile: '',
        Address: '',
    }

    const [loading, setLoading] = useState(false)
    const [instructor, setInstructor] = useState(defaltValue)
    const [instructorname, setInstructorName] = useState("")
    const [courselist, setcourselist] = useState([])
    const [image, setIamge] = useState();
    const navigate = useNavigate();
    const { id } = useParams();

    const getAdmin = async () => {
        setLoading(true)
        let instructordetails = await getInstructorByID(id);
        setInstructor(instructordetails.data);
        setIamge((process.env.REACT_APP_SERVER_FILE) + (instructordetails.data.ProfilePhoto))
        setInstructorName(instructordetails.data.Name)
        setcourselist(instructordetails.data.Courses)
        setLoading(false)
    }

    const onValueChange = (e) => {
        setInstructor({ ...instructor, [e.target.name]: e.target.value })
    }

    const imageUpload = (e) => {
        setInstructor({ ...instructor, ProfilePhoto: e.target.files[0] })
        setIamge((URL.createObjectURL(e.target.files[0])))
    }

    const editinstructor = async (e) => {
        e.preventDefault();

        const selectGender = document.getElementById('Gender');

        if (selectGender.value === 'select') {
            alert('Please Select Gender')
        }
        else {
            if (instructor.ProfilePhoto instanceof File) {


                const formdata = new FormData();
                formdata.append('Name', instructor.Name);
                formdata.append('ProfilePhoto', instructor.ProfilePhoto, instructor.ProfilePhoto.name);
                formdata.append('Email', instructor.Email);
                formdata.append('Password', instructor.Password);
                formdata.append('Gender', instructor.Gender);
                formdata.append('Address', instructor.Address);
                formdata.append('Mobile', instructor.Mobile);
                formdata.append('DOB', instructor.DOB);
                formdata.append('Courses', JSON.stringify(courselist));
                const instructorEdit = await editInstructorProfile(formdata, id)

                if (instructorEdit) {

                    const instructorToken = instructorEdit.data;
                    const instructordetails = instructorToken.instructor;
                    console.log(instructorToken.instructortoken)

                    if (instructorToken.instructortoken) {
                        sessionStorage.setItem('InstructorToken', instructorToken.instructortoken)
                        sessionStorage.setItem('Instructor', JSON.stringify(instructordetails))
                        toast("✅ Changes have been saved successfully");
                        window.setTimeout(PageReload, 3000)
                    }

                }
                else {
                    toast.error("Error : Profile Not Updated");
                }

            }
            else {

                const formdata = new FormData();
                formdata.append('Name', instructor.Name);
                formdata.append('Email', instructor.Email);
                formdata.append('Password', instructor.Password);
                formdata.append('Gender', instructor.Gender);
                formdata.append('Address', instructor.Address);
                formdata.append('Mobile', instructor.Mobile);
                formdata.append('DOB', instructor.DOB);
                formdata.append('Courses', JSON.stringify(courselist));
                const instructorEdit = await editInstructorProfile(formdata, id)

                if (instructorEdit) {

                    const instructorToken = instructorEdit.data;
                    const instructordetails = instructorToken.instructor;
                    console.log(instructorToken.instructortoken)

                    if (instructorToken.instructortoken) {
                        sessionStorage.setItem('InstructorToken', instructorToken.instructortoken)
                        sessionStorage.setItem('Instructor', JSON.stringify(instructordetails))
                        toast("✅ Changes have been saved successfully");
                        window.setTimeout(PageReload, 3000)
                    }

                }
                else {
                    alert("Error : Admin Details Not Updated")
                }

            }

        }
    }

    const PageReload = () => {
        navigate(0)
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
                                <h1 className="h4 mb-4">My Profile</h1>
                            </div>
                            <div className='col-3 text-right pr-5'>
                                <button onClick={() => navigate(-1)} className="btn btn-dark" style={{ borderRadius: '0' }}><i className="bi bi-chevron-left mr-1"></i>Back</button>
                            </div>
                        </div>
                        <div className="main-body">
                            <form className=""
                                onSubmit={editinstructor}
                            >
                                <div className="row">
                                    <div className="col-lg-4">
                                        <div className="card" style={{ borderRadius: '0' }}>
                                            <div className="card-body">
                                                <div className="d-flex flex-column align-items-center text-center">

                                                    <div className="avatar-upload">
                                                        <div className="avatar-edit">
                                                            <input type="file" id="imageUpload" accept=".png, .jpg, .jpeg" onChange={imageUpload} />
                                                            <label htmlFor="imageUpload" />
                                                        </div>
                                                        <div className="avatar-preview">
                                                            {
                                                                loading ?
                                                                    <div className="spinner-border text-dark" role="status">
                                                                        <span className="sr-only">Loading...</span>
                                                                    </div>
                                                                    :
                                                                    <div
                                                                        id="imagePreview"
                                                                        style={{ backgroundImage: `url(${image})` }}
                                                                    ></div>
                                                            }

                                                        </div>
                                                    </div>
                                                    <div className="mt-3">
                                                        <h3>{instructorname}</h3>
                                                        <p className="text-secondary mb-1">Instructor</p>
                                                        {/* <button className="btn btn-outline-primary mt-2">Edit <i class="fa fa-edit"></i></button> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-8 mb-4">
                                        <div className="card" style={{ borderRadius: '0' }}>
                                            <div class="card-header">Account Details</div>
                                            <div className="card-body">

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
                                                        </>
                                                        :
                                                        <div>
                                                            <div className="mb-3">
                                                                <label className="small mb-1" htmlFor="inputName">Full Name</label>
                                                                <input className="form-control" style={{ backgroundColor: 'white', borderRadius: '0' }} id="inputName" name="Name" type="text" value={instructor.Name} onChange={(e) => onValueChange(e)} required />
                                                            </div>

                                                            <div className="row gx-3 mb-3">
                                                                <div className="col-md-6">
                                                                    <label className="small mb-1" htmlFor="inputEmail">Email</label>
                                                                    <input className="form-control" style={{ backgroundColor: 'white', borderRadius: '0' }} id="inputEmail" name="Email" type="text" value={instructor.Email} onChange={(e) => onValueChange(e)} required />
                                                                </div>
                                                                {/* Form Group (last name)*/}
                                                                <div className="col-md-6">
                                                                    <label className="small mb-1" htmlFor="inputDOB">Date of Birth</label>
                                                                    <input className="form-control" style={{ backgroundColor: 'white', borderRadius: '0' }} id="inputDOB" name="DOB" type="date" value={moment(instructor.DOB).format('yyyy-MM-DD')} onChange={(e) => onValueChange(e)} required />
                                                                </div>
                                                            </div>
                                                            {/* Form Row        */}
                                                            <div className="row gx-3 mb-3">
                                                                {/* Form Group (organization name)*/}
                                                                <div className="col-md-6">
                                                                    <label className="small mb-1" htmlFor="inputContact">Contact No</label>
                                                                    <input className="form-control" style={{ backgroundColor: 'white', borderRadius: '0' }} id="inputContact" name="Mobile" type="text" value={instructor.Mobile} onChange={(e) => onValueChange(e)} required />
                                                                </div>
                                                                {/* Form Group (location)*/}
                                                                <div className="col-md-6">
                                                                    <label className="small mb-1" htmlFor="inputGender">Gender</label>
                                                                    <select name="Gender" id="Gender" className="form-control" style={{ backgroundColor: 'white', borderRadius: '0' }} value={instructor.Gender} onChange={(e) => onValueChange(e)} required>
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
                                                                    onChange={(e) => onValueChange(e)}
                                                                />
                                                            </div>

                                                        </div>
                                                }

                                                <div className="row">
                                                    <div className="col-xl-3 col-6">
                                                        <button
                                                            type="submit"
                                                            className="btn btn-outline-dark px-4"
                                                            placeholder='Save Changes'
                                                            style={{ borderRadius: '0' }}
                                                        >Save Changes</button>
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

export default Profile
