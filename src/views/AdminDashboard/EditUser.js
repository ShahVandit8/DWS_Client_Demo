import { React, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getUserByID, editwholedetails } from '../../services/api'
import moment from 'moment'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../layouts/LoadingScreen/Loading';

const EditUser = () => {

    const DefaultValues = {
        Name: '',
        ProfilePicture: '',
        Email: '',
        Password: '',
        Gender: '',
        Contact: '',
        DOB: '',
        Address: '',
        Courses: []
    }

    useEffect(() => {
        getStudent();
    }, [])

    const [image, setImage] = useState('')
    const [imagename, setImageName] = useState('No File Selected')
    const [student, setStudent] = useState(DefaultValues)
    const [courselist, setCourselist] = useState([])
    const [loading, setLoading] = useState(false)
    const { id } = useParams();
    const navigate = useNavigate();

    const open_file = () => {
        document.getElementById('input_file').click();
    }

    const imageUpload = (e) => {
        setStudent({ ...student, ProfilePicture: e.target.files[0] })
        setImage((URL.createObjectURL(e.target.files[0])))
        setImageName(e.target.files[0].name)
    }

    const onValueChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value })
    }

    const getStudent = async () => {
        setLoading(true)
        let studentdetails = await getUserByID(id);
        setStudent(studentdetails.data);
        setImage((process.env.REACT_APP_SERVER_FILE) + (studentdetails.data.ProfilePicture))
        setCourselist(studentdetails.data.Courses)
        setLoading(false)
    }

    const editUserDetails = async (e) => {
        e.preventDefault();

        if (student.ProfilePicture instanceof File) {

            try {
                const formdata = new FormData();
                formdata.append('Name', student.Name);
                formdata.append('ProfilePicture', student.ProfilePicture, student.ProfilePicture.name);
                formdata.append('Email', student.Email);
                formdata.append('Password', student.Password);
                formdata.append('Gender', student.Gender);
                formdata.append('Address', student.Address);
                formdata.append('Contact', student.Contact);
                formdata.append('DOB', student.DOB);
                formdata.append('Courses', JSON.stringify(courselist));
                const useredit = await editwholedetails(id, formdata)

                if (useredit) {
                    toast("✅ Changes have been saved successfully");
                    window.setTimeout(PageBack, 3000)
                }
                else {
                    toast.error("Sorry Something went wrong");
                }
            }
            catch (err) {
                toast.error("Error: " + err);
            }

        }
        else {
            try {
                const formdata = new FormData();
                formdata.append('Name', student.Name);
                formdata.append('Email', student.Email);
                formdata.append('Password', student.Password);
                formdata.append('Gender', student.Gender);
                formdata.append('Address', student.Address);
                formdata.append('Contact', student.Contact);
                formdata.append('DOB', student.DOB);
                formdata.append('Courses', JSON.stringify(courselist));
                const useredit = await editwholedetails(id, formdata)

                if (useredit) {
                    toast("✅ Changes have been saved successfully");
                    window.setTimeout(PageBack, 3000)
                }
                else {
                    toast.error("Sorry Something went wrong");
                }
            }
            catch (err) {
                toast.error("Error: " + err);
            }
        }

        console.log(student)
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
                        <div className='row'>
                            <div className='col-9'>
                                <h1 className="h4 mb-4">Edit {student.Courses.length ? <>Student</> : <>User</>}</h1>
                            </div>
                            <div className='col-3 text-right pr-5'>
                                <button onClick={() => navigate(-1)} className="btn btn-dark" style={{ borderRadius: '0' }}><i className="bi bi-chevron-left mr-1"></i>Back</button>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="card p-0" style={{ borderRadius: '0' }}>
                                    <div className="card-header">
                                        <span>{student.Courses.length ? <>Student</> : <>User</>} Details</span>
                                    </div>
                                    <div className="card-body">
                                        <form
                                            onSubmit={editUserDetails}
                                        >
                                            <div className="form-group">
                                                <span style={{ color: '#000', fontWeight: 'bold', fontSize: '14px' }}>Full Name</span>
                                                {/* <label htmlFor="exampleInputEmail1">Course Title</label> */}
                                                <input
                                                    type="teXt"
                                                    className="form-control"
                                                    style={{ borderRadius: '0' }}
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Enter Name"
                                                    name="Name"
                                                    value={student.Name}
                                                    onChange={(e) => onValueChange(e)}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <span style={{ color: '#000', fontWeight: 'bold', fontSize: '14px' }}>Email</span>
                                                {/* <label htmlFor="exampleInputEmail1">Course Title</label> */}
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    style={{ borderRadius: '0' }}
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Enter Email"
                                                    name="Email"
                                                    value={student.Email}
                                                    onChange={(e) => onValueChange(e)}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <span style={{ color: '#000', fontWeight: 'bold', fontSize: '14px' }}>Password</span>
                                                {/* <label htmlFor="exampleInputEmail1">Course Title</label> */}
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    style={{ borderRadius: '0' }}
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Create Password"
                                                    name="Password"
                                                    value={student.Password}
                                                    onChange={(e) => onValueChange(e)}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <span style={{ color: '#000', fontWeight: 'bold', fontSize: '14px' }}>Gender</span>
                                                {/* <label htmlFor="CourseCategory">Course Category</label> */}
                                                <select className="form-control" id="Gender" name="Gender" style={{ borderRadius: '0' }} onChange={(e) => onValueChange(e)} value={student.Gender} >
                                                    <option value="select">Select Gender</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <span style={{ color: '#000', fontWeight: 'bold', fontSize: '14px' }}>Contact</span>
                                                {/* <label htmlFor="exampleInputEmail1">Course Title</label> */}
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    style={{ borderRadius: '0' }}
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Enter Contact No"
                                                    name="Contact"
                                                    value={student.Contact}
                                                    onChange={(e) => onValueChange(e)}

                                                />
                                            </div>
                                            <div className="form-group">
                                                <span style={{ color: '#000', fontWeight: 'bold', fontSize: '14px' }}>Date of Birth</span>
                                                {/* <label htmlFor="exampleInputEmail1">Course Title</label> */}
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    style={{ borderRadius: '0' }}
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                    name="DOB"
                                                    value={moment(student.DOB).format('yyyy-MM-DD')}
                                                    onChange={(e) => onValueChange(e)}

                                                />
                                            </div>
                                            <div className="form-group">
                                                <span style={{ color: '#000', fontWeight: 'bold', fontSize: '14px' }}>Address</span>
                                                {/* <label htmlFor="exampleFormControlTextarea1">Short Overview</label> */}
                                                <textarea
                                                    style={{ borderRadius: '0' }}
                                                    className="form-control "
                                                    id="exampleFormControlTextarea1"
                                                    name="Address"
                                                    value={student.Address}
                                                    onChange={(e) => onValueChange(e)}
                                                    rows={3}
                                                    defaultValue={""}

                                                />
                                            </div>

                                            <span style={{ color: '#000', fontWeight: 'bold', fontSize: '14px' }}>Image Preview</span>
                                            <div className="image-tab">
                                                <div className="image-bg">
                                                    <div className="image-main">
                                                        <img src={image} className='mx-auto d-block' alt="" />
                                                        {/* <img src={image} className='mx-auto d-block' alt="" /> */}
                                                    </div>
                                                </div>
                                            </div>

                                            <span style={{ color: '#000', fontWeight: 'bold', fontSize: '14px', marginTop: '10px' }}>Add Profile Image</span>
                                            <div className="image-upload d-flex">
                                                <input type="file" name="" id='input_file' onChange={imageUpload} hidden />
                                                <div className="col-9 m-0" style={{ backgroundColor: '#F7F9FA', height: '100%', padding: '10px' }}>
                                                    <span>{imagename}</span>
                                                </div>
                                                <div className="col-3 m-0 p-0">
                                                    <button onClick={open_file} type="button" className='upload-button'>Upload Image</button>
                                                </div>
                                            </div>
                                            <button type="submit" className="btn btn-dark mt-4" style={{ borderRadius: '0' }}>
                                                Edit Details
                                            </button>

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

export default EditUser
