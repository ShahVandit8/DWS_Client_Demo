import { React, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../../services/api'
import jwtDecode from 'jwt-decode'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup({ login, setlogin }) {

    useEffect(() => {
        window.scrollTo(0, 0);

        const token = sessionStorage.getItem('UserToken')
        if (token) {
            const user = jwtDecode(token)
            if (user) {
                window.location = "/"
            }
        }

    }, [])

    const SigninDefaultValue = {
        Name: '',
        Email: '',
        Password: '',
    }

    const [data, setData] = useState(SigninDefaultValue)

    const [eye, setEye] = useState('bi bi-eye');
    const [inptype, setInptype] = useState('password');

    const navigate = useNavigate()

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

    const UserRegister = async (e) => {
        e.preventDefault()

        const register = await registerUser(data);

        const UserToken = register.data;
        const userdetails = UserToken.user;
        console.log(UserToken.usertoken)

        if (register) {
            if (UserToken.usertoken) {
                sessionStorage.setItem('UserToken', UserToken.usertoken)
                sessionStorage.setItem('User', JSON.stringify(userdetails))
                console.log(UserToken);
                setlogin(true)
                toast('✅ Registration Successful')
                window.setTimeout(gotoHome, 3000)
            }
            else {
                toast.error('Registration Failure')
            }
        }
        else {
            toast.error('Registration Failure')
        }

    }

    const gotoHome = () => {
        navigate('/')
    }

    return (
        <section id="login" className="signup">
            <div className="">
                <div className="col-12 col-xl-3 col-md-6 card mx-auto">
                    <form className="card-body" onSubmit={UserRegister}>
                        <p>Sign up and start learning</p>

                        <input type="text" name="Name" className="form-control" onChange={(e) => onInputChange(e)} placeholder="Full Name" />
                        <input type="email" name="Email" className="form-control" onChange={(e) => onInputChange(e)} placeholder="Email" />
                        <input type={inptype} name="Password" className="form-control" pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" onChange={(e) => onInputChange(e)} placeholder="Password" />
                        <span className="select-btn" onClick={showPassword}><i className={eye}></i></span>

                        <button className="submitbutton" type="submit">
                            Sign up
                        </button>

                        <div className='text-center mt-3'>
                            <span>Already have an account? <strong><Link to="/authentication/sign-in">Log in</Link></strong></span>
                        </div>

                    </form>
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
        </section>
    )
}

export default Signup
