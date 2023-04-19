import { React, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../../services/api'
import jwtDecode from 'jwt-decode'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login({ login, setlogin }) {

    const loginDefaultValue = {
        Email: '',
        Password: '',
    }

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

    const [eye, setEye] = useState('bi bi-eye');
    const [inptype, setInptype] = useState('password');

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

    const UserLogin = async (e) => {
        e.preventDefault()

        const id1 = toast.loading("Logging in...")

        try {
            const register = await loginUser(data);
            const UserToken = register.data;
            const userdetails = UserToken.user;
            console.log(UserToken.usertoken)

            if (register.data.status == 'ok') {
                if (UserToken.usertoken) {
                    sessionStorage.setItem('UserToken', UserToken.usertoken)
                    sessionStorage.setItem('User', JSON.stringify(userdetails))
                    console.log(UserToken);
                    toast.update(id1, {render: 'Successfully Logged in', type: "success", isLoading: false})
                    setlogin(true)
                    window.setTimeout(gotoHome, 3000)
                }
                else {
                    toast.update(id1, {render: 'Sorry! Login Failure', type: "error", isLoading: false, autoClose:'3000'})
                }
            }
            else if(register.data.status == 'NA') {
                toast.update(id1, {render: 'Wrong Credentails', type: "error", isLoading: false, autoClose:'3000'})
            }

        }
        catch (err) {
            toast.update(id1, {render: 'Error! Login Failure', type: "error", isLoading: false, autoClose:'3000'})
        }
    }

    const gotoHome = () => {
        window.location.replace('/')
    }

    return (
        <section id="login" className="login">
            <div className="">
                <div className="col-12 col-xl-3 col-md-6 card mx-auto">
                    <form className="card-body" onSubmit={UserLogin}>
                        <p>Login into your account</p>

                        <input type="text" name="Email" className="form-control" onChange={(e) => onInputChange(e)} placeholder="Email" />
                        <input type={inptype} name="Password" className="form-control" onChange={(e) => onInputChange(e)} placeholder="Password" />
                        <span className="select-btn" onClick={showPassword}><i className={eye}></i></span>

                        <button type="submit" className="submitbutton">
                            Log in
                        </button>

                        <div className='text-center mt-3'>
                            <span>or <strong><Link to="/forget-password" >Forget Password</Link></strong></span>
                        </div>

                        <hr />

                        <div className='text-center mt-3'>
                            <span>Don't have an account? <strong><Link to="/authentication/sign-up">Sign up</Link></strong></span>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar="false"
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

export default Login
