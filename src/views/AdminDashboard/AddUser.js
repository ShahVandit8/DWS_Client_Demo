import { React, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { registerUser } from '../../services/api.js'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddUser = () => {

    const defaulValue = {
        Name: '',
        Email: '',
        Password: ''
    }

    const [user, setUser] = useState(defaulValue)
    const navigate = useNavigate()

    const [eye, setEye] = useState('bi bi-eye');
    const [inptype, setInptype] = useState('password');


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
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const UserRegister = async (e) => {
        e.preventDefault()

        const register = await registerUser(user);

        if (register) {
            toast('✅ User Registered Successfully')
            window.setTimeout(PageBack, 3000)
        }
        else {
            toast.error('Error: User not registered')
        }
    }

    const PageBack = () => {
        navigate(-1)
    }

    return (
        <div className="px-3">
            <div className='row'>
                <div className='col-9'>
                    <h1 className="h4 mb-4"> Add New User</h1>
                </div>
                <div className='col-3 text-right pr-5'>
                    <button onClick={() => navigate(-1)} className="btn btn-dark" style={{ borderRadius: '0' }}><i className="bi bi-chevron-left mr-1"></i>Back</button>
                </div>
            </div>
            <section className="signup">
                <div className="">
                    <div className="col-12 col-md-6 col-xl-5 card mx-auto">
                        <form className="card-body"
                            onSubmit={UserRegister}
                        >
                            <p>Enter User Details</p>

                            <input type="text" name="Name" className="form-control" onChange={(e) => onInputChange(e)} placeholder="Full Name" />
                            <input type="text" name="Email" className="form-control" onChange={(e) => onInputChange(e)} placeholder="Email" />
                            <input type={inptype} name="Password" className="form-control" onChange={(e) => onInputChange(e)} placeholder="Password" />
                            <span className="select-btn8" onClick={showPassword}><i className={eye}></i></span>

                            <button className="submitbutton" type="submit">
                                Add User
                            </button>

                        </form>
                    </div>
                </div>
            </section>
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

export default AddUser
