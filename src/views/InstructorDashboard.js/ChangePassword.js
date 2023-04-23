import { React, useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getInstructorByID, UpdateInstructorPassword } from '../../services/api'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../layouts/LoadingScreen/Loading';

const ChangePassword = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
        getInstructor();
    }, [])

    const defaultValue1 = {
        oldpass: "",
        newpass: ""
    }

    const [instructor, setInstructor] = useState({});
    const [image, setIamge] = useState();
    const [inptype1, setInptype1] = useState('password');
    const [inptype2, setInptype2] = useState('password');
    const [inptype3, setInptype3] = useState('password');
    const [eye1, setEye1] = useState('fa fa-eye');
    const [eye2, setEye2] = useState('fa fa-eye');
    const [eye3, setEye3] = useState('fa fa-eye');
    const [password, setPassword] = useState(defaultValue1);
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false)

    const getInstructor = async () => {
        setLoading(true)
        let Details = await getInstructorByID(id);
        setInstructor(Details.data);
        setIamge((process.env.REACT_APP_SERVER_FILE) + (Details.data.ProfilePhoto))
        setLoading(false)
    }

    const showCurrentPassword = () => {
        if (inptype1 === 'password') {
            setInptype1('text');
            setEye1('fa fa-eye-slash')
        }
        else {
            setInptype1('password')
            setEye1('fa fa-eye')
        }
    }

    const showNewPassword = () => {
        if (inptype2 === 'password') {
            setInptype2('text');
            setEye2('fa fa-eye-slash')
        }
        else {
            setInptype2('password')
            setEye2('fa fa-eye')
        }
    }

    const showConfirmPassword = () => {
        if (inptype3 === 'password') {
            setInptype3('text');
            setEye3('fa fa-eye-slash')
        }
        else {
            setInptype3('password')
            setEye3('fa fa-eye')
        }
    }

    const onValueChange = (e) => {
        setPassword({ ...password, [e.target.name]: e.target.value })
        console.log(password)
    }

    const UpdatePassword = async (e) => {
        e.preventDefault()

        const npass = document.getElementById('newpass');
        const cpass = document.getElementById('confirmpass');

        if (cpass.value !== npass.value) {
            toast.error('Confirm Password Doesnt match with New Password')
        }
        else {
            const passupdated = await UpdateInstructorPassword(password, id);

            if (passupdated) {
                toast('✅ Password updated successfully')
                window.setTimeout(gotoDashboard, 3000)
            }
            else {
                toast.error('Current Password is incorrect')
            }

        }
    }

    const gotoDashboard = async (e) => {
        navigate('/dashboard/instructor/home')
    }

    return (
        <>
            <div className="container">
                {
                    loading ?
                        <Loading />
                        :
                        <>
                            <div className="main-body">
                                <form onSubmit={UpdatePassword}>
                                    <div className="col-lg-8 mx-auto">
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
                                                        <h4>{instructor.Name}</h4>
                                                        <p className="text-secondary mb-1">Instructor</p>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-8 mx-auto">
                                        <div className="card" style={{ borderRadius: '0' }}>
                                            <div className="card-body">
                                                <div className="mt-3 mb-3">
                                                    <h3 className="text-center">Change Password</h3>
                                                    <p className="text-center text-muted">Note: New password must contain UpperCase, LowerCase, Number/SpecialChar and minimum 8 Characters</p>
                                                </div>
                                                <div className="row mb-3 mt-5">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Current Password</h6>
                                                    </div>
                                                    <div className="col-sm-9 input-group text-secondary">
                                                        <input
                                                            type={inptype1}
                                                            className="form-control"
                                                            placeholder="Old Password"
                                                            style={{ borderRadius: '0' }}
                                                            name="oldpass"
                                                            required
                                                            onChange={(e) => onValueChange(e)}
                                                        />
                                                        <div class="input-group-append">
                                                            <button className="btn btn-dark" style={{ borderRadius: '0' }} type="button" onClick={showCurrentPassword}><i className={eye1}></i></button>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">New Password</h6>
                                                    </div>
                                                    <div className="col-sm-9 input-group text-secondary">
                                                        <input
                                                            type={inptype2}
                                                            className="form-control"
                                                            placeholder="New Password"
                                                            name="newpass"
                                                            id="newpass"
                                                            style={{ borderRadius: '0' }}
                                                            pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                                                            required
                                                            onChange={(e) => onValueChange(e)}
                                                        />
                                                        <div class="input-group-append">
                                                            <button className="btn btn-dark" type="button" style={{ borderRadius: '0' }} onClick={showNewPassword}><i className={eye2}></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mb-4">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Confirm Password</h6>
                                                    </div>
                                                    <div className="col-sm-9 input-group text-secondary">
                                                        <input
                                                            type={inptype3}
                                                            className="form-control"
                                                            placeholder="Confirm Password"
                                                            name="confirmpass"
                                                            id="confirmpass"
                                                            style={{ borderRadius: '0' }}
                                                            required
                                                        // onChange={(e) => onValueChange(e)}
                                                        />
                                                        <div class="input-group-append">
                                                            <button className="btn btn-dark" style={{ borderRadius: '0' }} type="button" onClick={showConfirmPassword}><i className={eye3}></i></button>
                                                        </div>
                                                    </div>
                                                </div>


                                                <div className="row text-center mt-3">
                                                    <div className="text-secondary">
                                                        <button
                                                            type="submit"
                                                            className="btn btn-dark px-4"
                                                            style={{ borderRadius: '0' }}
                                                        >Change Password</button>
                                                    </div>
                                                </div>

                                                <div className="row text-center mt-3">
                                                    <div className="text-secondary">
                                                        <Link className="" to="/fgpassword">Forgot Old Password?</Link>
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
        </>
    )
}

export default ChangePassword
