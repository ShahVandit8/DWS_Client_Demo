import { React, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerInstructor } from '../../services/api'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddInstructor = () => {

    const InstructorDefaultValues = {
        Name: '',
        ProfilePhoto: '',
        Email: '',
        Password: '',
        Gender: '',
        DOB: '',
        Mobile: '',
        Address: '',
    }

    useEffect(() => {
        window.scroll(0, 0)
    })

    const [image, setImage] = useState('')
    const [imagename, setImageName] = useState('No File Selected')
    const [instructor, setInstructor] = useState(InstructorDefaultValues)

    const open_file = () => {
        document.getElementById('input_file').click();
    }

    const imageUpload = (e) => {
        setInstructor({ ...instructor, ProfilePhoto: e.target.files[0] })
        setImage((URL.createObjectURL(e.target.files[0])))
        setImageName(e.target.files[0].name)
    }

    const onValueChange = (e) => {
        setInstructor({ ...instructor, [e.target.name]: e.target.value })
        console.log(instructor)
    }

    const addInstructor = async (e) => {
        e.preventDefault()

        if (instructor.ProfilePhoto instanceof File) {
            try {

                const formdata = new FormData();
                formdata.append('Name', instructor.Name);
                formdata.append('ProfilePhoto', instructor.ProfilePhoto, instructor.ProfilePhoto.name);
                formdata.append('Email', instructor.Email);
                formdata.append('Password', instructor.Password);
                formdata.append('Gender', instructor.Gender);
                formdata.append('Address', instructor.Address);
                formdata.append('Mobile', instructor.Mobile);
                formdata.append('DOB', instructor.DOB);
                const instructorRegistered = await registerInstructor(formdata)

                if (instructorRegistered) {
                    toast('✅ Instructor Registered Successfully')
                    window.setTimeout(PageBack, 3000)
                }
                else {
                    toast.error('Error: Instructor not registered')
                }
            }
            catch (err) {
                toast.error('Error: Instructor not registered')
            }
        }
        else {
            toast.warning('Please Select Profile Photo')
        }

    }

    const PageBack = () => {
        navigate(-1)
    }

    const navigate = useNavigate();

    return (
        <div className="px-3">
            <div className='row'>
                <div className='col-9'>
                    <h1 className="h4 mb-4"> Add New Instructor</h1>
                </div>
                <div className='col-3 text-right pr-5'>
                    <button onClick={() => navigate(-1)} className="btn btn-dark" style={{ borderRadius: '0' }}><i className="bi bi-chevron-left mr-1"></i>Back</button>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="card p-0" style={{ borderRadius: '0' }}>
                        <div className="card-header">
                            <span>Instructor Details</span>
                        </div>
                        <div className="card-body">
                            <form onSubmit={addInstructor}>
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
                                        onChange={(e) => onValueChange(e)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <span style={{ color: '#000', fontWeight: 'bold', fontSize: '14px' }}>Password</span>
                                    {/* <label htmlFor="exampleInputEmail1">Course Title</label> */}
                                    <input
                                        type="password"
                                        className="form-control"
                                        style={{ borderRadius: '0' }}
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        placeholder="Create Password"
                                        name="Password"
                                        onChange={(e) => onValueChange(e)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <span style={{ color: '#000', fontWeight: 'bold', fontSize: '14px' }}>Course Category</span>
                                    {/* <label htmlFor="CourseCategory">Course Category</label> */}
                                    <select className="form-control" id="Gender" name="Gender" style={{ borderRadius: '0' }} onChange={(e) => onValueChange(e)} required >
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
                                        name="Mobile"
                                        onChange={(e) => onValueChange(e)}
                                        required
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
                                        onChange={(e) => onValueChange(e)}
                                        required
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
                                        onChange={(e) => onValueChange(e)}
                                        rows={3}
                                        defaultValue={""}
                                        required
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
                                    Add Instructor
                                </button>

                            </form>


                        </div>
                    </div>
                </div>
            </div>
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

export default AddInstructor
