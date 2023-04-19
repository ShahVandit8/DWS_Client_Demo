import { React, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginInstructor } from '../../services/api'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../layouts/LoadingScreen/Loading';

const InstructorLogin = () => {

    const loginDefaultValue = {
        email: '',
        password: '',
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const [eye, setEye] = useState('bi bi-eye');
    const [inptype, setInptype] = useState('password');
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState(loginDefaultValue)
    const navigate = useNavigate();

    const showPassword = () => {
        if (inptype === 'password') {
            setInptype('text');
            setEye('bi bi-eye-slash')
        }
        else {
            setInptype('password')
            setEye('bi bi-eye')
        }
    }

    const onInputChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const instructorLogin = async (e) => {
        e.preventDefault()
        const id1 = toast.loading("Logging in...")

        try {

            const login = await loginInstructor(data);
            const instructorToken = login.data;
            const instructordetails = instructorToken.instructor;
            console.log(instructorToken.instructortoken)

            if (login.data.status == 'ok') {
                if (instructorToken.instructortoken) {
                    sessionStorage.setItem('InstructorToken', instructorToken.instructortoken)
                    sessionStorage.setItem('Instructor', JSON.stringify(instructordetails))
                    toast.update(id1, { render: 'Successfully Logged in', type: "success", isLoading: false })
                    window.setTimeout(onLoading, 3000)
                }
                else {
                    toast.update(id1, { render: 'Sorry! Login Failure', type: "error", isLoading: false, autoClose: '3000' })
                }
            }
            else if (login.data.status == 'NA') {
                toast.update(id1, { render: 'Wrong Credentials', type: "error", isLoading: false, autoClose: '3000' })
            }
            else {
                toast.update(id1, { render: 'Error: Login Failure!', type: "error", isLoading: false, autoClose: '3000' })
            }

        }
        catch (err) {
            toast.error('Login Failure')
        }
    }

    const onLoading = () => {
        setLoading(true)
        window.setTimeout(gotoDashboard, 3000)
    }

    const gotoDashboard = () => {
        navigate('/dashboard/instructor/home')
    }


    return (
        <section id="login" className="login">
            {
                loading ?
                    <Loading />
                    :
                    <>
                        <div className="">
                            <div className="col-12 col-xl-3 col-md-6 card mx-auto">
                                <form className="card-body" onSubmit={instructorLogin}>
                                    <p>Instructor Login</p>

                                    <input type="text" name="email" className="form-control" onChange={(e) => onInputChange(e)} placeholder="Email" />
                                    <input type={inptype} name="password" className="form-control" onChange={(e) => onInputChange(e)} placeholder="Password" />
                                    <span className="select-btn1" onClick={showPassword}><i className={eye}></i></span>

                                    <button type="submit" className="submitbutton">
                                        Log in
                                    </button>

                                    <div className='text-center mt-3'>
                                        <span>or <strong><Link>Forget Password</Link></strong></span>
                                    </div>

                                </form>
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

        </section>
    )
}

export default InstructorLogin
