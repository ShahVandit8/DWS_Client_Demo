import { React, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { pwdforgot } from '../../services/api';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgetPassword = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        Email: '',
    })

    const recoverPassword = async (e) => {
        e.preventDefault()

        if (user.Email == '') {
            toast.warning('Please enter your email')
        }
        else {
            const result = await pwdforgot(user.Email);
            if (result) {
                toast('✅ Password is send to your email')
                window.setTimeout(gotoLogin, 5000)
            }
            else {
                toast.error("Sorry this email doesn't exist in our system. Please try again with correct email")
                document.getElementById("form").reset();
            }
        }

    }

    const gotoLogin = () => {
        navigate('/authentication/sign-in')
    }

    return (
        <section id="login" className="login">
            <div className="mt-2">
                <div className="col-12 col-xl-3 col-md-6 card mx-auto">
                    <form id="form" className="card-body"
                        onSubmit={recoverPassword}
                    >
                        <p style={{ fontSize: '30px' }}>Forget Password</p>
                        <p className="mt-4 mb-n1">Enter your Email</p>

                        <input type="text" name="Email" className="form-control" onChange={(e) => setUser({ Email: e.target.value })} placeholder="Email" />

                        <button type="submit" className="submitbutton">
                            Send Password
                        </button>

                        <div className='text-center mt-3'>
                            <span>Note: Your password will be sent to your email.</span>
                        </div>

                        <hr />

                        <div className='text-center mt-3'>
                            <span>Go back to <strong><Link to="/authentication/sign-in">Sign in</Link></strong></span>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                theme="dark"
            />
        </section>
    )
}

export default ForgetPassword
